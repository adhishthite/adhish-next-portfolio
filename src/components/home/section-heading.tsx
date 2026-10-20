import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Shared section shell: page container, vertical rhythm, and a hairline aligned to the content edge */
export const sectionClass =
  "container-page relative py-20 sm:py-28 before:absolute before:inset-x-5 before:top-0 before:h-px before:bg-border/60 sm:before:inset-x-8";

/** Short label shown above every section title, led by a small accent rule */
export function SectionEyebrow({ label }: { label: string }) {
  return (
    <p className="eyebrow flex items-center gap-2.5">
      <span aria-hidden className="h-px w-6 bg-accent" />
      <span>{label}</span>
    </p>
  );
}

/**
 * Hash-link target for a section. It sits on the heading block rather than the
 * section, so a jump lands with the eyebrow just under the sticky header
 * instead of below the section's top padding.
 */
export const anchorClass = "scroll-mt-3";

interface SectionHeadingProps {
  /** Short eyebrow label, e.g. "Selected work" */
  label: string;
  /** Serif section title */
  title: React.ReactNode;
  /** id for the h2, so the section can reference it with aria-labelledby */
  id: string;
  /** Hash-link id for the section (e.g. "projects" for /#projects) */
  anchor?: string;
  intro?: React.ReactNode;
  action?: { href: string; label: string };
  className?: string;
}

export function SectionHeading({
  label,
  title,
  id,
  anchor,
  intro,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      id={anchor}
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between",
        anchor && anchorClass,
        className,
      )}
    >
      <div className="max-w-2xl">
        <SectionEyebrow label={label} />
        <h2
          id={id}
          className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl"
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {intro}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group -my-2.5 inline-flex min-h-10 shrink-0 items-center gap-1.5 self-start text-sm text-muted-foreground transition-colors hover:text-foreground md:self-auto md:-mb-1"
        >
          {action.label}
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </Link>
      ) : null}
    </div>
  );
}
