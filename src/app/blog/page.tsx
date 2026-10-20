import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import { PinnedPostCard, PostArchive } from "@/components/blog/post-index";
import { getBlogPosts, getPinnedPosts } from "@/data/blog";
import { buildWritingTimeline, MEDIUM_PROFILE_URL } from "@/data/medium";
import { siteOgImage } from "@/lib/og";

const title = "Writing";
const description =
  "Adhish Thite's notes from building with LLMs and agents, write-ups of his side projects, and a few setup guides.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/" },
  openGraph: {
    title,
    description,
    url: "/blog/",
    type: "website",
    images: [{ url: siteOgImage(), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [siteOgImage()],
  },
};

export default async function BlogIndexPage() {
  const [posts, pinned] = await Promise.all([getBlogPosts(), getPinnedPosts()]);
  const items = buildWritingTimeline(posts);
  const mediumCount = items.filter((item) => item.kind === "medium").length;
  const firstYear = items.at(-1)?.publishedAt.slice(0, 4);

  return (
    <main className="container-page pb-12 pt-16 sm:pb-16 sm:pt-24">
      <header className="max-w-2xl animate-rise">
        <p className="eyebrow">
          {items.length} {items.length === 1 ? "post" : "posts"}
          {mediumCount > 0 ? ` · ${mediumCount} on Medium` : ""}
          {firstYear ? ` · since ${firstYear}` : ""}
        </p>
        <h1 className="mt-5 font-serif text-6xl leading-[1.02] tracking-tight sm:text-7xl">
          Writing
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Notes from building with LLMs and agents, write-ups of my side
          projects, and a few setup guides.
        </p>
        <a
          href={MEDIUM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 inline-flex min-h-10 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Also on Medium
          <ArrowUpRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </header>

      {pinned.length > 0 && (
        <section
          aria-labelledby="pinned-heading"
          className="mt-16 animate-rise sm:mt-20"
          style={{ animationDelay: "80ms" }}
        >
          <h2 id="pinned-heading" className="eyebrow mb-5">
            Pinned
          </h2>
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {pinned.map((post, index) => (
              <PinnedPostCard
                key={post.slug}
                post={post}
                priority={index < 3}
              />
            ))}
          </div>
        </section>
      )}

      <section
        aria-labelledby="archive-heading"
        className="mt-20 animate-rise sm:mt-24"
        style={{ animationDelay: "140ms" }}
      >
        <h2 id="archive-heading" className="eyebrow mb-8">
          All posts
        </h2>
        {items.length > 0 ? (
          <PostArchive items={items} />
        ) : (
          <p className="text-muted-foreground">Nothing published yet.</p>
        )}
      </section>
    </main>
  );
}
