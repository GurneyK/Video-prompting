# Quick Start

Use this when you want to start a video, animated presentation, demo, GIF, or motion concept quickly.

## 1. Pick The Output

Choose one:

| Goal | Best starting point |
|---|---|
| Marketing/ad concept | [templates/video-ad-prompt-template.md](templates/video-ad-prompt-template.md) |
| Animated presentation | [templates/presentation-motion-template.md](templates/presentation-motion-template.md) |
| Product walkthrough | [templates/product-demo-template.md](templates/product-demo-template.md) |
| Web-native teaser | [templates/html-video-teaser-template.md](templates/html-video-teaser-template.md) |
| Small looping asset | [templates/gif-loop-template.md](templates/gif-loop-template.md) |
| Showreel clip | [templates/showreel-segment-template.md](templates/showreel-segment-template.md) |

## 2. Upload To AI

Upload these files to Claude, Codex, or another AI tool:

1. [AI_UPLOAD_PACKET.md](AI_UPLOAD_PACKET.md)
2. One template from [templates/](templates/)
3. Any brand guide, logo, screenshots, product notes, or source material you want the AI to use

For HTML video teasers, also upload:

1. [assets/animations.jsx](assets/animations.jsx)
2. [assets/scene-template.jsx](assets/scene-template.jsx)
3. [assets/build.mjs](assets/build.mjs) if the project has more than three scenes

## 3. Paste This Prompt

```text
Use the uploaded Video Prompting kit.

I want to create a [format] for [audience] to achieve [goal].

Before creating the final output, do this in order:
1. Ask only the missing questions that matter.
2. Recommend the best format and explain why.
3. Create a storyboard with scene names, timing, visual idea, copy, motion, and assets.
4. Create the production prompt or implementation plan.
5. Give me a QA checklist before delivery.
```

## 4. Provide These Inputs

```text
Audience:
Goal:
Channel/platform:
Length:
Aspect ratio:
Tone:
Brand:
Required assets:
Do not include:
Call to action:
Deadline:
Final deliverable:
```

## 5. Do Not Skip Storyboarding

The storyboard is the control layer. It prevents the AI from jumping into random visuals, code, or generic ad copy.

Minimum storyboard columns:

- Scene
- Duration
- Message
- Visual
- Motion
- On-screen text
- Audio/SFX
- Assets needed
- Risk/QA note

## 6. Review Before Production

Before asking for final files, ask:

```text
Review this storyboard like a creative director and a production lead. Identify unclear messaging, pacing issues, missing assets, brand risks, and platform problems.
```
