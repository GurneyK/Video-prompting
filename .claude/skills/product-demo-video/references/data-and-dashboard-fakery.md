# Data and Dashboard Fakery

Rule zero, from `VIDEO_PROMPTING_MASTER_GUIDE.md`: never ask an AI to recreate real customer data, real logos, or real customer marks from memory. Everything in this reference is about building convincing *placeholder* data — data that reads as real without being real, and without risking anyone mistaking it for an actual customer's information.

## Why round numbers and generic names break the illusion

Real business data is messy: numbers don't end in clean zeros, names aren't all "Acme Corp" and "John Smith," timestamps aren't evenly spaced. A dashboard that's too clean reads as a mockup instantly.

## Building believable placeholder numbers

- Avoid round numbers as headline stats — `$142,318` reads as real, `$140,000` reads as a placeholder. Add a plausible trailing decimal or non-round unit count.
- Vary magnitude across rows in a table — real datasets have a long tail, not uniform values.
- Timestamps should be irregular, not evenly spaced (e.g. not exactly every 5 minutes).
- Percentages/deltas should occasionally be small or negative — an all-green, all-improving dashboard reads as a mockup. One flat or slightly-down metric next to the hero improving metric adds credibility.
- Use currency/number formatting appropriate to the claimed market (commas vs. periods, currency symbol placement) if the demo implies a specific region — especially relevant for enterprise/multi-market content.

## Names, companies, and avatars

- Never use real company names, even as a joke or placeholder ("as if this were Unilever") — use clearly fictional company names that don't resemble real ones closely enough to imply an endorsement.
- Avatars: use abstract/initials-based avatars or a licensed placeholder-avatar set, never a real person's photo without explicit rights.
- Fictional names should read as plausible but not be a thin reskin of a real, identifiable person or company.

## Charts and graphs

- Pair with the `dataviz` skill for the actual construction (color, axis, legend, accessible contrast) — this reference only covers making the *underlying data* look real.
- Animate charts building in (bars growing, lines drawing on) rather than appearing instantly — see `presentation-motion/references/chart-and-data-motion.md` for the animation technique, which applies equally to demo dashboards.
- A chart with a suspiciously perfect trend line (e.g. dead-straight growth) reads as fake — add small natural variance around the overall trend.

## Enterprise-scale vs. startup-scale data

- Enterprise demo data: larger row counts, multi-market breakdowns, longer historical ranges (quarters/years), formal category names.
- Startup demo data: smaller, more personal-scale numbers tied to a single realistic use case rather than aggregate enterprise metrics — a startup demo showing "2.4M rows processed across 40 markets" reads as mismatched with its own product stage.

## Checklist before shipping a demo scene with data

- No real customer name, logo, or identifiable data anywhere on screen.
- No round-number-only headline stats.
- Row-level values have realistic variance, not uniform patterns.
- Any chart trend has natural noise, not a mathematically perfect line.
- Data scale (row counts, dollar amounts, market count) matches the claimed company size/stage.
