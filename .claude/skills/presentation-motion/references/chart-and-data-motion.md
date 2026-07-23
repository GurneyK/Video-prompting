# Chart and Data Motion

Animating a chart or KPI reveal makes it more memorable — and more dangerous if the motion itself exaggerates or misrepresents the underlying data. This reference covers the animation technique; for the chart's construction (color, axis choice, legend, contrast), load the `dataviz` skill alongside this one.

## Honest motion, by chart type

- **Bar/column growth:** bars should grow from a true zero baseline at a consistent rate proportional to their actual value — never grow all bars to the same animated height and then "snap" to correct height, and never use a truncated axis that makes a small difference look dramatic when it grows in.
- **Line charts drawing on:** draw the line left-to-right at a constant time-rate (not constant screen-distance-rate if the x-axis is time-based with uneven data density) — the drawing speed itself can imply a pace of change that isn't real if done carelessly.
- **Counting-up numbers:** ease the count so it decelerates into the final value (`outCubic`/`smooth`) rather than linear-then-stop — but never let the animation overshoot past the real final number and settle back down, which reads as manufactured drama and undermines trust in the number.
- **Pie/donut reveals:** sweep proportional to actual value, starting from a fixed angle (12 o'clock is conventional) — don't reorder segments during the animation in a way that implies a ranking change that isn't real.

## Staged reveal of comparison data

When showing a before/after or us-vs-competitor comparison:
1. Establish the baseline/before value first and let it hold — give the audience a real reference point.
2. Reveal the after/comparison value second, ideally with a beat of pause between them, not both animating simultaneously (simultaneous motion on both makes it harder to judge the actual delta).
3. If showing a delta/percentage-change callout, have it appear only after both values have settled — a callout that appears before the audience can verify the underlying numbers reads as being told what to think rather than shown it.

## Enterprise credibility check

For any chart in an enterprise-audience deck or demo:
- Would a skeptical analyst, given a screenshot of the final frame alone (no animation), agree the chart is a fair representation of the data? The animation should never be doing work that the static chart wouldn't also support honestly.
- Flag (per `creative-director/references/creative-review-rubric.md` Credibility dimension) any chart where the animated version creates an impression the static data doesn't support — e.g., an axis that's truncated specifically to make a bar-growth animation look more dramatic.

## Practical build notes

- In an HTML deck/teaser context, drive chart animation the same way as everything else — a pure function of the scene's local time `t`, using `interpolate`/`envS` from the `html-video-teasers` primitives. Don't use a separate charting-library animation system inside a scene; keep one time driver.
- In PowerPoint/Keynote, animate a bar's height/line's path via Morph/Magic Move between a "zero" duplicate slide and the "final value" duplicate slide (see `tool-specific-techniques.md`) rather than relying on native chart-object animations, which are less predictable across tool versions.
