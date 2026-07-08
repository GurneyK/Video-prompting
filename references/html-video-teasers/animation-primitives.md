# Animation primitives: the motion grammar

Six functions and three components. Every visual in both reference videos is composed from these. Learn this API before writing scenes.

## Components

### `<Stage duration={N}>{children}</Stage>`

Owns the time loop. See [architecture.md](architecture.md) for the implementation. Provides `StageContext` with `{ t, duration }`. Wrap once at the top.

### `<Sprite start={N} end={N}>{children}</Sprite>`

Time-window conditional renderer. `null` outside the window; renders children with `SpriteContext` providing local progress `(t - start) / (end - start)` ∈ [0, 1] inside it.

```jsx
<Sprite start={2.0} end={4.5}>
  <FadeIn />
</Sprite>
```

### `<Layer x y w h scale rotation opacity>{children}</Layer>`

Absolutely-positioned wrapper. All visual elements sit inside Layers. Coordinates are in stage pixels. `scale` and `rotation` apply via `transform`.

## Hooks

### `useTime() → number`

Returns the current `t` in seconds.

### `useSprite() → number`

Returns the local progress `p ∈ [0, 1]` inside the enclosing `<Sprite>`. Throws if used outside a Sprite.

## Easing

```js
const Easing = {
  linear:    p => p,
  in:        p => p * p,
  out:       p => 1 - (1 - p) * (1 - p),
  inOut:     p => p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2,
  inCubic:   p => p**3,
  outCubic:  p => 1 - Math.pow(1 - p, 3),
  inOutCubic:p => p < 0.5 ? 4*p**3 : 1 - Math.pow(-2*p+2, 3)/2,
  outBack:   p => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3*Math.pow(p-1,3) + c1*Math.pow(p-1,2); },
  smooth:    p => p*p*p*(p*(6*p - 15) + 10),  // smootherstep — DEFAULT for most motion
};
```

**Default to `smooth` (smootherstep).** It's what introvid uses everywhere except when overshoot or hard ease is intentional.

**Three-easing rule for premium feel:**
- `outCubic` for entrances (0.4 – 0.8s)
- `inOutCubic` for exits and bidirectional moves (0.3 – 0.5s)
- `outBack` for landing emphasis on cards/buttons/CTAs (with overshoot)

`linear` is almost never the right answer.

## Interpolation helpers

### `interpolate(t, [i0, i1], [o0, o1], easing = Easing.linear)`

Clamped keyframe lerp with easing. The workhorse — every "value over time" expression uses this.

```js
const x = interpolate(t, [2.0, 4.0], [100, 600], Easing.outCubic);
const opacity = interpolate(t, [0, 0.5], [0, 1]);
```

### `twLerp(a, b, p) → number | array`

Element-wise lerp. Works on numbers AND equal-length arrays — so points lerp natively:

```js
const pos = twLerp([100, 200], [600, 400], Easing.smooth(p));   // → [x, y]
```

### `smoothstep(a, b, t) → [0, 1]`

Hermite step from 0 to 1 between `a` and `b`. Useful for chained envelopes where you don't want a hard clamp.

### `clamp01(p) → [0, 1]`

```js
const clamp01 = p => Math.max(0, Math.min(1, p));
```

## Time grammar (`seq`, `hold`, `envS`)

These are the secret weapons. Both reference videos use them constantly.

### `seq(now, stops, easing = Easing.smooth)`

Keyframe sequence. `stops` is `[[t0, v0], [t1, v1], …]`. Returns the value at `now` interpolated between bracketing stops.

```js
const x = seq(lt, [
  [0.0, 100],
  [1.5, 600],
  [2.5, 400],
  [4.0, 800],
], Easing.smooth);
```

Per-stop easing override: `[[t, v, ease?], …]`.

### `hold(now, stops)`

Step-hold. Returns the value of the latest stop whose `t ≤ now`. No interpolation — for discrete state changes.

```js
const step = hold(lt, [[0, 0], [1.0, 1], [3.0, 2], [5.0, 3]]);
```

Use for cursor-click states, file-picker selection, anything that snaps.

### `envS(now, t0, t1, t2, t3) → [0, 1]`

Smooth fade-in/hold/fade-out envelope. Four time points: fade up `[t0, t1]`, hold `[t1, t2]`, fade down `[t2, t3]`. Pass `Infinity` for any boundary you don't want.

```js
const opacity = envS(lt, 0.5, 1.0, 3.5, 4.0);   // fade in 0.5s, hold 2.5s, fade out 0.5s
const fadeIn  = envS(lt, 0, 0.6, Infinity, Infinity);   // just fade in
```

**Use envelopes instead of two separate `interpolate` calls + a `Math.min`.** It reads better and centralizes the timing logic.

## Cursor choreography pattern

For multi-step cursor sequences (cf. introvid scene 4, Nexus s3-build), use **cumulative-time arrays**:

```js
const moves = [
  { dur: 0.6, to: [200, 100] },
  { dur: 0.3, dwell: true },              // pause is just another segment
  { dur: 0.8, to: [400, 250] },
  { dur: 0.4, dwell: true },
  { dur: 0.5, to: [400, 400], click: true },
];
const CT = moves.reduce((acc, m, i) => [...acc, (acc[i-1] ?? 0) + m.dur], []);
```

Then for each `lt`:
```js
const i = moves.findLastIndex((_, j) => lt >= CT[j]);
const segP = (lt - CT[i]) / moves[i].dur;
const pos = moves[i].to ? twLerp(moves[i-1]?.to ?? [0,0], moves[i].to, Easing.smooth(segP)) : prevPos;
```

**Why cumulative-time:** changing one move's duration cascades all later moves automatically. Adding a `prePickPause` is just an extra dwell segment — no offset arithmetic.

## Typewriter helpers

```js
function typewriter(text, lt, start, dur) {
  const p = clamp01((lt - start) / dur);
  const n = Math.floor(p * text.length);
  return text.slice(0, n);
}

function typeTokens(tokens, lt, start, perToken) {
  const p = clamp01((lt - start) / (perToken * tokens.length));
  const n = Math.floor(p * tokens.length);
  return tokens.slice(0, n).join(' ');
}
```

`typewriter` is char-by-char; `typeTokens` is word-by-word for streamed-LLM look. Pair with a CSS-keyframe blinking caret — that's the **only** CSS animation either reference video uses.

```css
@keyframes nx-blink { 50% { opacity: 0; } }
.caret { animation: nx-blink 1s infinite; }
```

## Reading order when learning the grammar

1. `interpolate(t, [a,b], [c,d], Easing.X)` — covers 70% of cases.
2. `seq(lt, stops)` — when you have ≥3 keyframes.
3. `envS(lt, t0, t1, t2, t3)` — when you have a fade-in/hold/fade-out arc.
4. `twLerp(arr, arr, p)` — when you're moving 2D points.
5. `hold(lt, stops)` — when you need discrete state, not interpolation.
6. Cumulative-time arrays — when you have ≥4 cursor moves with explicit pauses.

You should rarely write `Math.max`/`Math.min` clamps inline. If you do, wrap them in a helper and add it to this list.
