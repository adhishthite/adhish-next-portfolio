import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXImage, MDXLink, MDXParagraph } from "@/components/mdx-components";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = await getPost(slug);

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  // Use the client components for MDX rendering
  const components = {
    Image: MDXImage,
    a: MDXLink,
    p: MDXParagraph,
  };

  // Calculate reading time
  const words = post.rawContent.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  return (
    <>
      <ScrollProgress className="top-0" />

      <section id="blog" className="relative">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${DATA.url}${post.metadata.image}`
                : `${DATA.url}/og?title=${post.metadata.title}`,
              url: `${DATA.url}/blog/${post.slug}`,
              author: {
                "@type": "Person",
                name: DATA.name,
              },
            }),
          }}
        />

        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <InteractiveHoverButton className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </InteractiveHoverButton>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              {formatDate(post.metadata.publishedAt)}
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight leading-tight">
              {post.metadata.title}
            </h1>

            {post.metadata.summary && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {post.metadata.summary}
              </p>
            )}
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border/40">
            <span>{readingTime} min read</span>
            <span>•</span>
            <span>By {DATA.name}</span>
          </div>
        </header>

        {/* Article Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
          prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:leading-relaxed prose-p:text-foreground/90
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-accent prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-muted/30 prose-pre:border prose-pre:border-border/40
          prose-img:rounded-lg prose-img:shadow-lg
          prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic
          prose-li:marker:text-muted-foreground
        "
        >
          <MDXRemote source={post.rawContent} components={components} />
        </article>

        {/* Back to Blog - Footer */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <Link href="/blog">
            <InteractiveHoverButton className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </InteractiveHoverButton>
          </Link>
        </div>
      </section>
    </>
  );
}
