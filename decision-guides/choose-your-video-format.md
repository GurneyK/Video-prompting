# Choose Your Video Format

Use this when someone says "make a video" but has not chosen the actual deliverable.

## Decision Tree

### 1. Does the final output need to be a normal video file?

Choose **MP4** if it needs to be uploaded to:

- LinkedIn
- YouTube
- Vimeo
- paid media
- event screens
- LMS/training systems
- websites that expect video files

### 2. Does the team need to edit it later?

Choose **PowerPoint, Keynote, or Google Slides** if:

- business users need to change copy
- presenters need speaker notes
- the deck must be reused
- the output is for leadership reviews

### 3. Does it need to be a linkable animated web experience?

Choose **HTML video teaser** if:

- you want a static web page that plays like a video
- the animation should be deterministic and scrubable
- the output can be hosted on GitHub Pages or a website
- you want crisp text/SVG at any size
- developers may refine the animation later

### 4. Does it need to loop silently?

Choose **GIF or short silent MP4 loop** if:

- it will live in Slack, Teams, docs, or a landing page
- the message is visual and short
- the loop is under 6 seconds

### 5. Is it mainly an app interaction idea?

Choose **Figma prototype or HTML teaser** if:

- the motion explains product behavior
- the team needs to adjust UI states
- timing matters but final video export is not yet required

## Comparison

| Format | Best for | Weakness |
|---|---|---|
| MP4 | universal playback | harder to edit |
| PPT/Keynote | editable business motion | less cinematic |
| HTML teaser | hosted, crisp, code-driven animation | needs coding discipline |
| GIF | tiny loop | large files, no sound, limited quality |
| Figma prototype | product motion concept | not final video |
| Storyboard markdown | early planning | not a visual deliverable |

## Recommendation Prompt

```text
Given my audience, channel, length, assets, and editability needs, recommend the best video format. Compare MP4, animated deck, HTML teaser, GIF, and storyboard-only. Then give me the production workflow.
```
