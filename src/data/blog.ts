import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { cache } from "react";

export interface BlogMetadata {
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
  pinned?: boolean;
  pinnedOrder?: number; // 1, 2, or 3 - lower number = higher priority
}

export interface BlogHeading {
  depth: 2 | 3;
  text: string;
  /** Matches the id rehype-slug assigns to the rendered heading */
  id: string;
}

export interface BlogPost {
  metadata: BlogMetadata;
  slug: string;
  /** MDX body, with a leading `# Title` removed (the page renders the title) */
  content: string;
  readingTime: number;
  headings: BlogHeading[];
}

const CONTENT_DIR = path.join(process.cwd(), "content");
const MAX_PINNED_POSTS = 3;
const WORDS_PER_MINUTE = 230;

/** Drop the first non-empty line if it is an H1; most posts repeat the title there. */
function stripLeadingTitle(content: string): string {
  return content.replace(/^\s*#\s+[^\n]*\n/, "");
}

/** Split markdown into prose lines and fenced-code lines. */
function proseLines(content: string): string[] {
  const lines: string[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) lines.push(line);
  }
  return lines;
}

function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .trim();
}

/**
 * Collect h2/h3 headings for the table of contents. Every heading level is fed
 * through the slugger in document order so duplicate-suffixes line up with
 * rehype-slug.
 */
function extractHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  for (const line of proseLines(content)) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const depth = match[1].length;
    const text = plainText(match[2]);
    const id = slugger.slug(text);
    if (depth === 2 || depth === 3) headings.push({ depth, text, id });
  }
  return headings;
}

function readingTime(content: string): number {
  const words = proseLines(content).join(" ").split(/\s+/).filter(Boolean);
  return Math.max(1, Math.round(words.length / WORDS_PER_MINUTE));
}

function slugExists(slug: string): boolean {
  return (
    /^[a-z0-9-]+$/i.test(slug) &&
    fs.existsSync(path.join(CONTENT_DIR, `${slug}.mdx`))
  );
}

export const getPost = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!slugExists(slug)) return null;

  const source = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
  const { content: body, data } = matter(source);
  const content = stripLeadingTitle(body);

  return {
    metadata: data as BlogMetadata,
    slug,
    content,
    readingTime: readingTime(content),
    headings: extractHeadings(content),
  };
});

const byNewest = (a: BlogPost, b: BlogPost) =>
  new Date(b.metadata.publishedAt).getTime() -
  new Date(a.metadata.publishedAt).getTime();

/** All posts, newest first. */
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const slugs = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => path.extname(file) === ".mdx")
    .map((file) => path.basename(file, ".mdx"));

  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  return posts.filter((post): post is BlogPost => post !== null).sort(byNewest);
});

/**
 * Pinned posts (max 3), sorted by pinnedOrder ascending, then newest first.
 * Posts without pinnedOrder come after those with an explicit order.
 */
export async function getPinnedPosts(): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts
    .filter((post) => post.metadata.pinned === true)
    .sort((a, b) => {
      const orderA = a.metadata.pinnedOrder ?? 999;
      const orderB = b.metadata.pinnedOrder ?? 999;
      return orderA !== orderB ? orderA - orderB : byNewest(a, b);
    })
    .slice(0, MAX_PINNED_POSTS);
}

/** Neighbouring posts by date, for prev/next navigation. */
export async function getAdjacentPosts(
  slug: string,
): Promise<{ newer: BlogPost | null; older: BlogPost | null }> {
  const posts = await getBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return {
    newer: posts[index - 1] ?? null,
    older: posts[index + 1] ?? null,
  };
}
