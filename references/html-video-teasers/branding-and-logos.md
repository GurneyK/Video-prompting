# Branding and logos

How to wire a brand wordmark/logo into the video without hard-coding aesthetics. Three uses, one shared asset:

1. **Persistent corner logo** — small wordmark in the bottom-right of every scene (like the Nexus demo's `NexusHorizonLogo` and the gizemagent demo's `H3LWordmark`).
2. **Intro tag** — small "A [Org] Innovation" eyebrow + wordmark in scene 1, reinforcing parent-org branding.
3. **Outro draw-in** — the wordmark "writes itself" via a rewind→redraw animation as the final beat.

These three uses share one asset (the parsed SVG paths) and one component pair (`Wordmark`, `WordmarkDrawIn`). Define them once, use everywhere.

## Asset prep

The wordmark **must** be a multi-path SVG (not a flattened image, not a single `<path>`). The draw-in animation works by drawing each path's stroke individually. A logo with 30–80 paths gives the cleanest "writing-itself" feel.

**Conversion path** (typical for a vector logo received as `.eps` or `.ai`):

```bash
# .eps → .pdf
gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=logo.pdf logo.eps
# .pdf → .svg
pdftocairo -svg logo.pdf logo.svg
# Strip clip paths and group transforms in the SVG (otherwise your <path>s
# get clipped to a single rect and won't draw individually)
```

**Color tagging** — add a class to each path that encodes its brand color, so the build can extract them generically:

```svg
<path class="brand-p brand-primary"   d="M…" />
<path class="brand-p brand-secondary" d="M…" />
<path class="brand-p brand-accent"    d="M…" />
```

You can add the class via a one-time edit to the SVG file, or programmatically by mapping the original `fill` attributes.

## Build-time extraction

Add a path-extraction block to your `build.mjs`. The Nexus / gizemagent pattern:

```js
// Inside inlineAssets()
const logoPath = join(ASSETS, 'brand-wordmark.svg');
if (existsSync(logoPath)) {
  const svg = readFileSync(logoPath, 'utf8');
  const paths = Array.from(
    svg.matchAll(/<path class="brand-p brand-(\w+)" d="([^"]+)"/g)
  ).map(m => ({ color: m[1], d: m[2] }));
  lines.push(`window.__BRAND_PATHS__ = ${JSON.stringify(paths)};`);
}
```

The result is a `window.__BRAND_PATHS__` array of `{color, d}` objects available to every scene.

## Wordmark component (static)

For the corner logo and the intro tag, render the parsed paths with their fill colors:

```jsx
const BRAND_COLORS = {
  primary:   '#3A45A3',
  secondary: '#415CB3',
  accent:    '#DA3DA7',
};

function Wordmark({ width = 140, mono = null, opacity = 1, style = {} }) {
  const paths = typeof window !== 'undefined' ? window.__BRAND_PATHS__ : null;
  if (!paths) return <div style={{ width, aspectRatio: '<W>/<H>', ...style }} />;
  return (
    <svg viewBox="<your viewBox>" width={width}
         style={{ display: 'block', overflow: 'visible', opacity, ...style }}>
      {paths.map((p, i) => (
        <path key={i} d={p.d}
              fill={mono || BRAND_COLORS[p.color] || BRAND_COLORS.primary}
              stroke="none" />
      ))}
    </svg>
  );
}
```

The `mono` override lets you collapse the brand palette to a single color when needed (small corner usage, dark backgrounds, etc.).

## Draw-in component (animated)

The "writes itself" effect: **blank → strokes draw left-to-right → fills come in**. One pass, no rewind. Per-path stagger gives the writing-itself feel.

