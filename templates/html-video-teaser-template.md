# HTML Video Teaser Template

Use this for standalone HTML animations that play like videos.

## Fill This In

- Working title:
- Audience:
- Goal:
- Duration:
- Number of scenes:
- Stage size: 1280 x 720 or 1440 x 810
- Mode A or B preference:
- Brand assets:
- Audio needed:
- Hosting target:

## Prompt

```text
Use the uploaded Video Prompting kit and HTML video teaser references.

I want a web-native HTML video teaser for:
[topic/product]

Audience:
[audience]

Goal:
[goal]

Duration:
[duration]

Assets:
[logos, screenshots, SVGs, audio, product notes]

Before writing code:
1. Decide Mode A or Mode B and explain why.
2. Create a storyboard with scene names, story beat, duration, background, motion, and assets.
3. Confirm the total runtime.
4. Build one scene end-to-end first.
5. Use one scalar `t`, one requestAnimationFrame loop, fixed stage pixels, and pure time-driven scenes.
6. Include fullscreen controls and verification steps.
```

## Technical Rules

- One `t` drives everything.
- One RAF loop only.
- No CSS animation except caret blink.
- No real video tag.
- No canvas or WebGL unless specifically approved.
- No GSAP, Framer Motion, or spring libraries.
- Author in fixed stage pixels.
- Use phase budgets for scene timing.
- Cross-fade scene backgrounds.
- Hold the last frame.

## Storyboard Table

| Scene | Duration | Beat | Background | Key visual | Motion | Assets |
|---|---:|---|---|---|---|---|
| 1 |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |
