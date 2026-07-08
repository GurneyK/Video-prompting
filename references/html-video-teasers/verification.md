# Verification

Before declaring the teaser done, run through this. The video must hold up not just on your machine, but in every embed context and on every replay.

## The six-step verification loop

Run all six — not just the visual check.

### 1. Open in a real browser

Not via the file picker, not via VS Code's preview. Actually `open ./teaser.html` (or your build's output). Watch it play through start to finish.

- Does it play through without stutter?
- Does it hold the last frame (or do you accidentally loop)?
- Does the scrubber (if present) work? Drag it forwards and backwards — do scenes render correctly at every position?

### 2. Console must be clean

Open DevTools → Console. Hard reload (Cmd+Shift+R).

- **Zero red errors.** "React is not defined" → integrity hash issue. "X is not defined" → script-scope trap. Check [react-babel-traps.md](react-babel-traps.md).
- **Zero React key warnings.** Every `.map()` needs a stable `key=`.
- **Zero 404s** in Network tab. All assets must be inline (data URIs / base64 / inline SVG).
- **Zero CORS errors** if loading from a CDN.
- One acceptable warning: React 18 dev-mode strict-mode double-render notice (only present if you use the dev React build).

### 3. Test scaling on multiple viewports

Resize the browser window through several common sizes:

- 1920×1080 (desktop, 1× scale)
- 1440×900 (MacBook 14")
- 1280×800 (smaller laptop)
- 800×600 (small embed)
- 375×667 (mobile portrait — should letterbox cleanly)

The stage scales via `transform: scale(min(vw/W, vh/H))`. At every viewport, the canvas should be **centered, letterboxed black around it, no clipping**.

### 4. Scrub-and-screenshot every scene boundary

For each scene, scrub to:
- 0.5s into the scene (entrance complete?)
- Mid-scene (composition reads as a poster?)
- 0.5s before the boundary (exit started?)
- 0.1s after the boundary (next scene's entrance begun? cross-fade visible?)

**Take a screenshot of every "mid-scene poster" frame.** Each should look like a thoughtful still image, not a frozen mid-transition.

### 5. Fullscreen test (mandatory)

Press **F** (or click the ⛶ button). The video should:

- Enter fullscreen on the entire screen, no browser chrome visible
- Hide the bottom controls bar AND the mouse cursor
- Background of the empty area (letterbox/pillarbox) is solid black, not the page background
- Hovering the bottom edge of the screen brings the controls back, with cursor restored
- Pressing **F** again (or **Esc**) exits fullscreen cleanly with controls back

**Test on Safari too.** The `:-webkit-full-screen` selector is required there — easy to forget.

If any of these fail, the video isn't presentable. Demo recordings, all-hands plays, conference reels all rely on this.

### 6. Embed test

If the teaser will be iframed into a host site:

- Iframe it into a 1280×720 box. Does it scale correctly?
- Iframe with `?embed=1`. Are controls hidden? Audio muted?
- Listen for `postMessage({ type: 'finished' })` from the parent. Does it fire?
- Click any link inside the iframe — does it correctly target `_top` or stay inside? (Usually you don't want links in a teaser at all.)

## Format-specific checks

### For typewriter scenes

- Does the caret blink during typing AND during the post-typing hold?
- Does the typewriter respect the punctuation cadence (commas pause, sentences pause more)? If everything types at constant rate, it reads as fake.
- Hold ≥ 1.5× the typing duration after text finishes.

### For cursor scenes

- Does the cursor variant flip on click-down? Flip back on click-up?
- Click SFX fires exactly once per click, even on re-scrub?
- Cumulative-time array means changing one move duration shifts all later moves — verify by editing one and re-watching.

### For diagram scenes (orchestration, supervisor)

- Particles travel along the bezier path, not in straight lines, when the path is curved
- Each particle has a small lag/trail (3 dots is the Nexus pattern)
- Result chips appear *after* the particle reaches the destination, not simultaneously
- Final composition card lands with `outBack` overshoot

### For deploy / final-state scenes

- The "success" moment has a chime SFX
- The QR code (if any) is real and scannable
- The CTA is the last thing the eye lands on

### For background cross-fades

- No flash of intermediate color (e.g. heather→ivory shouldn't strobe through slate)
- Texture intensity (`SCENE_TEX[]`) crossfades along with color
- `mixBlendMode` flips correctly on dark scenes (`multiply` on light, `screen` on dark)

## Pacing audit

Watch the full thing through twice:

- **First pass** — full speed. Does anything feel rushed (you missed text)? Does anything feel slow (you're waiting)?
- **Second pass** — at 0.5× speed if your player supports it (or scrub manually). Are the holds intentional, or accidental?

Adjust phase budgets and re-verify. A teaser usually takes 5–10 pacing iterations before it feels right.

## File-size check

```bash
ls -la teaser.html
```

- Single-file Mode A: usually 100KB–500KB if you're not inlining many binary assets.
- With inlined logo PNG, pattern texture, BGM: 1MB–5MB is normal.
- Over 10MB → audit your data URIs. A 5MB BGM is the usual culprit (use a lower-bitrate MP3, or strip BGM for the embed build).

The Claude Design teaser is **5MB** because of inline blob URLs. The Nexus teaser is **625KB** because BGM is a sidecar. Both are fine; pick based on how the recipient will load it.

## When to declare done

The video is done when:

- All 6 verification steps pass (including fullscreen)
- Every scene's "mid-scene poster" screenshot looks intentional
- Pacing audit produced no "rushed" or "dragging" notes on the second pass
- The user has watched it once full-screen and signed off

If you can't tick all four, you're not done — you're "ready for one more pass."

## Common verification failures

| Symptom | Likely cause | Fix |
|---|---|---|
| "React is not defined" on first paint | Integrity hash mismatch OR Babel loaded before React | See [react-babel-traps.md](react-babel-traps.md) Trap 3 + Trap 6 |
| Components render with wrong styles | Script-scope `const styles =` collision | Trap 1 — namespace |
| Scene 2 doesn't render after scene 1 | Scene function not exported to `window` | Trap 2 — `Object.assign(window, {…})` |
| Scrubbing backwards doesn't replay SFX | No edge-trigger re-arm in fire registry | See [sound-design.md](sound-design.md) |
| Background flashes mid-color during cross-fade | RGB-walking palette indices instead of two-layer crossfade | See [architecture.md](architecture.md) "Background crossfades" |
| Host page scrolls when teaser plays | `scrollIntoView` somewhere | Trap 4 — use `scrollTop` instead |
| Stage clipped at small viewport | Forgot the resize listener on `useStageScale` | See [architecture.md](architecture.md) "Stage scaling" |
| Pacing feels off but you can't say why | Hold ratios < 50% across the board | Aim for 60% hold / 40% motion in scenes ≥10s |
