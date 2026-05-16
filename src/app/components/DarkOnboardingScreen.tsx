import { useState } from 'react'
import {
  CheckCircle2,
  Droplet,
  Sprout,
  CalendarCheck,
  WandSparkles,
  ArrowRight,
  Flower2,
} from 'lucide-react'

interface DarkOnboardingScreenProps {
  onComplete: () => void
}

const accent = '#2D7D46'

const slides = [
  {
    title: 'Welcome to Rooted',
    subtitle: 'Turn overwhelming deadlines into calm, doable steps.',
    icon: Sprout,
    accent: 'Rooted helps you start small, stay consistent, and build momentum without spiraling.',
    bullets: [
      { icon: WandSparkles, title: 'Break it down', text: 'Add a task and Rooted turns it into clear steps.' },
      { icon: CalendarCheck, title: 'Know what to do', text: 'See exactly what needs your attention today.' },
      { icon: Sprout, title: 'Grow with progress', text: 'Every completed task helps your garden grow.' },
    ],
  },
  {
    title: 'Add any assignment',
    subtitle: 'Paste instructions, type a quick note, or describe what you need done.',
    icon: WandSparkles,
    accent: 'No perfect setup needed. Just add the task and Rooted helps organize the rest.',
    bullets: [
      { icon: CheckCircle2, title: 'Essays', text: 'Split writing into outline, draft, edits, and final review.' },
      { icon: CheckCircle2, title: 'Exams', text: 'Turn studying into focused sessions across multiple days.' },
      { icon: CheckCircle2, title: 'Projects', text: 'Preview your plan before adding it to your schedule.' },
    ],
  },
  {
    title: 'Follow your schedule',
    subtitle: 'Your plan becomes a simple daily timeline you can actually follow.',
    icon: CalendarCheck,
    accent: 'Instead of wondering where to start, Rooted shows your next doable step.',
    bullets: [
      { icon: CheckCircle2, title: 'Today’s tasks', text: 'Focus only on what matters right now.' },
      { icon: CheckCircle2, title: 'Mark progress', text: 'Check off tasks as you complete them.' },
      { icon: CheckCircle2, title: 'Stay flexible', text: 'Use Rescue Mode when you fall behind.' },
    ],
  },
  {
    title: 'Grow your garden',
    subtitle: 'Your completed tasks become visible progress.',
    icon: Flower2,
    accent: 'Complete tasks, fill your bucket, water your plant, and unlock new plants over time.',
    bullets: [
      { icon: Droplet, title: 'Fill the bucket', text: 'Each completed task adds water.' },
      { icon: Sprout, title: 'Water your plant', text: 'When the bucket is full, pour to grow.' },
      { icon: Flower2, title: 'Unlock plants', text: 'Build a garden that reflects your consistency.' },
    ],
  },
]

export function DarkOnboardingScreen({ onComplete }: DarkOnboardingScreenProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = slides[slideIndex]
  const MainIcon = slide.icon
  const isLast = slideIndex === slides.length - 1

  const handleNext = () => {
    if (isLast) onComplete()
    else setSlideIndex(slideIndex + 1)
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(45,125,70,0.16), transparent 36%), #0D0F14',
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      }}
    >
      <div className="max-w-[430px] mx-auto h-screen flex flex-col px-6 pt-8 pb-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: index === slideIndex ? '34px' : '10px',
                  backgroundColor: index === slideIndex ? accent : '#242830',
                }}
              />
            ))}
          </div>

          <button onClick={onComplete} className="text-[14px] font-medium" style={{ color: '#A0A5B0' }}>
            Skip
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="text-center mb-7">
            <div
              className="w-20 h-20 rounded-[26px] mx-auto mb-5 flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(45,125,70,0.16)',
                boxShadow: '0 0 34px rgba(45,125,70,0.20)',
              }}
            >
              <MainIcon size={38} color={accent} />
            </div>

            <h1 className="text-[32px] font-extrabold tracking-[-1px] leading-tight mb-3" style={{ color: '#F0F2F5' }}>
              {slide.title}
            </h1>

            <p className="text-[15px] leading-6 mx-auto max-w-[330px]" style={{ color: '#A0A5B0' }}>
              {slide.subtitle}
            </p>
          </div>

           

          

          <div className="space-y-3">
            {slide.bullets.slice(0, 2).map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(45,125,70,0.14)' }}>
                    <Icon size={21} color={accent} />
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

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{
            backgroundColor: accent,
            color: '#FFFFFF',
            boxShadow: '0 14px 35px rgba(45,125,70,0.28)',
          }}
        >
          {isLast ? "Let's start" : 'Next'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}