"use client";

import { Moon, Sun } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Pause CSS transitions for the frame a theme switch lands in, so hover and
 * colour transitions don't animate the swap. Done here rather than through
 * next-themes' `disableTransitionOnChange`, which also runs on every page load
 * and costs two full-document style recalculations before the page settles.
 */
function pauseTransitions() {
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);
  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()));
}

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => {
        pauseTransitions();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className,
      )}
    >
      {/* Both icons render; CSS picks one so there is no hydration flash */}
      <Sun className="size-[1.0625rem] dark:hidden" />
      <Moon className="hidden size-[1.0625rem] dark:block" />
    </button>
  );
}
