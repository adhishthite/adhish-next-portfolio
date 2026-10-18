"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface ExperienceEntry {
  company: string;
  href: string;
  title: string;
  location: string;
  start: string;
  end: string;
  badges: readonly string[];
  logoUrl?: string;
  description: string;
}

/** "April 2019" -> "Apr 2019", so every range uses the same month width */
function shortMonth(value: string) {
  return value.replace(/^([A-Za-z]{3})[a-z]*\s/, "$1 ");
}

function bullets(description: string) {
  return description
    .split("\n")
    .map((line) => line.replace(/^[\s•]+/, "").trim())
    .filter(Boolean);
}

function Logo({
  entry,
  compact,
}: {
  entry: ExperienceEntry;
  compact: boolean;
}) {
  const size = compact ? 24 : 32;
  const frame = cn(
    "relative flex shrink-0 items-center justify-center overflow-hidden border border-border/70",
    compact ? "size-6 rounded-[6px]" : "size-8 rounded-md",
  );

  const isPhoto = entry.logoUrl ? /\.jpe?g$/i.test(entry.logoUrl) : false;
  const mark = entry.logoUrl ? (
    <span className={cn(frame, "bg-white")}>
      <Image
        src={entry.logoUrl}
        alt=""
        width={size}
        height={size}
        className={cn(
          "size-full",
          isPhoto ? "object-cover" : "object-contain p-[18%]",
        )}
      />
    </span>
  ) : (
    <span className={cn(frame, "bg-secondary")}>
      <span
        className={cn(
          "font-serif leading-none text-muted-foreground",
          compact ? "text-[13px]" : "text-base",
        )}
      >
        {entry.company.charAt(0)}
      </span>
    </span>
  );

  // Every row keeps a 32px logo column, so compact titles line up with the main ones
  return (
    <span
      aria-hidden
      className="flex size-8 shrink-0 items-center justify-center"
    >
      {mark}
    </span>
  );
}

export function ExperienceItem({
  entry,
  compact = false,
  defaultOpen = false,
}: {
  entry: ExperienceEntry;
  compact?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  // Compact rows sit under the "Internships & research" h3, so they step down a level
  const Title = compact ? "h4" : "h3";
  const panelId = useId();
  const dates = `${shortMonth(entry.start)} – ${shortMonth(entry.end)}`;
  // Compact rows sit under an "Internships & research" label already, and a
  // badge that repeats the title ("Codex Ambassador" / "Ambassador") adds nothing.
  const badges = compact
    ? []
    : entry.badges.filter(
        (badge) => !entry.title.toLowerCase().includes(badge.toLowerCase()),
      );

  return (
    <li className="border-t border-border/60 first:border-t-0">
      <div
        className={cn(
          "group/row relative grid grid-cols-[1fr_auto] items-center gap-x-4 sm:grid-cols-[9.5rem_1fr_auto] sm:gap-x-6",
          compact ? "py-3.5" : "py-5",
        )}
      >
        <span
          className={cn(
            "hidden font-mono tabular-nums text-muted-foreground sm:block",
            compact ? "text-[11px]" : "text-xs",
          )}
        >
          {dates}
        </span>

        <div className="flex min-w-0 items-center gap-3.5">
          <Logo entry={entry} compact={compact} />
          <div className="min-w-0">
            <Title
              className={cn(
                "flex flex-wrap items-center gap-x-2.5 gap-y-1 tracking-tight",
                compact
                  ? "text-sm text-foreground/85"
                  : "text-[15px] font-medium sm:text-base",
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((value) => !value)}
                className="text-left after:absolute after:-inset-x-3 after:inset-y-1 after:rounded-lg after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-ring"
              >
                {entry.title}
              </button>
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-border/80 px-1.5 py-px font-mono text-[10px] font-normal uppercase tracking-[0.08em] text-muted-foreground"
                >
                  {badge}
                </span>
              ))}
            </Title>
            <p
              className={cn(
                "mt-0.5 truncate text-muted-foreground",
                compact ? "text-[13px]" : "text-sm",
              )}
            >
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 transition-colors hover:text-foreground hover:underline hover:decoration-accent/60 hover:underline-offset-4"
              >
                {entry.company}
              </a>
              <span className="hidden md:inline">
                <span aria-hidden className="px-1.5 text-border">
                  /
                </span>
                {entry.location}
              </span>
            </p>
            <p className="mt-1 font-mono text-[11px] tabular-nums text-muted-foreground sm:hidden">
              {dates}
            </p>
          </div>
        </div>

        <span
          aria-hidden
          className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors group-hover/row:bg-secondary group-hover/row:text-foreground"
        >
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-300",
              open && "rotate-180",
            )}
            strokeWidth={1.75}
          />
        </span>
      </div>

      <div
        id={panelId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "pb-6 pl-[2.875rem] sm:pl-[calc(9.5rem+1.5rem)]",
              compact && "sm:pb-5",
            )}
          >
            <div className="sm:pl-[2.875rem]">
              <p className="mb-3 text-[13px] text-muted-foreground md:hidden">
                {entry.location}
              </p>
              <ul className="max-w-[68ch] space-y-2 text-[15px] leading-relaxed text-muted-foreground">
                {bullets(entry.description).map((item) => (
                  <li key={item} className="relative pl-4">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.7em] size-1 rounded-full bg-foreground/30"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
