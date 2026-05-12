import { useEffect, useState } from 'react'
import {
  Calendar,
  Bell,
  User,
  Home,
  PlusCircle,
  ClipboardList,
  Target,
  Plus,
} from 'lucide-react'
import { supabase } from '../../supabaseClient'

interface DarkHomeScreenProps {
  onNavigate: (screen: string) => void
  onTaskClick: (taskId: string) => void
}

export function DarkHomeScreen({ onNavigate }: DarkHomeScreenProps) {
  const [username, setUsername] = useState('User')

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const nameFromMetadata =
        user?.user_metadata?.name ||
        user?.user_metadata?.full_name ||
        user?.user_metadata?.display_name

      const nameFromEmail = user?.email?.split('@')[0]

      setUsername(nameFromMetadata || nameFromEmail || 'User')
    }

    loadUser()
  }, [])

  const firstLetter = username.charAt(0).toUpperCase()

  const today = new Date()

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(0, 229, 160, 0.08), transparent 35%), #0D0F14',
      }}
    >
      <div className="max-w-[430px] mx-auto min-h-screen px-5 pt-6 pb-28 relative">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1
              style={{
                fontSize: '2.3rem',
                fontWeight: 850,
                letterSpacing: '-0.06em',
                lineHeight: 1,
                marginBottom: '10px',
              }}
            >
              <span style={{ color: '#F0F2F5' }}>Step</span>
              <span style={{ color: '#00E5A0' }}>wise</span>
            </h1>

            <p className="text-[15px]" style={{ color: '#A0A5B0' }}>
              Good morning, {username}!
            </p>
          </div>

          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-[17px] font-bold"
            style={{
              border: '2px solid #242830',
              color: '#00E5A0',
              backgroundColor: '#11141A',
            }}
          >
            {firstLetter}
          </div>
        </div>

        <div
          className="rounded-[24px] p-5 mb-7 relative overflow-hidden"
          style={{
            backgroundColor: '#161920',
            border: '1px solid #242830',
            boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ backgroundColor: '#00E5A0' }}
          />

          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="text-[12px] font-bold uppercase tracking-[0.16em] mb-4"
                style={{ color: '#00E5A0' }}
              >
                Today's Focus
              </p>

              <h2
                className="text-[24px] font-bold leading-tight mb-4"
                style={{ color: '#F0F2F5' }}
              >
                Plan your day.
                <br />
                Make it count.
              </h2>

              <p className="text-[14px] leading-snug" style={{ color: '#A0A5B0' }}>
                Break big goals into doable steps.
              </p>
            </div>

            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'rgba(0, 229, 160, 0.12)',
              }}
            >
              <Target size={42} color="#00E5A0" strokeWidth={2.3} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[24px] font-bold" style={{ color: '#F0F2F5' }}>
            Today's tasks
          </h2>

          <p className="text-[14px]" style={{ color: '#A0A5B0' }}>
            {formattedDate}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center mt-14">
          <div
            className="w-25 h-25 rounded-full flex items-center justify-center mb-7"
            style={{
              backgroundColor: 'rgba(22, 25, 32, 0.9)',
              boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
            }}
          >
            <ClipboardList size={48} color="#8B909A" strokeWidth={1.8} />
          </div>

          <h3 className="text-[22px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
            No tasks yet
          </h3>

          <p className="text-[12px] leading-snug max-w-[260px]" style={{ color: '#A0A5B0' }}>
            Add your first assignment and start making progress.
          </p>
        </div>

        <button
          onClick={() => onNavigate('add')}
          className="absolute rounded-full flex items-center justify-center active:scale-95 transition-transform"
          style={{
            width: '58px',
            height: '58px',
            right: '26px',
            bottom: '106px',
            backgroundColor: '#00E5A0',
            boxShadow: '0 0 24px rgba(0, 229, 160, 0.35)',
            color: '#0D0F14',
            border: 'none',
          }}
        >
          <Plus size={34} strokeWidth={2.5} />
        </button>

        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between"
          style={{
            backgroundColor: 'rgba(22, 25, 32, 0.96)',
            border: '1px solid #242830',
            boxShadow: '0 18px 45px rgba(0,0,0,0.45)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <button className="flex flex-col items-center gap-1" onClick={() => onNavigate('home')}>
            <Home size={24} color="#00E5A0" fill="#00E5A0" />
          </button>

          <button className="flex flex-col items-center gap-1" onClick={() => onNavigate('add')}>
            <PlusCircle size={25} color="#8B909A" />
          </button>

          <button className="flex flex-col items-center gap-1" onClick={() => onNavigate('schedule')}>
            <Calendar size={25} color="#8B909A" />
          </button>

          <button className="flex flex-col items-center gap-1" onClick={() => onNavigate('rescue')}>
            <Bell size={25} color="#8B909A" />
          </button>

          <button className="flex flex-col items-center gap-1" onClick={() => onNavigate('profile')}>
            <User size={25} color="#8B909A" />
          </button>
        </div>
      </div>
    </div>
  )
}