# Slide as Scene

Treat every slide the way the rest of this repo treats a video scene: it has a beginning (build-in), a hold (reading/talking time), and sometimes an exit (transition out). Most decks fail at pacing not because the animation is bad but because this structure is never made explicit.

## The three phases of a slide

| Phase | What happens | Typical share of slide's on-screen time |
|---|---|---|
| Build-in | Elements enter, usually staggered | 15-25% |
| Hold | The audience reads/the speaker talks; nothing moves unless drawing attention to a specific point | 60-75% |
| Transition out | Cross-fade, morph, or cut to next slide | 10-15% |

If a slide is "boring," the fix is very rarely more animation in the build-in — it's almost always insufficient contrast between the build-in and the hold, or too many things fighting for attention during the hold.

## Build order rules

- **One idea enters at a time.** If a slide has 3 bullets and a chart, decide the order they appear in based on the argument, not on layout convenience — usually context/setup first, then the chart, then the takeaway bullet last (so it lands after evidence, not before it).
- **Stagger, don't dump.** Sequential elements should enter 80-150ms apart (same stagger range as `html-video-teasers`), never all at once, but also never so slow the build itself becomes the point.
- **The last thing to enter should be the point of the slide.** If the headline claim enters first and the supporting bullets after, the audience has already accepted or rejected the claim before seeing the evidence. Evidence-then-claim is almost always stronger.

## Dwell time per idea

- Minimum 2-3 seconds of hold per distinct idea on a slide before either the speaker moves on or another element enters — enough time to actually read a short line of text.
- For data-heavy slides (a table, a dense chart), budget more — at minimum enough time for a first-time viewer to find the number the speaker is about to reference.
- In a live-presented deck, this is a floor, not a target — the speaker's pacing rules in the room. In a self-running or recorded deck, hold to these minimums strictly.

## Using motion to direct attention within a hold

- Dim non-relevant chart series or table rows to ~40-60% opacity when the speaker/narration is talking about one specific data point (same technique as `product-demo-video/references/cursor-and-ui-choreography.md` focus/dim).
- A highlight box or underline animating in under a specific number is more effective than making that number bigger — size changes read as "new information," a highlight reads as "look here."
- Never move two unrelated elements on the same slide at the same time for emphasis — same rule as video: one dominant action per beat.

## Transitions between slides

- Pick one transition register for the whole deck: cross-fade (safe, works everywhere), morph/magic-move (for before/after or spatial continuity between slides — see `tool-specific-techniques.md`), or hard cut (for a deliberate tonal break, used sparingly, at most once or twice per deck).
- Reserve morph/magic-move for slides where an element genuinely continues (a chart that keeps growing, a diagram that gains a node) — using it between unrelated slides creates a false sense of continuity.
