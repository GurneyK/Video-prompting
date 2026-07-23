# /brand-check

QA a storyboard, deck, or video against a defined brand-motion style pack (or a chosen company-style reference).

Usage: `/brand-check [target file/description] [style pack file or company-style reference, if any]`

Run a brand/motion check on: $ARGUMENTS

1. Locate the style pack to check against. If none exists yet, offer to run the fast startup synthesis path first (`.claude/skills/brand-motion-system/references/synthesizing-for-startups.md`) or check against this repo's baseline motion principles (`references/motion-principles.md`, `references/pacing-and-storytelling.md`).
2. Check color usage: every color maps to a defined role; flag off-palette colors and over-used accent color.
3. Check type usage: headline/body/numeric roles match; no unlisted third typeface.
4. Check motion signature: easing register, pace, and hold ratio match what's defined; flag any scene reading as a different "voice."
5. Check transition grammar: consistent cross-fade/cut/morph usage; flag mixed registers with no stated reason.
6. Check sound signature against the defined stance, if audio is present.
7. Check logo/wordmark usage against placement and "never" rules.
8. If a company-style reference was named, check for a Distinctiveness failure: does this read as "inspired by" or as a near-exact skin? A skin fails regardless of execution quality.
9. Report as a pass/fail table with specific fixes — name the exact color/pacing/element that's the problem, not just "off-brand."
