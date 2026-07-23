# Using Skills and Commands

This repo ships two kinds of installable AI assistant extensions alongside its markdown prompting kit:

- **Skills** (`.claude/skills/`) — deep, trigger-based creative direction that an AI assistant reads automatically when a request matches.
- **Slash commands** (`.claude/commands/` for Claude Code, mirrored in `.codex/prompts/` for Codex) — short, mechanical one-shot actions you invoke explicitly by typing `/name`.

## In this repo, with Claude Code

If you open Claude Code with this repo as your working directory, both `.claude/skills/` and `.claude/commands/` are picked up automatically:

- Skills auto-trigger based on their `description` frontmatter matching your request — e.g. asking "help me plan a launch video" will surface `creative-director` on its own.
- Commands appear when you type `/` — e.g. `/storyboard`, `/loop-animation`, `/add-sfx`, `/add-music`, `/scene-add`, `/brand-check`, `/company-style`, `/creative-review`.

## In this repo, with Codex

Codex reads custom prompts from `.codex/prompts/`. The same 8 commands are mirrored there with equivalent instructions, so typing `/storyboard` (etc.) works the same way. Skills (`.claude/skills/`) are Claude Code-specific — in Codex, point the assistant at the relevant `SKILL.md` and its `references/` files directly (e.g. "read `.claude/skills/creative-director/SKILL.md` and follow it") if you want the same depth of guidance.

## Skills in this repo

| Skill | Use for |
|---|---|
| `creative-director` | Strategy: audience framing, format choice, narrative shape — start here if the format isn't decided yet |
| `product-demo-video` | Product/feature demo videos: workflow pacing, cursor choreography, fake-data discipline |
| `presentation-motion` | Animated decks: PowerPoint/Keynote/Google Slides motion, exec-deck editability |
| `brand-motion-system` | Defining or borrowing a visual/motion identity, including the company-style templates |
| `html-video-teasers` (existing, see `references/html-video-teasers/`) | The technical render technique for building a self-contained HTML "video" |

## Copying these into another project

Both folders are plain, portable directories — no dependency on this repo's other files beyond the internal relative links inside each `SKILL.md`/command (which point back to this repo's templates/references). To reuse them elsewhere:

1. Copy `.claude/skills/<name>/` and/or `.claude/commands/<name>.md` (or `.codex/prompts/<name>.md`) into the target project's own `.claude`/`.codex` folder.
2. If a skill or command references a file outside itself (e.g. `templates/company-styles/`, `references/html-video-teasers/`), either copy that referenced folder too, or edit the link to point at wherever you keep it.
3. Re-check the skill's `description` frontmatter still makes sense in the new project's context (audience/product references, if any, are generic in these files by design).

## Adding your own

Follow the existing pattern: a `SKILL.md` with `name` + a trigger-phrase-rich `description`, a short body with a "Mandatory reading" section linking to `references/*.md`, and a "Red flags" section. For commands, a short frontmatter (`description`, `argument-hint`) plus a numbered instruction list using `$ARGUMENTS`. Keep new skills scoped to one clear job — if a skill's `SKILL.md` is trying to cover two unrelated situations, split it.
