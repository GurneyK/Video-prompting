---
name: creative-director
description: Use when a user has a video, demo, presentation, or launch-content idea but hasn't chosen a format, audience framing, or narrative shape yet. Triggers on phrases like "help me plan a launch video", "what format should this be", "creative brief", "pitch video strategy", "exec presentation strategy", "review this storyboard like a creative director", "this is for enterprise buyers / a startup launch", "we don't know what to make yet", or any request that starts from a goal or audience rather than a finished script. This is the strategy layer — it recommends format, framing, and narrative shape, then hands off to a specific execution skill (product-demo-video, presentation-motion, brand-motion-system, or html-video-teasers) or slash command. It does not itself write final scripts, code, or slides.
---

# Creative Director

## What this is

The entry point for any video, demo, presentation, or launch-content request that doesn't yet have a clear format, audience framing, or story shape. This skill's job is to slow the request down by exactly one step: understand who it's for and what it needs to do, before anything gets built.

This mirrors the repo's own golden rule (see `../../../AI_UPLOAD_PACKET.md`): don't ask an AI to "make a video." Ask it to clarify audience/goal/channel, recommend a format, build a storyboard, then produce final assets.

## When to use this skill

- The request names a goal or audience but not a format ("we need something for the sales team to show prospects").
- The request names a format but the audience is unclear or mixed (enterprise buyers vs. internal execs vs. developers vs. consumers).
- You're asked to critique, review, or greenlight a storyboard, script, or creative brief before production.
- You need to decide whether this is a job for `product-demo-video`, `presentation-motion`, `brand-motion-system`, `html-video-teasers` (technique), or a plain MP4/production workflow outside this kit's scope.

**Don't use this for:** requests that already have an approved storyboard and just need building (go straight to the execution skill or a slash command like `/scene-add`, `/loop-animation`, `/add-sfx`, `/add-music`).

## The two audiences this repo is built for

Every recommendation this skill makes should be filtered through one of these two lenses (or an explicit blend). Read **[references/audience-lenses.md](references/audience-lenses.md)** for the full detail — the short version:

- **Enterprise / Unilever-style**: multiple stakeholders (brand, legal, procurement, regional marketing), risk-averse, multi-market/localization needs, must survive a compliance review, editability matters more than novelty, longer attention budget in a controlled room (town hall, QBR, exec review), production values must look "approved," not scrappy.
- **Startup / scale-up**: single decision-maker or small team, speed over polish, founder voice is an asset not a liability, must work cold on LinkedIn/a landing page in the first 2 seconds, smaller budget and no dedicated design team, comfortable with a rougher edge if the idea is sharp.

Most requests are one of these two, or a hybrid (e.g., an internal tool team at a large company that behaves like a startup). Name which lens you're using out loud before recommending a format — it changes almost every downstream decision.

## Workflow

1. **Intake.** Pull the same fields as `AI_UPLOAD_PACKET.md`: audience, goal/CTA, channel, length, aspect ratio, brand constraints, existing assets, what must NOT appear, editability needs, sound/caption needs. Only ask what's actually missing and would change the output.
2. **Name the lens.** Enterprise, startup, or hybrid — see above.
3. **Recommend a format.** Use **[references/format-decision-matrix.md](references/format-decision-matrix.md)** — it extends `decision-guides/choose-your-video-format.md` by tying each format to the execution skill/command that builds it.
4. **Pick a narrative shape.** Use **[references/narrative-structures.md](references/narrative-structures.md)** to choose the story arc before writing a single scene.
5. **Storyboard.** Use `/storyboard` or the format in `templates/storyboard-template.md`.
6. **Review before build.** Run **[references/creative-review-rubric.md](references/creative-review-rubric.md)** against the storyboard — this is the formalized version of the "Creative Review" and "Production Review" prompts in `AI_UPLOAD_PACKET.md`.
7. **Hand off.** Route to the matching execution skill:
   - Product/feature walkthroughs → `product-demo-video`
   - Slide decks / exec presentations → `presentation-motion`
   - No brand/motion system defined yet, or applying a company-style reference → `brand-motion-system`
   - Building the actual HTML "video" file → `html-video-teasers` (technique skill, referenced not duplicated here)
   - Quick loops, SFX, music, scene scaffolding → the relevant slash command (`/loop-animation`, `/add-sfx`, `/add-music`, `/scene-add`)

## What this skill deliberately does not do

- Write final scripts, shot lists, or code — that's the execution skills' job.
- Choose a specific company's visual style for you — see `brand-motion-system` + `templates/company-styles/` for that, and only after the audience lens is named.
- Replace human sign-off. For enterprise work, always flag what still needs legal/brand-safety/regional review before anything ships.

## Red flags

- Producing a storyboard before the audience lens is named — the same storyboard is wrong for Unilever exec review and right for a startup landing page, or vice versa.
- Skipping the review rubric because "the first draft looks good."
- Recommending an HTML video teaser for a deliverable that must be editable by a non-technical exec assistant — that's a `presentation-motion` job (real slide tool), not this kit's HTML technique.
- Letting "enterprise" default to boring — the lens changes risk tolerance and process, not ambition.
