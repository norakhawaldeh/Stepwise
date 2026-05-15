import { useState } from 'react'
import {
  CheckCircle2,
  Droplet,
  Sprout,
  CalendarCheck,
  WandSparkles,
  ArrowRight,
} from 'lucide-react'

interface DarkOnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    title: 'Welcome to Stepwise',
    subtitle: 'Break overwhelming tasks into simple steps and grow your focus garden.',
    icon: Sprout,
    accent: 'Stepwise helps you start when your brain wants to avoid everything.',
    bullets: [
      { icon: CalendarCheck, title: 'Plan your day', text: 'Turn big assignments into doable steps.' },
      { icon: Droplet, title: 'Complete tasks', text: 'Each completed task fills your watering can.' },
      { icon: Sprout, title: 'Grow your garden', text: 'Stay consistent and unlock new plants.' },
    ],
  },
  {
    title: 'Add any task',
    subtitle: 'Paste assignment instructions or just describe what you need to do.',
    icon: WandSparkles,
    accent: 'No perfect setup needed. Just dump the task in.',
    bullets: [
      { icon: CheckCircle2, title: 'Essay due in 3 days?', text: 'Stepwise breaks it into daily steps.' },
      { icon: CheckCircle2, title: 'Studying for an exam?', text: 'Tell us how you want to study.' },
      { icon: CheckCircle2, title: 'Need edits?', text: 'Preview and adjust the plan before saving.' },
    ],
  },
  {
    title: 'Follow your schedule',
    subtitle: 'Your plan becomes a clear daily timeline.',
    icon: CalendarCheck,
    accent: 'Know exactly what to do next without spiraling.',
    bullets: [
      { icon: CheckCircle2, title: 'Today’s tasks', text: 'See only what matters right now.' },
      { icon: CheckCircle2, title: 'Check things off', text: 'Finish steps and track your progress.' },
      { icon: CheckCircle2, title: 'Stay flexible', text: 'Move tasks around when life happens.' },
    ],
  },
  {
    title: 'Grow slowly',
    subtitle: 'Every 5 completed tasks fills your can so you can water your plant.',
    icon: Droplet,
    accent: 'No guilt. No punishment. Just progress.',
    bullets: [
      { icon: Droplet, title: 'Fill the can', text: 'Each completed task adds water.' },
      { icon: Sprout, title: 'Water your plant', text: 'Tap the full can to help it grow.' },
      { icon: CheckCircle2, title: 'Unlock more', text: 'Build your garden over time.' },
    ],
  },
]

export function DarkOnboardingScreen({ onComplete }: DarkOnboardingScreenProps) {
  const [slideIndex, setSlideIndex] = useState(0)

  const slide = slides[slideIndex]
  const MainIcon = slide.icon
  const isLast = slideIndex === slides.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
    } else {
      setSlideIndex(slideIndex + 1)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top, rgba(0,229,160,0.10), transparent 32%), #0D0F14',
      }}
    >
      <div className="max-w-[430px] mx-auto h-screen flex flex-col px-6 pt-8 pb-8">
        {/* Top */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className="h-2 rounded-full transition-all"
                style={{
                  width: index === slideIndex ? '34px' : '10px',
                  backgroundColor: index === slideIndex ? '#00E5A0' : '#242830',
                }}
              />
            ))}
          </div>

          <button
            onClick={onComplete}
            className="text-[14px] font-medium"
            style={{ color: '#A0A5B0' }}
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-7">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(0,229,160,0.12)',
                boxShadow: '0 0 30px rgba(0,229,160,0.18)',
              }}
            >
              <MainIcon size={40} color="#00E5A0" />
            </div>

            <h1
              className="text-[30px] font-bold leading-tight mb-3"
              style={{ color: '#F0F2F5' }}
            >
              {slide.title}
            </h1>

            <p
              className="text-[16px] leading-relaxed mx-auto max-w-[330px]"
              style={{ color: '#A0A5B0' }}
            >
              {slide.subtitle}
            </p>
          </div>

          {/* Garden Preview Card */}
          {slideIndex === 0 || slideIndex === 3 ? (
            <div
              className="rounded-[28px] p-5 mb-6 relative overflow-hidden"
              style={{
                minHeight: '255px',
                background:
                  'linear-gradient(180deg, rgba(8,24,28,0.95), rgba(12,15,20,0.95))',
                border: '1px solid #242830',
                boxShadow: '0 22px 60px rgba(0,0,0,0.35)',
              }}
            >
              <div
                className="absolute top-8 right-10 w-20 h-20 rounded-full"
                style={{
                  backgroundColor: 'rgba(0,229,160,0.08)',
                  filter: 'blur(18px)',
                }}
              />

              <div className="absolute top-14 left-12 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-80" />
              <div className="absolute top-28 right-16 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-70" />

              <div
                className="absolute left-0 right-0 bottom-0 h-20"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(65,45,28,0.15), rgba(58,40,26,0.9))',
                }}
              />

              <div className="absolute left-1/2 -translate-x-1/2 bottom-[72px]">
                <div
                  className="w-36 h-16 rounded-b-[42px] rounded-t-[18px]"
                  style={{
                    background: 'linear-gradient(180deg, #705133, #3E2B1F)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />
                <div
                  className="absolute left-0 right-0 -top-3 h-6 rounded-full"
                  style={{ backgroundColor: '#261A12' }}
                />
                <div className="absolute left-1/2 -translate-x-1/2 -top-20 flex flex-col items-center">
                  <div className="w-1.5 h-20 rounded-full" style={{ backgroundColor: '#54C86A' }} />
                  <div
                    className="absolute top-8 -left-8 w-11 h-6 rounded-full rotate-[-30deg]"
                    style={{ backgroundColor: '#68D878' }}
                  />
                  <div
                    className="absolute top-11 left-2 w-11 h-6 rounded-full rotate-[28deg]"
                    style={{ backgroundColor: '#7BE28B' }}
                  />
                </div>
              </div>

              <div
                className="absolute right-7 bottom-9 w-24 h-20 rounded-[20px]"
                style={{
                  background: 'linear-gradient(180deg, #263944, #172129)',
                  border: '2px solid rgba(0,229,160,0.35)',
                }}
              >
                <div
                  className="absolute left-3 right-3 bottom-3 h-8 rounded-b-[12px]"
                  style={{ backgroundColor: '#00E5A0', opacity: 0.75 }}
                />
                <p
                  className="absolute bottom-4 left-0 right-0 text-center text-[13px] font-bold"
                  style={{ color: '#F0F2F5' }}
                >
                  3/5
                </p>
              </div>
            </div>
          ) : null}

          {/* Accent */}
          <div
            className="rounded-[22px] p-4 mb-5"
            style={{
              backgroundColor: '#161920',
              border: '1px solid #242830',
            }}
          >
            <p className="text-[14px] leading-relaxed" style={{ color: '#F0F2F5' }}>
              {slide.accent}
            </p>
          </div>

          {/* Bullets */}
          <div className="space-y-3">
            {slide.bullets.map((item) => {
              const Icon = item.icon

              return (
                <div key={item.title} className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(0,229,160,0.12)' }}
                  >
                    <Icon size={21} color="#00E5A0" />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                      {item.title}
                    </h3>
                    <p className="text-[13px]" style={{ color: '#A0A5B0' }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{
            backgroundColor: '#00E5A0',
            color: '#0D0F14',
            boxShadow: '0 0 28px rgba(0,229,160,0.25)',
          }}
        >
          {isLast ? "Let's start" : 'Next'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}