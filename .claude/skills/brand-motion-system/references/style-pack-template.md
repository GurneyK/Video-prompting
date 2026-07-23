# Style Pack Template

The schema every brand-motion-system output should fill in completely. Keep it short — a style pack that takes 20 minutes to read never gets used. One page, filled honestly, beats five pages of hedged options.

```markdown
## Style Pack: [Brand/Project Name]

### Color
- Primary: [hex] — used for [role: background / primary accent / text]
- Secondary: [hex] — used for [role]
- Accent: [hex] — used sparingly for [role: CTA / highlight / hero moment only]
- Background(s): [hex(es)] — [light mode / dark mode / both]
- Text: [hex on light] / [hex on dark]
- Rule: accent color appears in no more than [X]% of any single frame/slide — it marks emphasis, not decoration.

### Type
- Display/headline: [typeface, weight] — used for [hero claims, single big numbers]
- Body: [typeface, weight] — used for [supporting copy, captions]
- Numeric/data: [typeface, often monospace or tabular-figure variant] — used for [stats, counters, code]
- Scale: [headline size] / [body size] / [caption size] relative ratio, e.g. 3:1.5:1

### Motion Signature
- Default easing: [e.g. smootherstep/outCubic — name the one used 80% of the time]
- Entrance easing: [e.g. outCubic, outBack for emphasis moments]
- Exit easing: [e.g. inOutCubic]
- Pace: [fast/energetic vs. slow/confident — name it explicitly, don't leave it implicit]
- Hold ratio: [e.g. 60% hold / 40% motion, or the brand's specific ratio]
- Transition grammar: [cross-fade only / hard cuts allowed at X moments / morph for continuity — pick the register]
- Stagger timing: [e.g. 80-150ms between sequential elements]

### Sound Signature
- Music register: [none/silent-clean / understated ambient / energetic and rhythmic]
- SFX usage: [none / structural moments only / UI-click-forward]
- Silent-version requirement: [yes, always / not required]

### Logo & Wordmark Usage
- Placement: [e.g. persistent bottom-right corner, or intro/outro only]
- Minimum clear space: [rule, if known]
- Never: [e.g. never on a busy background, never recolored outside approved variants]

### Do / Don't
- Do: [3-5 concrete, checkable rules]
- Don't: [3-5 concrete, checkable rules — the most useful section; be specific, not generic]

### Reference Points (optional)
- Style-DNA borrowed from: [company name(s), if any — see reference-company-styles.md]
- What was adapted vs. kept: [be explicit about what changed to make this brand's own]
```

## Filling it out well

- Every row should be specific enough that two different people filling in a storyboard from this style pack would make the same call. "Modern and clean" is not a usable motion signature; "outCubic entrances, 60/40 hold-to-motion ratio, cross-fades only, no hard cuts" is.
- The Do/Don't section is the highest-leverage part — prioritize finishing it even if other sections stay rough on a first pass.
- If this is version 1 for a brand-new startup (see `synthesizing-for-startups.md`), it's fine for this to be genuinely minimal — 5 lines total is better than nothing, and better than an over-specified system nobody will actually check against.
