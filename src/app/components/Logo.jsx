export default function Logo({ size = 80, showText = true, showTagline = false }) {
  const scale = size / 80

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <svg
        width={80 * scale}
        height={70 * scale}
        viewBox="0 0 80 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stems */}
        <line x1="12" y1="58" x2="12" y2="46" stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="58" x2="40" y2="34" stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="58" x2="68" y2="18" stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round" />

        {/* Base line */}
        <line x1="4" y1="58" x2="76" y2="58" stroke="#00E5A0" strokeWidth="2.5" strokeLinecap="round" />

        {/* Circle 1 — small, left */}
        <circle cx="12" cy="40" r="8" fill="#00E5A0" />

        {/* Circle 2 — medium, middle */}
        <circle cx="40" cy="28" r="10" fill="#00E5A0" />

        {/* Circle 3 — large, right with checkmark */}
        <circle cx="68" cy="12" r="12" fill="#00E5A0" />
        <polyline
          points="62,12 66,16 74,8"
          stroke="#0D0F14"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {showText && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: `${2.2 * scale}rem`, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>
            <span style={{ color: '#F0F2F5' }}>Step</span>
            <span style={{ color: '#00E5A0' }}>Wise</span>
          </div>
          {showTagline && (
            <>
              <div style={{
                color: '#00E5A0',
                fontSize: `${0.7 * scale}rem`,
                fontWeight: 700,
                letterSpacing: '0.18em',
                marginTop: '6px',
                textTransform: 'uppercase'
              }}>
                Master Your Tasks
              </div>
              <div style={{
                color: '#8B909A',
                fontSize: `${0.85 * scale}rem`,
                marginTop: '8px'
              }}>
                Break it down. Get it done.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
