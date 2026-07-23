# /storyboard

Turn a one-line brief into a full storyboard table using this repo's standard format.

Usage: `/storyboard [brief]` — e.g. `/storyboard 60s launch teaser for a startup expense tool, audience: SMB finance leads`

Build a storyboard for: $ARGUMENTS

Follow this process:

1. If audience, goal, channel, length, or brand constraints are missing and would materially change the storyboard, ask only for those (see `AI_UPLOAD_PACKET.md` → "Required Intake Questions"). Otherwise proceed with reasonable, explicitly-stated assumptions.
2. Name the audience lens — enterprise/Unilever-style or startup, or a named hybrid (see `.claude/skills/creative-director/references/audience-lenses.md`).
3. Pick a narrative shape from `.claude/skills/creative-director/references/narrative-structures.md` (or `VIDEO_PROMPTING_MASTER_GUIDE.md` if that's unavailable) and name which one you picked and why.
4. Produce the storyboard as a table with these columns, per `AI_UPLOAD_PACKET.md`:

   | Scene | Time | Purpose | Visual | Motion | Copy | Audio/SFX | Assets | QA risk |
   |---|---:|---|---|---|---|---|---|---|

   If this is a product/feature demo, add the `UI state` and `Cursor action` columns from `.claude/skills/product-demo-video/references/demo-narrative-patterns.md` instead.

5. Every scene needs a reason to exist — if a scene doesn't change what the viewer understands, cut it.
6. After the table, list: total runtime, format recommendation (`decision-guides/choose-your-video-format.md`), and open questions still needing a human answer (legal, brand, asset sourcing).
7. Stop at the storyboard — do not produce final code, slides, or scripts yet.
