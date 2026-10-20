import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { MediumTag, OnMediumLabel } from "@/components/blog/medium-tag";
import { getBlogPosts } from "@/data/blog";
import {
  buildWritingTimeline,
  MEDIUM_PROFILE_URL,
  type WritingItem,
} from "@/data/medium";
import { formatDate } from "@/lib/utils";

const rowClass =
  "group flex min-h-10 items-baseline justify-between gap-4 py-2.5";

function TeaserRow({ item }: { item: WritingItem }) {
  const isMedium = item.kind === "medium";
  const body = (
    <>
      <span className="line-clamp-2 min-w-0 text-[15px] text-foreground/90 decoration-accent/50 underline-offset-[5px] group-hover:underline sm:line-clamp-1">
        {item.title}
      </span>
      <span className="flex shrink-0 items-center gap-3 font-mono text-xs tabular-nums text-muted-foreground">
        {isMedium && (
          <span className="flex items-center gap-1">
            <MediumTag />
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-colors group-hover:text-accent"
            />
          </span>
        )}
        <time dateTime={item.publishedAt} className="hidden sm:block">
          {formatDate(item.publishedAt, { month: "short", year: "numeric" })}
        </time>
      </span>
      {isMedium && <OnMediumLabel />}
    </>
  );

  return isMedium ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={rowClass}
    >
      {body}
    </a>
  ) : (
    <Link href={item.href} className={rowClass}>
      {body}
    </Link>
  );
}

/**
 * A quiet pointer to the blog, kept deliberately small: the homepage is about
 * work, and the blog lives on its own at /blog/. Shows the newest three posts
 * across the blog and Medium.
 */
export async function Writing() {
  const items = buildWritingTimeline(await getBlogPosts()).slice(0, 3);
  if (items.length === 0) return null;

  const linkClass =
    "group -my-2.5 inline-flex min-h-10 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground";

  return (
    <aside aria-labelledby="writing-teaser-title" className="container-page">
      <div className="flex flex-col gap-5 rounded-xl border border-border/70 bg-card/60 p-5 sm:p-6 md:flex-row md:items-start md:gap-10">
        <div className="flex shrink-0 items-center justify-between gap-6 md:w-44 md:flex-col md:items-start md:gap-3">
          <h2 id="writing-teaser-title" className="eyebrow">
            From the blog
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/blog/" className={linkClass}>
              All posts
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={MEDIUM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Medium
              <ArrowUpRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only"> profile (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <ul className="-my-2.5 min-w-0 flex-1 divide-y divide-border/60">
          {items.map((item) => (
            <li key={item.key}>
              <TeaserRow item={item} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
