import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { unified } from "unified";

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

export async function getPost(slug: string) {
  const filePath = path.join("content", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);

  // Only convert to HTML for backward compatibility
  const htmlContent = await markdownToHTML(rawContent);

  return {
    source: htmlContent,
    rawContent, // Raw MDX content for direct rendering with MDXRemote
    metadata,
    slug,
  };
}

async function getAllPosts(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return Promise.all(
    mdxFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const { metadata, source, rawContent } = await getPost(slug);
      return {
        metadata,
        slug,
        source,
        rawContent,
      };
    }),
  );
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}
