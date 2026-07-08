# Delivery modes: A (single-file) vs B (multi-file build)

Both modes ship the same runtime and produce the same kind of artifact. The only difference is authoring ergonomics. Pick one based on project scale.

## Mode A — single-file Babel-standalone

**One `.html` file** containing everything: pinned React+Babel `<script>` tags, all source as inline `<script type="text/babel">` blocks, all assets as data URIs or inline SVG.

### When to use Mode A

- Total source < 2000 lines
- Single author
- Rapid iteration (refresh = rebuild)
- Demo to send via DM/email/Slack — recipient just opens the file
- Prototyping a new visual idea before committing to a multi-scene project

### Layout

```html
<!doctype html>
<html>
<head>
  <script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"
          integrity="sha384-…" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"
          integrity="sha384-…" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"
          integrity="sha384-…" crossorigin></script>
  <style>/* minimal: caret blink keyframe, html/body reset */</style>
</head>
<body>
  <div id="app"></div>

  <script type="text/babel" data-presets="react">
    // primitives: Stage, Sprite, Layer, useTime, interpolate, Easing, seq, hold, envS
  </script>
  <script type="text/babel" data-presets="react">
    // theme tokens, palette, typography
  </script>
  <script type="text/babel" data-presets="react">
    // hand-built faux-UI components (MiniBrowser, Composer, Cursor, …)
  </script>
  <script type="text/babel" data-presets="react">
    // scene1Intro
  </script>
  <!-- … one block per scene … -->
  <script type="text/babel" data-presets="react">
    // App: SCENE_FNS, SCENE_BG, SCENE_TEX, computeDurs, mount
    ReactDOM.createRoot(document.getElementById('app')).render(<App />);
  </script>
</body>
</html>
```

See [`assets/shell-single-file.html`](../../assets/shell-single-file.html) for a working starter.

### Trade-offs

| Pro | Con |
|---|---|
| Zero toolchain — just open the file | Source > 2000 lines becomes painful in one editor tab |
| Easy to share — one attachment | Multi-author merges are messy |
| Refresh = rebuild | No syntax highlighting across "files" |
| Babel transpiles in-browser, ~200ms cost | First-load cost (~200ms) on every refresh |
| Works as an email attachment | No external bundler features (tree-shaking, minification, etc.) |

## Mode B — multi-file ESM with `build.mjs` concat

A `src/` directory of separate `.jsx` files, numerically prefixed. A small Node script (`build.mjs`) concatenates them in order into a single inline `<script type="text/babel">` block inside an HTML shell.

### When to use Mode B

- Total source > 2000 lines
- Multiple authors / scenes / iterations
- You want per-file syntax highlighting and language-server support
- You want to inline binary assets (PNG/SVG/audio) at build time
- You want a separate "preview during dev" workflow vs "ship a single file"

### Layout

```
project/
├── build.mjs                      # the concatenator
├── package.json                   # only dev-deps (playwright for screenshots, @babel/parser for lint)
├── src/
│   ├── 00-theme.jsx               # color tokens, typography
│   ├── 01-utils.jsx               # interpolate, easing, seq, hold, envS
│   ├── 02-ctx.jsx                 # createTweakCtx
│   ├── 03-audio.jsx               # procedural Web Audio (optional)
│   ├── 04-logo.jsx                # logo SVG/components
│   ├── 05-primitives.jsx          # Stage, Layer, MiniBrowser, Composer, Cursor, …
│   ├── 06-composer.jsx            # feature-specific UI
│   ├── 07-datasets.jsx            # data swatches, file pills, etc.
│   ├── 08-orchestration.jsx       # diagrams, particles
│   ├── 09-player.jsx              # the RAF driver, scene cascade, scrubber
│   ├── 99-app.jsx                 # mount; runs LAST
│   └── scenes/
│       ├── s1-intro.jsx
│       ├── s2-data.jsx
│       └── …
├── assets/
│   ├── logo.png
│   ├── pattern.png
│   └── bgm.mp3                    # optional bgm
└── teaser.html                    # generated output
```

### How `build.mjs` works

```js
const topLevel = readdirSync(SRC).filter(f => /^\d{2}-.*\.jsx$/.test(f)).sort();
const scenes   = readdirSync(join(SRC, 'scenes')).filter(f => /^s\d-.*\.jsx$/.test(f)).sort();
const appFile  = '99-app.jsx';

// numeric-prefix files in order, then scenes, then app last
const files = [
  ...topLevel.filter(f => !/^9\d-/.test(f)),
  ...scenes,
  appFile,
];

const source = files.map(f => readFileSync(join(SRC, f), 'utf8')).join('\n\n');

// Inline binaries as base64 data URIs onto window.__NX_*
const inlineAssets = `
  window.__NX_LOGO_SVG = ${JSON.stringify(readFileSync('assets/logo.svg', 'utf8'))};
  window.__NX_PATTERN_PNG = "data:image/png;base64,${readFileSync('assets/pattern.png').toString('base64')}";
`;

const html = SHELL_HTML.replace('/*INLINE_ASSETS*/', inlineAssets)
                      .replace('/*INLINE_SOURCE*/', source);
writeFileSync('teaser.html', html);
```

See [`assets/build.mjs`](../../assets/build.mjs) for a working starter.

### Trade-offs

| Pro | Con |
|---|---|
| Per-file editor tabs, syntax highlighting, refactor tools | Build step (5–20ms with Node, but you have to remember to run it) |
| Asset inlining at build time keeps output single-file | Slightly more setup before you can see anything render |
| Multi-author ergonomics | Same in-browser Babel cost at runtime |
| Easy to add a watch loop / live-reload | Need to ship `build.mjs` alongside source |
| Numeric prefixes enforce mount order | Script-scope traps still apply (see [react-babel-traps.md](react-babel-traps.md)) |

### Watch loop (optional, for development)

```js
// build.mjs --watch
import { watch } from 'node:fs';
function rebuild() { /* … */ console.log('built'); }
rebuild();
if (process.argv.includes('--watch')) {
  watch('src', { recursive: true }, rebuild);
}
```

## Choosing — the actual rule

If you can hold the whole video in your head, use Mode A. If you can't, use Mode B from the start (don't try to "outgrow" Mode A — porting is annoying because of script-scope collisions).

Heuristic: **>3 scenes or >2 authors → Mode B.**

## Output is the same

Both modes produce **one `.html` file** that:
- Loads React 18 + Babel-standalone from a CDN
- Inlines all source as `<script type="text/babel">`
- Runs without a server, opens directly via `file://`
- Holds the last frame and posts `{type:'finished'}` to its parent

You can iframe either mode into a Next.js page (e.g. login splash, marketing site) the same way.

## Embedding into the host site

Both reference videos are embedded into a host (Polaris login page, etc.). The pattern is:

```jsx
<iframe
  src="/nexus-teaser.html?embed=1"
  style={{ width: '100%', height: '100%', border: 0 }}
  onLoad={(e) => {/* listen for postMessage 'finished' */}}
/>
```

Inside the teaser, check `?embed=1` to hide controls and disable audio:

```js
const embed = new URLSearchParams(location.search).get('embed') === '1';
```
