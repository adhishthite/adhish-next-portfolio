import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Shared section shell: page container, vertical rhythm, and a hairline aligned to the content edge */
export const sectionClass =
  "container-page relative py-20 sm:py-28 before:absolute before:inset-x-5 before:top-0 before:h-px before:bg-border/60 sm:before:inset-x-8";

interface SectionHeadingProps {
  /** Two-digit index shown in the eyebrow, e.g. "01" */
  index: string;
  /** Short eyebrow label, e.g. "Selected work" */
  label: string;
  /** Serif section title */
  title: React.ReactNode;
  /** id for the h2, so the section can reference it with aria-labelledby */
  id: string;
  intro?: React.ReactNode;
  action?: { href: string; label: string };
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  id,
  intro,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-2">
          <span className="text-foreground/70">{index}</span>
          <span aria-hidden className="h-px w-5 bg-border" />
          <span>{label}</span>
        </p>
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
          className="group inline-flex shrink-0 items-center gap-1.5 self-start text-sm text-muted-foreground transition-colors hover:text-foreground md:self-auto md:pb-1.5"
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
