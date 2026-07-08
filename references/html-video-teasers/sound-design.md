# Sound design

Optional, but a teaser with sound feels 3× more premium. The Nexus demo uses fully procedural Web Audio for SFX (clicks, ticks, whooshes, chimes) plus an `<audio>` track for background music. The Claude Design teaser ships silent — your call.

## When to add audio

- The teaser will be presented (demo, sales pitch, conference) → yes
- The teaser is embedded into a login splash / quiet site → optional, default to muted with a toggle
- The teaser is shared as a one-off file → silent or single-toggle
- Auto-playing audio in an iframe → never (browsers block it; muted by default)

## Background music: sidecar `<audio>` + timeline sync

The BGM is a **sidecar** file (`assets/bgm.mp3`) referenced by an `<audio>` tag in the shell — **not** inlined as a base64 data URI. A 3-minute MP3 at ~7MB would bloat the HTML 10× if inlined; keep it as a sidecar so the HTML stays under ~300KB.

### Shell HTML

```html
<!-- After #app, before the source script blocks -->
<audio id="bgm" src="./assets/bgm.mp3" preload="auto" style="display:none"></audio>
```

No `autoplay`, no `loop` (unless you specifically want loop). Audio is driven entirely from the player's RAF loop.

### Stage wiring — the four sync points

Audio must stay in lockstep with the video. Wire these four:

```jsx
function Stage({ duration, ... }) {
  const [t, setT] = useState(0);
  const [muted, setMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);
  const playingRef = useRef(true);
  const tRef = useRef(0);

  // 1. Acquire on mount
  useEffect(() => {
    audioRef.current = document.getElementById('bgm');
    if (audioRef.current) audioRef.current.volume = 0.45;
  }, []);

  // 2. Start on first user gesture (browsers block autoplay with sound)
  const playAudio = () => {
    const a = audioRef.current; if (!a) return;
    a.muted = muted;
    if (!audioStarted) {
      a.currentTime = tRef.current;
      a.play().then(() => setAudioStarted(true)).catch(() => {});
    } else if (a.paused) a.play().catch(() => {});
  };
  const pauseAudio = () => { audioRef.current?.pause(); };

  // 3. Sync on seek
  const seek = (v) => {
    tRef.current = v; setT(v);
    if (audioRef.current && audioStarted) audioRef.current.currentTime = v;
  };

  // 4. Sync on play/pause/restart
  const toggle = () => {
    playingRef.current = !playingRef.current;
    if (playingRef.current && tRef.current < duration) playAudio();
    else pauseAudio();
  };
  const restart = () => {
    tRef.current = 0; setT(0); playingRef.current = true;
    if (audioRef.current) { audioRef.current.currentTime = 0; playAudio(); }
  };

  // RAF tick — pause audio when video reaches end
  // … if (next >= duration) { audioRef.current?.pause(); … }
}
```

### Browser autoplay restriction

Chrome/Safari/Firefox **block** `audio.play()` until the user has interacted with the page (click, keypress, etc.). The pattern above handles this:
- On mount, audio is acquired but not played.
- The first `toggle()` / `restart()` / play-button-click counts as a user gesture and starts the audio.
- The `.catch(() => {})` swallows the autoplay rejection if it happens (harmless — audio stays silent until the user clicks again).

If your video auto-plays via `playingRef.current = true` (default), the **audio will be silent for the first play** because the page hasn't received a gesture. The user has to click play (or scrub) once. You can show a "🔊 click to enable sound" hint on first load if this matters.

### Embed mode → start muted

In iframes (e.g. embedded in a Next.js page), default to muted to avoid the "this site is making noise" browser ban:

```js
useEffect(() => {
  const isEmbed = new URLSearchParams(location.search).get('embed') === '1';
  if (isEmbed) setMuted(true);
}, []);
```

### Controls bar

Add a mute toggle button next to fullscreen:

```jsx
<button onClick={toggleMute} title="Mute / Unmute (M)">{muted ? '🔇' : '🔊'}</button>
```

And a key binding:

```js
if (e.code === 'KeyM') toggleMute();
```

### What NOT to do

- **Don't inline MP3s as base64** — HTML balloons 10× for no gain.
- **Don't use `<audio autoplay>`** — browsers block it; you'll think audio is broken when it's just refusing to start.
- **Don't loop short tracks behind a long video** — a 30s track repeating 3× under a 90s video sounds frantic. Use a track ≥ the video length.
- **Don't drive audio time from React state** — use refs. Setting `audio.currentTime` triggers a buffer re-seek that's noticeably laggy if done every render.
- **Don't forget to pause audio when video ends** — it'll keep playing past the last frame.

### When to add procedural Web Audio SFX on top

