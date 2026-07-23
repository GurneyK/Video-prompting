# Reference Company Styles

This repo includes `templates/company-styles/` — a set of ~10 short reference documents describing the *stylistic and motion patterns* commonly associated with well-known companies' public launch content (Anthropic, Apple, SpaceX, Tesla, Samsung, Stripe, Linear, Nike, Airbnb, Figma). This reference explains how to use them correctly.

## What these templates are

Creative-direction reference points: pacing, color mood, type register, camera language, sound signature, and typical narrative arc, written in general descriptive terms — the kind of analysis a design blog or motion-design case study would publish. They exist so a user can say "give this the restraint of [Company X]" and get something concrete and actionable back.

## What these templates are not, and the hard rule

They are **never** a source for:
- An actual logo, wordmark, or trademarked mark
- An exact brand-guideline hex code lifted from a real internal document
- A proprietary or licensed typeface — use a comparable freely-licensed alternative and say so explicitly
- Copyrighted footage, photography, or copy lifted from the real company's actual materials
- Anything that would let a viewer reasonably mistake the output for an official production by that company

This is the same rule the rest of this repo already applies to customer data and logos (`VIDEO_PROMPTING_MASTER_GUIDE.md`: "never ask an AI to recreate a logo or customer mark from memory") — extended to third-party brand style generally, including when that "customer" is a company like Anthropic, Apple, or Tesla rather than the user's own client.

## How to use a template correctly

1. **Read the template as a mood/pattern reference, not a spec sheet.** Take the pacing, restraint level, and camera language; leave the specific palette values as inspiration rather than a literal swatch to copy verbatim.
2. **Always adapt, never skin.** The output must use the *current* project's own name, product, color choices (even if in the same family/mood as the reference), and copy. If someone unfamiliar with the reference company would still recognize this as "a video for [Company X]" rather than "a video for our own product," that's a Distinctiveness failure per `creative-director/references/creative-review-rubric.md`.
3. **State the borrowing explicitly in the style pack** (`style-pack-template.md` → "Reference Points" section) so it's clear to future collaborators what was borrowed and what was changed.
4. **Prefer borrowing pacing/restraint/camera-language over borrowing color.** These are the least legally and creatively risky things to take, and often the actual thing people mean when they say "make it feel like an Apple keynote" — it's rarely actually about Apple's specific gray.

## Choosing a reference company

See `templates/company-styles/README.md` for the full index mapping each company to its best-fit audience (enterprise/startup/dev-tool/consumer) and best-fit format (teaser/demo/presentation). Match the reference to the audience lens named in `creative-director` before picking one — an enterprise Unilever-style review deck borrowing Nike's kinetic-type energy will usually clash with the room it's presented in, even though Nike's execution is excellent on its own terms.

## When a user explicitly asks for a literal recreation

If a request asks to literally recreate a specific company's actual branded video, logo, or trademarked material (rather than borrow its style pattern), say so plainly: this repo's skills produce original work inspired by public style patterns, not reproductions of another company's proprietary assets, and point back to this rule rather than attempting the literal recreation.
