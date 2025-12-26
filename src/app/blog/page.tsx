import { TextAnimate } from "@/components/ui/text-animate";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, AI/ML, and engineering.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const sortedPosts = posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  // Calculate reading time (rough estimate: 200 words per minute)
  const getReadingTime = (rawContent: string) => {
    const words = rawContent.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"4 2"}
          className="fill-neutral-200/5 stroke-neutral-200/20 dark:fill-neutral-800/5 dark:stroke-neutral-800/20"
          x={-1}
          y={-1}
        />
      </div>

      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Blog
          </p>
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-4xl md:text-5xl font-heading font-bold tracking-tight"
          >
            Thoughts & Insights
          </TextAnimate>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Writings on software development, AI/ML, and engineering best
            practices.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedPosts.map((post, idx) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <MagicCard
                className={`p-8 h-full transition-all duration-300 rounded-2xl border border-border/40 hover:border-accent/50 ${
                  idx === 0 ? "md:col-span-2" : ""
                }`}
                gradientColor="#3b82f6"
                gradientColorDark="#ffffff"
                gradientOpacity={0.15}
              >
                <div className="space-y-4">
                  {/* Date */}
                  <time className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    {new Date(post.metadata.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </time>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight group-hover:text-accent transition-colors">
                    {post.metadata.title}
                  </h2>

                  {/* Summary */}
                  {post.metadata.summary && (
                    <p className="text-muted-foreground leading-relaxed line-clamp-2">
                      {post.metadata.summary}
                    </p>
                  )}

                  {/* Reading Time & Arrow */}
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm text-muted-foreground">
                      {getReadingTime(post.rawContent)}
                    </span>
                    <span className="text-accent group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </div>
                {idx === 0 && <BorderBeam size={250} duration={12} delay={9} />}
              </MagicCard>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {sortedPosts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
