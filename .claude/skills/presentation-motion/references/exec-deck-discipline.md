# Exec Deck Discipline

Presentations differ from video in one crucial way: they usually need to survive being edited by someone who isn't you, presented by someone who isn't you, and referenced later by someone who never saw it presented live. Motion is only worth adding if it survives all three.

## Editability is the constraint, not an afterthought

- Never build motion that only works if the exact object structure is preserved — if an exec assistant needs to swap a chart or update a number next quarter, a fragile Morph/Magic Move chain built on precise object matching (see `tool-specific-techniques.md`) will silently break.
- Prefer simpler, more robust animations (basic entrance/fade, one Morph pair per key moment) over an elaborate chain, specifically because deck lifespan usually exceeds the time you'll be the one maintaining it.
- Label slides/sections clearly in the outline view so a future editor understands the intended build order without you there to explain it.

## One idea per build, strictly

More than almost any other format in this repo, decks get over-animated because "we have the tool, why not use it." Resist this. Every additional animated element on a slide is a small tax on the speaker's ability to stay in sync with it live. Cap at one build-in idea introduced at a time (per `slide-as-scene.md`), and treat any slide that wants a second simultaneous animation as two slides instead.

## Speaker notes as the intent record

- Write speaker notes as you design the build order, not after — the notes should capture *why* this build order was chosen, not just what to say. E.g.: "Reveal the cost bullet after the chart, not before — the chart is the evidence for the claim."
- For decks that will be presented by someone other than the author (very common in enterprise settings — the deck gets handed to a regional lead, a VP, a sales rep), notes are the only surviving record of intended pacing. Write them assuming the presenter has never seen the deck before.
- Include a one-line "if you only have 60 seconds" summary in the notes of the first slide for decks likely to be skimmed rather than presented live.

## Enterprise (Unilever-style) motion register

- Restrained: Morph/Magic Move for one or two genuinely load-bearing moments (a KPI growing, a before/after), not throughout.
- No animation that a legal/brand reviewer would need to specifically approve as "not misleading" — see `chart-and-data-motion.md` for the specific chart-motion risks.
- Assume the deck gets forked/reused across regions — avoid baking hard-to-translate text into animated shapes; keep text in native, editable text boxes even inside a Morph sequence wherever the tool allows it.
- Assume presentation contexts include remote/hybrid attendees on a screen-share — heavy transitions can look worse over a compressed screen-share codec than in person; test on a screen-share before finalizing anything elaborate.

## Startup pitch-deck motion register

- Punchier and sparser: fewer slides, each with a single big claim or number, animated in with more confidence (a number counting up, a bold statement fading in alone on an otherwise empty slide).
- Still respect one-idea-per-build — startup decks fail this rule just as often as enterprise ones, usually by cramming a whole thesis onto one slide with everything appearing at once.
- Motion can carry more of the "personality" of the brand here than in an enterprise deck, since there's no house style to conform to yet — this is often where `brand-motion-system`'s startup synthesis path and this skill meet.
