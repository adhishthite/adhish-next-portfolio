# Repository Guidelines

## Project Structure & Module Organization

- `src/app`: Next.js App Router (routes, `layout.tsx`, `page.tsx`, global CSS).
- `src/components`: Shared components (site header/footer, MDX renderers, mermaid, theme toggle).
- `src/components/home`: Homepage sections. `src/components/blog`: blog index/post pieces (TOC, reading progress, prev/next).
- `src/lib`: Utilities (`utils.ts`, `og.ts`, remark/rehype plugins).
- `src/data`: Typed content feeds (e.g., `blog.ts`, `resume.tsx`).
- `content`: MDX posts/articles.
- `public`: Static assets (images, icons).
- Config: `tailwind.config.ts`, `postcss.config.mjs`, `biome.json`, `next.config.mjs`, `Makefile`.

## Build, Test, and Development Commands

**IMPORTANT:** Always use the Makefile commands for consistency across all agents and developers.

- `make install` — Install dependencies.
- `make dev` — Start local dev server (Next.js).
- `make build` — Production build.
- `make lint` — Lint with Biome (includes autofix).
- `make format` — Format code with Biome.
- `make check` — Run format and lint checks without autofix.
- `make clean` — Clean build artifacts and dependencies (.next, node_modules, .turbo, out).

Alternative: Use pnpm directly (see `packageManager`):

- `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm biome lint --write .`, `pnpm biome format --write .`

## Coding Style & Naming Conventions

- Language: TypeScript + React (function components), Next.js App Router.
- Indent 2 spaces; use semicolons and double quotes.
- Components: PascalCase files (e.g., `ProjectCard.tsx`); hooks/utilities: camelCase.
- TailwindCSS for styling; keep class lists readable and cohesive by concern.
- Prefer colocating component-specific styles and keeping logic in `src/lib` when shared.
- Run `make check` before pushing to verify formatting and linting.

## Testing Guidelines

- No formal test suite present. If adding tests, prefer:
  - Unit: Vitest + React Testing Library.
  - E2E: Playwright for basic route and MDX rendering checks.
- Place tests next to sources: `component.test.tsx`; name with `.test.` suffix.
- Aim for smoke coverage on pages and critical components.

## Commit & Pull Request Guidelines

- Commit style: Conventional where possible (`feat:`, `fix:`, `chore:`). Keep messages imperative and scoped.
- PRs should include:
  - Summary, screenshots/GIFs for UI changes, and steps to verify.
  - Linked issue (if applicable) and notes on accessibility/SEO impacts.
  - Checklist: `make check` passes; builds locally via `make build`.

## Security & Configuration Tips

- Environment variables: configure via platform secrets; avoid committing `.env`.
- Deployment: Vercel. Typical settings — Build: `make build` or `pnpm build`; Node 18+.
- Content safety: sanitize or trust-only MDX sources; keep dependencies updated.

## Architecture Overview

- Routing: Next.js App Router in `src/app` with server components by default; client components opt-in via `"use client"`.
- Content pipeline: MDX in `content/` rendered via `next-mdx-remote`, `remark-gfm`, `rehype-slug` (heading ids for the table of contents), a local image-size rehype plugin (markdown images go through `next/image`), and `rehype-pretty-code` with Shiki dual themes. Supports Mermaid diagrams via `src/components/mermaid.tsx` (theme-aware).
- UI & Theming: TailwindCSS (shadcn `components.json` is kept so `shadcn add` still works). Design tokens (paper/ink neutrals + one vermilion accent) live in `src/app/globals.css`; fonts are Instrument Serif (display), Geist (body) and Geist Mono (meta) via `next/font`. Dark mode via `next-themes` (class-based, follows system by default). Motion is CSS-only and respects `prefers-reduced-motion`; avoid adding animation libraries or effects that render content with `opacity: 0` on the server.
- Data model: Structured data in `src/data/*` feeds components/pages; shared helpers in `src/lib`. `src/data/blog.ts` returns posts with `content`, `readingTime` and `headings`; `BlogMetadata` supports pinned posts (`pinned`, `pinnedOrder`) and OG images (`image` for social sharing).
- SEO: `src/app/sitemap.ts`, `robots.ts`, `rss.xml/route.ts`, and generated Open Graph cards under `src/app/og/` (site card + one per post, used when a post has no `image`).
- Deployment: Built output served by Vercel.
- Code Quality: Uses Biome for linting and formatting (replaced ESLint); accessible via Makefile commands.

## Blog Post Guidelines

MDX files in `content/` use frontmatter for metadata. Required and optional fields:

```yaml
---
title: "Post Title"           # Required
publishedAt: "YYYY-MM-DD"     # Required
summary: "Brief description"  # Required (used for OG description)
image: "/blog/slug/image.png" # Optional: OG image for social sharing (falls back to a generated title card)
pinned: true                  # Optional: Feature in pinned section
pinnedOrder: 1                # Optional: Priority (1-3, lower = higher)
---
```

- Store blog images in `public/blog/<slug>/` directory
- For OG images, prefer 1200×630px (1.91:1 ratio) for best social media display

## Writing Voice

Blog posts must read like a human wrote them, not a model. Drafts (often from Codex/Claude) carry recognizable AI-writing tells; strip them before publishing. The signature tell is **rhythm and shape**, not vocabulary.

**Cut these patterns:**

- **The "X. Not Y." cadence** — assert-then-correct / balanced antithesis: "I wanted a glance, not a relationship.", "Not the files. The architecture.", "Technically working. Practically useless.", "It's not X. It's Y." This is the #1 tell. Rewrite as plain prose; keep at most one or two of the best per post.
- **Section-ending "bows"** — a tidy aphorism that "lands a point" at the close of nearly every section ("That's the whole point.", "earned its keep"). Let sections end on substance, or just stop.
- **Clichés / meta-signposting** — "earned its keep", "paid off", "the best part is", "turns out", "the magic is", "here's the thing", "that's exactly the kind of X I love", "there's something poetic about".
- **Forced keyword motifs** repeated to feel thematic (e.g. leaning on "boring" or "just works").
- **Staccato fragment stacks** used for drama ("Three tables. That's the whole backend.", "Done.").
- **Marketing fluff** (mainly older tutorial/launch posts) — "powerful capabilities", "seamlessly", "unleash", reader-flattery ("Whether you're a seasoned dev or a curious newcomer"), exclamatory cheer ("Happy syncing!").

**Keep / prefer:**

- **Descriptive "no X, no Y, no Z" lists** are fine — listing what something *lacks* reads human. It's the rhetorical *reversal* ("…, not Y") that's the tell, not negation itself.
- **Varied** sentence and paragraph length — real writing isn't a metronome.
- **Real lived specifics** — exact hardware, timings, actual error messages, dead-ends, parenthetical asides, an honest "what I'd still change." This is what actually makes copy feel human.

**Hard rule:** never invent facts, numbers, names, or quotes to sound more human — use real detail or leave it out. When editing existing copy, preserve all code, frontmatter, links, and facts unchanged.

See `.agents/skills/humanize-blog-copy/` for the editing + verification workflow, and `.agents/skills/new-blog-post/` for scaffolding new posts.
