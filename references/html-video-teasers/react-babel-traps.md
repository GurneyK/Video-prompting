# React + Babel-standalone traps

Read this **every time** before writing or modifying a teaser. These traps silently break the runtime in ways that are hard to debug — the symptom is usually "React is not defined" or "Cannot read property X of undefined" pointing at a line that looks fine.

## Trap 1: top-level `const`/`let` collisions across files

Every `<script type="text/babel">` block — and every file concatenated into one such block by `build.mjs` (Mode B) — evaluates in **the same global scope**. Any top-level `const`/`let` in two files with the same name → `SyntaxError: Identifier 'X' has already been declared`. Compilation fails silently for the whole block; React never mounts; the page is blank.

**Two flavors of the same bug:**

```jsx
// Flavor A: same identifier (the common one)
// in 02-primitives.jsx
const { Layer, useTime } = window;
// in 03-faux-ui.jsx — collides!
const { Layer, Caret } = window;

// Flavor B: namespaced style objects
const styles = { container: {…}, header: {…} };  // file A
const styles = { container: {…}, item: {…} };    // file B — collides!
```

**Symptom:** Page is completely blank. `document.querySelector('#app').children.length === 0`. **No console error from React** — the syntax error happens in Babel before any of your code runs. (Babel-standalone may log to console; check there first.)

**Fix:** Wrap each top-level file in an IIFE so its `const`s are scoped:

```jsx
// 03-faux-ui.jsx
(function () {
  const { Layer, Caret } = window;
  function HeaderPill() { /* … */ }
  Object.assign(window, { HeaderPill });
})();
```

Scene files in the Nexus pattern already do this. Apply the same wrapping to every non-scene file that destructures globals. The first/foundational file (`02-primitives.jsx`) doesn't need wrapping if it's the only file declaring those names — but defensively IIFE-wrap them all and you'll never hit this.

**For style objects specifically:** use namespaced names AND IIFE wrapping for belt-and-suspenders safety:

```jsx
const terminalStyles = { container: {…} };
const sidebarStyles  = { container: {…} };
```

**How to debug fast:** if React isn't mounting and the console only shows the Babel-standalone production warning, run the source through `@babel/parser` to find the exact line:

```js
const { parse } = require('@babel/parser');
const html = require('fs').readFileSync('teaser.html', 'utf8');
const src = html.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/)[1];
try { parse(src, { sourceType: 'script', plugins: ['jsx'] }); }
catch (e) { console.log(e.message, 'line', e.loc?.line); }
```

This catches Trap 1 in <1 second.

## Trap 2: Babel scripts don't share scope

Components defined in one `<script type="text/babel">` block are NOT automatically available in another block. Each block is a closed scope after compilation.

**Symptom:** `ReferenceError: Terminal is not defined` even though you can see `function Terminal() {…}` in another block.

**Fix:** Treat `window.*` as your ad-hoc module system. Export at the bottom of one block, import at the top of the next:

```jsx
// block A: components
function Terminal({ children }) { return <div>{children}</div>; }
function Spacer({ h }) { return <div style={{ height: h }} />; }
Object.assign(window, { Terminal, Spacer });

// block B: scenes
const { Terminal, Spacer } = window;
function scene1() { return <Terminal>…</Terminal>; }
```

For Mode B (multi-file build), the `build.mjs` concatenation puts everything in one block — but the same rule applies *across blocks* if you ever split. Be explicit.

## Trap 3: integrity hashes must match exactly

CDN scripts loaded with `integrity="sha384-…"` will be **silently refused** by the browser if the hash doesn't match the actual file contents. The script never runs. React isn't defined. JSX in the next block fails with a misleading "React is not defined" error.

**Symptom:** "React is not defined" — but the `<script>` tag is right there.

**Fixes:**
- Copy hashes byte-for-byte from a trusted source (e.g. the upstream skill's `prototype-shell.html`).
- If you change versions, regenerate via [SRI Hash Generator](https://www.srihash.org/) — never guess.
- During development, you can drop `integrity` entirely and add it back before shipping. Just don't ship a wrong hash.

The pinned versions used by the reference videos:

```html
<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"
        integrity="sha384-MgDjzfAmsd/yiSXMC0iZS62Sj+5ZchoG7nzqDjYVFRxz9LhjPYWO+rGm6bWXrNJF"
        crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"
        integrity="sha384-fAUpmqLXdJaKDZ0LHLp2g6gP1OlV+NOJj7Qzzxa1iN8R1bPbVcQOgo3yCrVqBAkk"
        crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"
        crossorigin="anonymous"></script>
```

(Verify the hashes for the React/ReactDOM versions you actually use — these may need regeneration if unpkg ever updates the bundle byte-for-byte.)

## Trap 4: `scrollIntoView` breaks embedded previews

If your teaser uses `element.scrollIntoView()` (e.g. to keep the latest streamed-LLM token in view), it scrolls the **embedding parent** when iframed — not just the iframe.

**Symptom:** When the teaser plays inside the host site, the host page scrolls.

**Fix:** Use container-scoped scrolling:

```js
// ❌ wrong
chatRef.current.scrollIntoView();

// ✅ right
chatRef.current.scrollTop = chatRef.current.scrollHeight;
// or:
chatRef.current.scrollTo({ top: chatRef.current.scrollHeight });
```

## Trap 5: `type="module"` is not supported by Babel-standalone

Don't add `type="module"` to a `<script type="text/babel">` tag. Babel-standalone doesn't transpile modules; the script silently does nothing.

**Symptom:** A whole block worth of components vanishes; downstream `Terminal is not defined` cascades.

**Fix:** Just `<script type="text/babel" data-presets="react">…</script>`. No module attribute.

## Trap 6: Babel must load AFTER React

The order in `<head>` (or before the `<body>` scripts) must be:

```html
1. react.production.min.js
2. react-dom.production.min.js
3. @babel/standalone/babel.min.js
4. (your <script type="text/babel"> blocks)
```

Babel needs to see the `text/babel` mime-type registered before it can find the blocks. React must be on `window` before any compiled JSX runs.

## Trap 7: `process.env.NODE_ENV` is undefined in browser

If you accidentally ship code that reads `process.env.NODE_ENV`, you'll get `Uncaught ReferenceError: process is not defined`.

**Fix:** Either delete the reference, or stub at the top:

```js
window.process = window.process || { env: { NODE_ENV: 'production' } };
```

Most React 18 production builds don't read this, but third-party JSX-style code copied from the web sometimes does.

## Trap 8: large files slow Babel transpile

A single `<script type="text/babel">` over ~10,000 lines starts to noticeably delay first paint. Babel-standalone is in-browser and synchronous.

**Fixes:**
- Mode B: split into multiple `<script type="text/babel">` blocks (concat keeps things separated)
- Strip unused imports / dead code
- For production embeds, consider pre-compiling JSX with `@babel/parser` at build time and shipping plain JS — but you lose the "open the file and it works" property

## Quick checklist before shipping

- [ ] All style/component constants are namespaced (no shared `const styles =`)
- [ ] Cross-block dependencies use `window.*` explicitly
- [ ] Integrity hashes verified (or removed for dev)
- [ ] No `scrollIntoView` anywhere
- [ ] No `type="module"` on Babel scripts
- [ ] React → ReactDOM → Babel order in head
- [ ] No `process.env` references
- [ ] First paint < 1s on a normal laptop (open dev tools, hard reload, watch the timeline)
