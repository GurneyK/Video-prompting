# HTML Video Teasers Reference

This folder contains the technical pattern for building standalone HTML pages that play like videos.

## What It Is

An HTML video teaser is:

- a web page
- driven by one time value
- built from scenes
- rendered with React/JSX/SVG/divs
- playable, scrubable, and hostable
- not a real video file

## When To Use

Use this for:

- launch teasers
- product demos
- feature reveals
- animated showreel clips
- hosted web presentations
- fake UI walkthroughs

Do not use this when the final deliverable must be a normal MP4 upload.

## Core Rules

- One scalar `t`
- One RAF loop
- Fixed stage pixels
- Scene functions
- Phase budgets
- Cross-fades
- Fullscreen
- Browser verification

## Important Source Files

- [architecture.md](architecture.md)
- [animation-primitives.md](animation-primitives.md)
- [delivery-modes.md](delivery-modes.md)
- [scenes-and-pacing.md](scenes-and-pacing.md)
- [branding-and-logos.md](branding-and-logos.md)
- [sound-design.md](sound-design.md)
- [react-babel-traps.md](react-babel-traps.md)
- [verification.md](verification.md)

## Starter Assets

Use:

- [../../assets/animations.jsx](../../assets/animations.jsx)
- [../../assets/scene-template.jsx](../../assets/scene-template.jsx)
- [../../assets/build.mjs](../../assets/build.mjs)
