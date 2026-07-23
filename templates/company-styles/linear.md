# Style DNA: Linear

> **Disclaimer:** This describes stylistic and motion *patterns* commonly observed in Linear's public product and release-note content, for creative-direction reference only. Never reproduce Linear's actual logo, exact brand colors, typeface, or copyrighted material. Adapt the pattern to your own brand — see `.claude/skills/brand-motion-system/references/reference-company-styles.md`.

## Color & type mood

- Near-black dark mode as the default canvas — this register treats dark mode as the primary identity, not an alternate theme.
- Minimal color accents — usually one or two precise, desaturated-but-distinct colors used only for state (active, success, priority) rather than decoration.
- Type: clean, condensed sans, small and precise — UI text is often smaller and denser than consumer-brand registers, signaling "built for power users."
- High information density tolerated and even embraced — unlike Apple/Anthropic's restraint, this register can show a fuller UI on screen at once because its audience reads UI fluently.

## Motion signature

- Snappy, fast motion throughout — short durations (150-250ms typical), minimal holds relative to other registers. This is the fastest-paced register in this set.
- Keyboard-first demonstration: showing a command palette, keyboard shortcuts, and instant state changes is a signature move — motion emphasizes *speed of the tool itself*, not cinematic pacing.
- No dramatic camera language (no push-ins, no orbits) — this register stays flat/UI-native, motion happens within the interface, not around it.
- Easing: fast `outCubic`, near-zero overshoot — precision and speed over drama.

## Sound signature

- Typically silent or near-silent, occasionally a very subtle UI-click. This register's energy comes from visual speed, not audio.

## Typical narrative arc

Config/Community Keynote Arc, or a rapid Feature→Benefit→Proof with almost no dwell time — reveals stack quickly, each smaller than a Samsung-style feature stack but faster-paced. See `.claude/skills/creative-director/references/narrative-structures.md`.

## Applied storyboard skeleton (generic SaaS feature-launch/changelog video)

| Scene | Time | Purpose | Motion | Notes |
|---|---:|---|---|---|
| 1 | 0-4s | Immediate hook | Dark UI already mid-action, no slow build | Assume a scrolling, impatient viewer |
| 2 | 4-14s | Feature 1, keyboard-first | Command palette opens, instant state change | Very short holds |
| 3 | 14-22s | Feature 2 | Same fast register, no new visual language | Consistency at speed |
| 4 | 22-28s | Feature 3 (headline) | Slightly longer hold — the one exception | Still fast relative to other registers |
| 5 | 28-32s | Close | Minimal CTA, no music swell | Ends as abruptly as it began |

## Best-fit audience

Startup SaaS products, especially dev-tools and productivity software, aimed at an audience that already reads UI fluently and values speed as a feature in itself. A poor fit for enterprise exec-review content (too fast to read comfortably in a considered-purchase context) or any audience unfamiliar with the product's UI conventions.
