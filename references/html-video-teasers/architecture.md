# Architecture: the non-negotiable shape

This is the load-bearing pattern. Every HTML-video-teaser shares this skeleton; only the file layout (single-file vs multi-file build) and the scenes themselves change.

## The single source of truth: `t`

One scalar `t` (seconds since play started) drives everything. It lives in a `useState` + `useRef` pair inside the `Stage` component, and is updated by **exactly one** `requestAnimationFrame` loop.

```jsx
function Stage({ duration, children }) {
  const [t, setT] = React.useState(0);
  const tRef = React.useRef(0);
  const lastRef = React.useRef(performance.now());
  const playingRef = React.useRef(true);

  React.useEffect(() => {
    let raf;
    const tick = (now) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05); // clamp for backgrounded tabs
      lastRef.current = now;
      if (playingRef.current) {
        const next = tRef.current + dt;
        if (next >= duration) {
          tRef.current = duration; setT(duration);
          window.parent?.postMessage({ type: 'finished' }, '*');
          return; // hold last frame; do not loop
        }
        tRef.current = next; setT(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return <StageContext.Provider value={{ t, duration }}>{children}</StageContext.Provider>;
}
```

**Why this exact shape:**
- `dt` clamp at 0.05 prevents scene-skipping when a backgrounded tab returns.
- One ref + one state means React re-renders once per frame, never more.
- `postMessage('finished')` lets a parent host (Next.js login page, embed iframe) decide what comes after. Don't autoplay-loop unless the user explicitly asks.
- Cleanup via `cancelAnimationFrame` prevents stale loops on hot-reload.

## Scenes are pure functions of time

```jsx
function scene1Intro(ctx, t, t0, sceneDur) {
  const lt = t - t0;                       // scene-local time
  // build JSX from lt + sceneDur
  return <Layer>{/* … */}</Layer>;
}
scene1Intro.computeDur = (T) => 3.5;       // arithmetic-only, no rendering
```

Each scene exposes a `.computeDur(T)` static that returns its total seconds — pure arithmetic on raw tweak values. The parent uses it to compute `starts[]` *before* rendering anything.

```jsx
const SCENE_FNS = [scene1Intro, scene2Import, scene3Proto, /* … */];
const SCENE_BG  = ['oat', 'ivory', 'ivory', 'slate', 'cactus', 'heather', 'ivory'];
const SCENE_TEX = [0, 0.5, 0.5, 0.8, 0.6, 0.6, 0]; // paper-grain intensity per scene

const durs   = SCENE_FNS.map(fn => fn.computeDur(TWEAKS));
const starts = durs.reduce((acc, d, i) => [...acc, (acc[i-1] ?? 0) + (durs[i-1] ?? 0)], []);
const total  = starts.at(-1) + durs.at(-1);
```

The current scene index is `starts.findIndex((s, i) => t >= s && t < s + durs[i])`.

**Render rule:** render any scene whose `[start, end]` overlaps `[t - PAD, t + PAD]` where `PAD ≈ 0.45s`. This makes cross-fades free — adjacent scenes co-exist for a beat at every boundary.

## Background crossfades drive the emotional arc

Stack two background `<div>`s inside the Stage:

```jsx
<div style={{ background: SCENE_BG[i] }} />
<div style={{ background: SCENE_BG[i+1], opacity: easeInOutCubic(crossfadeP) }} />
```

`crossfadeP` is `(lt - (sceneDur - FADE)) / FADE` clamped to [0, 1] where `FADE ≈ 0.8s`.

**Two-layer crossfade, not palette-walk.** Crossfading by interpolating RGB through neighboring colors avoids ugly intermediate hues when going (e.g.) `heather → ivory` through `slate`.

`SCENE_TEX[]` controls per-scene paper-grain intensity rendered via SVG `<feTurbulence>` with `mixBlendMode: multiply` (or `screen` on dark backgrounds). Crossfade the texture intensity the same way.

## The `ctx` registry: every magic number is a tweak

A registry built per-render that hands back values *and* records metadata:

```js
function createTweakCtx(TWEAKS) {
  const manifest = [];
  return {
    num(key, fallback, meta) {
      const v = TWEAKS[key] ?? fallback;
      manifest.push({ key, value: v, type: 'num', ...meta });
      return v;
    },
    bool(key, fallback, meta) { /* … */ },
    text(key, fallback, meta) { /* … */ },
    point(key, fallback, meta) { /* … */ },
    el(id, label) { /* declare a visual element for tweak-panel scoping */ },
    manifest,
  };
}
```

