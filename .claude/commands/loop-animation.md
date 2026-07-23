---
description: Turn an existing scene, moment, or idea into a seamless N-second loop (GIF or short MP4/HTML loop)
argument-hint: [source scene/file or description] [target duration, e.g. "4s"]
---

Build a seamless loop from: $ARGUMENTS

Follow `templates/gif-loop-template.md`'s loop rules and this process:

1. Identify the single beat/moment being looped — a loop needs one idea, not a compressed multi-scene story. If the input describes multiple beats, pick the strongest one or ask which.
2. Confirm target length: 2-6 seconds is the sweet spot per `templates/gif-loop-template.md`. Push back (briefly) if a much longer duration is requested for a loop format — recommend a short HTML teaser instead (see `decision-guides/when-to-use-html-vs-mp4-vs-gif.md`).
3. Design the loop so the **first and last frame match exactly** — same element positions, same opacities, same colors. This is the single most common way loops fail (a visible "pop" or "jump" at the seam). State explicitly what value each animated property holds at t=0 and at t=duration, and confirm they're identical.
4. Prefer an easing curve that returns smoothly to the start state rather than a hard reset — e.g. a value that goes out and back (`envS`-style envelope) loops more cleanly than one that ramps one-way and snaps back.
5. Keep text minimal and legible at small size (per `templates/gif-loop-template.md`) — loops are often viewed small (Slack/Teams previews, doc thumbnails).
6. If building in the `html-video-teasers` technique: implement as a single scene whose `computeDur` returns the loop length, with the player set to auto-restart at `duration` back to `0` rather than holding the last frame (this is the one case where holding the last frame is wrong — see `html-video-teasers` architecture reference for the normal hold-last-frame behavior, which does not apply here).
7. Recommend final export format (GIF vs. short silent MP4 vs. looping HTML) based on where it will be embedded, per `decision-guides/when-to-use-html-vs-mp4-vs-gif.md`.
8. Give a QA checklist: seam-matching verified by scrubbing t=0 vs t=duration side by side, file size within target for its destination (chat preview vs. doc embed vs. social), legible at the smallest size it'll actually render at.
