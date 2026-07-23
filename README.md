# Video Prompting

**[▶ Watch the Live Showcase →](https://gurneyk.github.io/Video-prompting/)**
*A 96-second animated video showing everything this kit can produce — 2D morphs, 3D CSS, kinetic type, glassmorphism, and more. Built with this exact toolkit.*

---

A practical prompting kit for making video ads, animated presentations, product demos, GIF loops, motion-design concepts, showreel segments, and HTML video teasers with AI tools such as Claude, Codex, ChatGPT, and other coding/design assistants.

This repo is designed for two kinds of users:

- **Fast users** who want to upload one markdown file into an AI tool and get a storyboard/prompt.
- **Builders** who want repeatable templates, technical references, and starter assets for web-native animated videos.

## Start Here

1. Read [QUICK_START.md](QUICK_START.md).
2. Upload [AI_UPLOAD_PACKET.md](AI_UPLOAD_PACKET.md) to Claude, Codex, or your chosen AI tool.
3. Add the right template from [templates/](templates/).
4. Paste your project details.
5. Ask the AI to create a storyboard before making assets, code, or final copy.

## What This Helps You Make

- Video ads for product launches, campaigns, and internal tools
- Animated presentations and executive walkthroughs
- Product demo videos and feature reveals
- HTML video teasers that play like videos but ship as a web page
- GIF loops for docs, Slack, Teams, websites, and social posts
- Motion design concepts for app flows, onboarding, and showreels
- Demo scripts, storyboards, production plans, and QA checklists

## Repo Map

```text
Video-prompting/
  AI_UPLOAD_PACKET.md              Upload this to AI first
  QUICK_START.md                   Fast path for any user
  VIDEO_PROMPTING_MASTER_GUIDE.md  Full strategy and workflow
  USING_SKILLS_AND_COMMANDS.md     How to use/copy the .claude and .codex assets below
  .claude/skills/                  Installable Claude Code skills (creative direction)
  .claude/commands/                Installable Claude Code slash commands
  .codex/prompts/                  Mirrored slash commands for Codex
  templates/                       Fill-in prompt templates
  templates/company-styles/        Top-10 company style-DNA reference templates
  decision-guides/                 Choose format, tool, and workflow
  examples/                        Finished example prompts
  references/                      Motion, pacing, branding, QA
  assets/                          Starter code for HTML video teasers
  uploads/                         Suggested place for local AI upload bundles
```

## Skills & Commands

Beyond the upload-and-prompt workflow above, this repo ships installable Claude Code **skills** and **slash commands** (mirrored for Codex) so the same guidance is available directly inside your AI coding assistant — see [USING_SKILLS_AND_COMMANDS.md](USING_SKILLS_AND_COMMANDS.md) for full details.

**Skills** (`.claude/skills/`, auto-triggered by request):
- `creative-director` — audience framing, format choice, narrative shape (start here if the format isn't decided)
- `product-demo-video` — product/feature demo pacing, cursor choreography, fake-data discipline
- `presentation-motion` — animated decks: PowerPoint/Keynote/Google Slides, exec-deck editability
- `brand-motion-system` — define or borrow a visual/motion identity, including the company-style templates below

**Slash commands** (`.claude/commands/` + `.codex/prompts/`, type `/` to use):
`/storyboard` `/loop-animation` `/add-sfx` `/add-music` `/scene-add` `/brand-check` `/company-style` `/creative-review`

**Company style-DNA templates** (`templates/company-styles/`): Anthropic, Apple, SpaceX, Tesla, Samsung, Stripe, Linear, Nike, Airbnb, Figma — the pacing/color/motion/sound patterns behind each company's public launch content, for creative-direction inspiration only (never literal logo/asset reproduction — see the templates' own disclaimers and `/company-style`).

## The Golden Rule

Do not ask an AI to "make a video" first. Ask it to:

1. Clarify the audience, goal, channel, duration, and assets.
2. Recommend the right format.
3. Produce a storyboard.
4. Produce a shot list or scene plan.
5. Then create prompts, code, slides, or production assets.

## Best First Prompt

```text
I uploaded the Video Prompting kit. Help me make a [video ad / animated presentation / product demo / GIF / HTML teaser].

Before making anything, ask me only the missing questions that would materially change the output. Then recommend the best format, create a storyboard, and give me a production plan.
```

## For HTML Video Teasers

This repo includes a specialized pattern for making standalone HTML pages that behave like videos: one timeline, one animation driver, scene functions, and pure time-driven JSX/SVG/div animation. Start with:

- [decision-guides/mode-a-vs-mode-b-html-video.md](decision-guides/mode-a-vs-mode-b-html-video.md)
- [templates/html-video-teaser-template.md](templates/html-video-teaser-template.md)
- [references/html-video-teasers/README.md](references/html-video-teasers/README.md)

## Recommended Sharing Workflow

- For concepts: share storyboard markdown or a Loom walkthrough.
- For editability: use slides, Figma, or HTML teaser source.
- For final playback everywhere: export MP4 or host the HTML teaser with GitHub Pages.
- For team reuse: keep this repo as the source of prompting truth and link it from Teams/SharePoint.

## License

MIT — see [LICENSE](LICENSE). Note: the `templates/company-styles/` reference docs describe third-party companies' *stylistic patterns* only; they don't grant rights to any company's actual logos, trademarks, or copyrighted material — see each file's disclaimer.
