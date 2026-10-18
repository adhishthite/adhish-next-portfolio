"use client";

import { type RefObject, useEffect, useId, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

type Rgb = [number, number, number];

/** Parse a design-token value like "40 20% 98%" (HSL channels) into RGB. */
function tokenToRgb(value: string): Rgb | null {
  const match = /^\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%/.exec(value);
  if (!match) return null;
  const h = Number(match[1]) / 360;
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  const hue = (t: number) => {
    let x = t;
    if (x < 0) x += 1;
    if (x > 1) x -= 1;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    if (x < 1 / 6) return p + (q - p) * 6 * x;
    if (x < 1 / 2) return q;
    if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6;
    return p;
  };
  if (s === 0) return [l * 255, l * 255, l * 255];
  return [hue(h + 1 / 3) * 255, hue(h) * 255, hue(h - 1 / 3) * 255];
}

const hex = ([r, g, b]: Rgb) =>
  `#${[r, g, b]
    .map((c) => Math.round(c).toString(16).padStart(2, "0"))
    .join("")}`;

/** Blend `a` over `b`; amount 0 = b, 1 = a. */
const mix = (a: Rgb, b: Rgb, amount: number): Rgb => [
  a[0] * amount + b[0] * (1 - amount),
  a[1] * amount + b[1] * (1 - amount),
  a[2] * amount + b[2] * (1 - amount),
];

/** Mermaid "base" theme variables built from the live CSS tokens. */
function readThemeVariables() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const token = (name: string, fallback: Rgb): Rgb =>
    tokenToRgb(styles.getPropertyValue(`--${name}`)) ?? fallback;

  const dark = root.classList.contains("dark");
  const fg = token("foreground", dark ? [235, 233, 228] : [25, 23, 21]);
  const card = token("card", dark ? [23, 22, 21] : [255, 255, 255]);
  const bg = token("background", dark ? [16, 15, 14] : [251, 250, 248]);
  const muted = token("muted-foreground", [110, 106, 100]);
  const accent = token("accent", [201, 59, 27]);

  const node = mix(fg, card, dark ? 0.07 : 0.04);
  const nodeBorder = mix(fg, card, dark ? 0.3 : 0.24);
  const subtle = mix(fg, card, 0.12);
  const tint = mix(accent, card, dark ? 0.14 : 0.08);

  return {
    darkMode: dark,
    fontFamily: getComputedStyle(document.body).fontFamily,
    fontSize: "14px",
    background: hex(card),
    textColor: hex(fg),
    titleColor: hex(fg),
    lineColor: hex(muted),
    primaryColor: hex(node),
    primaryTextColor: hex(fg),
    primaryBorderColor: hex(nodeBorder),
    secondaryColor: hex(tint),
    secondaryTextColor: hex(fg),
    secondaryBorderColor: hex(mix(accent, card, 0.45)),
    tertiaryColor: hex(bg),
    tertiaryTextColor: hex(fg),
    tertiaryBorderColor: hex(subtle),
    mainBkg: hex(node),
    nodeBorder: hex(nodeBorder),
    nodeTextColor: hex(fg),
    clusterBkg: hex(mix(fg, card, dark ? 0.025 : 0.018)),
    clusterBorder: hex(subtle),
    edgeLabelBackground: hex(card),
    // sequence diagrams
    actorBkg: hex(node),
    actorBorder: hex(nodeBorder),
    actorTextColor: hex(fg),
    actorLineColor: hex(subtle),
    signalColor: hex(muted),
    signalTextColor: hex(fg),
    labelBoxBkgColor: hex(node),
    labelBoxBorderColor: hex(nodeBorder),
    labelTextColor: hex(fg),
    loopTextColor: hex(muted),
    activationBkgColor: hex(tint),
    activationBorderColor: hex(mix(accent, card, 0.6)),
    sequenceNumberColor: hex(card),
    noteBkgColor: hex(tint),
    noteBorderColor: hex(mix(accent, card, 0.45)),
    noteTextColor: hex(fg),
    // state + er diagrams
    labelColor: hex(fg),
    altBackground: hex(bg),
    attributeBackgroundColorOdd: hex(card),
    attributeBackgroundColorEven: hex(node),
  };
}

/** Changes whenever next-themes toggles the class on <html>. */
function useThemeClass() {
  const [themeClass, setThemeClass] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setThemeClass(root.classList.contains("dark") ? "dark" : "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return themeClass;
}

/**
 * Below `min` labels get too small and the diagram scrolls sideways at
 * `wide` instead. Phones accept a smaller scale so tall diagrams don't
 * turn into a very long two-way scroll.
 */
const SCALES = {
  desktop: { min: 0.6, wide: 0.8 },
  phone: { min: 0.5, wide: 0.62 },
};

/**
 * Mermaid sizes the SVG to fit its container, which makes wide diagrams
 * unreadably small in a 600px column. Wide diagrams get a wider frame on
 * large screens, and if that still shrinks them too far they scroll
 * sideways at a legible scale.
 */
function useLegibleWidth(ref: RefObject<HTMLDivElement | null>, svg: string) {
  useEffect(() => {
    const frame = ref.current;
    const el = frame?.querySelector("svg");
    if (!frame || !el) return;
    const natural = el.viewBox.baseVal?.width;
    if (!natural) return;

    const fit = () => {
      // Wider than the text column: let CSS widen the frame on large screens
      frame.toggleAttribute("data-breakout", false);
      const padded = frame.clientWidth - 40;
      frame.toggleAttribute("data-breakout", natural > padded);
      const style = getComputedStyle(frame);
      const available =
        frame.clientWidth -
        Number.parseFloat(style.paddingLeft) -
        Number.parseFloat(style.paddingRight);
      const scale = window.innerWidth < 640 ? SCALES.phone : SCALES.desktop;
      const wide = available / natural < scale.min;
      frame.toggleAttribute("data-wide", wide);
      el.style.width = wide ? `${Math.round(natural * scale.wide)}px` : "";
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [ref, svg]);
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const themeClass = useThemeClass();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  useLegibleWidth(frameRef, svg);

  useEffect(() => {
    if (!themeClass) return;
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "strict",
          themeVariables: readThemeVariables(),
          flowchart: { curve: "basis", padding: 14 },
          sequence: { mirrorActors: false },
        });
        const result = await mermaid.render(
          `mermaid-${id}-${themeClass}`,
          chart,
        );
        if (!cancelled) {
          setSvg(result.svg);
          setFailed(false);
        }
      } catch (error) {
        console.error("Mermaid render error:", error);
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, id, themeClass]);

  if (failed) {
    return (
      <pre className="mermaid-fallback">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="mermaid-frame" aria-busy="true">
        <span className="sr-only">Loading diagram</span>
        <div aria-hidden className="mermaid-skeleton" />
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      className="mermaid-frame"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
