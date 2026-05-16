import { ArrowLeft, Lock, CheckCircle, Sprout } from 'lucide-react'
import { IconTabBar } from './IconTabBar'

import plantSeed from '../../assets/garden/plant-seed.png'
import plant5 from '../../assets/garden/plant-5.png'
import plant10 from '../../assets/garden/plant-10.png'
import plant15 from '../../assets/garden/plant-15.png'
import plant20 from '../../assets/garden/plant-20.png'

interface GardenCollectionScreenProps {
  onNavigate: (screen: string) => void
}

const plants = [
  {
    id: 'starter',
    name: 'Starter Sprout',
    unlockAt: 0,
    completeAt: 20,
    image: plant20,
  },
  {
    id: 'maple',
    name: 'Japanese Maple',
    unlockAt: 20,
    completeAt: 45,
    image: plant15,
  },
  {
    id: 'lotus',
    name: 'Moon Lotus',
    unlockAt: 45,
    completeAt: 75,
    image: plant10,
  },
  {
    id: 'bonsai',
    name: 'Calm Bonsai',
    unlockAt: 75,
    completeAt: 110,
    image: plant5,
  },
]

export function GardenCollectionScreen({ onNavigate }: GardenCollectionScreenProps) {
  const saved = localStorage.getItem('stepwiseSchedule')
  const parsed = saved ? JSON.parse(saved) : null
  const tasks = parsed?.tasks || []

  const totalCompletedTasks = tasks.filter((task: any) => task.completed).length

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, color-mix(in srgb, var(--accent-color) 12%, transparent), transparent 35%), #0D0F14',
      }}
    >
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-7 pb-36">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => onNavigate('home')}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
            >
              <ArrowLeft size={21} color="var(--accent-color)" />
            </button>

            <div
              className="px-4 py-2 rounded-full text-[13px] font-bold"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
                color: 'var(--accent-color)',
              }}
            >
              {totalCompletedTasks} tasks grown
            </div>
          </div>

          <h1 className="text-[32px] font-bold mb-1" style={{ color: '#F0F2F5' }}>
            Your Garden
          </h1>

          <p className="text-[13px] leading-6 mb-12" style={{ color: '#A0A5B0' }}>
            View the plants you’ve grown and the ones waiting to be unlocked.
          </p>

          <div className="space-y-4">
            {plants.map((plant) => {
              const unlocked = totalCompletedTasks >= plant.unlockAt
              const completed = totalCompletedTasks >= plant.completeAt

              const progress =
                totalCompletedTasks <= plant.unlockAt
                  ? 0
                  : Math.min(
                      100,
                      ((totalCompletedTasks - plant.unlockAt) /
                        (plant.completeAt - plant.unlockAt)) *
                        100
                    )

              return (
                <div
                  key={plant.id}
                  className="rounded-[24px] p-4 border flex items-center gap-4"
                  style={{
                    backgroundColor: unlocked ? '#161920' : 'rgba(22,25,32,0.55)',
                    borderColor: unlocked
                      ? 'color-mix(in srgb, var(--accent-color) 22%, #242830)'
                      : '#242830',
                    opacity: unlocked ? 1 : 0.55,
                  }}
                >
                  <div
                    className="w-20 h-20 rounded-[20px] flex items-center justify-center relative"
                    style={{
                      backgroundColor: '#0D0F14',
                      border: '1px solid #242830',
                    }}
                  >
                    <img
                      src={unlocked ? plant.image : plantSeed}
                      alt={plant.name}
                      className="w-16 h-16 object-contain"
                      style={{ filter: unlocked ? 'none' : 'grayscale(1)' }}
                    />

                    {!unlocked && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#20242D', border: '1px solid #333A46' }}
                      >
                        <Lock size={16} color="#8B909A" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[16px] font-bold" style={{ color: '#F0F2F5' }}>
                        {plant.name}
                      </h3>

                      {completed ? (
                        <CheckCircle size={20} color="var(--accent-color)" />
                      ) : unlocked ? (
                        <Sprout size={19} color="var(--accent-color)" />
                      ) : (
                        <Lock size={18} color="#8B909A" />
                      )}
                    </div>

                    <p className="text-[13px] mt-1 mb-3" style={{ color: '#A0A5B0' }}>
                      {completed
                        ? 'Fully grown'
                        : unlocked
                        ? `${Math.floor(progress)}% grown`
                        : `Unlocks at ${plant.unlockAt} completed tasks`}
                    </p>

                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2A2F3A' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: 'var(--accent-color)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}