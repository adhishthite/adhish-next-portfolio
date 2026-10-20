import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

/**
 * A quiet pointer to the blog, kept deliberately small: the homepage is about
 * work, and the blog lives on its own at /blog/.
 */
export async function Writing() {
  const posts = (await getBlogPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <aside aria-labelledby="writing-teaser-title" className="container-page">
      <div className="flex flex-col gap-5 rounded-xl border border-border/70 bg-card/60 p-5 sm:p-6 md:flex-row md:items-start md:gap-10">
        <div className="flex shrink-0 items-center justify-between gap-6 md:w-44 md:flex-col md:items-start md:gap-3">
          <h2 id="writing-teaser-title" className="eyebrow">
            From the blog
          </h2>
          <Link
            href="/blog/"
            className="group -my-2.5 inline-flex min-h-10 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All posts
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        </div>

        <ul className="min-w-0 flex-1 divide-y divide-border/60 [&>li:first-child>a]:pt-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group flex min-h-10 items-baseline justify-between gap-4 py-2.5"
              >
                <span className="line-clamp-2 text-[15px] sm:line-clamp-1 text-foreground/90 decoration-accent/50 underline-offset-[5px] group-hover:underline">
                  {post.metadata.title}
                </span>
                <time
                  dateTime={post.metadata.publishedAt}
                  className="hidden shrink-0 font-mono text-xs tabular-nums text-muted-foreground sm:block"
                >
                  {formatDate(post.metadata.publishedAt, {
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
