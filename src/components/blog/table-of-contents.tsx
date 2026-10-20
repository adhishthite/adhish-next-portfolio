"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import type { BlogHeading } from "@/data/blog";
import { cn } from "@/lib/utils";

/** Headings above this line (fraction of viewport height) count as "read". */
const ACTIVE_LINE = 0.3;

/** Tailwind's xl breakpoint; below it the rail is hidden with CSS. */
const RAIL_QUERY = "(min-width: 1280px)";

/**
 * The rail stays mounted while CSS hides it on smaller screens, so its scroll
 * and geometry work is switched on only while it can actually be seen.
 */
function useRailVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(RAIL_QUERY);
    const update = () => setVisible(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return visible;
}

function useActiveHeading(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
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
  }, [ids, enabled]);

  return active;
}

/**
 * Wide diagrams widen symmetrically over the rail. While one overlaps the
 * sticky TOC, fade the TOC out instead of drawing the diagram on top of it.
 */
function useHiddenByBreakout(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const nav = ref.current;
      if (!nav) return;
      const rail = nav.getBoundingClientRect();
      const gap = 24;
      const overlaps = [
        ...document.querySelectorAll(".mermaid-frame[data-breakout]"),
      ].some((el) => {
        const box = el.getBoundingClientRect();
        return (
          box.right > rail.left &&
          box.left < rail.right &&
          box.bottom > rail.top - gap &&
          box.top < rail.bottom + gap
        );
      });
      setHidden(overlaps);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Diagrams render after hydration and can change size with the theme
    const observer = new MutationObserver(schedule);
    const body = document.getElementById("post-body");
    if (body) {
      observer.observe(body, {
        subtree: true,
        childList: true,
        attributeFilter: ["data-breakout"],
      });
    }
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref, enabled]);

  return hidden;
}

function TocList({
  headings,
  active,
  roomy = false,
}: {
  headings: BlogHeading[];
  active?: string | null;
  /** Taller rows for touch (the mobile disclosure). */
  roomy?: boolean;
}) {
  return (
    <ol className={cn("text-[0.8125rem] leading-snug", roomy && "text-sm")}>
      {headings.map((heading) => {
        const isActive = heading.id === active;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "relative block rounded-sm text-muted-foreground transition-colors hover:text-foreground",
                roomy ? "py-2.5" : "py-2",
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
  const visible = useRailVisible();
  const active = useActiveHeading(ids, visible);
  const navRef = useRef<HTMLElement>(null);
  const hidden = useHiddenByBreakout(navRef, visible);

  return (
    <nav
      ref={navRef}
      aria-label="On this page"
      className={cn(
        "transition-[opacity,visibility] duration-200 motion-reduce:transition-none",
        hidden && "invisible opacity-0",
      )}
    >
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
        <span className="font-mono text-[0.6875rem] text-muted-foreground">
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
        <TocList headings={headings} roomy />
      </div>
    </details>
  );
}
