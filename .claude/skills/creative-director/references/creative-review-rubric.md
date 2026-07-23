# Creative Review Rubric

Formalizes the "Creative Review" and "Production Review" prompts from `AI_UPLOAD_PACKET.md` into a repeatable, scored pass. Run this against any storyboard before handing it to an execution skill. Also the engine behind the `/creative-review` slash command.

## How to run it

Score each dimension 1-5 (1 = fails, 3 = acceptable, 5 = exceptional). Anything scoring ≤2 on any dimension blocks moving to production until addressed — call it out explicitly rather than averaging it away.

## Dimension 1: Clarity

- Would someone understand the point of this with the sound off, having never seen it before?
- Is there exactly one main idea per scene? (Two ideas in one scene usually means neither lands.)
- Does the storyboard's "Purpose" column for every scene say something a viewer would actually walk away knowing — if it doesn't change understanding, cut the scene (per `VIDEO_PROMPTING_MASTER_GUIDE.md`).

## Dimension 2: Distinctiveness

- Does the opening 2-3 seconds look like it could only be this product/company, or could the logo be swapped for a competitor's with no other change?
- Is there at least one moment that wouldn't show up in a generic "AI-generated demo video"? (Watch for: stock gradient orbs, generic particle backgrounds, unearned drone-shot energy, a floating phone mockup with no context.)
- If a company-style template was used (`templates/company-styles/`), has it been adapted to this brand's own content rather than left as a skin?

## Dimension 3: Credibility

- Is every on-screen number, stat, or claim something the team can actually back up? Flag anything that reads as a legal/compliance risk for enterprise contexts.
- Does the "proof" beat show something real (a real workflow, a real before/after) rather than an assertion?
- For demo content: is the data on screen obviously placeholder/synthetic, or could it be mistaken for real customer data? (See `product-demo-video/references/data-and-dashboard-fakery.md`.)

## Dimension 4: Feasibility

- Can every scene actually be built with the assets on hand, or does it assume footage/logos/screenshots that don't exist yet?
- For HTML teaser output: does any scene assume a real `<video>`, WebGL, or asset type outside the technique's constraints (see `html-video-teasers` skill red flags)?
- Is the total scene count realistic for the timeline? (Rule of thumb: budget at least 30-45 minutes of build+verify time per 10 seconds of finished HTML teaser runtime for a first-time builder.)

## Dimension 5: Brand & Audience Fit

- Does the pacing, copy density, and tone match the named audience lens (`audience-lenses.md`) — enterprise restraint and multi-market safety, or startup speed and voice?
- For enterprise: has every required stakeholder review been identified (brand, legal, regional)? Not run — identified, so nothing ships without the right eyes on it.
- For startup: does the first 2 seconds work with sound off on a mobile scroll?

## Output format

Report as:

```text
Clarity:          X/5 — [one line why]
Distinctiveness:  X/5 — [one line why]
Credibility:      X/5 — [one line why]
Feasibility:      X/5 — [one line why]
Brand/Audience:   X/5 — [one line why]

Blocking issues (score ≤2): [list, or "none"]
Recommendation: [ready for production / revise and re-review / needs a different format]
```

Never skip straight to "looks good" on a first pass — per `VIDEO_PROMPTING_MASTER_GUIDE.md` Common Mistakes: "letting QA get skipped after the first good-looking render."
