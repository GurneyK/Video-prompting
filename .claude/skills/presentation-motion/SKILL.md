---
name: presentation-motion
description: Use when building an animated slide deck or presentation — PowerPoint Morph, Keynote Magic Move, Google Slides animation, an exec/board/town-hall deck, an investor pitch deck, or an HTML-deck alternative. Triggers on phrases like "animated presentation", "exec deck", "pitch deck motion", "PowerPoint animation", "Keynote Magic Move", "Google Slides animation", "investor deck", "town hall presentation", "quarterly business review deck", "board deck", "make this deck feel less static". Covers slide-as-scene pacing, tool-specific animation techniques, and editability discipline. For chart/number animation specifically, also read chart-and-data-motion.md and consider the dataviz skill.
---

# Presentation Motion

## What this is

Creative and technical direction for presentations that need to feel considered and paced rather than static — without breaking the thing decks are for: being editable, presentable live, and understandable from notes alone. This skill treats each slide as a timed scene with a build order, the same discipline the rest of this repo applies to video, but constrained to what PowerPoint/Keynote/Google Slides (or an HTML-deck alternative) can actually do.

If the audience lens hasn't been named yet, back up to `creative-director` first — an exec review deck and a startup investor deck should look and move differently even when covering similar content.

## When to use this skill

- Any request for a deck (PowerPoint, Keynote, Google Slides, or a custom HTML deck) that should use motion/animation/transitions deliberately rather than as decoration.
- Investor pitch decks, board decks, QBRs, town halls, product-launch decks, sales decks.
- Requests to make an existing static deck "feel more alive" without losing editability.

**Don't use this for:** a fully time-driven, non-editable "video" — that's `html-video-teasers` (technique) directed by `creative-director`/`product-demo-video`. The dividing line: if a non-technical person needs to edit this after handoff, it's a deck (this skill); if it only ever needs to play back, it can be a teaser.

## Mandatory reading before you build

- **[references/slide-as-scene.md](references/slide-as-scene.md)** — treating each slide as a timed scene: build order, per-bullet/per-chart entrance choreography, dwell time per idea.
- **[references/tool-specific-techniques.md](references/tool-specific-techniques.md)** — PowerPoint Morph patterns, Keynote Magic Move, Google Slides' more limited animation model, and when to switch to a custom HTML deck instead.
- **[references/exec-deck-discipline.md](references/exec-deck-discipline.md)** — editability constraints, one-idea-per-build, speaker notes as an intent record, and how the motion register itself should differ between a Unilever-style corporate deck and a startup pitch deck.
- **[references/chart-and-data-motion.md](references/chart-and-data-motion.md)** — animating a chart or KPI reveal honestly (no misleading motion), staged reveal of comparison data. Cross-links the `dataviz` skill for the underlying chart construction.

## Workflow

1. Confirm the audience lens (`creative-director/references/audience-lenses.md`).
2. Outline the deck as scenes first — one slide = one scene, one idea per build step (`slide-as-scene.md`).
3. Pick the tool and its animation ceiling (`tool-specific-techniques.md`) — don't design a Keynote Magic Move sequence for a deck that has to open in PowerPoint on someone else's laptop.
4. Write speaker notes alongside the build order, not after — notes are where intent lives (`exec-deck-discipline.md`).
5. For any chart/KPI slide, design the reveal with `chart-and-data-motion.md` before animating.
6. Run `creative-director`'s review rubric, paying attention to Feasibility (can this actually be built in the target tool) and Brand/Audience Fit.

## Red flags

- Every bullet flying in with a different transition — one easing/transition register per deck, at most one exception for a single hero slide.
- Motion so elaborate the deck breaks when opened in a different version of the tool, or can't be handed off to someone else to edit.
- A chart animating in a way that exaggerates the trend (see `chart-and-data-motion.md`) — this is a credibility and, for enterprise contexts, a compliance risk.
- Treating an HTML deck as the answer when the real requirement is "must be editable by our exec assistant" — that always means a real slide tool.
- No speaker notes — a deck with elaborate build order but no notes on intent is unmaintainable by anyone but its original author.
