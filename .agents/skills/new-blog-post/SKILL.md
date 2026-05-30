---
name: new-blog-post
description: >-
  Use when creating, scaffolding, drafting, or starting a new blog post or
  article for this portfolio (content/*.mdx). Sets up correct frontmatter, the
  public/blog/<slug>/ image directory, OG image sizing, the content-pipeline
  conventions (GFM, Shiki highlighting, Mermaid), and applies the human writing
  voice from the first draft. Trigger whenever the user says "new post", "write a
  blog about", "add an article", "draft a post", "start a writeup", or similar —
  even if they don't mention frontmatter or files.
---

# New Blog Post

## Conventions (from AGENTS.md)

- Posts are MDX files at `content/<slug>.mdx`. The **slug is the filename** (no `.mdx`), and it's also the URL path.
- Images live in `public/blog/<slug>/` and are referenced as `/blog/<slug>/<file>`.
- **OG image:** 1200×630px (1.91:1). Set it in frontmatter `image`; it falls back to the avatar if omitted.

## Frontmatter

```yaml
---
title: "Post Title"            # required
publishedAt: "YYYY-MM-DD"      # required (real/intended publish date)
summary: "Brief description"   # required — also the OG/social description
image: "/blog/<slug>/og.png"   # optional OG image (1200×630)
pinned: true                   # optional — feature in the pinned section
pinnedOrder: 1                 # optional — 1–3, lower = higher priority
---
```

The `summary` shows on listing cards and in social previews, so it has to read human too — no "Turns out…", no "it just works."

## Content pipeline (what you can use)

- GitHub-Flavored Markdown (`remark-gfm`): tables, task lists, strikethrough.
- Fenced code blocks with a language get Shiki highlighting (```` ```swift ````, ```` ```bash ````, etc.).
- Mermaid diagrams render via the theme-aware `mermaid` component — use a ```` ```mermaid ```` block.
- Inline JSX and `<a>` links are fine; keep attributes valid so the MDX compiles.

## Write it human from the start

Draft in the author's plain voice — do **not** produce the AI patterns the editor would just have to strip out afterward. In particular, avoid the "X. Not Y." cadence, section-ending aphorisms, and clichés. See `AGENTS.md` → "Writing Voice" and the `humanize-blog-copy` skill for the full rule set.

**Invent nothing.** Don't fabricate metrics, timings, or quotes to fill a narrative. Where real lived detail would carry the post (the actual hardware, the real bug, what you'd still change), ask the author for it rather than making it up.

## Starter template

```mdx
---
title: "<title>"
publishedAt: "<YYYY-MM-DD>"
summary: "<one honest sentence — no slop>"
image: "/blog/<slug>/og.png"
---

# <title>

<Open with the real reason this exists — a concrete problem or moment, in plain prose.>

## <section>

<Body. Real specifics. Vary the rhythm. Let sections end on substance, not a bow.>
```

## After drafting

- Create `public/blog/<slug>/` for images if the post has any.
- Run `make build` to confirm the MDX compiles (a stray `<` or `{` can break MDX rendering).
- Consider a final pass with the `humanize-blog-copy` skill before publishing.
