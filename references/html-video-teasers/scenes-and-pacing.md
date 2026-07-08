# Scenes and pacing

How to compose scenes that feel premium. The mechanical pattern is in [architecture.md](architecture.md); this doc is about the *pacing* and *composition* choices that separate a scrub-able prototype from a watchable video.

## The phase-budget pattern (inside a scene)

Most Nexus scenes use this; introvid uses the same idea with `ctx.num`. Pick one consistently per project.

```jsx
function scene3Build(ctx, t, t0, sceneDur) {
  const lt = t - t0;

  // Declare every duration up front — never inline magic numbers.
  const P = {
    A_in:    0.75,   // title fades in
    A_hold:  1.40,   // title sits
    A_out:   0.40,   // title fades out
    B_in:    0.60,   // step 1 panel slides in
    B_hold:  2.10,
    B_out:   0.40,
    // …
  };

  // Cumulative ends — derived once.
  const tA_end = P.A_in + P.A_hold + P.A_out;
  const tB_end = tA_end + P.B_in + P.B_hold + P.B_out;
  // …

  // Each visual = clamp((lt - phaseStart) / phaseDur, 0, 1) → eased
  const titleOp = envS(lt, 0, P.A_in, P.A_in + P.A_hold, tA_end);
  const stepIn  = clamp01((lt - tA_end) / P.B_in);
  const stepX   = interpolate(stepIn, [0, 1], [-200, 0], Easing.outCubic);

  return (/* … */);
}
scene3Build.computeDur = () => {
  const P = { A_in: 0.75, A_hold: 1.40, A_out: 0.40, B_in: 0.60, B_hold: 2.10, B_out: 0.40 };
  return P.A_in + P.A_hold + P.A_out + P.B_in + P.B_hold + P.B_out;
};
```

**Important:** `computeDur` redeclares the same `P` so it can return the total without rendering. Or factor `P` to a module-scope const that both functions read.

## The 60/40 hold rule

Watchable video is **60% hold, 40% motion**. Scenes that feel premium have long settling beats; scenes that feel frantic have constant motion.

- Short scene (≤4s, e.g. an outro line): 30/70 motion-heavy is fine, the brevity carries it.
- Medium scene (5–12s, e.g. data-ingest, composer-typing): aim for 50/50.
- Long scene (15s+, e.g. a multi-step build flow): **60/40 hold-heavy**. Cut the holds and it feels like a blur.

Watch your reference videos with this in mind. Notice how introvid sits on "Meet Claude Design" for a beat after typing finishes. That hold is the scene.

## Cross-fades, not cuts

Adjacent scenes overlap by `PAD ≈ 0.45s` and cross-fade their backgrounds over `FADE ≈ 0.8s`. The element of motion that defines the boundary is the *background*, not a hard cut.

```jsx
function VideoFrame({ t }) {
  const visible = SCENE_FNS
    .map((fn, i) => ({ fn, start: starts[i], dur: durs[i] }))
    .filter(s => t >= s.start - PAD && t < s.start + s.dur + PAD);

  return (
    <Stage>
      {visible.map(({ fn, start, dur }, i) => (
        <Layer key={i}>{fn(ctx, t, start, dur)}</Layer>
      ))}
    </Stage>
  );
}
```

Pair the visual cross-fade with a `whoosh` SFX 0.25s **before** the boundary. The audio leads the eye. See [sound-design.md](sound-design.md) for the edge-trigger fire registry.

## Scene types and their default lengths

These are starting points, not rules. Adjust to story.

| Scene type | Length | Pattern |
|---|---:|---|
| Banner intro / title | 3.5–5s | Type-in 1.0–1.5s, hold 1.5–2.5s, exit 0.5s |
| Manifesto / quote | 7–10s | Reveal-by-word, long hold, blur-out tail |
| Data-ingest / build-up | 8–12s | Stagger ≥6 elements, settle, single CTA |
| UI walk-through (cursor + steps) | 12–18s | Cumulative-time cursor, named pauses |
| Streaming/LLM response | 8–15s | `typeTokens` + caret + chunk-arrival rhythm |
| Diagram / orchestration | 10–14s | Particles down bezier edges, results back up |
| Outro CTA | 3–4s | Three-line stagger, hold, fade |
| Bookend / handoff (3D ribbon, etc.) | 6–10s | One bold mechanical move, no text |

Keep total runtime **60–110 seconds**. Past 110s you need real video editing tools or you'll lose the viewer.

## Motion choices that read as intentional

- **Stagger sequential elements** by 80–150ms. Less than 80ms reads as simultaneous; more than 150ms reads as slow.
- **One-direction-per-beat.** A scene that moves left then up then right then down looks indecisive. Pick one axis per beat.
- **Match easing across a scene.** A scene with two `outCubic` slides and one `outBack` slide will jar. Pick a register and stay.
- **Holds are content.** A 1.6s hold on a title isn't dead time — it's where the viewer reads. Cutting holds is what makes AI animations feel "off."
- **Don't enter and exit at once.** Let element A finish entering before element B enters. The eye can't track parallel motion at 24+ fps.
- **Final-frame composition matters.** Scrub to the last frame and ask "is this a poster?" If yes, keep it. If it's mid-motion, you've cut the wrong place.

## Pacing the cursor

Cursor sequences are where the introvid magic happens. Read the cursor cascade in `Claude Design Teaser.html` scene 4 with these rules in mind:

- **Move time:** 0.4–0.8s for any cursor traverse. Faster = nervous; slower = drugged.
- **Pre-click dwell:** 0.2–0.4s on the target before the click happens. The viewer needs a frame to anticipate.
- **Click-hold:** 0.08–0.12s where the cursor variant flips to "pressed."
- **Post-click dwell:** 0.3–0.6s before the next move. Let the click register.
- **Named pauses for sections:** `preImportPause`, `prePickPause`, `postTypePause`. Never inline a `0.8` — name it.

## Streaming-text rhythm

Real LLM streaming has uneven token arrival. Don't fake it as constant rate:

```js
const tokens = ['Hello', ',', 'how', 'can', 'I', 'help', 'you', 'today', '?'];
const arrivals = [0, 0.05, 0.4, 0.6, 0.65, 0.85, 1.05, 1.2, 1.35]; // hand-tuned
const visible = tokens.filter((_, i) => lt >= start + arrivals[i]).join('');
```

Burstiness reads as authentic; uniformity reads as fake.

## Anti-patterns specific to pacing

- **Looping immediately at end** → use `postMessage('finished')` and hold the last frame; the host decides what happens next.
- **No holds, just transitions** → the video feels frantic; viewer can't read anything.
- **Three different easing curves in one scene** → pick a register; the scene loses voice.
- **Parallel entries of unrelated elements** → stagger by ≥80ms or sequence into separate beats.
- **Hard cuts between scenes** → always cross-fade backgrounds; pair with SFX 0.25s before boundary.
- **Cursor dragging across the screen with no purpose** → if the cursor moves to a target, it's there to act. Move-and-do, not move-and-think.
- **Text appearing without a hold afterward** → if the viewer can't finish reading, you typed it for nothing. Hold ≥ 1.5× the typing duration.
