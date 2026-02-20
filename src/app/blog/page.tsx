import { TextAnimate } from "@/components/ui/text-animate";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { getPinnedPosts, getRegularPosts, type BlogPost } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";
import { GridPattern } from "@/components/ui/grid-pattern";
import { PinIcon } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, AI/ML, and engineering.",
};

export default async function BlogPage() {
  const [pinnedPosts, regularPosts] = await Promise.all([
    getPinnedPosts(),
    getRegularPosts(),
  ]);

  // Calculate reading time (rough estimate: 200 words per minute)
  const getReadingTime = (rawContent: string) => {
    const words = rawContent.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Reusable blog card renderer
  const renderBlogCard = (
    post: BlogPost,
    options: { featured?: boolean; compact?: boolean } = {},
  ) => {
    const hasImage = !!post.metadata.image;
    const contentPaddingClass = options.compact ? "p-5" : "p-8";

    return (
      <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
        <MagicCard
          className={`h-full transition-all duration-300 rounded-2xl border border-border/40 hover:border-accent/50 overflow-hidden ${
            options.featured ? "md:col-span-2" : ""
          } ${hasImage ? "" : `${contentPaddingClass} flex flex-col justify-center`}`}
          gradientColor="#5B122D"
          gradientColorDark="#d4a5a5"
          gradientOpacity={0.15}
        >
          {/* Thumbnail image */}
          {hasImage && (
            <div className="relative w-full aspect-[5/2]">
              <Image
                src={post.metadata.image as string}
                alt={post.metadata.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
          )}

          <div
            className={`${hasImage ? contentPaddingClass : ""} ${options.compact ? "space-y-2" : "space-y-4"}`}
          >
            {/* Date & Pin indicator */}
            <div className="flex items-center justify-between">
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
              {options.compact && (
                <span className="flex items-center gap-1 text-xs text-accent font-medium">
                  <PinIcon className="size-3 fill-accent" />
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className={`font-heading font-bold tracking-tight group-hover:text-accent transition-colors ${
                options.compact
                  ? "text-lg md:text-xl line-clamp-2"
                  : "text-2xl md:text-3xl"
              }`}
            >
              {post.metadata.title}
            </h2>

            {/* Summary - hidden on compact */}
            {!options.compact && post.metadata.summary && (
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                {post.metadata.summary}
              </p>
            )}

            {/* Reading Time & Arrow */}
            <div
              className={`flex items-center justify-between ${options.compact ? "pt-2" : "pt-4"}`}
            >
              <span className="text-sm text-muted-foreground">
                {getReadingTime(post.rawContent)}
              </span>
              <span className="text-accent group-hover:translate-x-2 transition-transform">
                →
              </span>
            </div>
          </div>
          {options.featured && (
            <BorderBeam size={250} duration={12} delay={9} />
          )}
        </MagicCard>
      </Link>
    );
  };

  return (
    <div className="max-w-5xl mx-auto py-12 sm:py-24 px-6">
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

          {/* Pinned Posts Section */}
          {pinnedPosts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PinIcon className="size-4 text-accent fill-accent" />
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                  Pinned
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pinnedPosts.map((post) =>
                  renderBlogCard(post, { compact: true }),
                )}
              </div>
            </div>
          )}

          {/* Regular Posts Section */}
          {regularPosts.length > 0 && (
            <div className="space-y-6">
              {pinnedPosts.length > 0 && (
                <h2 className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                  All Posts
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularPosts.map((post, idx) =>
                  renderBlogCard(post, {
                    featured: idx === 0 && pinnedPosts.length === 0,
                  }),
                )}
              </div>
            </div>
          )}

          {/* Empty State */}
          {pinnedPosts.length === 0 && regularPosts.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
