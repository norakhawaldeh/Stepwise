import { useState } from 'react'

interface DarkOnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    label: 'AI BREAKDOWN',
    title: 'Big tasks,\ntiny steps.',
    subtitle:
      'Drop in an exam or essay. Rooted plans realistic daily steps so you always know what is next.',
    cta: 'Continue',
  },
  {
    label: 'YOUR GARDEN',
    title: 'Finish a task,\ngrow a plant.',
    subtitle:
      'Every completed task feeds your garden. Unlock new plants as your streak grows.',
    cta: 'Continue',
  },
  {
    label: 'RESCUE MODE',
    title: 'Missed a day?\nNo spiral.',
    subtitle:
      'One tap reshuffles your week. Falling behind never feels permanent again.',
    cta: 'Plant my first seed',
  },
]

export function DarkOnboardingScreen({ onComplete }: DarkOnboardingScreenProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = slides[slideIndex]
  const isLast = slideIndex === slides.length - 1
  const isFirst = slideIndex === 0

  const handleNext = () => {
    if (isLast) onComplete()
    else setSlideIndex((i) => i + 1)
  }

  const handleBack = () => {
    if (!isFirst) setSlideIndex((i) => i - 1)
  }

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse 110% 60% at 50% 30%, rgba(80,35,180,0.55) 0%, rgba(30,12,70,0.6) 45%, #08071A 70%), #08071A',
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      }}
    >
      {/* Google Font for display serif */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');
        .onboard-heading {
          font-family: 'DM Serif Display', 'Georgia', serif;
          font-weight: 400;
          font-size: clamp(48px, 11vw, 64px);
          line-height: 1.08;
          letter-spacing: -0.5px;
          color: #FFFFFF;
          white-space: pre-line;
        }
      `}</style>

      <div className="max-w-[430px] w-full mx-auto flex flex-col h-full px-7 pt-10 pb-10">

        {/* ── TOP BAR ── */}
        <div className="flex items-center justify-between mb-10">
          {/* Back */}
          <button
            onClick={handleBack}
            className="text-[15px] font-medium transition-opacity"
            style={{ color: '#9490B8', opacity: isFirst ? 0 : 1, pointerEvents: isFirst ? 'none' : 'auto' }}
          >
            Back
          </button>

          {/* Progress pills */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full transition-all duration-400"
                style={{
                  width: i === slideIndex ? '44px' : '28px',
                  backgroundColor:
                    i === slideIndex
                      ? '#8B5CF6'
                      : i < slideIndex
                      ? 'rgba(139,92,246,0.35)'
                      : 'rgba(255,255,255,0.12)',
                  boxShadow: i === slideIndex ? '0 0 8px rgba(139,92,246,0.7)' : 'none',
                }}
              />
            ))}
          </div>

          {/* Skip */}
          <button
            onClick={onComplete}
            className="text-[15px] font-medium"
            style={{ color: '#9490B8' }}
          >
            Skip
          </button>
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="flex-1 flex flex-col justify-center pb-8">
          {/* Label */}
          <p
            className="text-[11px] font-bold tracking-[0.22em] mb-6"
            style={{ color: 'rgba(139,92,246,0.75)' }}
          >
            {slide.label}
          </p>

          {/* Heading */}
          <h1 className="onboard-heading mb-6">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-[16px] leading-[1.65] max-w-[320px]"
            style={{ color: 'rgba(200,195,230,0.7)' }}
          >
            {slide.subtitle}
          </p>
        </div>

        {/* ── CONTINUE BUTTON ── */}
        <button
          onClick={handleNext}
          className="w-full h-[62px] rounded-[20px] text-[16px] font-semibold flex items-center justify-center active:scale-[0.98] transition-transform"
          style={{
            background: 'rgba(139,92,246,0.12)',
            border: '1.5px solid rgba(139,92,246,0.35)',
            color: '#FFFFFF',
            boxShadow: '0 0 24px rgba(100,50,220,0.18)',
          }}
        >
          {slide.cta}
        </button>
      </div>
    </div>
  )
}