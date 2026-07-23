# Cursor and UI Choreography

The single biggest tell that a demo is fake is cursor and typing motion that doesn't behave like a human. This reference gives concrete ranges — use them as defaults in the `html-video-teasers` primitives (`interpolate`, `Easing`, `seq`).

## Cursor motion

- **Never teleport.** Every cursor move is an `interpolate` or `seq` call, never a hard position jump. Minimum move duration ~200-350ms for a short on-screen distance, up to 500-600ms for a long diagonal move.
- **Easing:** `outCubic` or `smooth` (smootherstep) for normal moves — a human hand decelerates into the target, it doesn't arrive at constant velocity.
- **Overshoot is optional, not default.** A very subtle overshoot-and-settle (2-4px) on longer moves reads as more human, but overdo it and it looks jittery. Reserve for hero moments only.
- **Pause before clicking.** A real cursor arrives and sits for 80-150ms before the click registers — don't click on arrival frame.
- **Click feedback:** a small radial ring or scale-pulse on the target (120-180ms, `outCubic` out) confirms the click landed. Without this, viewers can't tell a hover from a click.
- **Idle micro-movement:** during holds (reading time), the cursor should not be perfectly frozen pixel-for-pixel — a tiny (1-3px) drift reads as alive. Skip this for very short holds (<1s).

## Typing simulation

- **Realistic speed:** 180-260ms per character for normal typing, with natural variance (±40ms) — not a uniform interval. Use `seq` with slightly jittered keyframe spacing, not a linear `interpolate` across the whole string.
- **Punctuation and word-boundary pauses:** add a 150-300ms extra pause after spaces and punctuation — this is what separates "typing" from "text materializing."
- **Never instant.** Even for short strings, avoid a single-frame full-string appearance — it reads as a screenshot swap, not an action.
- **Autocomplete/suggestion moments** (if relevant to the product): show the suggestion appearing after a short delay (300-500ms) and being accepted with a distinct visual (tab-fill or click), not silently merged into the typed text.

## Focus and attention direction

- **Dim, don't hide.** When drawing attention to one part of a UI, dim surrounding chrome to ~40-60% opacity rather than removing it — keeps context legible while directing focus.
- **Zoom-in on the money moment.** The payoff beat (see `demo-narrative-patterns.md`) should get a subtle scale-up (105-115%) with a slightly slower pace than surrounding scenes — this is the one moment worth spending extra hold time on.
- **Spotlight/vignette** is acceptable for a single hero payoff per demo — using it more than once per video dilutes it.
- **Never move two independent UI elements at once for emphasis** — the eye can only track one changing thing as "the point" at a time (see `VIDEO_PROMPTING_MASTER_GUIDE.md`: "avoid parallel movement of unrelated objects").

## Common tells to avoid

| Tell | Fix |
|---|---|
| Cursor jumps instantly between two points | Always `interpolate`/`seq` with 200ms+ duration |
| Text appears all at once | Simulate typing per character with jitter |
| Every click looks identical with no feedback | Add click-ring/scale-pulse per interaction |
| Dashboard numbers are round, static, or all end in 0 | See `data-and-dashboard-fakery.md` |
| Cursor moves in a perfectly straight line at constant speed | Ease in/out, allow very slight path curve for long moves |
| Nothing on screen ever waits for the "system" to respond | Add a brief (300-600ms) loading/processing state before payoffs that would realistically take a moment |
