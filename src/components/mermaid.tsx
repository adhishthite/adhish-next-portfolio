"use client";

import { ArrowsOut, X } from "@phosphor-icons/react/ssr";
import {
  type RefObject,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

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
 * Below this fitted scale (14px labels render at ~9px) the diagram is still
 * shown whole, but gets a "View full size" button that opens it unscaled.
 */
const LEGIBLE_SCALE = 0.65;

/** Widen the frame only when fitting the column would shrink below ~0.87. */
const BREAKOUT_AT = 1.15;

/** Horizontal padding + border of `.mermaid-frame`, kept in sync with article.css. */
function frameChrome(frame: HTMLElement) {
  const style = getComputedStyle(frame);
  return (
    Number.parseFloat(style.paddingLeft) +
    Number.parseFloat(style.paddingRight) +
    Number.parseFloat(style.borderLeftWidth) +
    Number.parseFloat(style.borderRightWidth)
  );
}

/**
 * The SVG always scales down to fit its frame (viewBox scaling, never
 * clipped). A diagram wider than the text column widens its frame evenly on
 * both sides, up to the page container. Returns true when the fitted scale
 * is too small to read comfortably.
 */
function useFittedDiagram(
  ref: RefObject<HTMLDivElement | null>,
  svg: string,
): boolean {
  const [tooSmall, setTooSmall] = useState(false);

  useEffect(() => {
    const frame = ref.current;
    const el = frame?.querySelector("svg");
    const column = frame?.closest<HTMLElement>(".article");
    if (!frame || !el || !column) return;
    const natural = el.viewBox.baseVal?.width;
    if (!natural) return;

    const fit = () => {
      const columnWidth = column.clientWidth;
      const page = column.closest<HTMLElement>(".container-page");
      let pageWidth = columnWidth;
      if (page) {
        const style = getComputedStyle(page);
        pageWidth =
          page.clientWidth -
          Number.parseFloat(style.paddingLeft) -
          Number.parseFloat(style.paddingRight);
      }
      const chrome = frameChrome(frame);
      // Slightly-too-wide diagrams just shrink a little; ragged frames that
      // stick out by a few pixels look like a mistake
      const needsRoom = natural > (columnWidth - chrome) * BREAKOUT_AT;
      const wanted = needsRoom ? Math.min(pageWidth, natural + chrome) : 0;
      const extra = Math.max(0, Math.floor((wanted - columnWidth) / 2));

      frame.toggleAttribute("data-breakout", extra > 0);
      frame.style.marginInline = extra > 0 ? `${-extra}px` : "";

      const inner = columnWidth + extra * 2 - chrome;
      setTooSmall(inner / natural < LEGIBLE_SCALE);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(column);
    return () => observer.disconnect();
  }, [ref, svg]);

  return tooSmall;
}

/**
 * Diagrams are rendered on the client and Mermaid is a heavy import (graph
 * layout runs on the main thread), so wait until the placeholder is within a
 * screen or so of the viewport instead of rendering every diagram on load.
 */
function useNearViewport(ref: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (near || !el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, near]);

  return near;
}

/**
 * Full-viewport view of a diagram at its natural size with two-axis
 * scrolling. Native <dialog>: focus trap, Esc and top-layer for free.
 */
function DiagramDialog({
  svg,
  width,
  dialogRef,
  onClose,
}: {
  svg: string | null;
  width: number | null;
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}) {
  return (
    <dialog
      ref={dialogRef}
      aria-label="Diagram, full size"
      className="mermaid-dialog"
      onClose={onClose}
      onClick={(event) => {
        // Clicks on the ::backdrop are dispatched to the dialog itself
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="mermaid-dialog-bar">
        <p className="eyebrow">Diagram · full size</p>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Close full-size diagram"
          className="mermaid-dialog-close"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
      {svg && (
        <div className="mermaid-dialog-scroll">
          <div
            className="mermaid-dialog-svg"
            style={width ? { width } : undefined}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      )}
    </dialog>
  );
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const themeClass = useThemeClass();
  const [rendered, setRendered] = useState<{ id: string; svg: string }>({
    id: "",
    svg: "",
  });
  const [failed, setFailed] = useState(false);
  // Natural SVG width while the full-size dialog is open, else null
  const [fullWidth, setFullWidth] = useState<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const near = useNearViewport(placeholderRef);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const svg = rendered.svg;
  const tooSmall = useFittedDiagram(frameRef, svg);

  useEffect(() => {
    if (!themeClass || !near) return;
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
        const renderId = `mermaid-${id}-${themeClass}`;
        const result = await mermaid.render(renderId, chart);
        if (!cancelled) {
          setRendered({ id: renderId, svg: result.svg });
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
  }, [chart, id, themeClass, near]);

  const openFullSize = useCallback(() => {
    const dialog = dialogRef.current;
    const natural =
      frameRef.current?.querySelector("svg")?.viewBox.baseVal?.width;
    if (!dialog || dialog.open || !natural) return;
    setFullWidth(natural);
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
  }, []);

  const handleClose = useCallback(() => {
    setFullWidth(null);
    document.documentElement.style.overflow = "";
    triggerRef.current?.focus();
  }, []);

  // Never leave the page scroll-locked if the post unmounts mid-view
  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    [],
  );

  if (failed) {
    return (
      <pre className="mermaid-fallback">
        <code>{chart}</code>
      </pre>
    );
  }

  if (!svg) {
    return (
      <div ref={placeholderRef} className="mermaid-frame" aria-busy="true">
        <span className="sr-only">Loading diagram</span>
        <div aria-hidden className="mermaid-skeleton" />
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      className="mermaid-frame"
      data-zoomable={tooSmall || undefined}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: mouse shortcut; keyboard users get the "View full size" button */}
      <div
        className="mermaid-svg"
        onClick={tooSmall ? openFullSize : undefined}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {tooSmall && (
        <>
          <button
            ref={triggerRef}
            type="button"
            onClick={openFullSize}
            aria-haspopup="dialog"
            className="mermaid-expand"
          >
            <ArrowsOut aria-hidden className="size-3.5" />
            View full size
          </button>
          <DiagramDialog
            dialogRef={dialogRef}
            onClose={handleClose}
            // Unique ids so the copy's <style> and arrow markers don't
            // collide with the inline diagram's
            width={fullWidth}
            svg={
              fullWidth
                ? svg.replaceAll(rendered.id, `${rendered.id}-full`)
                : null
            }
          />
        </>
      )}
    </div>
  );
}
