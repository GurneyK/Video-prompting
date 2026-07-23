# Format Decision Matrix

Extends `decision-guides/choose-your-video-format.md` and `decision-guides/when-to-use-html-vs-mp4-vs-gif.md` by tying each format directly to the skill or command that builds it, so the handoff after this skill is unambiguous.

| Need | Format | Build with | Audience fit |
|---|---|---|---|
| Final shareable video file for LinkedIn, paid media, events | MP4 (external video pipeline — outside this kit) | Storyboard here, produce in Premiere/After Effects/Remotion/AI video tool | Both |
| Editable business presentation, exec review, town hall | PowerPoint / Keynote / Google Slides | `presentation-motion` skill | Enterprise-leaning, works for startup investor decks too |
| Linkable, code-driven animated "video" hosted as a page | HTML video teaser | `html-video-teasers` skill (technique) + `creative-director` for the story | Startup-leaning (fast to ship, no video pipeline needed); works for enterprise if hosting on an approved domain is fine |
| Product/feature walkthrough, click-through demo | HTML video teaser (screen-recording-style) or real screen capture | `product-demo-video` skill for the creative direction, `html-video-teasers` or real capture tooling for the build | Both — see `enterprise-vs-startup-demo.md` in `product-demo-video` |
| Tiny looping visual for chat/docs/social | GIF or short silent MP4 loop | `/loop-animation` command + `templates/gif-loop-template.md` | Both |
| Product interaction concept, not a final build | Figma prototype or HTML teaser | `html-video-teasers` for a code-first sketch; Figma outside this kit | Both |
| Campaign concept only, no build yet | Storyboard markdown + creative brief | `/storyboard` + `templates/creative-brief-template.md` | Both |
| Define or apply a visual/motion identity before building anything | Style pack / borrowed style reference | `brand-motion-system` skill + `/company-style` command | Both — this step often comes *before* picking one of the rows above |

## Decision shortcuts

- **If there's no visual identity yet** (new startup, or enterprise team without an approved template for this content type): route to `brand-motion-system` first, then come back to this table.
- **If it must be edited by someone non-technical after handoff:** never recommend the HTML teaser format — go to `presentation-motion` (real slide tool) instead.
- **If the deliverable needs to demonstrate a live product:** `product-demo-video`, not a generic teaser — the narrative needs UI choreography, not just brand motion.
- **If in doubt between two formats:** recommend the one with the smaller total production surface (fewer new assets, fewer new tools) that still hits the goal — see `VIDEO_PROMPTING_MASTER_GUIDE.md` Step 2: "use the smallest format that solves the problem."
