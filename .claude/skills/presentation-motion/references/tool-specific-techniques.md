# Tool-Specific Techniques

Design within the real ceiling of the tool the deck will actually be opened in. Elaborate motion designed against the wrong tool's capabilities either breaks or silently downgrades when opened elsewhere.

## PowerPoint (Morph transition)

- Morph animates matching objects between two slides that share the same object (same shape, same picture, same text box) — duplicate the slide, move/resize/recolor the object on the second copy, apply Morph as the transition.
- Best uses: a shape moving/growing across slides, a chart's bars appearing to grow, a photo panning/zooming (fake "camera move" by scaling a picture across duplicate slides), a diagram gaining a node.
- Constraints: objects must be genuinely matched (same name in the Selection Pane) or Morph won't animate them together — it'll just cross-fade. Test in Slide Show mode, not just the editor, since Morph doesn't preview accurately in edit view.
- Works everywhere modern PowerPoint runs (desktop, most versions of 365); does not render in older PowerPoint or when exported to some non-Microsoft viewers — flag this for enterprise decks that might be opened on an older corporate image.
- File-size discipline: Morph with high-res photos across many slide duplicates can bloat file size fast — compress images before duplicating slides.

## Keynote (Magic Move)

- Same underlying idea as Morph: duplicate a slide, change the object's position/size/style, apply Magic Move transition. Keynote's implementation tends to be smoother/more predictable than PowerPoint's Morph.
- Best uses: identical to Morph above, plus Keynote handles text reflow across Magic Move more gracefully (a heading that changes size/position between slides).
- Constraint: `.key` files opened in PowerPoint or Google Slides will lose Magic Move entirely — confirm the deck stays in Keynote for its full lifecycle (a real risk in a Windows-default enterprise environment) before designing heavily around it.

## Google Slides

- No Morph/Magic Move equivalent — its animation model is per-object entrance/exit animations and basic slide transitions (fade, slide, flip) only.
- Best uses: staggered per-bullet/per-object entrance (`Appear`, `Fade in`, `Fly in`) timed to "on click" or "after previous" — enough to implement the slide-as-scene build order from `slide-as-scene.md`, just without spatial morphing between slides.
- Constraint: design build order and stagger timing carefully since there's no object-continuity trick to fall back on — lean on `Appear`/`Fade in` sequencing rather than trying to fake a morph with manual duplicate-and-resize (it doesn't animate the way Morph/Magic Move does).
- Best fit: collaborative decks, decks that must be edited by multiple people simultaneously, or any enterprise environment standardized on Google Workspace.

## When to switch to an HTML deck instead

Choose a custom HTML deck (built with `html-video-teasers` technique, one "scene" per slide) only when:
- The motion required genuinely exceeds what Morph/Magic Move/Google Slides animations can do (e.g., physics-like motion, complex multi-object choreography, custom easing curves).
- The deck will only ever be presented from a browser/screen the team controls (not handed off as a file to be edited by someone else) — this trades editability for motion fidelity, which is exactly the trade `exec-deck-discipline.md` warns against for most enterprise contexts.
- It's explicitly a showcase/portfolio piece rather than a working business deck.

Default to a real slide tool unless one of these is clearly true.

## Cross-tool safety checklist

- If the deck might be opened in a different tool than it was built in, confirm which techniques survive the export (Morph and Magic Move generally do not survive a round-trip to a different app).
- Always test animated transitions in full presentation/slideshow mode, not the editor — several of these techniques render differently or not at all in edit view.
- For any enterprise deck, confirm which version of the tool the audience will actually have — an all-hands with attendees on varied corporate machine images is not a safe place to assume the newest feature set.
