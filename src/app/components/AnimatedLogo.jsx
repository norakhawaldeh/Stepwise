export default function AnimatedLogo() {
  return (
    <>
      <style>{`
        /* ── Spring pop: scale 0 → overshoot → 1 ── */
        @keyframes popIn {
          0%   { transform: scale(0);    opacity: 0; }
          55%  { transform: scale(1.28); opacity: 1; }
          75%  { transform: scale(0.92); }
          100% { transform: scale(1);    opacity: 1; }
        }

        /* ── Stem draws downward from top ── */
        @keyframes drawStem1 {
          from { stroke-dashoffset: 14; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes drawStem2 {
          from { stroke-dashoffset: 22; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes drawStem3 {
          from { stroke-dashoffset: 38; }
          to   { stroke-dashoffset: 0; }
        }

        /* ── Checkmark draws ── */
        @keyframes drawCheck {
          from { stroke-dashoffset: 18; }
          to   { stroke-dashoffset: 0; }
        }

        /* ── Base line fades ── */
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Text rises ── */
        @keyframes riseIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* SVG elements — transform-box so transform-origin: center works */
        .sw-c1, .sw-c2, .sw-c3 {
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
        }

        /* Circle timings */
        .sw-c1 { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards; }
        .sw-c2 { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s forwards; }
        .sw-c3 { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.15s forwards; }

        /* Stem timings — after their circle pops */
        .sw-stem1 {
          stroke-dasharray: 14;
          stroke-dashoffset: 14;
          animation: drawStem1 0.28s ease-out 0.6s forwards;
        }
        .sw-stem2 {
          stroke-dasharray: 22;
          stroke-dashoffset: 22;
          animation: drawStem2 0.28s ease-out 1.1s forwards;
        }
        .sw-stem3 {
          stroke-dasharray: 38;
          stroke-dashoffset: 38;
          animation: drawStem3 0.28s ease-out 1.6s forwards;
        }

        /* Checkmark draws after circle 3 pops */
        .sw-check {
          stroke-dasharray: 18;
          stroke-dashoffset: 18;
          animation: drawCheck 0.35s ease-out 1.65s forwards;
        }

        /* Base line */
        .sw-base {
          opacity: 0;
          animation: fadeIn 0.3s ease 0.1s forwards;
        }

        /* Text elements */
        .sw-title {
          opacity: 0;
          animation: riseIn 0.55s cubic-bezier(0.22,1,0.36,1) 2.0s forwards;
        }
        .sw-master {
          opacity: 0;
          animation: riseIn 0.5s ease 2.3s forwards;
        }
        .sw-tagline {
          opacity: 0;
          animation: fadeIn 0.5s ease 2.6s forwards;
        }
        .sw-dots {
          opacity: 0;
          animation: fadeIn 0.5s ease 2.9s forwards;
        }

        /* Pulsing dots */
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1); }
        }
        .dot1 { animation: pulse 1.6s ease-in-out 3.1s infinite; }
        .dot2 { animation: pulse 1.6s ease-in-out 3.3s infinite; }
        .dot3 { animation: pulse 1.6s ease-in-out 3.5s infinite; }
      `}</style>

      {/* SVG Logo Mark */}
      <svg
        width="110"
        height="90"
        viewBox="0 0 80 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base horizontal line */}
        <line
          className="sw-base"
          x1="4" y1="58" x2="76" y2="58"
          stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Stem 1 — left, short */}
        <line
          className="sw-stem1"
          x1="12" y1="46" x2="12" y2="58"
          stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Stem 2 — middle */}
        <line
          className="sw-stem2"
          x1="40" y1="36" x2="40" y2="58"
          stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Stem 3 — right, tall */}
        <line
          className="sw-stem3"
          x1="68" y1="20" x2="68" y2="58"
          stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Circle 1 — left, small */}
        <circle className="sw-c1" cx="12" cy="40" r="8" fill="#00E5A0" />

        {/* Circle 2 — middle */}
        <circle className="sw-c2" cx="40" cy="28" r="10" fill="#00E5A0" />

        {/* Circle 3 — right with checkmark */}
        <circle className="sw-c3" cx="68" cy="12" r="12" fill="#00E5A0" />

        {/* Checkmark */}
        <polyline
          className="sw-check"
          points="62,12 66,16 74,8"
          stroke="#0D0F14"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Wordmark */}
      <div className="sw-title" style={{
        fontSize: '2.8rem',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        marginTop: '16px',
        textAlign: 'center',
      }}>
        <span style={{ color: '#F0F2F5' }}>Step</span>
        <span style={{ color: '#00E5A0' }}>Wise</span>
      </div>

      {/* Master Your Tasks */}
      <div className="sw-master" style={{
        color: '#00E5A0',
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginTop: '10px',
        textAlign: 'center',
      }}>
        Master Your Tasks
      </div>

      {/* Divider + tagline */}
      <div className="sw-tagline" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginTop: '12px',
      }}>
        <div style={{ width: '36px', height: '1px', background: '#242830' }} />
        <span style={{ color: '#8B909A', fontSize: '0.82rem' }}>
          Break it down. Get it done.
        </span>
        <div style={{ width: '36px', height: '1px', background: '#242830' }} />
      </div>

      {/* Pulsing dots */}
      <div className="sw-dots" style={{
        display: 'flex',
        gap: '8px',
        marginTop: '48px',
      }}>
        {['dot1', 'dot2', 'dot3'].map(cls => (
          <div key={cls} className={cls} style={{
            width: '7px', height: '7px',
            borderRadius: '50%',
            backgroundColor: '#00E5A0',
          }} />
        ))}
      </div>
    </>
  )
}