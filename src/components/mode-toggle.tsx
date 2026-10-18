"use client";

import { MoonIcon, SunIcon } from "lucide-react";
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
        "inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        className,
      )}
    >
      {/* Both icons render; CSS picks one so there is no hydration flash */}
      <SunIcon className="size-[17px] dark:hidden" strokeWidth={1.75} />
      <MoonIcon className="hidden size-[17px] dark:block" strokeWidth={1.75} />
    </button>
  );
}
