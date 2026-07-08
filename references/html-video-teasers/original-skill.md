---
name: html-video-teasers
description: Use when building a self-contained HTML "video" — a launch teaser, product demo, feature reveal, or animated landing piece — that plays as motion without using a real video file (no .mp4/.webm/<video>/<canvas>/CSS @keyframes). Triggers on phrases like "make a demo video", "product teaser", "launch animation", "feature reveal", "introvid-style HTML video", "Claude Design teaser", "Nexus demo video", "scene-based HTML animation", "scrubable web video", "single-file React animation", "build.mjs scene concat", "add a logo to the video", "wordmark draw-in", "persistent corner logo", "branded video teaser", or any request to produce a page where time advances via requestAnimationFrame and JSX/SVG/divs are re-rendered every frame from a single scalar t. Aesthetic-agnostic — teaches the technique, not the look (but does cover how to integrate a brand wordmark you already have).
---

# HTML Video Teasers

## What this is

A reusable technique for building **standalone HTML pages that play as videos** — the format pioneered by Anthropic's `claude.ai/design/introvid.html` and replicated in this project's Nexus demo (`demo-video/nexus-teaser.html`).

**The format:**
- One `.html` file (or a multi-file authoring tree that builds to one).
- React + Babel-standalone compile JSX in the browser. No bundler required.
- A single scalar `t` (seconds) is advanced by **one** `requestAnimationFrame` loop.
- Every visual element is a pure function of `t` re-rendered every frame.
- Scenes are functions `sceneN(ctx, t, t0, sceneDur) → JSX` stitched by cumulative-start cascade.
- Hand-built faux-UI primitives (no real product imports) — pixel-perfect control.
- Zero `<video>` / `<canvas>` / WebGL / `@keyframes` / `animation:` CSS.

## When to use this skill

- Building a launch teaser, demo video, product walkthrough, or feature-reveal animation that should ship as a single linkable HTML page.
- Recreating or extending the introvid.html / Nexus-demo style.
- The user asks for a "video" but the deliverable should be web-native, deterministic, scrubable, and zoom-crisp.

**Don't use this for:** real video editing (use Remotion/ffmpeg), CSS micro-interactions on a normal site, slide decks (decks aren't time-driven), or anything where a real `.mp4` is the right output.

## Prior art in this project

You have two working reference implementations and one reverse-engineering doc — read these before building:

- `/Users/dhruv/Desktop/Unilever/SAASY/Polaris/Claude Design Teaser.html` — the canonical single-file 5MB introvid teaser
- `/Users/dhruv/Desktop/Unilever/SAASY/Polaris/demo-video/` — the Nexus multi-file build (see `build.mjs` + `src/09-player.jsx` + `src/scenes/*.jsx`)
- `/Users/dhruv/Desktop/Unilever/SAASY/Polaris/demo-video/findings-claude-design-video.md` — reverse-engineered breakdown of the introvid pattern

These are your demos. Match them in discipline, not in look.

## The two delivery modes

| Mode | When | Authoring | Output |
|---|---|---|---|
| **A — Single-file Babel-standalone** | <2000 lines source, fastest iteration, demo to share once | One `.html` with inline `<script type="text/babel">` blocks | The `.html` itself |
| **B — Multi-file ESM + `build.mjs` concat** | >2000 lines, multi-scene, multi-author | `src/00-…99-…/scenes/sN-…` numerically-ordered files | One `.html` produced by concatenating sources into a single inline `<script>` |

Both modes share runtime: **same React+Babel from CDN, same RAF driver, same Stage/Sprite primitives, same scene cascade.** Mode B only changes authoring ergonomics.

## Mandatory reading before you build

Read these references before producing any code. They are short and load-bearing.

