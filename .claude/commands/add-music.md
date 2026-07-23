---
description: Wire up sidecar background music (BGM) into an HTML video teaser with correct timeline sync and autoplay handling
argument-hint: [target file] [mood/genre, e.g. "understated ambient" or "energetic and rhythmic"] [track path if one exists]
---

Add background music to: $ARGUMENTS

Follow `references/html-video-teasers/sound-design.md`'s BGM pattern exactly — the sync mechanics are load-bearing and easy to get subtly wrong.

1. If no track is supplied, ask for one or flag that a licensed/owned track needs to be sourced — never assume a specific real song or artist is usable without confirmed rights.
2. Add the track as a **sidecar** `<audio>` element (`./assets/bgm.mp3`), never inlined as base64 — inlining a multi-minute track can bloat the HTML file 10x.
3. Wire the four sync points from the reference: acquire the audio element on mount (don't autoplay), start playback only from a user gesture (first play/toggle/restart), keep the audio's `currentTime` in sync on every scrub, and pause it exactly when the video reaches `duration`.
4. Drive audio timing from a `ref`, never from React state directly — setting `audio.currentTime` on every render causes a laggy re-seek.
5. Handle the autoplay restriction explicitly: browsers block `audio.play()` until a user gesture, so the first auto-play of the video will be silent until the user clicks once. Surface a small "click to enable sound" hint if that matters for this use case.
6. Default to **muted** when `?embed=1` is present (iframe embeds), per the reference — never risk an unexpected noise from an embedded page.
7. Track length discipline: the BGM track must be **at least as long as the finished video** — looping a short track under a long video "sounds frantic." If the track is shorter, either trim the video plan or source a longer/seamlessly-loopable track.
8. Set BGM volume so SFX (if present, see `/add-sfx`) stays clearly audible on top — reference default is ~0.45 and "never louder than 40% relative to SFX."
9. Add the mute-toggle button and `M` key binding alongside the existing fullscreen controls (`🔊`/`🔇`), matching the existing controls-bar pattern in the shell.
10. Finish with a QA note: verify audio starts on first user interaction, stays in sync after scrubbing to 3+ different points, pauses at the end, and respects the mute toggle and embed-mute default.