Use it in scenes:

```js
const typeDur = ctx.num('s1_typeDur', 1.6, {
  label: 'Typing duration',
  el: 's1_title',
  step: 0.1, min: 0.2, max: 4.0,
  at: (v) => [t0, t0 + v],     // function form: window stretches with the value
});
```

**The `at` field is the single most important hint.** Three forms:
- Scalar instant: `at: t0` — knob applies at one moment
- Span: `at: [t0, t0 + sceneDur]` — knob applies all scene
- Function of value: `at: (v) => [t0, t0 + v]` — knob's relevance window stretches with its own value (use for any duration tweak)

The editor surfaces only knobs whose `at` window contains the playhead. The player ignores the manifest entirely — it's pure metadata.

**For simple Mode A files, you can skip the registry and use `const P = { A_in: 0.7, B_hold: 0.5 }` per scene.** That's fine for a 90-second one-shot. Use `ctx.num` when you want a tweak panel or `window.__TWEAKS__` runtime overrides.

## Stage scaling: author at fixed pixels

Author at one fixed canvas size (1280×720 or 1440×810). Scale with `transform`:

```jsx
function useStageScale(W, H) {
  const [s, setS] = React.useState(1);
  React.useEffect(() => {
    const onResize = () => setS(Math.min(window.innerWidth / W, window.innerHeight / H));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [W, H]);
  return s;
}
```

Wrap the Stage in a div with `transform: scale(s)` and `transform-origin: center`. Center the wrapper. Controls (play/pause/scrubber) live **outside** the scaled element so they stay readable.

**Never use `vw`/`vh` inside scenes.** All coordinates are stage pixels. Scaling is the wrapper's job.

## Fullscreen mode (mandatory)

Every video MUST support fullscreen with auto-hidden controls. Without this it's not presentable — demo recordings, all-hands plays, conference reels all need it.

### Trigger

Two ways to enter fullscreen:
- **F key** — bound globally on the document
- **⛶ button** — added to the controls bar (rightmost)

```js
const toggleFullscreen = () => {
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  } else {
    const el = document.documentElement;
    (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
  }
};

useEffect(() => {
  const onKey = (e) => {
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    else if (e.code === 'KeyR') { restart(); }
    else if (e.code === 'KeyF') { toggleFullscreen(); }
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, []);
```

### CSS rules (in the host shell `<style>`)

These hide the controls bar + cursor when fullscreen is active. Hovering near the bottom edge brings controls back temporarily.

```css
:fullscreen body, :-webkit-full-screen body { background: #000; cursor: none; }
:fullscreen .controls, :-webkit-full-screen .controls {
  opacity: 0; pointer-events: none; transition: opacity 0.4s;
}
:fullscreen .controls:hover, :-webkit-full-screen .controls:hover {
  opacity: 1; pointer-events: auto; cursor: default;
}
:fullscreen #app, :-webkit-full-screen #app { background: #000; }
```

The `:-webkit-full-screen` variant is needed for Safari. Both selectors are listed because no shorthand groups them — `:fullscreen, :-webkit-full-screen { … }` would invalidate both rules in browsers that don't recognize one of them.

### Why hide the cursor

A cursor on top of the video reads as "this is a webpage" not "this is a video." When the user moves the mouse to bring controls back, the `:hover` rule on `.controls` re-enables `cursor: default` so the controls remain interactive. Anywhere else on screen, cursor stays hidden until exit.

### Why this is non-negotiable

Without fullscreen, you have a webpage that someone has to hand-zoom or screen-record-with-the-bar-visible. With fullscreen, you have a deliverable. The cost is ~30 lines of CSS + 10 lines of JS — not optional.

## What never happens

These are not "discouraged" — they are not present in either reference video and break the model:

- `@keyframes` rules
- `animation:` CSS property
- `transition:` CSS property (except for caret blink)
- `setTimeout` / `setInterval` for animation
- `<canvas>` / WebGL
- Per-component `requestAnimationFrame`
- Spring libraries (react-spring, framer-motion)
- Real `<video>` tags
- External asset fetches at runtime (inline everything; use blob URLs or data URIs for binaries)

If you're tempted, the answer is "interpolate from `t` instead."
