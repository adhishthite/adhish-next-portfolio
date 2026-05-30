---
name: update-resume
description: >-
  Use when adding, editing, or removing anything on the portfolio résumé/profile —
  a new job, a promotion, a title or location change, end-dating a role you left,
  a certification, an award, or an ambassador/community role. It all lives in
  src/data/resume.tsx. Trigger whenever the user says "I started a new job",
  "add my new role at X", "update my experience", "I got promoted", "I left
  Company Y", "add this certification", "add X to my resume/CV/website", or
  similar — even if they don't name the file.
---

# Update Résumé

All profile/résumé content is structured data in **`src/data/resume.tsx`** (the `DATA` object). Editing it is a data change, not a UI change — the page reads from it.

## What actually renders

The homepage (`src/app/page.tsx`) renders only these sections: **hero** (name, avatar, `summary`, `location`, `contact`), **Work Experience** (`DATA.work`), **Skills** (marquee of `DATA.skills`), **Certifications** (`DATA.certificates`), and **Contact**.

`DATA.education`, `DATA.projects`, and `DATA.hackathons` exist in the file but are **not rendered** (legacy). Don't put new content there expecting it to show up.

## `work` entry schema

The `work` array is **ordered newest-first by start date**. Each entry:

```ts
{
  company: "Google",
  href: "https://google.com",          // company site or LinkedIn
  badges: [],                          // e.g. ["Internship"], ["Ambassador"]
  location: "Mumbai, India",           // or "Remote"
  title: "Sr. Solutions Architect, AI",
  logoUrl: "/google.svg",              // local file in public/ (see Logos)
  start: "Jun 2026",                   // "Mon YYYY"
  end: "Present",                      // "Present" for current, else "Mon YYYY"
  summary: "One-line role scope.",
  description:
    "• First point.\n• Second point.\n• Third point.",  // bullets use "• " + "\n"
}
```

**Job switch:** when someone starts a new job, add the new entry at the top with `end: "Present"`, and change the *previous* current role's `end` from `"Present"` to the month they left (e.g. `"May 2026"`). Don't leave two `"Present"` jobs unless roles genuinely overlap.

## `certificates` entry schema

```ts
{ name: "...", issuer: "...", date: "Issued Mon YYYY", url: "...", iconUrl: "..." }
```

There is **no description field** on certificates — only name/issuer/date/link/icon. If the thing has substance worth describing (bullets), it does not belong here.

## Where to place a new item

- **Full-time job / role** → `work` entry.
- **Plain credential** (course, exam, badge with no narrative) → `certificates` entry.
- **Ambassador / advisor / community role with real activity to describe** → `work` entry with a `badge` (e.g. `["Ambassador"]`). Certificates can't hold the bullets, so use `work` even though it's not a 9-to-5. The badge keeps it visually distinct in the timeline.
- If community/recognition items start to pile up, that's the signal to build a dedicated section (new `DATA` key + component in `page.tsx`) rather than stretching `certificates`.

## Logos

- Live as local files in `public/` (e.g. `/elastic.svg`, `/google.svg`). Reference them via `logoUrl` (work) or `iconUrl` (certs, which also accept remote URLs).
- Rendered through an `Avatar`/`AvatarImage` (a plain `<img>`), with a **letter fallback** (`company[0]`) if the file is missing — so a wrong path degrades gracefully rather than breaking.
- **Prefer square, dual-theme-visible SVGs.** A wide wordmark gets squished in the circular avatar; a black-only mark vanishes in dark mode.
- **Sourcing** (verified in this sandbox): `upload.wikimedia.org` works well for full-color brand SVGs. `cdn.simpleicons.org` is blocked, but the same icons are reachable via `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg` or `unpkg.com`. Simple-icons marks are monochrome — tint them so they read on both themes, e.g. `sed 's/<svg /<svg fill="#10A37F" /'`. Always validate the download is real SVG (`head -c 60 file.svg | grep -qi '<svg'`).

## Voice & honesty

- Write copy in the author's plain voice — follow `AGENTS.md` → "Writing Voice" (no "X. Not Y." cadence, no section-bows, no clichés). The `humanize-blog-copy` skill has the full rule set.
- **Invent nothing.** Never fabricate accomplishments, metrics, or dates. For a role the user **hasn't started yet**, write *role scope* in present tense ("Working with enterprise teams to…"), not claimed wins. Ask the user for real bullets rather than making them up.

## Workflow

1. Confirm the human-specific facts (title, location, dates, bullets) — don't guess them.
2. Edit `src/data/resume.tsx`; add any logo to `public/`.
3. **Verify it builds:** `make build` (catches TypeScript errors in the data and missing pieces).
4. Optional live check: the dev server is `make dev` (background). Smoke-test with `curl -s localhost:3000 | grep "<new title>"` to confirm it renders.
5. Show the user the exact copy you wrote for sign-off (especially for not-yet-started roles), then commit + push if they want it live.
