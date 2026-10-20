import { cn } from "@/lib/utils";

/** Small mono label marking a post that lives on Medium. Decorative: the
 * link around it carries the accessible "(on Medium)" text. */
export function MediumTag({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-border px-1.5 py-[3px] font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-muted-foreground",
        className,
      )}
    >
      Medium
    </span>
  );
}

/** Screen-reader suffix for links that leave the site for Medium. */
export function OnMediumLabel() {
  return <span className="sr-only"> (on Medium, opens in a new tab)</span>;
}
