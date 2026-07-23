# /loop-animation

Turn an existing scene, moment, or idea into a seamless N-second loop (GIF or short MP4/HTML loop).

Usage: `/loop-animation [source scene/file or description] [target duration, e.g. "4s"]`

Build a seamless loop from: $ARGUMENTS

Follow `templates/gif-loop-template.md`'s loop rules and this process:

1. Identify the single beat/moment being looped — a loop needs one idea, not a compressed multi-scene story.
2. Confirm target length: 2-6 seconds is the sweet spot. Push back briefly if a much longer duration is requested — recommend a short HTML teaser instead (`decision-guides/when-to-use-html-vs-mp4-vs-gif.md`).
3. Design the loop so the first and last frame match exactly — same positions, opacities, colors. State explicitly what value each animated property holds at t=0 and t=duration, and confirm they're identical.
4. Prefer an easing curve that returns smoothly to the start state (an out-and-back envelope) rather than a one-way ramp that snaps back.
5. Keep text minimal and legible at small size — loops are often viewed small (chat previews, doc thumbnails).
6. If building in the `html-video-teasers` technique: implement as a single scene whose `computeDur` returns the loop length, with the player auto-restarting at `duration` back to `0` rather than holding the last frame.
7. Recommend final export format (GIF vs. short silent MP4 vs. looping HTML) based on destination, per `decision-guides/when-to-use-html-vs-mp4-vs-gif.md`.
8. Give a QA checklist: seam-matching verified by scrubbing t=0 vs t=duration side by side, file size within target, legible at the smallest render size.
