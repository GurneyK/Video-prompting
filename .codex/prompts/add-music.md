# /add-music

Wire up sidecar background music (BGM) into an HTML video teaser with correct timeline sync and autoplay handling.

Usage: `/add-music [target file] [mood/genre] [track path if one exists]`

Add background music to: $ARGUMENTS

Follow `references/html-video-teasers/sound-design.md`'s BGM pattern exactly.

1. If no track is supplied, ask for one or flag that a licensed/owned track needs sourcing — never assume a specific real song or artist is usable without confirmed rights.
2. Add the track as a sidecar `<audio>` element (`./assets/bgm.mp3`), never inlined as base64.
3. Wire the four sync points: acquire the audio element on mount (no autoplay), start playback only from a user gesture, keep `currentTime` synced on every scrub, pause exactly at `duration`.
4. Drive audio timing from a ref, never React state directly.
5. Handle the autoplay restriction: the first play will be silent until a user gesture; consider a "click to enable sound" hint.
6. Default to muted when `?embed=1` is present.
7. Track length must be at least as long as the finished video — don't loop a short track under a long one.
8. Set BGM volume so any SFX (see `/add-sfx`) stays clearly audible on top (~0.45, never louder than 40% relative to SFX).
9. Add the mute-toggle button and `M` key binding alongside existing fullscreen controls.
10. Finish with a QA note: audio starts on first interaction, stays in sync after scrubbing, pauses at the end, respects mute/embed defaults.
