// Scene template — copy this for every new scene, rename the function.
//
// A scene is a pure function of (t, t0, sceneDur) that returns JSX. It exposes
// a static `.dur` (or `.computeDur()`) so the parent can compute starts[].
//
// Use the phase-budget pattern: declare every duration in `P` up front, derive
// cumulative ends, then drive each visual from clamp01((lt - phaseStart) / P.X).

const { Layer, Easing, interpolate, seq, hold, envS, twLerp, clamp01 } = window;
const T = window.THEME;

function sceneTemplate(t, t0, sceneDur) {
  const lt = t - t0;                                  // scene-local time

  // ── Phase budget ──────────────────────────────────────────────────────────
  // Every duration named. Don't inline magic numbers in the JSX.
  const P = {
    A_in:    0.6,    // element A enters
    A_hold:  1.4,    // element A holds (READING TIME — this is content, not pause)
    A_out:   0.4,    // element A exits

    B_in:    0.7,    // element B enters
    B_hold:  1.6,
    B_out:   0.5,

    tail:    0.3,    // post-content settle before scene exit
  };

  // Cumulative phase ends.
  const tA_end = P.A_in + P.A_hold + P.A_out;
  const tB_end = tA_end + P.B_in + P.B_hold + P.B_out;
  const tEnd   = tB_end + P.tail;                     // == sceneDur

  // ── Scene-level fade-in/out (sits on top of phase animations) ─────────────
  const sceneOp = envS(lt, 0, 0.3, sceneDur - 0.3, sceneDur);

  // ── Element A: title that types in, holds, fades out ──────────────────────
  const aOp = envS(lt, 0, P.A_in, P.A_in + P.A_hold, tA_end);
  const aY  = interpolate(lt, [0, P.A_in], [40, 0], Easing.outCubic);

  // ── Element B: card that slides in from right with overshoot ──────────────
  const bIn   = clamp01((lt - tA_end) / P.B_in);
  const bOut  = clamp01((lt - (tB_end - P.B_out)) / P.B_out);
  const bX    = interpolate(bIn, [0, 1], [200, 0], Easing.outBack);
  const bOpIn = interpolate(bIn, [0, 1], [0, 1]);
  const bOp   = bOpIn * (1 - bOut);

  return (
    <Layer x={0} y={0} w={1280} h={720} opacity={sceneOp}>
      {/* Title */}
      <Layer x={140} y={120} w={1000} h={120} opacity={aOp} style={{ transform: `translateY(${aY}px)` }}>
        <div style={{
          fontFamily: T.font.serif, fontSize: 72, fontWeight: 400,
          color: T.ink.primary, letterSpacing: -1,
        }}>
          Title goes here
        </div>
      </Layer>

      {/* Card */}
      <Layer x={400} y={300} w={480} h={280} opacity={bOp} style={{ transform: `translateX(${bX}px)` }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: 32,
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          fontFamily: T.font.sans,
        }}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>Card heading</div>
          <div style={{ marginTop: 12, fontSize: 16, color: T.ink.secondary, lineHeight: 1.4 }}>
            Card body that explains the feature in one sentence.
          </div>
        </div>
      </Layer>
    </Layer>
  );
}

// `dur` is read by the parent to build the cascade. Sum every P value.
sceneTemplate.dur = 0.6 + 1.4 + 0.4 + 0.7 + 1.6 + 0.5 + 0.3;   // == 5.5s

// Optional: edge-triggered SFX for this scene.
// sceneTemplate.sfx = (t, t0, fire) => {
//   fire(t0 + 0.6, 'tpl_chime', () => window.AUDIO?.chime(660));
// };

window.sceneTemplate = sceneTemplate;
