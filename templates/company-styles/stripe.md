# Style DNA: Stripe

> **Disclaimer:** This describes stylistic and motion *patterns* commonly observed in Stripe's public developer-tool marketing content, for creative-direction reference only. Never reproduce Stripe's actual logo, exact brand gradient, typeface, or copyrighted material. Adapt the pattern to your own brand — see `.claude/skills/brand-motion-system/references/reference-company-styles.md`.

## Color & type mood

- Clean, restrained gradients (soft, often cool-toned) used as accents behind or around code/UI content, never overwhelming it.
- Code-forward visuals: real-looking (but placeholder — see `.claude/skills/product-demo-video/references/data-and-dashboard-fakery.md`) code snippets and API responses are a primary visual element, not an afterthought.
- Type pairing: a humanist sans for marketing copy, monospace for anything code/API/data — the pairing itself signals "built by people who write code."
- Mostly light backgrounds with precise, thin dividers and grid alignment — precision reads as trustworthy for a payments/infra product.

## Motion signature

- Calm, confident pacing — faster than Anthropic's register but far less frenetic than Samsung's; a "measured engineer" pace.
- Precise grid-based motion: elements slide/align along clear axes rather than loose organic paths — motion should look "engineered," matching the type pairing's signal.
- Code/API responses often animate in line-by-line or token-by-token (like a terminal typing) rather than fading in as a block — this is a signature move worth using deliberately for any dev-tool content.
- Easing: smooth and restrained (`smootherstep`/`outCubic`), no bounce — bounce would undercut the "precise engineering" feel.

## Sound signature

- Typically minimal to silent, or a very understated ambient bed. If UI-click SFX are used, they're subtle — this register earns trust through visual precision, not audio energy.

## Typical narrative arc

Feature→Benefit→Proof, but proof is almost always a real (placeholder) code snippet or API call succeeding — the "proof" beat in this register is a working integration, not an emotional payoff. See `.claude/skills/creative-director/references/narrative-structures.md` and pair with `.claude/skills/product-demo-video/references/demo-narrative-patterns.md` for the demo-specific pacing.

## Applied storyboard skeleton (generic dev-tool/API launch)

| Scene | Time | Purpose | Motion | Notes |
|---|---:|---|---|---|
| 1 | 0-8s | The developer's problem | Restrained gradient backdrop, one line of copy | Calm, not urgent |
| 2 | 8-20s | Integration/workflow | Code snippet types in line-by-line | Monospace, terminal-style reveal |
| 3 | 20-30s | The API call succeeds | Response object appears, grid-aligned | This is the payoff beat |
| 4 | 30-36s | Proof at scale | One credible stat, understated | No round numbers — see data-fakery reference |
| 5 | 36-40s | Close | Clear, single CTA (docs/signup) | Minimal, precise |

## Best-fit audience

Startup dev-tools and enterprise API/infrastructure products where the audience is technical and trust is earned through precision and working code, not emotional appeal. A poor fit for consumer-facing or non-technical audiences who won't read a code snippet as reassuring.
