# /scene-add

Scaffold a new numbered scene for a Mode B (multi-file) HTML video teaser and wire it into the build.

Usage: `/scene-add [scene name] [approx duration] [insert position, e.g. "after scene 3"]`

Add a new scene: $ARGUMENTS

1. Confirm the project is Mode B (multi-file `src/` + `build.mjs`), per `references/html-video-teasers/delivery-modes.md`. If still Mode A, either add the scene inline or offer to migrate to Mode B first if this is the 4th+ scene or a 2nd+ author.
2. Copy the structure from `assets/scene-template.jsx`: a `sceneN(ctx, t, t0, sceneDur) → JSX` function with a static `.computeDur(T)`, and a `const P = {…}` phase-budget object naming every duration/position.
3. Name the file with the correct numeric prefix so it concatenates in order via `build.mjs` — insert at the requested position, renumbering only if truly needed.
4. Update the scene cascade / `starts[]` computation so the new scene's window is included and overlapping scenes still cross-fade correctly (±0.45s PAD).
5. Apply the phase-budget pacing pattern: 60% hold / 40% motion if ≥10s, stagger sequential elements 80-150ms, hold at least 1.5x any typing duration.
6. If the scene introduces a new background color, wire the cross-fade (two `<div>` layers, `FADE ≈ 0.8s`) rather than an instant swap.
7. Verify in a real browser before adding another scene — play through, scrub the new scene's boundaries, check the mid-scene poster frame.
