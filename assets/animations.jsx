// Animation primitives — Stage, Sprite, Layer, useTime, useSprite, easing, interpolate, helpers.
//
// Drop this in as the FIRST <script type="text/babel"> block (Mode A) or as
// src/01-utils.jsx + src/05-primitives.jsx in Mode B (split per concern).
//
// Everything attached to `window` so cross-block usage works (see references/react-babel-traps.md).

const { useState, useRef, useEffect, useContext, createContext, useMemo } = React;

// ── Easing ────────────────────────────────────────────────────────────────────

const Easing = {
  linear:    p => p,
  in:        p => p * p,
  out:       p => 1 - (1 - p) * (1 - p),
  inOut:     p => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
  inCubic:   p => p ** 3,
  outCubic:  p => 1 - Math.pow(1 - p, 3),
  inOutCubic:p => p < 0.5 ? 4 * p ** 3 : 1 - Math.pow(-2 * p + 2, 3) / 2,
  outQuart:  p => 1 - Math.pow(1 - p, 4),
  outBack:   p => { const c1 = 1.70158, c3 = c1 + 1;
                    return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2); },
  smooth:    p => p * p * p * (p * (6 * p - 15) + 10),  // smootherstep — DEFAULT
};

// ── Math helpers ──────────────────────────────────────────────────────────────

const clamp01 = p => Math.max(0, Math.min(1, p));
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const smoothstep = (a, b, t) => { const x = clamp01((t - a) / (b - a)); return x * x * (3 - 2 * x); };

function twLerp(a, b, p) {
  if (Array.isArray(a) && Array.isArray(b) && a.length === b.length) {
    return a.map((v, i) => v + (b[i] - v) * p);
  }
  return a + (b - a) * p;
}

function interpolate(t, [i0, i1], [o0, o1], easing = Easing.linear) {
  if (t <= i0) return o0;
  if (t >= i1) return o1;
  const p = easing((t - i0) / (i1 - i0));
  if (Array.isArray(o0)) return twLerp(o0, o1, p);
  return o0 + (o1 - o0) * p;
}

// keyframe sequence — stops = [[t, v, easing?], …]; per-stop easing wins over default.
function seq(now, stops, easing = Easing.smooth) {
  if (now <= stops[0][0]) return stops[0][1];
  if (now >= stops.at(-1)[0]) return stops.at(-1)[1];
  for (let i = 0; i < stops.length - 1; i++) {
    const [t0, v0, e] = stops[i];
    const [t1, v1] = stops[i + 1];
    if (now >= t0 && now < t1) {
      const p = (now - t0) / (t1 - t0);
      return twLerp(v0, v1, (e || easing)(p));
    }
  }
  return stops.at(-1)[1];
}

// step-hold — returns latest stop whose t <= now. No interpolation.
function hold(now, stops) {
  let v = stops[0][1];
  for (const [t, val] of stops) if (now >= t) v = val; else break;
  return v;
}

// envelope — fade in [t0,t1], hold [t1,t2], fade out [t2,t3]. Pass Infinity to skip a side.
function envS(now, t0, t1, t2, t3) {
  if (now <= t0) return 0;
  if (now >= t3) return 0;
  if (now < t1)  return Easing.smooth(clamp01((now - t0) / (t1 - t0)));
  if (now < t2)  return 1;
  return Easing.smooth(1 - clamp01((now - t2) / (t3 - t2)));
}

// ── Stage / Sprite / Layer ────────────────────────────────────────────────────

const StageCtx  = createContext({ t: 0, duration: 1 });
const SpriteCtx = createContext({ start: 0, end: 0, p: 0 });
const useTime   = () => useContext(StageCtx).t;
const useSprite = () => useContext(SpriteCtx).p;

