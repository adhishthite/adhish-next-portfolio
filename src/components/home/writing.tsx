import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { SectionHeading, sectionClass } from "./section-heading";

export async function Writing() {
  const posts = (await getBlogPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="writing-title" className={sectionClass}>
      <SectionHeading
        id="writing-title"
        index="03"
        label="Writing"
        title="Recent posts"
        intro="Notes on agents, LLMs, and the small tools I build."
        action={{ href: "/blog/", label: "All writing" }}
      />

      <ul className="border-y border-border/60">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border-t border-border/60 first:border-t-0"
          >
            <Link
              href={`/blog/${post.slug}/`}
              className="group -mx-3 grid gap-x-6 gap-y-2 rounded-lg px-3 py-6 transition-colors hover:bg-secondary/50 sm:grid-cols-[9.5rem_1fr_auto] sm:items-baseline"
            >
              <time
                dateTime={post.metadata.publishedAt}
                className="font-mono text-xs tabular-nums text-muted-foreground"
              >
                {formatDate(post.metadata.publishedAt)}
              </time>
              <div className="min-w-0">
                <h3 className="text-base font-medium tracking-tight text-foreground sm:text-[17px]">
                  {post.metadata.title}
                </h3>
                {post.metadata.summary ? (
                  <p className="mt-1.5 line-clamp-2 max-w-[72ch] text-[15px] leading-relaxed text-muted-foreground md:line-clamp-1">
                    {post.metadata.summary}
                  </p>
                ) : null}
              </div>
              <span className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                {post.readingTime} min read
                <ArrowRight
                  aria-hidden
                  className="hidden size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground sm:block"
                  strokeWidth={1.75}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
