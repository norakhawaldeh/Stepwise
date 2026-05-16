import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Lock,
  Sprout,
  Droplets,
  X,
  Check,
} from 'lucide-react'
import { IconTabBar } from './IconTabBar'

import plantSeed from '../../assets/garden/plant-seed.png'
import plant5 from '../../assets/garden/plant-5.png'
import plant10 from '../../assets/garden/plant-10.png'
import plant15 from '../../assets/garden/plant-15.png'
import plant20 from '../../assets/garden/plant-20.png'

interface DarkGardenScreenProps {
  onNavigate: (screen: string) => void
}

const PLANT_STAGES = [
  {
    tasks: 0,
    label: 'Seed',
    subtitle: 'Start here',
    image: plantSeed,
    requirement: 'Start completing tasks',
    width: 190,
  },
  {
    tasks: 5,
    label: 'Sprout',
    subtitle: '5 tasks completed',
    image: plant5,
    requirement: 'Complete 5 tasks',
    width: 205,
  },
  {
    tasks: 10,
    label: 'Young Plant',
    subtitle: '10 tasks completed',
    image: plant10,
    requirement: 'Complete 10 tasks',
    width: 215,
  },
  {
    tasks: 15,
    label: 'Growing Plant',
    subtitle: '15 tasks completed',
    image: plant15,
    requirement: 'Complete 15 tasks',
    width: 225,
  },
  {
    tasks: 20,
    label: 'Blooming Plant',
    subtitle: '20 tasks completed',
    image: plant20,
    requirement: 'Complete 20 tasks',
    width: 235,
  },
]

