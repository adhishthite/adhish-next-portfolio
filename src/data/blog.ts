import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { unified } from "unified";

export interface BlogMetadata {
  title: string;
  publishedAt: string;
  summary?: string;
  image?: string;
  pinned?: boolean;
  pinnedOrder?: number; // 1, 2, or 3 - lower number = higher priority
}

export interface BlogPost {
  metadata: BlogMetadata;
  slug: string;
  source: string;
  rawContent: string;
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

// For plain HTML rendering
export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return p.toString();
}

export async function getPost(slug: string): Promise<BlogPost> {
  const filePath = path.join("content", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data } = matter(source);

  // Only convert to HTML for backward compatibility
  const htmlContent = await markdownToHTML(rawContent);

  return {
    source: htmlContent,
    rawContent, // Raw MDX content for direct rendering with MDXRemote
    metadata: data as BlogMetadata,
    slug,
  };
}

async function getAllPosts(dir: string): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      return getPost(slug);
    }),
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getAllPosts(path.join(process.cwd(), "content"));
}

const MAX_PINNED_POSTS = 3;

/**
 * Get pinned blog posts (max 3), sorted by pinnedOrder (ascending)
 * Posts without pinnedOrder come after those with explicit order
 */
export async function getPinnedPosts(): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();

  const pinnedPosts = allPosts
    .filter((post) => post.metadata.pinned === true)
    .sort((a, b) => {
      // Posts with pinnedOrder come first, sorted ascending
      const orderA = a.metadata.pinnedOrder ?? 999;
      const orderB = b.metadata.pinnedOrder ?? 999;
      if (orderA !== orderB) return orderA - orderB;

      // Fall back to date (newest first) if same order
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    })
    .slice(0, MAX_PINNED_POSTS);

  return pinnedPosts;
}

/**
 * Get all blog posts sorted by date (newest first)
 * Pinned posts are NOT excluded - they appear in both sections
 */
export async function getRegularPosts(): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();

  return allPosts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );
}