- **[references/architecture.md](architecture.md)** — the RAF driver, scene cascade, `ctx` registry. The non-negotiable shape.
- **[references/animation-primitives.md](animation-primitives.md)** — `Stage`, `Sprite`, `useTime`, `interpolate`, `Easing`, `seq`, `hold`, `envS`. The motion grammar.
- **[references/scenes-and-pacing.md](scenes-and-pacing.md)** — phase-budget pattern, hold ratios, cross-fades, what makes pacing feel premium vs frantic.
- **[references/delivery-modes.md](delivery-modes.md)** — how to choose A vs B; how `build.mjs` works; when to add the build step.
- **[references/react-babel-traps.md](react-babel-traps.md)** — four traps that silently break inline-Babel apps. Read every time.
- **[references/sound-design.md](sound-design.md)** — procedural Web Audio + edge-trigger SFX (Nexus pattern). Optional but high-leverage.
- **[references/branding-and-logos.md](branding-and-logos.md)** — persistent corner logo, intro tag, outro draw-in, two-logo 3D ribbon-twist handoff. Skip only if the video has zero brand wordmarks (rare).
- **[references/verification.md](verification.md)** — how to QA a video before saying it's done.

## Starter assets

Drop these in and edit, don't write from scratch:

- **[assets/shell-single-file.html](../../assets/shell-single-file.html)** — Mode A starter (pinned React+Babel, integrity hashes, `__resources` blob registry, scaling host).
- **[assets/build.mjs](../../assets/build.mjs)** — Mode B concatenator (numeric-prefix file ordering, asset inlining, single-output HTML).
- **[assets/animations.jsx](../../assets/animations.jsx)** — `Stage`/`Sprite`/`useTime`/`interpolate`/`Easing` + `seq`/`hold`/`envS`/`twLerp`/`smootherstep`. The full primitive set.
- **[assets/scene-template.jsx](../../assets/scene-template.jsx)** — empty scene with `computeDur` and the phase-budget pattern in place.

The `build.mjs` starter also auto-detects `assets/brand-wordmark.svg` and parses it into `window.__BRAND_PATHS__` for the [`WordmarkDrawIn`](branding-and-logos.md) animation — drop in your logo, tag each path with `class="brand-p brand-<color>"`, and the `Wordmark`/`WordmarkDrawIn` components from [branding-and-logos.md](branding-and-logos.md) will pick it up automatically.

## Workflow

1. **Read the two reference videos** (paths above). Don't reverse-engineer them again — read `findings-claude-design-video.md`.
2. **Pick a delivery mode** (A or B — see [delivery-modes.md](delivery-modes.md)).
3. **Storyboard the scenes first** in plain English: name, story-beat, approximate duration, background color. Show the storyboard before writing JSX.
4. **Copy the appropriate starter** from `assets/`.
5. **Build one scene end-to-end** including its `computeDur`, then play the file in a browser before adding scene 2.
6. **Add scenes one at a time.** Verify after each. Cross-fade backgrounds.
7. **Run [verification.md](verification.md)** before declaring done.

## What this skill deliberately does NOT do

This skill teaches **technique**, not aesthetic. Specifically out of scope:
- Color palettes, typography, brand voice, design philosophies — those are project decisions.
- Logo design, asset sourcing, copy writing, persuasive structure. *(But: see [branding-and-logos.md](branding-and-logos.md) for the technique of *integrating* a brand wordmark you already have — corner logo, intro tag, outro draw-in. The skill teaches the integration mechanics; you supply the asset.)*
- Anti-slop "don't use gradient orbs" rules — that's taste, not technique.

The user owns the look. This skill ensures the look ends up in a deterministic, scrubable, single-file HTML video that runs anywhere.

## Red flags

If you're doing any of these, stop and re-read the references:

- Adding a CSS `@keyframes` rule for animation → use the RAF driver instead
- Importing GSAP, Framer Motion, Anime.js, react-spring → not needed; one `t` is enough
- Per-scene `requestAnimationFrame` loops → exactly one driver, in `Stage`
- Inline `setTimeout`/`setInterval` for timing → time is `t - t0`, never wall-clock
- Embedding a real `<video>` tag → wrong format; use Remotion if you need MP4 output
- Using `vw`/`vh` units inside scenes → author at fixed 1280×720 (or 1440×810), scale via `transform`
- Magic numbers for durations/positions inside scenes → name them in a `const P = {…}` budget object or register as `ctx.num` tweaks
- Sub-100ms easing transitions everywhere with no holds → premium pacing is 60% hold / 40% motion
- No fullscreen mode → every video MUST support fullscreen with auto-hidden controls + cursor (F key + ⛶ button + `:fullscreen` CSS rules including `:-webkit-full-screen` for Safari). See [architecture.md](architecture.md) "Fullscreen mode" + [verification.md](verification.md) step 5.
