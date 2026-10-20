import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";

function toDate(publishedAt: string): Date {
  return new Date(
    publishedAt.includes("T") ? publishedAt : `${publishedAt}T00:00:00Z`,
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const latest = posts[0] ? toDate(posts[0].metadata.publishedAt) : new Date();

  return [
    {
      url: `${DATA.url}/`,
      lastModified: latest,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${DATA.url}/blog/`,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${DATA.url}/blog/${post.slug}/`,
      lastModified: toDate(post.metadata.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
