import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
import type { WritingItem } from "@/data/medium";
import { MediumTag, OnMediumLabel } from "@/components/blog/medium-tag";
import { formatDate } from "@/lib/utils";

const postHref = (slug: string) => `/blog/${slug}/`;

/** Featured card used in the "Pinned" row of the blog index. */
export function PinnedPostCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  const { title, publishedAt, image, summary } = post.metadata;
  return (
    <Link
      href={postHref(post.slug)}
      className="group flex overflow-hidden rounded-xl md:flex-col border border-border/70 bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-[0_6px_24px_-12px_rgb(0_0_0/0.18)]"
    >
      <div className="relative w-28 shrink-0 overflow-hidden border-r border-border/60 bg-secondary sm:w-40 md:aspect-[16/9] md:w-auto md:border-b md:border-r-0">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1152px) 352px, (min-width: 768px) 31vw, (min-width: 640px) 160px, 112px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <p className="absolute inset-0 hidden items-end p-5 font-serif md:flex text-[1.375rem] italic leading-snug text-muted-foreground">
            <span className="line-clamp-3">{summary}</span>
          </p>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="text-pretty text-[0.96875rem] font-medium leading-snug">
          {title}
        </h3>
        <p className="mt-auto flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
          <span>
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span aria-hidden> · </span>
            <span className="sr-only">, </span>
            {post.readingTime} min<span className="sr-only"> read</span>
          </span>
          <ArrowRight
            aria-hidden
            className="size-4 transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </p>
      </div>
    </Link>
  );
}

function groupByYear(items: WritingItem[]) {
  const groups = new Map<string, WritingItem[]>();
  for (const item of items) {
    const year = item.publishedAt.slice(0, 4);
    const list = groups.get(year);
    if (list) list.push(item);
    else groups.set(year, [item]);
  }
  return [...groups.entries()];
}

const rowClass =
  "group relative grid grid-cols-[3.75rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto]";

function ArchiveRow({ item }: { item: WritingItem }) {
  const isMedium = item.kind === "medium";
  const body = (
    <>
      <span
        aria-hidden
        className="absolute -left-3.5 top-[1.45rem] size-1.5 scale-0 rounded-full bg-accent transition-transform duration-200 group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none"
      />
      <time
        dateTime={item.publishedAt}
        className="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-muted-foreground tabular-nums"
      >
        {formatDate(item.publishedAt, { month: "short", day: "numeric" })}
      </time>
      <span className="sr-only">: </span>
      <span className="min-w-0">
        <span className="text-pretty text-[0.96875rem] font-medium leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
          {item.title}
        </span>
        {isMedium && (
          <span className="mt-2 flex items-center gap-1.5 text-muted-foreground sm:hidden">
            <MediumTag />
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-colors group-hover:text-accent"
            />
          </span>
        )}
      </span>
      <span className="hidden items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground sm:flex">
        {isMedium ? (
          <>
            <MediumTag />
            <ArrowUpRight
              aria-hidden
              className="size-4 opacity-40 transition-[transform,opacity,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
            />
          </>
        ) : (
          <>
            <span>
              <span className="sr-only">, </span>
              {item.readingTime} min
              <span className="sr-only"> read</span>
            </span>
            <ArrowRight
              aria-hidden
              className="size-4 opacity-40 transition-[transform,opacity,color] duration-300 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
            />
          </>
        )}
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

/** Every post (local and Medium), grouped by year, as compact rows. */
export function PostArchive({ items }: { items: WritingItem[] }) {
  return (
    <div className="space-y-14 sm:space-y-16">
      {groupByYear(items).map(([year, yearItems]) => (
        <section
          key={year}
          aria-labelledby={`year-${year}`}
          className="grid gap-x-10 gap-y-3 md:grid-cols-[9rem_minmax(0,1fr)]"
        >
          <div className="md:sticky md:top-24 md:self-start">
            <h3
              id={`year-${year}`}
              className="flex items-baseline gap-3 font-serif text-4xl leading-none tracking-tight text-muted-foreground/80 md:block"
            >
              {year}
              <span className="sr-only">, </span>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground md:mt-3 md:block">
                {yearItems.length} {yearItems.length === 1 ? "post" : "posts"}
              </span>
            </h3>
          </div>
          <ul className="border-t border-border/70">
            {yearItems.map((item) => (
              <li key={item.key} className="border-b border-border/70">
                <ArchiveRow item={item} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
