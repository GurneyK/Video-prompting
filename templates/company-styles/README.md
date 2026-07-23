# Company Style-DNA Templates

Ten short reference documents describing the stylistic and motion patterns commonly associated with well-known companies' public launch content — pacing, color mood, type register, camera language, sound signature, typical narrative arc. Use them as creative-direction inspiration, not as a source to copy verbatim.

**Read this before using any of them:** every file describes a *pattern*, never an *asset*. Never reproduce an actual logo, wordmark, exact brand-guideline hex code, proprietary/licensed typeface, or copyrighted footage from any of these companies. See `.claude/skills/brand-motion-system/references/reference-company-styles.md` for the full rule, and use `/company-style` to apply one correctly.

## Index

| Company | Register | Best-fit audience | Best-fit format | File |
|---|---|---|---|---|
| Anthropic | Warm, restrained, quietly confident | Enterprise & startup (dev-tool/AI) | HTML teaser, launch page | [anthropic.md](anthropic.md) |
| Apple | Cinematic, minimal copy, single hero claim | Consumer, enterprise hardware | Product reveal video, keynote | [apple.md](apple.md) |
| SpaceX | Dark technical, telemetry-driven, mission-control | Deep-tech, infra, hardware | Livestream-style reveal, data-story arc | [spacex.md](spacex.md) |
| Tesla | Dramatic single-hero lighting, spec-forward | Consumer hardware, deep-tech | Product unveiling | [tesla.md](tesla.md) |
| Samsung | Glossy, multi-device, fast feature-stacking | Consumer, enterprise hardware | Launch event reveal | [samsung.md](samsung.md) |
| Stripe | Developer-tool clean, code-forward, calm | Startup dev-tool, enterprise API/infra | Product demo, technical launch | [stripe.md](stripe.md) |
| Linear | Dark mode, snappy, keyboard-first | Startup SaaS | Changelog/release video, demo | [linear.md](linear.md) |
| Nike | Bold kinetic type, rhythm-driven, high-contrast | Consumer brand, culture/recruiting | Brand film | [nike.md](nike.md) |
| Airbnb | Warm documentary-meets-product | Consumer, marketplace/platform | Brand film, testimonial hybrid | [airbnb.md](airbnb.md) |
| Figma | Playful, bright, community-first | Startup, dev-tool, design-tool | Community keynote, launch reveal | [figma.md](figma.md) |

## How to choose

1. Name the audience lens first (`.claude/skills/creative-director/references/audience-lenses.md`) — enterprise or startup.
2. Match the register to the actual content: a spec-heavy hardware reveal fits SpaceX/Tesla/Apple; a SaaS feature launch fits Linear/Stripe/Figma; a brand/culture piece fits Nike/Airbnb; a restrained, credible AI/dev-tool launch fits Anthropic.
3. Apply via `/company-style [name] [target]` rather than reading the file and improvising — the command enforces the adapt-don't-skin discipline.
4. If nothing fits well, that's a legitimate outcome — go back to `brand-motion-system`'s synthesis path instead of forcing a mismatched reference.
