---
description: QA a storyboard, deck, or video against a defined brand-motion style pack (or a chosen company-style reference)
argument-hint: [target file/description] [style pack file or company-style reference, if any]
---

Run a brand/motion check on: $ARGUMENTS

1. Locate the style pack to check against. If one is named or provided, use it directly (see `.claude/skills/brand-motion-system/references/style-pack-template.md` for the expected schema). If none exists yet, say so and offer to either run the `brand-motion-system` skill's fast startup path first (`synthesizing-for-startups.md`) or proceed with a generic check against this repo's baseline motion principles (`references/motion-principles.md`, `references/pacing-and-storytelling.md`).
2. Check color usage: does every color on screen map to a role in the style pack (primary/secondary/accent/background)? Flag any off-palette color, and flag if the accent color appears in more area than the style pack's stated limit (accent should mark emphasis, not decoration).
3. Check type usage: headline/body/numeric roles match the style pack's assignments; no unlisted third typeface introduced.
4. Check motion signature: does the easing register, pace, and hold ratio match what's defined (or, absent a style pack, match `references/motion-principles.md`)? Flag any scene whose pacing reads as a different "voice" than the rest of the piece.
5. Check transition grammar: consistent cross-fade/cut/morph usage per the style pack's stated register — flag mixed registers within one piece (e.g. some scenes cross-fade, others hard-cut, with no stated reason).
6. Check sound signature against the style pack's stance (silent-clean vs. music-forward vs. UI-click-forward), if audio is present.
7. Check logo/wordmark usage against placement and "never" rules in the style pack.
8. If a company-style reference was named instead of (or alongside) a style pack, additionally check for the Distinctiveness failure mode from `.claude/skills/creative-director/references/creative-review-rubric.md`: does this read as "inspired by" the reference, or as a near-exact skin of it? A skin is a fail regardless of how well-executed it is.
9. Report as a pass/fail table per check above, with specific fixes for anything flagged — not just "off-brand," name the exact color/pacing/element that's the problem.