BGM sets ambient tone; SFX punctuates motion. They're complementary, not alternatives. See the next section for procedural SFX (clicks, whooshes, chimes) that fire on scene boundaries via the edge-trigger registry.

## SFX: procedural Web Audio (no files)

Synthesize clicks, whooshes, chimes inline. Zero asset bundling, zero buffering, deterministic.

```js
const AC = new (window.AudioContext || window.webkitAudioContext)();
function envelope(g, t0, attack, decay, peak = 1) {
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(peak, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
}

function click() {
  const t0 = AC.currentTime;
  const o = AC.createOscillator(); const g = AC.createGain();
  o.type = 'square'; o.frequency.setValueAtTime(2400, t0);
  o.frequency.exponentialRampToValueAtTime(800, t0 + 0.04);
  envelope(g, t0, 0.001, 0.05, 0.18);
  o.connect(g).connect(AC.destination); o.start(t0); o.stop(t0 + 0.06);
}

function whoosh() {
  const t0 = AC.currentTime;
  const noise = AC.createBufferSource();
  const buf = AC.createBuffer(1, AC.sampleRate * 0.5, AC.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length);
  noise.buffer = buf;
  const filt = AC.createBiquadFilter(); filt.type = 'bandpass';
  filt.frequency.setValueAtTime(800, t0);
  filt.frequency.exponentialRampToValueAtTime(2400, t0 + 0.4);
  const g = AC.createGain(); envelope(g, t0, 0.05, 0.4, 0.25);
  noise.connect(filt).connect(g).connect(AC.destination);
  noise.start(t0); noise.stop(t0 + 0.5);
}

function chime(freq = 880) {
  const t0 = AC.currentTime;
  const o = AC.createOscillator(); const g = AC.createGain();
  o.type = 'sine'; o.frequency.value = freq;
  envelope(g, t0, 0.005, 0.6, 0.3);
  o.connect(g).connect(AC.destination); o.start(t0); o.stop(t0 + 0.7);
}
```

These are starting points. Tune frequencies/envelopes to your scene.

## The edge-trigger fire registry

The hard part of SFX in a scrubable video: how do you fire a sound *exactly once* per frame-crossing, but *re-arm* if the user scrubs back or the video loops?

```js
function makeFireFn() {
  const fired = new Set();
  let lastT = 0;
  return function fire(threshold, key, fn) {
    // re-arm if t went backwards (scrub or loop)
    if (lastT > threshold && fired.has(key)) fired.delete(key);
    if (lastT <= threshold && /* current */ tRef.current > threshold && !fired.has(key)) {
      fired.add(key);
      fn();
    }
    lastT = tRef.current;
  };
}
```

In the player loop:

```js
const fire = makeFireFn();
const tick = (now) => {
  // … advance t …
  fire(2.5, 's1_typeStart', click);
  fire(starts[1] - 0.25, 's2_whoosh', whoosh); // 0.25s before scene 2
  // …
};
```

Or expose `fire` to scenes via the ctx:

```js
function scene2Import(ctx, t, t0, sceneDur, fire) {
  fire(t0 - 0.25, `s2_whoosh`, whoosh);
  fire(t0 + 1.0, `s2_chime`, () => chime(660));
  return (/* … */);
}
```

## SFX placement rules

- **Whoosh 0.25s before a scene boundary.** The audio leads the eye.
- **Click on cursor click-down.** Pair with the click-pose flip.
- **Chime on completion / final-frame moments.** Card landing, deploy success, build complete.
- **Ticker on rapid stagger.** A list cascading in gets a low-volume tick per element (fade volume after 5).
- **One bass thump on big reveals.** A `60Hz` decaying sine is the difference between "title slides in" and "title arrives."
- **Don't SFX every single motion.** That's noise. Pick the 5–8 moments that matter.

## Honor the embed/mute toggle

```js
const audioOn = !embed && userToggleOn;
function fireSafely(threshold, key, fn) {
  if (!audioOn) return;
  fire(threshold, key, fn);
}
```

The host page should be able to disable audio entirely via `?embed=1` or `?muted=1`.

## What not to ship

- **Stock-library claps, snaps, dings.** They sound 2008 and date the video instantly. Procedural is timeless.
- **A music track louder than 40% volume.** SFX should always be audible over BGM.
- **Audio on first frame with no user gesture.** Browsers will block it; the audio context will be in a `suspended` state. Resume on first toggle/play.
- **Distinct SFX for every mid-scene motion.** Pick the structural moments only.

## Resuming a suspended AudioContext

```js
async function ensureAudio() {
  if (AC.state === 'suspended') await AC.resume();
}
// call from any user gesture handler (play button, fullscreen, etc.)
```
