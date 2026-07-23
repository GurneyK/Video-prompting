---
description: Add procedural Web Audio SFX (click/whoosh/chime) to an HTML video teaser at specified timeline beats
argument-hint: [target file] [beats/moments to sound, e.g. "whoosh on every scene transition, chime on the outro logo"]
---

Add SFX to: $ARGUMENTS

Follow `references/html-video-teasers/sound-design.md` exactly — this is a mechanical, well-specified pattern, don't improvise a different audio architecture.

1. Confirm the target file already has the RAF driver / scene cascade from the `html-video-teasers` shell (`assets/shell-single-file.html` or a Mode B build). If not, this command doesn't apply — that file needs the base technique built first.
2. Use the three procedural SFX primitives verbatim from `references/html-video-teasers/sound-design.md` (`click()`, `whoosh()`, `chime(freq)`) — synthesized via Web Audio, no asset files, no stock sound libraries ("stock-library claps/dings sound 2008 and date the video instantly").
3. Wire the **edge-trigger fire registry** (`makeFireFn()` pattern in the same reference) so each SFX fires exactly once per crossing and re-arms correctly on scrub or loop — never call an SFX function directly from a render path, always through `fire(threshold, key, fn)`.
4. Apply the placement rules from the reference:
   - Whoosh ~0.25s **before** a scene boundary (audio leads the eye).
   - Click on cursor click-down / button-press moments, paired with any click-pose visual.
   - Chime on completion / final-frame moments (deploy success, card landing, build complete).
   - A low-volume tick on rapid staggered list reveals (fade after ~5 items).
   - At most one bass-thump moment on the single biggest reveal, if any.
5. Cap it: pick the 5-8 moments in the whole video that structurally matter. Do not add SFX to every motion — "that's noise" per the reference.
6. Respect the embed/mute contract: SFX must be gated by the same `?embed=1`/mute-toggle logic as BGM, and the `AudioContext` must be resumed from a user gesture (`ensureAudio()` pattern) since it starts `suspended`.
7. After wiring, list every SFX added as a table: `beat | trigger threshold | sound | why`. Then note the manual QA step: open in a browser, un-mute, scrub past each trigger forward and backward, confirm each fires exactly once per crossing with no double-fires or misses.
