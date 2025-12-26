"use client";

import { ComponentPropsWithoutRef, useRef } from "react";
import React from "react";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
  /**
   * Whether to apply a fade mask to the edges
   * @default false
   */
  fade?: boolean;
  /**
   * Whether to magnify items as they approach the center
   * @default false
   */
  magnify?: boolean;
}

const MagnifiedItem = ({
  children,
  containerRef,
  vertical,
}: {
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLDivElement | null>;
  vertical: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useMotionValue(1);

  useAnimationFrame(() => {
    if (!ref.current || !containerRef.current) return;

    const rect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    let dist = 0;
    if (vertical) {
      const center = containerRect.top + containerRect.height / 2;
      const itemCenter = rect.top + rect.height / 2;
      dist = Math.abs(center - itemCenter);
    } else {
      const center = containerRect.left + containerRect.width / 2;
      const itemCenter = rect.left + rect.width / 2;
      dist = Math.abs(center - itemCenter);
    }

    const maxDist = 200;
    let s = 1;
    if (dist < maxDist) {
      s = 1 + 0.5 * (1 - dist / maxDist);
    }
    scale.set(s);
  });

  return (
    <motion.div ref={ref} style={{ scale }} className="origin-center">
      {children}
    </motion.div>
  );
};

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  fade = false,
  magnify = false,
  ...props
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
          "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]":
            fade && !vertical,
          "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]":
            fade && vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {magnify
              ? React.Children.map(children, (child) => (
                  <MagnifiedItem
                    containerRef={containerRef}
                    vertical={vertical}
                  >
                    {child}
                  </MagnifiedItem>
                ))
              : children}
          </div>
        ))}
    </div>
  );
}