```jsx
function WordmarkDrawIn({ width = 540, t = 0, mono = null }) {
  const paths = window.__BRAND_PATHS__;
  if (!paths) return null;

  function pathState(i) {
    // Per-path stagger so the wordmark writes left → right.
    const drawDelay = i * (0.7 / paths.length);
    const drawDur = 2.0;

    if (t < drawDelay) {
      // Not yet visible.
      return { dashoffset: 1000, fill: 0, sw: 0 };
    }

    if (t < drawDelay + drawDur) {
      const b = (t - drawDelay) / drawDur;
      const eb = easeInOutCubic(b);
      if (eb < 0.68) {
        // Stroke-drawing phase: outline appears, fill stays at 0.
        return { dashoffset: lerp(1000, 0, eb / 0.68), fill: 0, sw: 1.2 };
      }
      // Fill-in phase: stroke fades as fill ramps to 1.
      const lb = (eb - 0.68) / 0.32;
      return { dashoffset: 0, fill: lb, sw: lerp(1.2, 0, lb) };
    }
    return { dashoffset: 0, fill: 1, sw: 0 };  // settled
  }

  return (
    <svg viewBox="<your viewBox>" width={width}
         style={{ display: 'block', overflow: 'visible' }}>
      {paths.map((p, i) => {
        const s = pathState(i);
        const c = mono || BRAND_COLORS[p.color] || BRAND_COLORS.primary;
        return (
          <path key={i} d={p.d}
                pathLength="1000"
                fill={s.fill > 0 ? c : 'transparent'}
                fillOpacity={s.fill}
                stroke={c}
                strokeWidth={s.sw}
                strokeLinejoin="round"
                strokeDasharray="1000"
                strokeDashoffset={s.dashoffset} />
        );
      })}
    </svg>
  );
}
WordmarkDrawIn.duration = 2.4;  // max delay 0.7s + draw 2.0s − overlap
```

