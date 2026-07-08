# Mode A vs Mode B: HTML Video Teasers

HTML video teasers are web pages that play like videos. They use one time value, one animation loop, and scene functions that render visual states from time.

## Mode A: Single-File HTML

Use Mode A when:

- The teaser is simple.
- The source is under roughly 2,000 lines.
- One person is building it.
- It has one to three scenes.
- You want to send one `.html` file.

Output:

```text
one self-contained .html file
```

Best for:

- feature reveals
- quick demos
- single-scene announcement videos
- email/Slack shareables

## Mode B: Multi-File Source + Build Script

Use Mode B when:

- The teaser has more than three scenes.
- Multiple people may edit it.
- You need separate scene files.
- You need asset inlining.
- You want a more production-grade structure.

Output:

```text
src/*.jsx + assets/* -> build.mjs -> teaser.html
```

Best for:

- product walkthroughs
- showreel segments
- multi-scene launch films
- agent workflow demos
- polished internal/external demos

## Non-Negotiables For Both

- Storyboard first.
- One scalar `t` drives the video.
- One `requestAnimationFrame` loop.
- Fixed stage size such as 1280 x 720 or 1440 x 810.
- Use JSX/SVG/divs and pure functions of time.
- No CSS animation except a simple caret blink.
- No real `<video>`, `<canvas>`, WebGL, GSAP, Framer Motion, or per-scene RAF loops.
- Fullscreen mode is required.
- Verify in a real browser before sharing.

## Prompt To Use

```text
I want an HTML video teaser. Decide whether this should be Mode A or Mode B. Explain why, then create a storyboard before writing code.
```
