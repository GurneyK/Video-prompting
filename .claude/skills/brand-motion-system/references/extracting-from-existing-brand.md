# Extracting From an Existing Brand

Most brand guideline documents (a PDF, a deck, a brand microsite) define color, type, and logo usage in detail, and say almost nothing about motion. This is the translation process: read the static rules and the brand's own descriptive language, then derive motion decisions the guideline never explicitly made.

## What to pull directly (rarely ambiguous)

- Approved color palette and roles (primary/secondary/accent/background)
- Approved typefaces and weights
- Logo clear-space, minimum size, and forbidden treatments
- Any explicit "brand voice" adjectives already written down (e.g. "confident," "optimistic," "precise," "warm")

Never invent or approximate a logo, exact proprietary hex code, or licensed typeface from memory if the actual guideline file is available — read it directly. If it's not available, ask for it rather than guessing; getting the base palette/type wrong undermines everything built on top of it.

## Translating brand adjectives into motion (the actual gap most guidelines leave)

| If the brand guideline says... | Motion translation |
|---|---|
| "Confident" / "assured" | Slower, more deliberate easing (`smootherstep`/`inOutCubic`); higher hold ratio; no jittery or bouncy overshoot |
| "Optimistic" / "energetic" | Slightly faster pace; `outBack` landing emphasis acceptable on hero moments; brighter accent usage |
| "Precise" / "engineered" / "technical" | Sharper, more linear-feeling easing; monospace/tabular numerals for data; grid-aligned motion (elements move in straight lines/on-axis, not loose curves) |
| "Warm" / "human" / "approachable" | Softer easing curves; slightly longer holds; avoid hard cuts in favor of cross-fades |
| "Bold" / "disruptive" | Permission for more hard cuts, higher contrast transitions, less hedge in pacing — but confirm this doesn't conflict with an enterprise audience lens (`creative-director/references/audience-lenses.md`), which usually caps how disruptive the actual execution can be regardless of brand adjectives |
| "Premium" / "elevated" | Higher hold ratio (60-70%+), more negative space, fewer simultaneous moving elements, slower stagger |

## What to do when the guideline is silent (the common case)

1. Re-read the guideline's own "brand personality" or "brand pillars" section (nearly every guideline has one) and run those adjectives through the table above.
2. If there's existing brand video/animated content already produced (even just paid ads or a homepage), reverse-engineer its actual pacing and transitions rather than starting from zero — treat it as the de facto motion guideline even if undocumented.
3. If neither exists, default to the safest register for the named audience lens (enterprise → restrained/`smootherstep`/high hold ratio; startup → faster/punchier) and flag explicitly in the style pack that this section is a first draft pending brand-team sign-off.

## Multi-market consideration for enterprise brands

If the brand spans multiple regional teams (common at Unilever scale), check whether motion rules are expected to be centrally locked or locally adaptable. If unclear, default to locking the motion signature (easing/pace/transition grammar) globally while leaving copy/imagery/casting open to regional adaptation — motion consistency is usually what makes a global brand feel coherent across markets even when everything else varies.

## Output

Feed everything derived here into `style-pack-template.md` — this reference produces the inputs, that template is the deliverable format.
