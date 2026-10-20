import fs from "node:fs";
import path from "node:path";
import { getBlogPosts } from "@/data/blog";
import { CURRENT_ROLE, DATA } from "@/data/resume";

export const dynamic = "force-static";

const IMAGE_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC-822 date for a YYYY-MM-DD (or full ISO) string, pinned to UTC. */
function rfc822(date: string): string {
  return new Date(
    date.includes("T") ? date : `${date}T00:00:00Z`,
  ).toUTCString();
}

/** Byte size of a file under public/, needed for the RSS enclosure length. */
function publicFileSize(src: string): number | null {
  if (!src.startsWith("/")) return null;
  try {
    return fs.statSync(path.join(process.cwd(), "public", src)).size;
  } catch {
    return null;
  }
}

function imageType(src: string): string | null {
  const match = /\.[a-z0-9]+$/i.exec(src.split("?")[0]);
  return match ? (IMAGE_TYPES[match[0].toLowerCase()] ?? null) : null;
}

export async function GET() {
  const posts = await getBlogPosts();
  const siteUrl = DATA.url;
  const feedUrl = `${siteUrl}/rss.xml`;
  const lastBuildDate = posts[0]
    ? rfc822(posts[0].metadata.publishedAt)
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}/`;
      const { title, publishedAt, summary, image } = post.metadata;
      const lines = [
        "    <item>",
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${rfc822(publishedAt)}</pubDate>`,
        `      <dc:creator>${escapeXml(DATA.name)}</dc:creator>`,
      ];
      if (summary) {
        lines.push(`      <description>${escapeXml(summary)}</description>`);
      }
      const type = image ? imageType(image) : null;
      if (image && type) {
        const imageUrl = escapeXml(new URL(image, siteUrl).toString());
        const length = publicFileSize(image);
        if (length !== null) {
          lines.push(
            `      <enclosure url="${imageUrl}" length="${length}" type="${type}" />`,
          );
        }
        lines.push(
          `      <media:content url="${imageUrl}" medium="image" type="${type}" />`,
        );
      }
      lines.push("    </item>");
      return lines.join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(DATA.name)}</title>
    <link>${escapeXml(`${siteUrl}/blog/`)}</link>
    <description>${escapeXml(`Writing by ${DATA.name}, ${CURRENT_ROLE.title} at ${CURRENT_ROLE.company}, on agents, LLMs, and the tools he builds.`)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
