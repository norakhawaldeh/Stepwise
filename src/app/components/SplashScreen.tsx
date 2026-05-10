export function SplashScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #1A1F36 0%, #2D2250 100%)',
      }}
    >
      <div className="max-w-[390px] mx-auto w-full px-6 text-center">
        {/* App Name */}
        <h1 className="text-[36px] font-bold text-white mb-2">
          Stepwise<sup className="text-[14px]">®</sup>
        </h1>

        {/* Tagline */}
        <p className="text-[16px] mb-12" style={{ color: '#C8C4E8' }}>
          Stop panicking. Start doing.
        </p>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2 mb-16">
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#FF6B4A', animationDelay: '0ms' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#FF6B4A', animationDelay: '150ms' }}
          />
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: '#FF6B4A', animationDelay: '300ms' }}
          />
        </div>

        {/* Footer */}
        <p className="text-[13px] absolute bottom-8 left-0 right-0 text-center" style={{ color: '#666' }}>
          Your AI-powered focus coach.
        </p>
      </div>
    </div>
  );
}
