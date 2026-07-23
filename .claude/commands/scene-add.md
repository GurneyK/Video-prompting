---
description: Scaffold a new numbered scene for a Mode B (multi-file) HTML video teaser and wire it into the build
argument-hint: [scene name] [approx duration] [insert position, e.g. "after scene 3"]
---

Add a new scene: $ARGUMENTS

1. Confirm the project is Mode B (multi-file `src/` + `build.mjs`), per `references/html-video-teasers/delivery-modes.md`. If it's still Mode A (single file, <2000 lines), either add the scene inline following `assets/scene-template.jsx`'s pattern directly in the file, or offer to migrate to Mode B first if this is the 4th+ scene or a 2nd+ author (the repo's own threshold for switching modes).
2. Copy the structure from `assets/scene-template.jsx`: a `sceneN(ctx, t, t0, sceneDur) → JSX` function with a static `.computeDur(T)`, and a `const P = {…}` phase-budget object naming every duration/position — no magic numbers inline.
3. Name the file with the correct numeric prefix so it concatenates in order via `build.mjs` (see `assets/build.mjs` and `references/html-video-teasers/delivery-modes.md` for the numeric-prefix convention) — insert it at the requested position, renumbering subsequent scene files only if the ordering genuinely requires it.
4. Update the scene cascade / `starts[]` computation so the new scene's window is included and overlapping scenes still cross-fade correctly (±0.45s PAD, per `references/html-video-teasers/architecture.md`).
5. Apply the phase-budget pacing pattern from `references/html-video-teasers/scenes-and-pacing.md`: aim for 60% hold / 40% motion if the scene is ≥10s, stagger sequential elements 80-150ms, hold at least 1.5x any typing duration.
6. If the scene introduces a new background color, wire the cross-fade (two `<div>` layers, `FADE ≈ 0.8s`) rather than an instant background swap.
7. Remind to verify in a real browser before adding another scene — play through, scrub the new scene's boundaries on both sides, check the mid-scene poster frame looks intentional (per `references/html-video-teasers/verification.md`).
