# /creative-review

Run the scored creative-director + producer review rubric against a storyboard, script, or deck before production.

Usage: `/creative-review [target file/description]`

Run a creative review on: $ARGUMENTS

Follow `.claude/skills/creative-director/references/creative-review-rubric.md` exactly.

1. Score each of the 5 dimensions 1-5: Clarity, Distinctiveness, Credibility, Feasibility, Brand & Audience Fit — one specific line of reasoning per score.
2. Any dimension scoring ≤2 is a blocking issue — call it out explicitly.
3. Clarity: works with sound off, one idea per scene, every scene changes viewer understanding.
4. Distinctiveness: opening couldn't be mistaken for a competitor's with the logo swapped; any company-style reference reads as "inspired by" not "a copy of."
5. Credibility: every claim/number is defensible; demo data reads as obviously placeholder.
6. Feasibility: every scene buildable with assets on hand; scope realistic for the timeline.
7. Brand & Audience Fit: pacing/copy density/tone matches the named audience lens; required stakeholder reviews identified for enterprise content.
8. Output format:
   ```text
   Clarity:          X/5 — [reason]
   Distinctiveness:  X/5 — [reason]
   Credibility:      X/5 — [reason]
   Feasibility:      X/5 — [reason]
   Brand/Audience:   X/5 — [reason]

   Blocking issues (score <=2): [list or "none"]
   Recommendation: [ready for production / revise and re-review / needs a different format]
   ```
9. If "revise and re-review," list the specific changes needed — actionable without a follow-up question.
