export function DarkSplashScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0D0F14' }}
    >
      <div className="max-w-[390px] mx-auto w-full px-6 text-center">
        {/* App Name */}
        <h1 className="text-[38px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
          Stepwise
        </h1>

        {/* Tagline */}
        <p className="text-[16px] mb-12" style={{ color: '#8B909A' }}>
          Stop panicking. Start doing.
        </p>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2 mb-16">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#00E5A0', animationDelay: '0ms' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#00E5A0', animationDelay: '150ms' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#00E5A0', animationDelay: '300ms' }}
          />
        </div>

        {/* Footer */}
        <p className="text-[13px] absolute bottom-8 left-0 right-0 text-center" style={{ color: '#8B909A' }}>
          Your AI focus coach
        </p>
      </div>
    </div>
  );
}
