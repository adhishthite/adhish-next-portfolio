import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import {
  AuthorCard,
  Avatar,
  PostNavigation,
} from "@/components/blog/post-footer";
import { ReadingProgress } from "@/components/blog/reading-progress";
import {
  TableOfContents,
  TableOfContentsDisclosure,
} from "@/components/blog/table-of-contents";
import { createMdxComponents } from "@/components/mdx-components";
import { getAdjacentPosts, getBlogPosts, getPost } from "@/data/blog";
import { CURRENT_ROLE, DATA } from "@/data/resume";
import { postOgImage } from "@/lib/og";
import { getLocalImageSize, rehypeImageSize } from "@/lib/rehype-image-size";
import { remarkMermaid } from "@/lib/remark-mermaid";
import { formatDate } from "@/lib/utils";
import "../article.css";

type Params = Promise<{ slug: string }>;

/** Only slugs from content/ exist; anything else is a static 404. */
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: { block: "plaintext" },
};

/**
 * rehype-raw rebuilds the tree and drops `node.data`, which is where the code
 * fence meta (```json title="x.json") lives. Copy it to a property first;
 * rehype-pretty-code reads `properties.metastring` as a fallback.
 */
function rehypePreserveCodeMeta() {
  type Node = {
    tagName?: string;
    data?: { meta?: string };
    properties?: Record<string, unknown>;
    children?: Node[];
  };
  const walk = (node: Node) => {
    if (node.tagName === "code" && node.data?.meta && node.properties) {
      node.properties.metastring = node.data.meta;
    }
    node.children?.forEach(walk);
  };
  return (tree: Node) => walk(tree);
}

type MdxOptions = NonNullable<MDXRemoteProps["options"]>["mdxOptions"];

const mdxOptions: MdxOptions = {
  remarkPlugins: [remarkMermaid, remarkGfm],
  rehypePlugins: [
    rehypePreserveCodeMeta,
    [
      rehypeRaw,
      {
        passThrough: [
          "mdxJsxFlowElement",
          "mdxJsxTextElement",
          "mdxFlowExpression",
          "mdxTextExpression",
        ],
      },
    ],
    rehypeSlug,
    rehypeImageSize,
    [rehypePrettyCode, prettyCodeOptions],
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };

  const { title, publishedAt, summary, image } = post.metadata;
  const url = `/blog/${slug}/`;
  const ogImage = image
    ? { url: image, ...getLocalImageSize(image), alt: title }
    : { url: postOgImage(slug), width: 1200, height: 630, alt: title };

  return {
    title,
    description: summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: summary,
      type: "article",
      url,
      publishedTime: publishedAt,
      authors: [DATA.url],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: summary,
      creator: "@xadhish",
      images: [ogImage.url],
    },
  };
}

/** Hero frame: natural aspect ratio, narrowed so it never exceeds MAX_HERO_HEIGHT. */
const HERO_WIDTH = 600;
const MAX_HERO_HEIGHT = 520;

function HeroImage({ src, alt }: { src: string; alt: string }) {
  const size = getLocalImageSize(src);
  if (!size) return null;
  const display = Math.round(
    Math.min(HERO_WIDTH, (MAX_HERO_HEIGHT * size.width) / size.height),
  );
  return (
    <div className="mt-10 sm:mt-12">
      <Image
        src={src}
        alt={alt}
        width={size.width}
        height={size.height}
        priority
        sizes={`(min-width: 768px) ${display}px, 100vw`}
        style={{ maxWidth: display }}
        className="mx-auto h-auto w-full rounded-xl border border-border/60 bg-secondary"
      />
    </div>
  );
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { newer, older } = await getAdjacentPosts(slug);
  const { title, publishedAt, summary, image } = post.metadata;
  // Skip the hero when the post body already shows the same image.
  const showHero = Boolean(image) && !post.content.includes(image as string);
  const hasToc = post.headings.length >= 2;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: publishedAt,
    dateModified: publishedAt,
    description: summary,
    image: `${DATA.url}${image ?? postOgImage(slug)}`,
    url: `${DATA.url}/blog/${slug}/`,
    mainEntityOfPage: `${DATA.url}/blog/${slug}/`,
    author: { "@type": "Person", name: DATA.name, url: DATA.url },
  };

  return (
    <main className="container-page pb-12 pt-10 sm:pb-16 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress targetId="post-body" />

      <article className="post-grid">
        <header className="post-main animate-rise">
          <Link
            href="/blog/"
            className="group -ml-1 inline-flex min-h-10 items-center gap-1.5 px-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              aria-hidden
              strokeWidth={1.75}
              className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            All writing
          </Link>

          <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground sm:mt-10">
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span aria-hidden className="mx-2">
              ·
            </span>
            {post.readingTime} min read
          </p>

          <h1 className="mt-4 text-balance font-serif text-[2.6rem] leading-[1.05] tracking-tight sm:text-[3.5rem] sm:leading-[1.02]">
            {title}
          </h1>

          {summary && (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
              {summary}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3 border-t border-border/60 pt-6">
            <Avatar className="size-8" />
            <p className="text-sm leading-tight">
              <span className="font-medium">{DATA.name}</span>
              <span className="block text-[13px] text-muted-foreground">
                {CURRENT_ROLE.title}, {CURRENT_ROLE.company}
              </span>
            </p>
          </div>

          {showHero && <HeroImage src={image as string} alt={title} />}

          {post.headings.length >= 4 && (
            <div className="mt-10 xl:hidden">
              <TableOfContentsDisclosure headings={post.headings} />
            </div>
          )}
        </header>

        {hasToc && (
          <aside className="post-rail hidden xl:block">
            <div className="sticky top-28 max-h-[calc(100dvh-9rem)] overflow-y-auto pb-6">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        )}

        <div
          id="post-body"
          className="post-main article prose mt-12 max-w-none sm:mt-14"
        >
          <MDXRemote
            source={post.content}
            components={createMdxComponents({ leadImage: image })}
            options={{ mdxOptions }}
          />
        </div>

        <footer className="post-main mt-16 space-y-4 sm:mt-20">
          <AuthorCard />
          <PostNavigation newer={newer} older={older} />
        </footer>
      </article>
    </main>
  );
}