function getCompletedTaskCount() {
  try {
    const saved = localStorage.getItem('stepwiseSchedule')
    if (!saved) return 0

    const parsed = JSON.parse(saved)
    const tasks = parsed?.tasks || []

    return tasks.filter((task: any) => task.completed === true).length
  } catch (error) {
    console.error('Could not read garden task progress:', error)
    return 0
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function DarkGardenScreen({ onNavigate }: DarkGardenScreenProps) {
  const [completedTasks, setCompletedTasks] = useState(getCompletedTaskCount)
  const [showPlants, setShowPlants] = useState(false)
  const [isPouring, setIsPouring] = useState(false)
  const [plantStageIndex, setPlantStageIndex] = useState(() => {
    const savedStage = Number(localStorage.getItem('rootedGardenStage') || '0')
    return clamp(savedStage, 0, PLANT_STAGES.length - 1)
  })

  const maxStageIndex = PLANT_STAGES.length - 1
  const earnedStageIndex = clamp(Math.floor(completedTasks / 5), 0, maxStageIndex)
  const canPour = earnedStageIndex > plantStageIndex && plantStageIndex < maxStageIndex

  const bucketCount = canPour
    ? 5
    : clamp(completedTasks - plantStageIndex * 5, 0, 5)

  const bucketPercent = (bucketCount / 5) * 100
  const currentStage = PLANT_STAGES[plantStageIndex]
  const nextStage = PLANT_STAGES[plantStageIndex + 1]
  const progressDots = Array.from({ length: 5 }, (_, index) => index < bucketCount)

  const remainingUntilPour = Math.max(0, 5 - bucketCount)

  useEffect(() => {
    const updateProgress = () => {
      setCompletedTasks(getCompletedTaskCount())
    }

    updateProgress()
    window.addEventListener('storage', updateProgress)
    window.addEventListener('focus', updateProgress)

    const interval = window.setInterval(updateProgress, 1000)

    return () => {
      window.removeEventListener('storage', updateProgress)
      window.removeEventListener('focus', updateProgress)
      window.clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // If the user marks completed tasks as undone, the garden should reflect that.
    // Example: if they drop below 10 completed tasks, they should not stay at the 10-task plant stage.
    if (plantStageIndex > earnedStageIndex) {
      setPlantStageIndex(earnedStageIndex)
      localStorage.setItem('rootedGardenStage', String(earnedStageIndex))
    }
  }, [earnedStageIndex, plantStageIndex])

  const handlePour = () => {
    if (!canPour || isPouring) return

    setIsPouring(true)

    window.setTimeout(() => {
      const newStage = clamp(plantStageIndex + 1, 0, maxStageIndex)
      setPlantStageIndex(newStage)
      localStorage.setItem('rootedGardenStage', String(newStage))
      setIsPouring(false)
    }, 1200)
  }

  const growthMessage = useMemo(() => {
    if (plantStageIndex === maxStageIndex) {
      return 'Your plant is fully grown. Keep completing tasks to keep your garden thriving.'
    }

    if (canPour) {
      return 'Your bucket is full. Tap Pour to grow your plant.'
    }

    return `Complete ${remainingUntilPour} more task${remainingUntilPour === 1 ? '' : 's'} to fill your bucket.`
  }, [canPour, plantStageIndex, remainingUntilPour, maxStageIndex])

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, color-mix(in srgb, var(--accent-color) 12%, transparent), transparent 34%), var(--bg-primary)',
      }}
    >
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-7 pb-36">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => onNavigate('home')}
              className="w-11 h-11 rounded-full flex items-center justify-center border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
              }}
            >
              <ArrowLeft size={22} color="var(--accent-color)" />
            </button>

            <button
              onClick={() => setShowPlants(true)}
              className="px-4 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 border"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
                borderColor: 'color-mix(in srgb, var(--accent-color) 24%, transparent)',
                color: 'var(--accent-color)',
              }}
            >
              <Sprout size={16} />
              Plant stages
            </button>
          </div>

          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[32px] font-bold tracking-[-0.7px] mb-2" style={{ color: '#F0F2F5' }}>
                Growth Garden
              </h1>
              <p className="text-[14px] leading-4" style={{ color: '#A0A5B0' }}>
                Every completed task helps your plant grow.
              </p>
            </div>

            <div className="flex flex-col items-center gap-1 mt-1">
              <div
                className="relative w-14 h-16 rounded-b-[16px] rounded-t-[8px] overflow-hidden border"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.22)',
                  boxShadow: canPour ? '0 0 20px rgba(59,130,246,0.35)' : 'none',
                }}
              >
                <div
                  className="absolute left-1 right-1 bottom-1 rounded-b-[12px] transition-all duration-500"
                  style={{
                    height: `${Math.max(bucketPercent, 4)}%`,
                    background:
                      bucketCount > 0
                        ? 'linear-gradient(180deg, rgba(96,165,250,0.92), rgba(37,99,235,0.82))'
                        : 'transparent',
                  }}
                />
                <div className="absolute inset-x-2 top-1 h-[1px] bg-white/50" />
              </div>

              <p className="text-[11px] font-semibold" style={{ color: '#A0A5B0' }}>
                {bucketCount}/5
              </p>
            </div>
          </div>

          <div
            className="rounded-[30px] overflow-hidden mb-5 relative"
            style={{
              height: '430px',
              background:
                'linear-gradient(180deg, #07121A 0%, #081019 55%, #14110E 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 22px 60px rgba(0,0,0,0.35)',
            }}
          >
            <div
              className="absolute top-24 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full"
              style={{
                background: 'color-mix(in srgb, var(--accent-color) 16%, transparent)',
                filter: 'blur(56px)',
              }}
            />

            <div className="absolute top-20 left-11 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-70" />
            <div className="absolute top-36 right-14 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-60" />
            <div className="absolute top-60 left-20 w-1 h-1 rounded-full bg-yellow-200 opacity-50" />
            <div className="absolute top-72 right-24 w-1 h-1 rounded-full bg-yellow-200 opacity-40" />

            <div
              className="absolute left-0 right-0 bottom-0 h-36"
              style={{
                background:
                  'linear-gradient(180deg, transparent, rgba(45,34,24,0.96))',
              }}
            />

            <img
              src={currentStage.image}
              alt={currentStage.label}
              className="absolute left-1/2 -translate-x-1/2 bottom-[118px] object-contain transition-all duration-700"
              style={{
                width: `${currentStage.width}px`,
                filter: 'drop-shadow(0 24px 28px rgba(0,0,0,0.48))',
              }}
            />

            

            <div
              className="absolute top-5 right-5 w-[160px] rounded-[22px] px-4 py-3 backdrop-blur-xl border z-20"
              style={{
                background: 'rgba(12,18,28,0.78)',
                borderColor: 'rgba(80,140,255,0.18)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
              }}
            >
              <div className="flex items-center gap-2">
                <Droplets size={20} color="#00D1FF" />

                <p className="text-[20px] font-bold leading-none text-white">
                  {bucketCount}/5
                </p>
              </div>

              <p className="text-[12px] text-[#AAB4C5] leading-tight items-center mt-2" style={{ color: '#A0A5B0' }}>
                tasks to water
              </p>

              {bucketCount >= 5 && (
                <button
                  onClick={handlePour}
                  className="mt-3 w-full py-2 rounded-full text-[13px] font-bold animate-pulse"
                  style={{
                    backgroundColor: 'rgba(37,99,235,0.18)',
                    color: '#60A5FA',
                    border: '1px solid rgba(96,165,250,0.55)',
                    boxShadow: '0 0 18px rgba(96,165,250,0.45)',
                  }}
                >
                  Pour
                </button>
              )}
            </div>
          </div>

          <div
            className="rounded-[24px] p-5 mb-5 border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
              boxShadow: '0 18px 45px rgba(0,0,0,0.18)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                  Today&apos;s growth
                </p>
                <p className="text-[12px] mt-1" style={{ color: '#8B909A' }}>
                  {completedTasks} total completed task{completedTasks === 1 ? '' : 's'}
                </p>
              </div>

              <div
                className="px-3 py-1.5 rounded-full text-[12px] font-bold"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
                  color: 'var(--accent-color)',
                }}
              >
                {currentStage.label}
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              {progressDots.map((filled, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: filled ? 'var(--accent-color)' : 'transparent',
                    border: filled ? 'none' : '1px solid #40505A',
                    boxShadow: filled
                      ? '0 0 18px color-mix(in srgb, var(--accent-color) 36%, transparent)'
                      : 'none',
                  }}
                />
              ))}
            </div>

            <p className="text-[13px] leading-relaxed" style={{ color: '#A0A5B0' }}>
              {growthMessage}
            </p>
          </div>
        </div>

        {showPlants && (
          <div
            className="absolute inset-0 px-5 flex items-end z-[60]"
            style={{ backgroundColor: 'rgba(0,0,0,0.62)' }}
          >
            <div
              className="w-full rounded-t-[30px] p-5 mb-0 max-h-[78vh] overflow-y-auto border"
              style={{ backgroundColor: '#161920', borderColor: '#242830' }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[24px] font-bold tracking-[-0.4px]" style={{ color: '#F0F2F5' }}>
                    Plant stages
                  </h2>
                  <p className="text-[12px]" style={{ color: '#8B909A' }}>
                    Complete tasks, fill the bucket, then pour to grow.
                  </p>
                </div>

                <button onClick={() => setShowPlants(false)}>
                  <X size={22} color="#A0A5B0" />
                </button>
              </div>

              <div className="space-y-3 pb-5">
                {PLANT_STAGES.map((plant, index) => {
                  const unlocked = index <= plantStageIndex
                  const available = index <= earnedStageIndex

                  return (
                    <div
                      key={plant.label}
                      className="rounded-[22px] p-4 flex items-center gap-4 border"
                      style={{
                        backgroundColor: '#0D0F14',
                        borderColor: unlocked
                          ? 'color-mix(in srgb, var(--accent-color) 28%, #242830)'
                          : '#242830',
                      }}
                    >
                      <div
                        className="w-20 h-20 rounded-[22px] flex items-center justify-center relative overflow-hidden"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <img
                          src={plant.image}
                          alt={plant.label}
                          className="w-[86px] h-[86px] object-contain"
                          style={{ filter: unlocked ? 'none' : 'grayscale(1) opacity(0.45)' }}
                        />

                        {!available && (
                          <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-[#20242D]">
                            <Lock size={15} color="#8B909A" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                          {plant.label}
                        </p>
                        <p className="text-[12px] mt-1" style={{ color: '#8B909A' }}>
                          {plant.requirement}
                        </p>

                        <div className="mt-3 h-1.5 rounded-full overflow-hidden bg-[#242830]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${clamp((completedTasks / Math.max(plant.tasks, 1)) * 100, plant.tasks === 0 ? 100 : 0, 100)}%`,
                              backgroundColor: 'var(--accent-color)',
                            }}
                          />
                        </div>
                      </div>

                      {unlocked && <Check size={22} color="var(--accent-color)" />}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        <IconTabBar activeTab="garden" onNavigate={onNavigate} />
      </div>
    </div>
  )
}
