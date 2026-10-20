/**
 * Posts published on Medium (https://medium.com/@adhishthite). They live
 * off-site, so they're listed here by hand rather than read from content/.
 * Source of truth for titles/dates/summaries: the Medium RSS feed at
 * https://medium.com/feed/@adhishthite. Add new posts at the top.
 */
export interface MediumPost {
  title: string;
  /** YYYY-MM-DD */
  publishedAt: string;
  url: string;
  summary: string;
}

export const MEDIUM_PROFILE_URL = "https://medium.com/@adhishthite";

export const MEDIUM_POSTS: readonly MediumPost[] = [
  {
    title:
      "Jev, Clef and Perplexity compared: the cheapest token did not produce the cheapest request",
    publishedAt: "2026-10-02",
    url: "https://adhishthite.medium.com/jev-clef-and-perplexity-compared-the-cheapest-token-did-not-produce-the-cheapest-request-fa61a4f47374",
    summary:
      "What the new wave of decision models changes about classification, and what my API tests actually showed.",
  },
  {
    title:
      "Laya vs. Jev: Benchmarking System 1 Decision Models With and Without Web Grounding",
    publishedAt: "2026-10-02",
    url: "https://adhishthite.medium.com/laya-vs-jev-benchmarking-system-1-decision-models-with-and-without-web-grounding-c63da5fcc12b",
    summary:
      "An empirical comparison of open-weight models on Google Cloud versus commercial SaaS APIs.",
  },
  {
    title: "Jev: Fast Thinking for Software",
    publishedAt: "2026-09-17",
    url: "https://adhishthite.medium.com/jev-fast-thinking-for-software-156334d60023",
    summary:
      "An empirical evaluation of TypeSafe's Jev, RLCD post-training, and why 99% of AI workloads don't need text generation.",
  },
  {
    title:
      "ChatGPT Mini: A Lightweight CLI for ChatGPT That's Wallet-Friendly and Privacy-Centric!",
    publishedAt: "2023-04-14",
    url: "https://adhishthite.medium.com/chatgpt-mini-a-lightweight-cli-for-chatgpt-thats-wallet-friendly-and-privacy-centric-538f364feb63",
    summary:
      "A lightweight, cost-effective, and privacy-focused alternative to ChatGPT Plus, run from the command line.",
  },
];

/**
 * One row in the writing timeline: a local post (internal link, has a reading
 * time) or a Medium post (external link).
 */
export interface WritingItem {
  kind: "local" | "medium";
  /** Stable React key */
  key: string;
  title: string;
  /** YYYY-MM-DD */
  publishedAt: string;
  href: string;
  summary?: string;
  readingTime?: number;
}

interface LocalPostLike {
  slug: string;
  readingTime: number;
  metadata: { title: string; publishedAt: string; summary?: string };
}

/**
 * Merge local posts with MEDIUM_POSTS into one newest-first list. Takes the
 * local posts as an argument so this file stays free of fs imports.
 */
export function buildWritingTimeline(
  localPosts: readonly LocalPostLike[],
): WritingItem[] {
  const local: WritingItem[] = localPosts.map((post) => ({
    kind: "local",
    key: `local:${post.slug}`,
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    href: `/blog/${post.slug}/`,
    summary: post.metadata.summary,
    readingTime: post.readingTime,
  }));
  const medium: WritingItem[] = MEDIUM_POSTS.map((post) => ({
    kind: "medium",
    key: `medium:${post.url}`,
    title: post.title,
    publishedAt: post.publishedAt,
    href: post.url,
    summary: post.summary,
  }));
  return [...local, ...medium].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}
