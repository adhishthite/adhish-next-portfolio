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
                  primaryColor: "#3b82f6",
                  primaryTextColor: "#f8fafc",
                  primaryBorderColor: "#475569",
                  lineColor: "#64748b",
                  secondaryColor: "#1e293b",
                  tertiaryColor: "#0f172a",
                  background: "#0f172a",
                  mainBkg: "#1e293b",
                  nodeBorder: "#475569",
                  clusterBkg: "#1e293b",
                  titleColor: "#f8fafc",
                  edgeLabelBackground: "#1e293b",
                }
              : {
                  primaryColor: "#3b82f6",
                  primaryTextColor: "#1e293b",
                  primaryBorderColor: "#cbd5e1",
                  lineColor: "#64748b",
                  secondaryColor: "#f1f5f9",
                  tertiaryColor: "#e2e8f0",
                  background: "#ffffff",
                  mainBkg: "#f8fafc",
                  nodeBorder: "#cbd5e1",
                  clusterBkg: "#f1f5f9",
                  titleColor: "#1e293b",
                  edgeLabelBackground: "#f8fafc",
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
