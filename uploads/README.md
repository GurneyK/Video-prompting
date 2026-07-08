# Upload Bundles

This folder is a suggested place to assemble local upload packets before sending context to Claude, Codex, ChatGPT, or another AI tool.

Do not commit confidential assets here unless they are approved for the repository.

## Simple Upload Bundle

Use for most users:

```text
AI_UPLOAD_PACKET.md
templates/[one-template].md
references/verification-checklist.md
```

## HTML Video Teaser Upload Bundle

Use for code-driven animated HTML videos:

```text
AI_UPLOAD_PACKET.md
templates/html-video-teaser-template.md
decision-guides/mode-a-vs-mode-b-html-video.md
references/html-video-teasers/README.md
references/html-video-teasers/architecture.md
references/html-video-teasers/animation-primitives.md
references/html-video-teasers/delivery-modes.md
references/html-video-teasers/scenes-and-pacing.md
references/html-video-teasers/react-babel-traps.md
references/html-video-teasers/verification.md
assets/animations.jsx
assets/scene-template.jsx
assets/build.mjs
```

## Brand Upload Bundle

Use when the output must follow brand rules:

```text
AI_UPLOAD_PACKET.md
templates/creative-brief-template.md
references/branding-and-logo-use.md
approved logo files
brand guide
approved screenshots
```

## Reminder

Ask the AI to summarize what it received before it starts. This catches missing files early.
