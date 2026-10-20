"use client";

import { Moon, Sun } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className,
      )}
    >
      {/* Both icons render; CSS picks one so there is no hydration flash */}
      <Sun className="size-[17px] dark:hidden" />
      <Moon className="hidden size-[17px] dark:block" />
    </button>
  );
}
