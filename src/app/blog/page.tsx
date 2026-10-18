import type { Metadata } from "next";
import { PinnedPostCard, PostArchive } from "@/components/blog/post-index";
import { getBlogPosts, getPinnedPosts } from "@/data/blog";
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
  const firstYear = posts.at(-1)?.metadata.publishedAt.slice(0, 4);

  return (
    <main className="container-page pb-12 pt-16 sm:pb-16 sm:pt-24">
      <header className="max-w-2xl animate-rise">
        <p className="eyebrow">
          {posts.length} posts{firstYear ? ` · since ${firstYear}` : ""}
        </p>
        <h1 className="mt-5 font-serif text-6xl leading-[1.02] tracking-tight sm:text-7xl">
          Writing
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Notes from building with LLMs and agents, write-ups of my side
          projects, and a few setup guides.
        </p>
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
        {posts.length > 0 ? (
          <PostArchive posts={posts} />
        ) : (
          <p className="text-muted-foreground">Nothing published yet.</p>
        )}
      </section>
    </main>
  );
}
