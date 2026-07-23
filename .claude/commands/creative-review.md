---
description: Run the scored creative-director + producer review rubric against a storyboard, script, or deck before production
argument-hint: [target file/description]
---

Run a creative review on: $ARGUMENTS

Follow `.claude/skills/creative-director/references/creative-review-rubric.md` exactly.

1. Score each of the 5 dimensions 1-5: Clarity, Distinctiveness, Credibility, Feasibility, Brand & Audience Fit. Give one specific line of reasoning per score — never just a number.
2. Any dimension scoring ≤2 is a blocking issue — call it out explicitly rather than letting a strong average paper over it.
3. For Clarity: check the piece works with sound off, one main idea per scene, and that every scene actually changes what the viewer understands (cut anything that doesn't, per `VIDEO_PROMPTING_MASTER_GUIDE.md`).
4. For Distinctiveness: check whether the opening could be mistaken for a competitor's with the logo swapped, and whether any company-style reference used (`/company-style`) reads as "inspired by" rather than "a copy of."
5. For Credibility: check every on-screen claim/number is defensible, especially for enterprise-audience content where this is also a compliance concern; check any demo data reads as obviously placeholder, not real customer data (`.claude/skills/product-demo-video/references/data-and-dashboard-fakery.md`).
6. For Feasibility: check every scene can actually be built with assets on hand, and that the total scope is realistic for the stated timeline.
7. For Brand & Audience Fit: confirm the pacing/copy density/tone matches the named audience lens, and that required stakeholder reviews (legal/brand/regional, for enterprise) are identified even if not yet completed.
8. Output in the exact format from the rubric:
   ```text
   Clarity:          X/5 — [reason]
   Distinctiveness:  X/5 — [reason]
   Credibility:      X/5 — [reason]
   Feasibility:      X/5 — [reason]
   Brand/Audience:   X/5 — [reason]

   Blocking issues (score ≤2): [list or "none"]
   Recommendation: [ready for production / revise and re-review / needs a different format]
   ```
9. If the recommendation is "revise and re-review," list the specific changes needed, not just the scores — this should be actionable without a follow-up question.
