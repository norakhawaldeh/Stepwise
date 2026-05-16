import { useState } from 'react'
import AnimatedLogo from './AnimatedLogo'

export default function DarkSplashScreen({
  onNavigate,
}: {
  onNavigate?: (s: string) => void
}) {
  const [showButtons, setShowButtons] = useState(false)

  useState(() => {
    setTimeout(() => {
      setShowButtons(true)
    }, 1450)
  })

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between px-8 py-14"
      style={{
        background:
          'radial-gradient(ellipse 90% 55% at 50% 38%, rgba(72,35,175,0.55) 0%, rgba(30,15,80,0.4) 40%, #07071A 68%), #07071A',
        fontFamily: '"Raleway", "Outfit", "Nunito", sans-serif',
      }}
    >
      {/* ── TOP SPACER ── */}
      <div />

      {/* ── LOGO + TAGLINE ── */}
      <div className="flex flex-col items-center gap-4 -mt-6">
        <AnimatedLogo />

        {/* Tagline fades in with the logo */}
        <p
          className="text-[11px] tracking-[.4em] uppercase text-center"
          style={{
            color: '#9287e4',
            opacity: 0,
            animation: 'fadeIn 0.5s ease-out 1.3s forwards',
          }}
        >
          Grow through consistency
        </p>
      </div>

      {/* ── BUTTONS + FOOTER ── */}
      <div
        className={`flex flex-col items-center w-full gap-4 transition-all duration-700 ${
          showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Create account — outlined purple, no arrow */}
        <button
          onClick={() => onNavigate?.('signup')}
          className="w-full h-[64px] rounded-[22px] font-semibold text-[17px] flex items-center justify-center"
          style={{
            background: 'rgba(100,60,220,0.18)',
            border: '1.5px solid rgba(139,92,246,0.60)',
            color: '#FFFFFF',
            boxShadow: '0 0 28px rgba(100,60,220,0.22), inset 0 0 18px rgba(100,60,220,0.08)',
          }}
        >
          Create account
        </button>

        {/* Sign in — subtle outlined */}
        <button
          onClick={() => onNavigate?.('login')}
          className="w-full h-[50px] rounded-[22px] font-semibold text-[17px] flex items-center justify-center"
          style={{
            background: 'transparent',
            border: '1.5px solid rgba(139,92,246,0.25)',
            color: '#8B5CF6',
          }}
        >
          Sign in
        </button>

        {/* Bottom tagline */}
        <p
          className="text-[9.5px] tracking-[0.22em] uppercase text-center mt-2"
          style={{ color: '#5b50a3' }}
        >
          Plan with purpose • Stay consistent • Grow every day
        </p>
      </div>

      {/* Keyframe needed for tagline fade-in */}
      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </div>
  )
}