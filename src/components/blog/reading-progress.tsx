"use client";

import { useEffect, useRef } from "react";

/**
 * 2px accent bar pinned under the 64px site header. Tracks how far the reader
 * is through the element with `targetId` (the article body). No easing, so it
 * behaves the same with reduced motion.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = barRef.current;
    if (!target || !bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const start = rect.top + window.scrollY - 64;
      const distance = rect.height - window.innerHeight + 64;
      const progress =
        distance > 0
          ? Math.min(1, Math.max(0, (window.scrollY - start) / distance))
          : 1;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(target);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-16 z-50 h-[2px]"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
