# Repository Guidelines

## Project Structure & Module Organization

- `src/app`: Next.js App Router (routes, `layout.tsx`, `page.tsx`, global CSS).
- `src/components`: Reusable React components (UI, magicui, mdx).
- `src/components/ui`: Reusable Shadcn/UI components.
- `src/components/magic-ui`: Reusable Magic UI components.
- `src/lib`: Utilities (e.g., `utils.ts`).
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
- Content pipeline: MDX in `content/` rendered via `next-mdx-remote`, `remark/rehype`, and `rehype-pretty-code` with Shiki highlighting.
- UI & Theming: TailwindCSS + shadcn/ui + magic-ui components, dark mode via `next-themes` (`ThemeProvider` under `src/components`).
- Data model: Structured data in `src/data/*` feeds components/pages; shared helpers in `src/lib`.
- Deployment: Built output served by Vercel.
- Code Quality: Uses Biome for linting and formatting (replaced ESLint); accessible via Makefile commands.
