import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AnimatedLogo from './AnimatedLogo'

export default function SplashScreen() {
  const navigate = useNavigate()
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3400)
    const navTimer  = setTimeout(() => navigate('/login'), 3900)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(navTimer)
    }
  }, [navigate])

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#0D0F14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        transition: 'opacity 0.5s ease',
        opacity: fading ? 0 : 1,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <AnimatedLogo />

      {/* Bottom label */}
      <div
        style={{
          position: 'absolute',
          bottom: '44px',
          color: '#8B909A',
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
          opacity: 0,
          animation: 'fadeIn 0.5s ease 3.0s forwards',
        }}
      >
        Your AI focus coach
      </div>
    </div>
  )
}