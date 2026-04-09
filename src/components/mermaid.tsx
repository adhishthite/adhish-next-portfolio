"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string>("");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const render = async () => {
      try {
        // Re-initialize mermaid with the correct theme
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "inherit",
          themeVariables:
            resolvedTheme === "dark"
              ? {
                  primaryColor: "oklch(var(--accent))",
                  primaryTextColor: "oklch(var(--accent-foreground))",
                  primaryBorderColor: "oklch(var(--border))",
                  lineColor: "oklch(var(--muted-foreground))",
                  secondaryColor: "oklch(var(--card))",
                  tertiaryColor: "oklch(var(--background))",
                  background: "oklch(var(--background))",
                  mainBkg: "oklch(var(--card))",
                  nodeBorder: "oklch(var(--border))",
                  clusterBkg: "oklch(var(--card))",
                  titleColor: "oklch(var(--foreground))",
                  edgeLabelBackground: "oklch(var(--card))",
                }
              : {
                  primaryColor: "oklch(var(--accent))",
                  primaryTextColor: "oklch(var(--accent-foreground))",
                  primaryBorderColor: "oklch(var(--border))",
                  lineColor: "oklch(var(--muted-foreground))",
                  secondaryColor: "oklch(var(--card))",
                  tertiaryColor: "oklch(var(--background))",
                  background: "oklch(var(--background))",
                  mainBkg: "oklch(var(--card))",
                  nodeBorder: "oklch(var(--border))",
                  clusterBkg: "oklch(var(--card))",
                  titleColor: "oklch(var(--foreground))",
                  edgeLabelBackground: "oklch(var(--card))",
                },
        });

        const { svg } = await mermaid.render(
          `mermaid-${id}-${resolvedTheme}`,
          chart,
        );
        setSvg(svg);
      } catch (error) {
        console.error("Mermaid render error:", error);
      }
    };
    render();
  }, [chart, id, resolvedTheme, mounted]);

  if (!mounted || !svg) {
    return (
      <div className="my-6 p-4 rounded-lg bg-muted/30 border border-border/40 text-muted-foreground text-sm">
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
