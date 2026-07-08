# Video Prompting Master Guide

This guide explains how to move from a vague video idea to a usable storyboard, prompt, implementation plan, and QA process.

## The Core Workflow

```text
Idea -> intake -> format decision -> storyboard -> production prompt -> asset build -> QA -> publish
```

Most failed AI video work skips the middle: the AI jumps from idea to output. This kit forces the missing layer.

## Step 1: Intake

Capture:

- Audience
- Goal
- Channel/platform
- Length
- Aspect ratio
- Brand constraints
- Existing assets
- CTA
- Tone
- Legal/compliance needs
- Final deliverable
- Editability needs

If any of those are unknown, the AI should ask before making final output.

## Step 2: Format Decision

Use the smallest format that solves the problem.

| Need | Format |
|---|---|
| Final shareable video file | MP4 |
| Team-editable business story | PowerPoint/Keynote |
| Linkable code-driven animation | HTML video teaser |
| Product interaction exploration | Figma prototype or HTML |
| Tiny loop | GIF or short MP4 |
| Campaign concept | Storyboard markdown |

## Step 3: Storyboard

Storyboard before production. Required fields:

- Scene name
- Duration
- Message
- Visual
- Motion
- Copy
- Audio/SFX
- Required assets
- QA risk

The storyboard should make the whole video understandable without watching it.

## Step 4: Prompt Or Implementation Plan

Only after the storyboard is approved:

- For AI video tools: create shot-by-shot prompts.
- For presentations: create slide-by-slide animation notes.
- For HTML teasers: create scene files, timeline, and verification plan.
- For GIFs: create loop timing and start/end match.
- For showreels: create edit sequence and transition logic.

## Step 5: Motion Design Rules

- Motion should clarify the story.
- One beat should have one dominant action.
- Avoid constant movement.
- Use holds as reading time.
- Use staggered reveals for lists.
- Use Morph for before/after changes.
- Use fades for attention shifts.
- Use cursor motion only when it demonstrates action.
- Use sound only for structural moments.

## Step 6: Platform Awareness

| Platform | Watch-outs |
|---|---|
| LinkedIn | Silent autoplay, captions, first 2 seconds matter |
| Teams/Slack | Small previews, readable text, short loops |
| Website hero | Fast load, responsive crop, no autoplay sound |
| Event screen | Large text, high contrast, audio optional |
| Executive deck | Editable slides, notes, restrained motion |
| GitHub Pages | Static HTML, CDN scripts, no private assets |

## Step 7: Asset Discipline

Track every asset:

- Logo origin
- Font license
- Music/SFX license
- Screenshot ownership
- Customer marks
- Product data
- Confidential content

Never ask an AI to recreate a logo or customer mark from memory. Use approved files.

## Step 8: QA

Minimum checks:

- Message is clear with sound off.
- Text is readable on mobile and laptop.
- Final frame makes sense.
- No accidental private info.
- Brand is correct.
- Captions or subtitles exist when needed.
- File runs where it will be shared.
- Timing does not feel rushed.

For HTML teasers, use [references/verification-checklist.md](references/verification-checklist.md).

## What To Ask AI At Each Stage

### Strategy

```text
Given this audience, goal, channel, and length, recommend the best video format and explain tradeoffs.
```

### Storyboard

```text
Create a storyboard with scene time, visual, motion, copy, audio, required assets, and QA risk. Keep the total under [duration].
```

### Creative Review

```text
Review this storyboard like a creative director. What feels generic, unclear, too long, off-brand, or hard to produce?
```

### Production Review

```text
Review this storyboard like a producer. Identify missing assets, legal risks, platform issues, and technical blockers.
```

### Final Prompt

```text
Turn the approved storyboard into prompts for [tool], preserving scene timing, brand constraints, camera/motion direction, and negative prompts.
```

## Common Mistakes

- Asking for the final video before a storyboard
- Forgetting where the video will be watched
- Using too much text
- Treating motion as decoration
- Using unapproved logos or screenshots
- Ignoring captions/silent playback
- Making something impossible to edit later
- Letting the AI choose brand identity from scratch
- Skipping QA after the first good-looking render