function Stage({ duration, width = 1280, height = 720, loop = false, children, onFinish }) {
  const [t, setT] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scale, setScale] = useState(1);
  const tRef = useRef(0);
  const lastRef = useRef(performance.now());
  const playingRef = useRef(true);

  useEffect(() => {
    let raf;
    const tick = (now) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      if (playingRef.current) {
        const next = tRef.current + dt;
        if (next >= duration) {
          if (loop) { tRef.current = 0; setT(0); }
          else {
            tRef.current = duration; setT(duration);
            if (onFinish) onFinish();
            window.parent?.postMessage({ type: 'finished' }, '*');
            return;
          }
        } else { tRef.current = next; setT(next); }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, loop, onFinish]);

  useEffect(() => {
    const onResize = () => setScale(Math.min(window.innerWidth / width, window.innerHeight / height));
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [width, height]);

  const seek    = (v) => { tRef.current = clamp(v, 0, duration); setT(tRef.current); };
  const toggle  = () => { playingRef.current = !playingRef.current; setPaused(!playingRef.current); };
  const restart = () => { tRef.current = 0; setT(0); lastRef.current = performance.now();
                          playingRef.current = true; setPaused(false); };
  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      const el = document.documentElement;
      (el.requestFullscreen || el.webkitRequestFullscreen).call(el);
    }
  };

  // Keybindings: Space (toggle), R (restart), F (fullscreen)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onKey = (e) => {
      if (e.code === 'Space') { e.preventDefault(); toggle(); }
      else if (e.code === 'KeyR') { restart(); }
      else if (e.code === 'KeyF') { toggleFullscreen(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const embed = typeof location !== 'undefined' &&
                new URLSearchParams(location.search).get('embed') === '1';

  return (
    React.createElement(React.Fragment, null,
      React.createElement('div', {
        className: 'stage',
        style: { width, height, position: 'relative', transform: `scale(${scale})`,
                 transformOrigin: 'center', willChange: 'transform' },
      },
        React.createElement(StageCtx.Provider, { value: { t, duration } }, children)
      ),
      !embed && React.createElement('div', {
        className: 'controls',
        style: {
          position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 10, alignItems: 'center', padding: '8px 12px',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          borderRadius: 999, color: '#fff', fontSize: 12, zIndex: 100,
          fontFamily: '-apple-system, sans-serif',
        },
      },
        React.createElement('button', { onClick: toggle, style: btnStyle, title: 'Play / Pause (Space)' }, paused ? '▶' : '❙❙'),
        React.createElement('button', { onClick: restart, style: btnStyle, title: 'Restart (R)' }, '↺'),
        React.createElement('input', {
          type: 'range', min: 0, max: duration, step: 0.01, value: t,
          style: { width: 240, accentColor: '#fff' },
          onChange: e => seek(+e.target.value),
        }),
        React.createElement('span', null, `${t.toFixed(2)} / ${duration.toFixed(2)}s`),
        React.createElement('button', { onClick: toggleFullscreen, style: btnStyle, title: 'Fullscreen (F)' }, '⛶')
      )
    )
  );
}

const btnStyle = {
  background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
  padding: '4px 10px', borderRadius: 999, cursor: 'pointer', fontSize: 12,
};

function Sprite({ start, end, children }) {
  const { t } = useContext(StageCtx);
  if (t < start || t > end) return null;
  const p = clamp01((t - start) / (end - start));
  return React.createElement(SpriteCtx.Provider, { value: { start, end, p } }, children);
}

function Layer({ x = 0, y = 0, w, h, scale: s = 1, rotation = 0, opacity = 1, style, children }) {
  return React.createElement('div', {
    style: {
      position: 'absolute', left: x, top: y, width: w, height: h, opacity,
      transform: `scale(${s}) rotate(${rotation}deg)`, transformOrigin: 'center', ...style,
    },
  }, children);
}

// ── Tweak registry ────────────────────────────────────────────────────────────

function createTweakCtx(tweaks = {}) {
  const manifest = [];
  const reg = (key, fallback, type, meta = {}) => {
    const v = tweaks[key] ?? fallback;
    manifest.push({ key, value: v, type, ...meta });
    return v;
  };
  return {
    num:   (k, f, m) => reg(k, f, 'num', m),
    bool:  (k, f, m) => reg(k, f, 'bool', m),
    text:  (k, f, m) => reg(k, f, 'text', m),
    point: (k, f, m) => reg(k, f, 'point', m),
    el:    (id, label) => manifest.push({ key: `_el_${id}`, value: null, type: 'el', label }),
    manifest,
  };
}

// ── Edge-trigger fire registry (for SFX) ──────────────────────────────────────

function makeFireFn(tRefGetter) {
  const fired = new Set();
  let lastT = 0;
  return function fire(threshold, key, fn) {
    const now = tRefGetter();
    if (now < lastT - 0.05 && fired.has(key)) fired.delete(key);   // re-arm on scrub-back
    if (lastT <= threshold && now > threshold && !fired.has(key)) {
      fired.add(key);
      try { fn(); } catch (_) {}
    }
    lastT = now;
  };
}

// ── Export ────────────────────────────────────────────────────────────────────

Object.assign(window, {
  Stage, Sprite, Layer, useTime, useSprite,
  Easing, clamp01, clamp, smoothstep, twLerp, interpolate, seq, hold, envS,
  createTweakCtx, makeFireFn,
});
