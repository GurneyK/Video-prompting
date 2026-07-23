# Demo Narrative Patterns

## The core shape: Context → Workflow → Payoff → Proof → CTA

| Beat | Job | Length share | Notes |
|---|---|---|---|
| Context | One line establishing who's using this and why they opened the product today | 10% | Not a generic "meet Sarah" — the specific task, e.g. "closing the books three days faster" |
| Workflow | The actual clicks/keystrokes that solve it | 40% | This is where the 3-click rule applies |
| Payoff | The moment the value appears — a number changes, a state flips, a result renders | 20% | This should be the single most visually emphasized moment in the whole video — zoom in, hold longer, add the strongest SFX/music hit |
| Proof | A second data point or before/after that shows this wasn't a lucky one-off | 20% | E.g. a stat, a second use case in 2 seconds, a testimonial line |
| CTA | One clear next action | 10% | "Try it", "Book a demo", "See pricing" — never more than one |

## The 3-click rule in practice

Count perceived interactions from the moment the demo starts until the payoff beat. Perceived means what the viewer sees happen, not every underlying system event.

- **1 click**: uploading a file, opening a menu, hitting one button
- **2 clicks**: the above plus one configuration choice
- **3 clicks**: the above plus the action that triggers the result

If your workflow needs a 4th or 5th click to reach payoff, do one of:
- Cut a step and imply it happened off-screen ("after a quick setup...")
- Speed-ramp the less important clicks (fast cut through) and only slow down for the ones that matter
- Reconsider whether this is the right feature to lead with — if it takes 5 real clicks to show value, it may not be the best "hero" workflow for a short demo, even if it's an important feature

## Multi-feature demos: Feature → Benefit → Proof, repeated

When covering more than one feature (max 3, per `creative-director/references/narrative-structures.md`):

1. Order features by "most likely to be the reason they buy," not build order or menu order.
2. Each feature gets its own compressed Feature→Benefit→Proof beat — don't let all three share one long proof section at the end, or the middle feature feels like filler.
3. Use a consistent transition between features (a cross-fade, a consistent UI-panel-swipe) so the viewer's pattern-matching does the work of "okay, new feature now."
4. The feature order should build — put the single strongest feature either first (hook) or last (climax), never buried in the middle.

## Demo-specific storyboard columns

Add these two columns to the standard storyboard table (`templates/storyboard-template.md`):

| Scene | Time | Purpose | UI state | Cursor action | Visual | Motion | Copy | Audio/SFX | Assets | QA risk |
|---|---:|---|---|---|---|---|---|---|---|---|

- **UI state**: what's on screen before this scene's action (e.g. "dashboard, 3 pending items")
- **Cursor action**: the literal interaction (e.g. "hover row 2 → click 'Approve' → dropdown closes")

This makes the demo buildable scene-by-scene without re-deriving the UI logic every time.

## Length discipline

- Single-feature demo: 20-45 seconds finished runtime.
- Multi-feature (2-3): 45-90 seconds.
- Full product walkthrough (rare, usually for sales enablement not marketing): up to 3 minutes, but split into chapters/scenes a viewer could skip between.

If the storyboard is running long, cut a scene before you slow one down (per `VIDEO_PROMPTING_MASTER_GUIDE.md`).
