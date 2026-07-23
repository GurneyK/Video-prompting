---
name: product-demo-video
description: Use when building a product or feature demo video — a click-through walkthrough, "show the product in action" clip, feature-reveal, workflow animation, or before/after product demo. Triggers on phrases like "product demo video", "feature walkthrough", "show the product in action", "click-through demo", "SaaS demo video", "workflow animation", "demo this feature", "sales enablement video", "onboarding walkthrough video". Covers the creative direction for demo content specifically (narrative pacing, cursor/UI choreography, realistic fake data) — for the actual HTML-video render technique, see the html-video-teasers skill; for audience/format strategy before you get here, see creative-director.
---

# Product Demo Video

## What this is

Creative direction for videos whose entire job is to make a real (or faked) product interaction look clear, fast, and credible. This is different from a brand teaser: a demo's hero is the UI, not typography or brand motion. Get the cursor choreography and pacing wrong and the most beautiful video in the world reads as confusing or fake.

If you haven't yet decided this is the right format, back up to `creative-director`. If you have, and the output is an HTML "video," pair this skill with `html-video-teasers` for the render technique — this skill governs *what* the demo shows and how it's paced, that skill governs *how* the file is built.

## When to use this skill

- Showing a specific workflow, feature, or "aha moment" inside a real or simulated product UI.
- Sales enablement clips, onboarding walkthroughs, feature-reveal announcements, "what's new" release videos.
- Any request where the honest answer to "what's the hero of this video" is a screen, not a person or a brand mark.

**Don't use this for:** brand teasers with no UI content (use `creative-director` → narrative arc, no demo-specific pacing needed), slide decks (use `presentation-motion`), or pure marketing claims videos with no product shown.

## Core discipline: the 3-click rule

A viewer should see the product deliver value within 3 perceived interactions (clicks, keystrokes, or drags) of the demo starting. If it takes longer to get to the payoff, either the feature needs a better entry point in the story or the demo is showing the wrong workflow. Read **[references/demo-narrative-patterns.md](references/demo-narrative-patterns.md)** for the full pacing pattern this rule sits inside.

## Mandatory reading before you build

- **[references/demo-narrative-patterns.md](references/demo-narrative-patterns.md)** — problem-context → workflow → payoff → proof point → CTA pacing, and the 3-click rule in full.
- **[references/cursor-and-ui-choreography.md](references/cursor-and-ui-choreography.md)** — cursor easing, click-feedback, realistic typing speed, focus/dim techniques, zoom-in on the money moment. This is the difference between a demo that reads as "real workflow" and one that reads as "screenshots with a moving arrow."
- **[references/enterprise-vs-startup-demo.md](references/enterprise-vs-startup-demo.md)** — how the same feature demo should look different for a Unilever-style enterprise buyer vs. a startup user. Read `creative-director/references/audience-lenses.md` first if you haven't named the lens yet.
- **[references/data-and-dashboard-fakery.md](references/data-and-dashboard-fakery.md)** — how to build believable placeholder data, dashboards, and charts without ever using real customer data, real logos, or real names.

## Workflow

1. Confirm the audience lens (`creative-director/references/audience-lenses.md`) if not already named.
2. Pick the single feature or workflow that is the reason someone would care — max 3 features per demo (`creative-director/references/narrative-structures.md` → Feature→Benefit→Proof).
3. Storyboard using the demo-specific columns from `demo-narrative-patterns.md` (adds a "UI state" and "cursor action" column to the standard storyboard table).
4. Design the fake data per `data-and-dashboard-fakery.md` before building any scene that shows a screen.
5. Build with `html-video-teasers` (technique) if output is a hosted HTML file, applying `cursor-and-ui-choreography.md` for every interaction beat.
6. Run the `creative-review-rubric.md` from `creative-director`, paying particular attention to the Credibility dimension (is the data obviously fake, is the workflow real).

## Red flags

- A cursor that teleports between clicks instead of easing — reads as fake immediately.
- More than 3 features in one demo — nothing lands, everything feels like a list.
- Real customer names, logos, or data anywhere in a placeholder dashboard.
- A demo that shows the feature but never shows *why it matters* (missing the Benefit beat).
- Typing text at literally-instant speed or at obviously-uniform character intervals — both read as fake; see `cursor-and-ui-choreography.md` for realistic ranges.
- Enterprise demo with startup pacing (too fast to read) or startup demo with enterprise pacing (too slow to hold attention) — check the lens.
