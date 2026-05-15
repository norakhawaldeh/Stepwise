import { useState } from 'react'
import {
  ArrowLeft,
  Lock,
  Sprout,
  Flower2,
  Leaf,
  TreePine,
  X,
} from 'lucide-react'

interface DarkGardenScreenProps {
  onNavigate: (screen: string) => void
}

const plants = [
  { name: 'Starter Sprout', icon: Sprout, unlocked: true, requirement: 'Current plant' },
  { name: 'Glow Flower', icon: Flower2, unlocked: false, requirement: 'Complete 25 tasks' },
  { name: 'Calm Fern', icon: Leaf, unlocked: false, requirement: 'Complete 50 tasks' },
  { name: 'Focus Tree', icon: TreePine, unlocked: false, requirement: 'Complete 100 tasks' },
]

export function DarkGardenScreen({ onNavigate }: DarkGardenScreenProps) {
  const [completedTasks] = useState(2)
  const [showPlants, setShowPlants] = useState(false)

  const maxTasks = 5
  const progressDots = Array.from({ length: maxTasks }, (_, i) => i < completedTasks)

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top, rgba(0,229,160,0.09), transparent 32%), #0D0F14',
      }}
    >
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-28">
          <div className="flex items-center justify-between mb-7">
            <button onClick={() => onNavigate('home')}>
              <ArrowLeft size={22} color="#00E5A0" />
            </button>

            <button
              onClick={() => setShowPlants(true)}
              className="px-3 py-2 rounded-full text-[13px] font-bold flex items-center gap-2"
              style={{
                backgroundColor: 'rgba(0,229,160,0.12)',
                color: '#00E5A0',
              }}
            >
              <Sprout size={16} />
              Earn plants
            </button>
          </div>

          <div className="mb-7">
            <h1 className="text-[30px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
              Your Garden
            </h1>
            <p className="text-[15px]" style={{ color: '#A0A5B0' }}>
              Complete tasks. Fill the can. Grow slowly.
            </p>
          </div>

          <div
            className="rounded-[28px] overflow-hidden mb-5 relative"
            style={{
              height: '470px',
              background:
                'linear-gradient(180deg, #07131A 0%, #0B1117 48%, #17140F 100%)',
              border: '1px solid #242830',
              boxShadow: '0 22px 60px rgba(0,0,0,0.45)',
            }}
          >
            {/* soft moon glow */}
            <div
              className="absolute top-10 right-10 w-24 h-24 rounded-full"
              style={{
                background: 'rgba(0,229,160,0.08)',
                filter: 'blur(18px)',
              }}
            />

            {/* fireflies */}
            <div className="absolute top-24 left-12 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-70" />
            <div className="absolute top-44 right-20 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-60" />
            <div className="absolute top-64 left-24 w-1 h-1 rounded-full bg-yellow-200 opacity-60" />

            {/* garden ground */}
            <div
              className="absolute left-0 right-0 bottom-0 h-40"
              style={{
                background:
                  'linear-gradient(180deg, rgba(70,52,34,0.25), rgba(55,39,25,0.95))',
              }}
            />

            {/* pot */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-28 w-44 h-24 rounded-b-[48px] rounded-t-[20px]"
              style={{
                background: 'linear-gradient(180deg, #7A5A38, #3D2A1D)',
                border: '2px solid rgba(255,255,255,0.08)',
                boxShadow: '0 18px 35px rgba(0,0,0,0.45)',
              }}
            />

            {/* soil */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-[195px] w-44 h-9 rounded-full"
              style={{
                background: '#241810',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            />

            {/* plant */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[205px] flex flex-col items-center">
              <div className="w-1.5 h-24 rounded-full" style={{ backgroundColor: '#54C86A' }} />
              <div
                className="absolute top-5 -left-8 w-12 h-6 rounded-full rotate-[-28deg]"
                style={{ backgroundColor: '#68D878' }}
              />
              <div
                className="absolute top-8 left-2 w-12 h-6 rounded-full rotate-[28deg]"
                style={{ backgroundColor: '#7BE28B' }}
              />
              <div
                className="absolute top-0 w-8 h-8 rounded-full"
                style={{ backgroundColor: '#FF9DCB', boxShadow: '0 0 20px rgba(255,157,203,0.35)' }}
              />
            </div>

            {/* watering can */}
            <button
              className="absolute right-8 bottom-20 w-28 h-24 rounded-[20px] active:scale-95 transition-transform"
              style={{
                background: 'linear-gradient(180deg, #263944, #172129)',
                border: '2px solid rgba(0,229,160,0.35)',
                boxShadow: completedTasks === 5 ? '0 0 28px rgba(0,229,160,0.45)' : 'none',
              }}
            >
              <div
                className="absolute left-4 right-4 bottom-3 rounded-b-[14px]"
                style={{
                  height: `${(completedTasks / maxTasks) * 52}px`,
                  backgroundColor: '#00E5A0',
                  opacity: 0.75,
                }}
              />
              <span
                className="absolute bottom-4 left-0 right-0 text-center text-[14px] font-bold"
                style={{ color: '#F0F2F5' }}
              >
                {completedTasks}/5
              </span>
            </button>
          </div>

          <div
            className="rounded-[22px] p-5 mb-5"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            <p className="text-[14px] font-bold mb-4" style={{ color: '#F0F2F5' }}>
              Watering can progress
            </p>

            <div className="flex gap-3 mb-4">
              {progressDots.map((filled, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full"
                  style={{
                    backgroundColor: filled ? '#00E5A0' : 'transparent',
                    border: filled ? 'none' : '1px solid #40505A',
                  }}
                />
              ))}
            </div>

            <p className="text-[13px] leading-relaxed" style={{ color: '#A0A5B0' }}>
              Complete 3 more tasks to fill your can. When it’s full, tap the can to water your plant.
            </p>
          </div>
        </div>

        {showPlants && (
          <div
            className="absolute inset-0 px-5 flex items-end"
            style={{ backgroundColor: 'rgba(0,0,0,0.62)' }}
          >
            <div
              className="w-full rounded-t-[28px] p-5 mb-0"
              style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-[22px] font-bold" style={{ color: '#F0F2F5' }}>
                    Earn more plants
                  </h2>
                  <p className="text-[13px]" style={{ color: '#8B909A' }}>
                    Unlock plants by completing tasks.
                  </p>
                </div>

                <button onClick={() => setShowPlants(false)}>
                  <X size={22} color="#A0A5B0" />
                </button>
              </div>

              <div className="space-y-3 pb-5">
                {plants.map((plant) => {
                  const Icon = plant.icon

                  return (
                    <div
                      key={plant.name}
                      className="rounded-[18px] p-4 flex items-center gap-4"
                      style={{ backgroundColor: '#0D0F14', border: '1px solid #242830' }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: plant.unlocked
                            ? 'rgba(0,229,160,0.14)'
                            : '#20242D',
                        }}
                      >
                        {plant.unlocked ? (
                          <Icon size={24} color="#00E5A0" />
                        ) : (
                          <Lock size={21} color="#8B909A" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                          {plant.name}
                        </p>
                        <p className="text-[12px]" style={{ color: '#8B909A' }}>
                          {plant.requirement}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}