Drive the `t` prop from scene-local time. Total wall-clock is **~2.4s** (last-staggered path's delay 0.7s + its 2.0s draw window − 0.3s shared overlap). Allocate ~3.5s of scene budget for it (2.4s draw + ~0.5s entrance fade + ~0.5s hold before the tag fades in).

### Don't add a rewind phase

An older version of this skill suggested a 1.0s rewind (filled → outline → empty) before the draw-in. **Don't do this.** It reads as "the logo appears, then disappears, then appears again" — three transitions for one beat, which feels indecisive and burns ~1 extra second of runtime. The single-pass version above (blank → strokes → fill) is shorter, cleaner, and the writing-itself motion is exactly the same.

**Why `pathLength="1000"`** — normalizing every path's length to 1000 means `strokeDasharray="1000" strokeDashoffset={n}` works the same regardless of the path's actual geometry. Without this you'd need to measure each path with `getTotalLength()`.

## Persistent corner logo (in `Stage`)

Render the wordmark inside `Stage` so it appears on every scene without each scene needing to remember:

```jsx
function Stage({ duration, ...rest }) {
  const [t, setT] = useState(0);
  // … RAF loop …
  return (
    <div className="stage" style={{ width, height, position: 'relative', /* … */ }}>
      <StageCtx.Provider value={{ t, duration }}>
        {children}
        <CornerLogo tNow={t} totalDur={duration} />
      </StageCtx.Provider>
    </div>
  );
}

function CornerLogo({ tNow, totalDur }) {
  // Auto-fade out 6-7s before the end so the outro draw-in can take over.
  const fadeStart = Math.max(0, totalDur - 6.5);
  const op = tNow < fadeStart
    ? 0.85
    : 0.85 * Math.max(0, 1 - (tNow - fadeStart) / 0.6);
  if (op < 0.01) return null;
  return (
    <div style={{
      position: 'absolute', right: 28, bottom: 22, zIndex: 50,
      opacity: op, pointerEvents: 'none',
    }}>
      <Wordmark width={108} />
    </div>
  );
}
```

**Why the auto-fade:** the corner logo is silent ambient branding throughout the video. When the outro draws the same wordmark center-stage, the corner version becomes redundant noise — fade it out a beat before the outro reveal so attention lands on the big version cleanly.

**Sizing:** 100–120px wide for a 1280×720 or 1440×810 stage. Larger reads as "the logo is the content" (wrong); smaller reads as a ghost (also wrong).

**Position:** bottom-right is the convention (like a TV broadcaster's bug). Bottom-left works if your scene content lives top-right. Top corners read as a watermark — avoid.

## Intro pattern

In scene 1, run the eyebrow + wordmark *after* the title so it doesn't compete:

```
0.0s  fade-in eyebrow ("A [Org] Innovation")
0.2s  hold
1.0s  title types in
2.5s  subtitle reveals
3.5s  wordmark scales in (outBack overshoot)
4.0s  hold
6.0s  scene out
```

The wordmark in the intro should be **bigger than the corner logo** (160–200px vs 100–120px) and **centered**, not corner-anchored. It's saying "this is who made this," which deserves stage real estate for one beat.

## Outro pattern

Replace the final text frame with the wordmark draw-in. Sequence:

```
0.0–3.5s   three-line CTA stagger ("Product Name", "Market.", "Tagline.")
3.5–4.1s   text blurs (filter: blur(14px)) and fades to 0
4.1s       wordmark draw-in begins (blank → strokes write themselves → fill)
4.1–6.5s   wordmark animates (~2.4s); corner logo has already faded out
6.5–8.0s   wordmark holds; tag fades in below ("Org · Vertical · Year")
8.0s       end
```

Total outro: ~8.5s. The text blur-out before the wordmark draw-in creates a clean "stage clear" moment so the wordmark owns the frame.

## Two-logo handoff (Nexus pattern)

If your video transitions from a **product wordmark** (e.g. NEXUS) to the **parent-org wordmark** (e.g. H3L), use a 3D ribbon-twist between them — see `Polaris/demo-video/src/04-logo.jsx::NexsToH3lHandoff` for the full implementation:

```jsx
// CSS pattern: two SVG halves, each clipped to top/bottom 50%, rotating on
// opposing rotateX axes about the horizontal seam. backfaceVisibility hides
// each face as it passes 90°.
<div style={{ perspective: 1800 }}>
  <div style={{ transformStyle: 'preserve-3d' }}>
    {/* Product face — top half */}
    <div style={{ clipPath: 'inset(0 0 50% 0)', transform: `rotateX(${productTopAngle}deg)`,
                  backfaceVisibility: 'hidden' }}>{productSvg}</div>
    {/* Product face — bottom half */}
    <div style={{ clipPath: 'inset(50% 0 0 0)', transform: `rotateX(${productBotAngle}deg)`,
                  backfaceVisibility: 'hidden' }}>{productSvg}</div>
    {/* Org face — same pattern, pre-rotated 180° so it appears as product rotates out */}
    <div style={{ clipPath: 'inset(0 0 50% 0)', transform: `rotateX(${orgTopAngle}deg)`,
                  backfaceVisibility: 'hidden' }}>{orgSvg}</div>
    <div style={{ clipPath: 'inset(50% 0 0 0)', transform: `rotateX(${orgBotAngle}deg)`,
                  backfaceVisibility: 'hidden' }}>{orgSvg}</div>
  </div>
</div>
```

Use this only when you have two wordmarks to feature. For a single-wordmark video (like CUC PIRD), just do the draw-in.

## Checklist

- [ ] Brand wordmark exists as multi-path SVG (not flattened, ≥20 paths preferred)
- [ ] Each path tagged with a class encoding its color (e.g. `class="brand-p brand-primary"`)
- [ ] `build.mjs` extracts paths into `window.__BRAND_PATHS__`
- [ ] `Wordmark` static component defined, takes `width`, `mono`, `opacity`
- [ ] `WordmarkDrawIn` animated component defined, takes `width`, `t`, `mono`
- [ ] `Stage` renders persistent `CornerLogo` with auto-fade before outro
- [ ] Intro scene budgets ~1.5s for eyebrow + wordmark beat *after* the title
- [ ] Outro scene budgets ~5.5s for text blur-out + wordmark draw-in (~3.4s) + tag

## What NOT to do

- **Don't reuse a flat PNG** for the draw-in — there are no paths to animate. PNG is fine for the corner logo if vector isn't available, but the draw-in moment requires vector.
- **Don't put the corner logo on top of important content** — bottom-right is the safe corner for most scenes; if a scene puts critical content there, hide the corner logo for that scene only via a per-scene override prop.
- **Don't animate the corner logo** — it's ambient branding, not a feature. Static is the goal. Only fade-out at the end.
- **Don't use 3 different brand wordmarks in one video** — pick one (or two with the handoff pattern). Three reads as confused.
- **Don't draw-in the wordmark in the middle of the video** — it's a closer beat. Used mid-video, it telegraphs "this video is about to end" for a full 4 seconds and burns the punch.
