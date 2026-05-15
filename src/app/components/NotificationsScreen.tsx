import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void
}

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const [taskReminders, setTaskReminders] = useState(true)
  const [focusReminders, setFocusReminders] = useState(true)
  const [achievementAlerts, setAchievementAlerts] = useState(true)
  const [weeklyProgress, setWeeklyProgress] = useState(false)
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(false)
  const [quietHoursStart, setQuietHoursStart] = useState('22:00')
  const [quietHoursEnd, setQuietHoursEnd] = useState('08:00')

  const Toggle = ({
    checked,
    onClick,
  }: {
    checked: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className="w-12 h-7 rounded-full p-1 flex items-center transition-all flex-shrink-0"
      style={{
        backgroundColor: checked ? '#00E5A0' : '#2A2F3A',
        justifyContent: checked ? 'flex-end' : 'flex-start',
      }}
    >
      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: '#F0F2F5' }} />
    </button>
  )

  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0D0F14 0%, #0D0F14 100%)',
      }}
    >
      {/* Header */}
      <div className="px-5 pt-8 pb-6 flex items-center justify-between border-b" style={{ borderColor: '#242830' }}>
        <button
          onClick={() => onNavigate('profile')}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
        >
          <ChevronLeft size={24} color="#F0F2F5" />
        </button>

        <h1 className="text-[20px] font-bold" style={{ color: '#F0F2F5' }}>
          Notifications
        </h1>

        <div className="w-11" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8 pb-32">
        {/* Reminders Section */}
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#8B909A' }}>
          Reminders
        </p>

        <div
          className="rounded-[20px] overflow-hidden border mb-8"
          style={{ backgroundColor: '#161920', borderColor: '#242830' }}
        >
          {/* Task Reminders */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex-1">
              <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                Task reminders
              </h3>
              <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                Get reminded about unfinished tasks
              </p>
            </div>
            <Toggle checked={taskReminders} onClick={() => setTaskReminders(!taskReminders)} />
          </div>

          {/* Focus Reminders */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex-1">
              <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                Focus reminders
              </h3>
              <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                Stay on track with focus sessions
              </p>
            </div>
            <Toggle checked={focusReminders} onClick={() => setFocusReminders(!focusReminders)} />
          </div>

          {/* Achievement Alerts */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex-1">
              <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                Achievement alerts
              </h3>
              <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                Get notified about achievements
              </p>
            </div>
            <Toggle checked={achievementAlerts} onClick={() => setAchievementAlerts(!achievementAlerts)} />
          </div>
        </div>

        {/* Reports Section */}
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#8B909A' }}>
          Reports
        </p>

        <div
          className="rounded-[20px] overflow-hidden border mb-8"
          style={{ backgroundColor: '#161920', borderColor: '#242830' }}
        >
          {/* Weekly Progress */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex-1">
              <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                Weekly progress
              </h3>
              <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                Receive weekly progress updates
              </p>
            </div>
            <Toggle checked={weeklyProgress} onClick={() => setWeeklyProgress(!weeklyProgress)} />
          </div>
        </div>

        {/* Quiet Hours Section */}
        <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#8B909A' }}>
          Quiet Hours
        </p>

        <div
          className="rounded-[20px] overflow-hidden border"
          style={{ backgroundColor: '#161920', borderColor: '#242830' }}
        >
          {/* Quiet Hours Toggle */}
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex-1">
              <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                Quiet hours
              </h3>
              <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                Pause notifications during rest time
              </p>
            </div>
            <Toggle checked={quietHoursEnabled} onClick={() => setQuietHoursEnabled(!quietHoursEnabled)} />
          </div>

          {/* Time Selectors - Only visible when enabled */}
          {quietHoursEnabled && (
            <>
              {/* From Time */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 border-b text-left hover:bg-opacity-50 transition"
                style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#0D0F14' }}
              >
                <div>
                  <p className="text-[13px]" style={{ color: '#A0A5B0' }}>
                    From
                  </p>
                  <p className="text-[15px] font-bold mt-1" style={{ color: '#F0F2F5' }}>
                    {quietHoursStart}
                  </p>
                </div>
                <ChevronRight size={20} color="#8B909A" />
              </button>

              {/* To Time */}
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-opacity-50 transition"
                style={{ backgroundColor: '#0D0F14' }}
              >
                <div>
                  <p className="text-[13px]" style={{ color: '#A0A5B0' }}>
                    To
                  </p>
                  <p className="text-[15px] font-bold mt-1" style={{ color: '#F0F2F5' }}>
                    {quietHoursEnd}
                  </p>
                </div>
                <ChevronRight size={20} color="#8B909A" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}