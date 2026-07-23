# /add-sfx

Add procedural Web Audio SFX (click/whoosh/chime) to an HTML video teaser at specified timeline beats.

Usage: `/add-sfx [target file] [beats/moments to sound, e.g. "whoosh on every scene transition, chime on the outro logo"]`

Add SFX to: $ARGUMENTS

Follow `references/html-video-teasers/sound-design.md` exactly — this is a mechanical, well-specified pattern, don't improvise a different audio architecture.

1. Confirm the target file already has the RAF driver / scene cascade from the `html-video-teasers` shell. If not, this doesn't apply yet — the base technique needs building first.
2. Use the three procedural SFX primitives verbatim (`click()`, `whoosh()`, `chime(freq)`) — synthesized via Web Audio, no asset files, no stock sound libraries.
3. Wire the edge-trigger fire registry (`makeFireFn()`) so each SFX fires exactly once per crossing and re-arms correctly on scrub or loop — always call through `fire(threshold, key, fn)`, never directly.
4. Apply placement rules: whoosh ~0.25s before a scene boundary; click on cursor click-down; chime on completion/final-frame moments; low-volume tick on rapid staggered reveals (fade after ~5 items); at most one bass-thump on the single biggest reveal.
5. Cap it at the 5-8 moments that structurally matter — don't SFX every motion.
6. Respect the embed/mute contract and resume the `AudioContext` from a user gesture (it starts `suspended`).
7. Report every SFX added as a table: beat | trigger threshold | sound | why. Then note the manual QA step: scrub past each trigger forward and backward, confirm exactly one fire per crossing.
