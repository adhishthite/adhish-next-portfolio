"use client";

import { useEffect, useState } from "react";
import type { BlogHeading } from "@/data/blog";
import { cn } from "@/lib/utils";

/** Headings above this line (fraction of viewport height) count as "read". */
const ACTIVE_LINE = 0.3;

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const compute = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(elements[elements.length - 1].id);
        return;
      }
      const line = window.innerHeight * ACTIVE_LINE;
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };

    // The observer fires whenever a heading crosses the active line; the
    // scroll listener only catches the very end of the page.
    const observer = new IntersectionObserver(compute, {
      rootMargin: `0px 0px -${(1 - ACTIVE_LINE) * 100}% 0px`,
    });
    for (const el of elements) observer.observe(el);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4
        ) {
          compute();
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    compute();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

function TocList({
  headings,
  active,
}: {
  headings: BlogHeading[];
  active?: string | null;
}) {
  return (
    <ol className="space-y-0.5 text-[13px] leading-snug">
      {headings.map((heading) => {
        const isActive = heading.id === active;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative block rounded-sm py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                heading.depth === 3 ? "pl-7" : "pl-4",
                isActive && "text-foreground",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 bg-accent transition-opacity",
                  isActive ? "opacity-100" : "opacity-0",
                )}
              />
              {heading.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Sticky right-rail table of contents with the current section highlighted. */
export function TableOfContents({ headings }: { headings: BlogHeading[] }) {
  const [ids] = useState(() => headings.map((h) => h.id));
  const active = useActiveHeading(ids);

  return (
    <nav aria-label="On this page">
      <p className="eyebrow mb-3 pl-4">On this page</p>
      <div className="border-l border-border/70">
        <TocList headings={headings} active={active} />
      </div>
    </nav>
  );
}

/** Collapsible version shown above the article below the xl breakpoint. */
export function TableOfContentsDisclosure({
  headings,
}: {
  headings: BlogHeading[];
}) {
  const sections = headings.filter((h) => h.depth === 2).length;
  return (
    <details className="group rounded-lg border border-border/70 bg-card">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <span>On this page</span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {sections} {sections === 1 ? "section" : "sections"}
          <span
            aria-hidden
            className="ml-2 inline-block transition-transform group-open:rotate-45"
          >
            +
          </span>
        </span>
      </summary>
      <div className="border-t border-border/70 px-1 py-2">
        <TocList headings={headings} />
      </div>
    </details>
  );
}
