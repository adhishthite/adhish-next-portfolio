import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blog";
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
      className="group flex overflow-hidden rounded-xl sm:flex-col border border-border/70 bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-300 hover:border-foreground/20 hover:shadow-[0_6px_24px_-12px_rgb(0_0_0/0.18)]"
    >
      <div className="relative w-28 shrink-0 overflow-hidden border-r border-border/60 bg-secondary sm:aspect-[16/9] sm:w-auto sm:border-b sm:border-r-0">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 112px"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <p className="absolute inset-0 hidden items-end p-5 font-serif sm:flex text-[22px] italic leading-snug text-muted-foreground">
            <span className="line-clamp-3">{summary}</span>
          </p>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="text-pretty text-[15.5px] font-medium leading-snug">
          {title}
        </h3>
        <p className="mt-auto flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span aria-hidden> · </span>
            {post.readingTime} min
          </span>
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.75}
            className="size-4 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </p>
      </div>
    </Link>
  );
}

function groupByYear(posts: BlogPost[]) {
  const groups = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const year = post.metadata.publishedAt.slice(0, 4);
    const list = groups.get(year);
    if (list) list.push(post);
    else groups.set(year, [post]);
  }
  return [...groups.entries()];
}

/** Every post, grouped by year, as compact rows. */
export function PostArchive({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="space-y-14 sm:space-y-16">
      {groupByYear(posts).map(([year, yearPosts]) => (
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
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground md:mt-3 md:block">
                {yearPosts.length} {yearPosts.length === 1 ? "POST" : "POSTS"}
              </span>
            </h3>
          </div>
          <ul className="border-t border-border/70">
            {yearPosts.map((post) => (
              <li key={post.slug} className="border-b border-border/70">
                <Link
                  href={postHref(post.slug)}
                  className="group relative grid grid-cols-[3.75rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto]"
                >
                  <span
                    aria-hidden
                    className="absolute -left-3.5 top-[1.45rem] size-1.5 scale-0 rounded-full bg-accent transition-transform duration-200 group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none"
                  />
                  <time
                    dateTime={post.metadata.publishedAt}
                    className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted-foreground tabular-nums"
                  >
                    {formatDate(post.metadata.publishedAt, {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-pretty text-[15.5px] font-medium leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
                    {post.metadata.title}
                  </span>
                  <span className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:flex">
                    {post.readingTime} min
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.75}
                      className="size-4 opacity-40 transition-[transform,opacity,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
