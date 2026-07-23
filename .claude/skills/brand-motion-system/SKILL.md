---
name: brand-motion-system
description: Use when there's no defined visual/motion identity yet for a video, demo, or deck, or when an existing brand guideline needs to be translated into motion rules, or when a user wants to borrow the style language of another company as creative-direction reference. Triggers on phrases like "define our motion language", "brand style for video", "we don't have a design system yet", "startup needs a visual identity for launch video", "extract style from these brand guidelines", "apply our brand to this animation", "make this feel like [company]", "what should our launch video's style be". Produces a reusable style-pack document that other skills (product-demo-video, presentation-motion, html-video-teasers) and the creative-review-rubric consume. Never reproduces another company's actual logos, trademarks, or copyrighted assets — see reference-company-styles.md.
---

# Brand Motion System

## What this is

Most brand guidelines cover color, type, and logo usage — almost none define *motion*: pacing, easing, transition grammar, sound signature. This skill fills that gap. It either extracts motion rules from an existing static brand guideline, synthesizes a lightweight system from scratch for a team with no design system yet, or helps a user borrow a proven style-DNA reference from another company as a starting point. The output is a short "style pack" document that every other creative skill in this repo (`product-demo-video`, `presentation-motion`, `html-video-teasers`) can consume directly.

## When to use this skill

- Before building anything, if a request implies a visual identity exists but no motion rules have ever been written down for it.
- A startup with no design team needs *something* opinionated to build a launch video against, fast.
- A user wants to use a well-known company's creative style as a reference point ("make this feel like an Apple keynote," "give this Anthropic's restraint") — this skill is the gate that keeps that reference at the level of style-DNA, not literal asset reproduction.

**Don't use this for:** picking a chart color palette (use the `dataviz` skill for that) or writing brand voice/copy guidelines (out of scope — this skill covers visual and motion only).

## Mandatory reading before you build

- **[references/style-pack-template.md](references/style-pack-template.md)** — the actual fill-in schema: color roles, type scale, motion signature (easing defaults, pace, transition grammar), sound signature, logo usage rules, do/don't list.
- **[references/extracting-from-existing-brand.md](references/extracting-from-existing-brand.md)** — how to read a static brand guideline (PDF, deck, brand site) and translate its adjectives and static rules into motion decisions it never explicitly made.
- **[references/synthesizing-for-startups.md](references/synthesizing-for-startups.md)** — a fast, opinionated process for a founder with no design team: pick one accent color, one type pairing, one motion signature, ship, iterate later.
- **[references/reference-company-styles.md](references/reference-company-styles.md)** — how to use `templates/company-styles/` as inspiration/calibration references, and the hard rule on never reproducing another company's actual trademarked material.

## Workflow

1. Determine which path applies: existing brand guideline to extract from, no system yet (startup path), or explicit request to borrow a reference company's style.
2. Existing brand → `extracting-from-existing-brand.md`. No brand yet → `synthesizing-for-startups.md`. Borrowing a reference → `reference-company-styles.md`, then still run the output through the startup or extraction path so it becomes *this* brand's system, not a skin.
3. Fill out the `style-pack-template.md` schema completely — don't let any section stay a placeholder before handing off.
4. Hand the completed style pack to whichever execution skill is building the actual deliverable.
5. Store/reuse the style pack for future requests from the same user/team rather than re-deriving it each time — ask the user if they want it saved somewhere durable (a repo file, a shared doc) once it's stable.

## Red flags

- Naming a reference company's style but never adapting it — if the output is a near-exact skin of another brand with the logo swapped, that fails the `creative-review-rubric.md` Distinctiveness dimension and risks brand confusion.
- Reproducing another company's actual logo, wordmark, exact brand-guideline hex codes, proprietary typeface, or copyrighted footage — always out of scope; describe the *pattern*, never copy the *asset*.
- Treating "we'll figure out the brand as we go" as an acceptable answer for a launch video — even the fast startup path (`synthesizing-for-startups.md`) takes minutes and prevents an inconsistent-looking first launch.
- Skipping motion signature and only defining color/type — motion is this skill's entire reason to exist; a style pack without it is just a color palette.
