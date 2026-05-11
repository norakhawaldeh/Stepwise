import AnimatedLogo from './AnimatedLogo'

export function DarkSplashScreen() {
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
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      <AnimatedLogo />

      <div
        style={{
          position: 'absolute',
          bottom: '44px',
          color: '#8B909A',
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
        }}
      >
        Your AI focus coach
      </div>
    </div>
  )
}