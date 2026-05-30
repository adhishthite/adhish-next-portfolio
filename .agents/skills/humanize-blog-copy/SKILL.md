---
name: humanize-blog-copy
description: >-
  Use when reviewing, editing, de-slopping, or "making more human" any blog post
  or prose copy (content/*.mdx and other Markdown/MDX). Removes AI-writing tells —
  the "X. Not Y." antithesis cadence, section-ending aphorisms, clichés, forced
  motifs, marketing fluff — while preserving all code, frontmatter, links, and
  facts byte-for-byte. Trigger whenever the user says copy "reads like AI",
  "sounds like slop", is "too polished", wants it "to sound human", mentions a
  Codex/AI-written draft, or asks to review, rewrite, tighten, or clean up writing —
  even if they never say the word "slop".
---

# Humanize Blog Copy

## What this is for

Drafts written by AI (or by humans imitating that style) read as machine-made because of **rhythm and shape**, not vocabulary. The job is to strip the recognizable tells and let the author's plain voice through — without changing a single fact, number, code block, or link.

Core principle: **the cadence is the tell.** Fixing word choice does little; fixing sentence *shape* does almost everything.

## Hunt for these patterns

1. **The "X. Not Y." cadence (the #1 tell).** Assert-then-correct or balanced antithesis: "I wanted a glance, not a relationship.", "Not the files. The architecture around them.", "Technically working. Practically useless.", "It's not X. It's Y." Rewrite each into one flowing sentence. There are usually many — keep at most one or two of the very best across a whole post, because scarcity is what makes a punchy line land.
2. **Section-ending "bows."** A tidy aphorism that "lands a point" at the close of nearly every section ("That's the whole point.", "And remembering, it turns out, is most of the job."). Let sections end on substance, or simply stop.
3. **Clichés / meta-signposting.** "earned its keep", "paid off", "the best part is", "turns out", "the magic is", "here's the thing", "that's exactly the kind of X I love", "there's something poetic about".
4. **Forced keyword motifs** — a cute word repeated to feel thematic ("boring", "just works").
5. **Staccato fragment stacks** for drama ("Three tables. That's the whole backend.", "Done.").
6. **Marketing fluff** (older tutorial/launch posts have a different flavor) — "powerful capabilities", "seamlessly", "unleash", reader-flattery, exclamatory cheer ("Happy syncing!", "Congratulations!").

## Don't over-correct

- **Descriptive "no X, no Y, no Z" lists are fine** — listing what something lacks reads human. Only the rhetorical reversal ("…, not Y") is the tell. Don't flatten every negation.
- **Don't make it lifeless.** Flattening every punchy line into uniform medium-length sentences is its own AI tell. Vary the rhythm and leave genuine voice alone.

## Hard rules

- **Invent nothing.** No new facts, numbers, names, quotes, or events. Restructure existing prose only. If a sentence can't survive without the cadence, say the same thing plainly.
- **Preserve byte-for-byte:** frontmatter (`--- … ---`), all fenced and inline code, `<Image>` / `![]()` tags, `<a>` links with their exact attributes and styles, and URLs.
- **Keep** headings, order, first-person voice, meaning, and roughly the same length. This is an edit, not a fresh draft. Reword a heading only if the heading itself is an "X, Not Y" or pure marketing.

## Workflow

**One post:** read it, then edit in place.

**Many posts:** dispatch one focused agent per file, in parallel — each agent gets the rules above plus any register note. Older marketing/tutorial posts (e.g. `setup-elastic-connector-local`, `pastedown`) need the fluff-cutting variant rather than the "X. Not Y." one. Ask each agent to return counts of what it removed and a confirmation that code/frontmatter/links/facts were untouched.

## Verify — don't trust, check

Run these from the repo root after editing:

```bash
# 1. Residual cadence / tics (review each hit; descriptive "no X, no Y" lists are OK)
grep -rnE "\. (Not|No) [A-Z]|that'?s it\.|that'?s the whole|the magic is|here'?s the thing|earned its keep|there'?s something poetic" content/*.mdx

# 2. Code-fence parity — every file must be EVEN (unbalanced = broken MDX)
for f in content/*.mdx; do n=$(grep -c '^```' "$f"); [ $((n%2)) -ne 0 ] && echo "ODD FENCES: $f"; done

# 3. Code blocks unchanged vs git (silence = identical to HEAD)
for f in $(git diff --name-only content/); do
  git show "HEAD:$f" | awk '/^```/{f=!f;print;next} f{print}' > /tmp/old_cb
  awk '/^```/{f=!f;print;next} f{print}' "$f" > /tmp/new_cb
  diff -q /tmp/old_cb /tmp/new_cb >/dev/null || { echo "CODE CHANGED: $f"; diff /tmp/old_cb /tmp/new_cb; }
done
```

## The honest ceiling

This pass makes copy **clearly not-AI**, but not automatically **richly human**. Truly personal writing needs lived specifics — exact hardware, real timings, the actual bug, an honest "what I'd still change." Don't fabricate these to fill the gap; ask the author for the real details and weave them in. Structural de-slopping plus real specifics is what gets you all the way.

See `AGENTS.md` → "Writing Voice" for the shared rule set.
