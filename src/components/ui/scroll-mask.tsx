import { cn } from "@/lib/utils";
import React from "react";

interface ScrollMaskProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  fadeSize?: string; // e.g., "10%" or "24px"
}

export function ScrollMask({
  children,
  className,
  orientation = "vertical",
  fadeSize = "24px",
  ...props
}: ScrollMaskProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        orientation === "vertical"
          ? "[mask-image:linear-gradient(to_bottom,transparent,black_var(--fade-size),black_calc(100%_-_var(--fade-size)),transparent)]"
          : "[mask-image:linear-gradient(to_right,transparent,black_var(--fade-size),black_calc(100%_-_var(--fade-size)),transparent)]",
        className,
      )}
      style={
        {
          "--fade-size": fadeSize,
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={cn(
          "h-full w-full overflow-auto",
          orientation === "vertical" ? "overflow-x-hidden" : "overflow-y-hidden",
        )}
      >
        {children}
      </div>
    </div>
  );
}
