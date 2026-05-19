import { useEffect, useState } from 'react'
import {
  Home,
  PlusCircle,
  Calendar,
  Sprout,
  User,
  Plus,
} from 'lucide-react'
import { supabase } from '../../supabaseClient'
import { renderAvatar } from '../../avatarUtils'

interface DarkHomeScreenProps {
  onNavigate: (screen: string) => void
  onTaskClick: (taskId: string) => void
  username: string
  avatarId: string | null
  uploadedImage: string | null
  accentColor?: string
}

type HomeTask = {
  id: string
  text: string
  time: string
  dayId: string
  completed?: boolean
  assignmentTitle?: string
}

export function DarkHomeScreen({
  onNavigate,
  onTaskClick,
  username,
  avatarId,
  uploadedImage,
  accentColor = 'var(--accent-color)',
}: DarkHomeScreenProps) {
  const [tasks, setTasks] = useState<HomeTask[]>([])

  const today = new Date()

  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const loadTasks = () => {
    const saved = localStorage.getItem('stepwiseSchedule')
    if (!saved) { setTasks([]); return }
    const parsed = JSON.parse(saved)
    const savedTasks = (parsed.tasks || []).map((task: any) => ({
      ...task,
      assignmentTitle: task.assignmentTitle || parsed.assignmentTitle || 'Untitled Task',
    }))
    setTasks(savedTasks)
  }

  useEffect(() => {
    loadTasks()
    const handleFocus = () => loadTasks()
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const firstLetter = username.charAt(0).toUpperCase()
  const avatar = renderAvatar(avatarId, uploadedImage, firstLetter)

  const getDateOnly = (date: Date) => {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
  }

  const getTaskDayNumber = (dayId: string) => Number(dayId?.replace('day-', '') || 1)

  const savedSchedule = localStorage.getItem('stepwiseSchedule')
  const parsedSchedule = savedSchedule ? JSON.parse(savedSchedule) : null

  const startDate = parsedSchedule?.startDate
    ? getDateOnly(new Date(parsedSchedule.startDate))
    : getDateOnly(new Date())

  const todayOnly = getDateOnly(new Date())

  const todayTasks = tasks.filter((task) => {
    const taskDate = new Date(startDate)
    taskDate.setDate(startDate.getDate() + getTaskDayNumber(task.dayId) - 1)
    return taskDate.getTime() === todayOnly.getTime()
  })

  const missedTasks = tasks.filter((task) => {
    if (task.completed) return false
    const taskDate = new Date(startDate)
    taskDate.setDate(startDate.getDate() + getTaskDayNumber(task.dayId) - 1)
    return taskDate < todayOnly
  })

  const rescueDismissedToday =
    localStorage.getItem('stepwiseRescueDismissedDate') === todayOnly.toISOString()
  const shouldShowRescueBanner = missedTasks.length > 0 && !rescueDismissedToday

  const handleViewRescuePlan = () => {
    const saved = localStorage.getItem('stepwiseSchedule')
    if (!saved) return
    const parsed = JSON.parse(saved)
    const today = getDateOnly(new Date())
    const deadline = parsed.deadlineDate
      ? getDateOnly(new Date(parsed.deadlineDate))
      : (() => { const f = new Date(today); f.setDate(today.getDate() + 2); return f })()
    const remainingDays = Math.max(1, Math.floor((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1)
    const incompleteTasks = parsed.tasks.filter((task: any) => !task.completed)
    const completedTasks = parsed.tasks.filter((task: any) => task.completed)
    const rescuedTasks = incompleteTasks.map((task: any, index: number) => ({
      ...task,
      dayId: `day-${(index % remainingDays) + 1}`,
      rescued: true,
      assignmentTitle: task.assignmentTitle || parsed.assignmentTitle || 'Untitled Task',
    }))
    const updatedTasks = [...completedTasks, ...rescuedTasks]
    localStorage.setItem('stepwiseSchedule', JSON.stringify({ ...parsed, startDate: today.toISOString(), tasks: updatedTasks }))
    setTasks(updatedTasks)
    onNavigate('schedule')
  }

  const handleDismissRescue = () => {
    localStorage.setItem('stepwiseRescueDismissedDate', todayOnly.toISOString())
  }

  const completedToday = todayTasks.filter((task) => task.completed).length
  const gardenStreak = completedToday > 0 ? 1 : 0
  const gardenMessage = 'View Garden'

  const AvatarDisplay = () => {
    if (avatar.type === 'image') {
      return <img src={avatar.content} alt="Profile" className="w-full h-full rounded-full object-cover" />
    }
    if (avatar.type === 'cute') {
      return <div className="w-full h-full rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: avatar.bgColor, color: avatar.textColor }}>{avatar.icon}</div>
    }
    return <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-xl" style={{ backgroundColor: avatar.bgColor, color: avatar.textColor, border: avatar.isBorder ? `2px solid ${avatar.textColor}` : 'none' }}>{avatar.initials}</div>
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
  'radial-gradient(circle at top left, rgba(124,58,237,0.18), transparent 38%), #07070A',
fontFamily: '"Nunito", "Outfit", "DM Sans", "Plus Jakarta Sans", system-ui, sans-serif',
      }}
    >
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-7 pb-32">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="relative inline-block">
                <div
                  className="absolute -inset-6 blur-[70px] opacity-80 rounded-full"
                  style={{ background: 'rgba(88,40,180,0.35)' }}
                />
                <h1
                  className="mb-3 text-center"
                  style={{
                    fontFamily: '"Clash Display", "Satoshi", "Plus Jakarta Sans", sans-serif',
                    fontSize: '3.15rem',
                    fontWeight: 550,
                    letterSpacing: '-0.085em',
                    lineHeight: 1,
                  }}
                >
                  <span style={{ color: '#F8F7FF' }}>roo</span>
                  <span style={{ color: accentColor }}>t</span>
                  <span style={{ color: '#F8F7FF' }}>ed</span>
                </h1>
              </div>
              <p className="text-[15px] mt-3" style={{ color: '#9490B8' }}>
                <span className="italic">Welcome,</span> {username}!
              </p>
            </div>

            <button
              onClick={() => onNavigate('profile')}
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ backgroundColor: 'rgba(16, 16, 22, 0.92)',border: '1px solid rgba(139, 92, 246, 0.12)', }}
            >
              <AvatarDisplay />
            </button>
          </div>

          <button
            onClick={() => onNavigate('garden-collection')}
            className="w-full rounded-[22px] p-4 mb-8 flex items-center gap-4 text-left"
            style={{ backgroundColor: 'rgba(16, 16, 22, 0.92)', border: '1px solid rgba(139, 92, 246, 0.12)' }}
          >
            <div
              className="w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
            >
              <span className="text-[27px]">🌱</span>
            </div>
            <div className="flex-1">
              <p className="text-[13.5px] font-semibold whitespace-nowrap" style={{ color: '#7470A0' }}>Garden streak</p>
              <p className="text-[16px] font-bold" style={{ color: accentColor }}>
                {gardenStreak} {gardenStreak === 1 ? 'day' : 'days'}
              </p>
            </div>
            <div className="h-10 w-px mx-2" style={{ backgroundColor: '#1E1C30' }} />
            <div className="flex-1">
              <p className="text-[15px] font-semibold whitespace-nowrap" style={{ color: accentColor }}>{gardenMessage}</p>
            </div>
            <span style={{ color: '#7470A0' }}>›</span>
          </button>

          {shouldShowRescueBanner && (
            <div
              className="rounded-[22px] p-5 mb-6"
              style={{ backgroundColor: 'rgba(255, 107, 87, 0.10)', border: '1px solid rgba(255, 107, 87, 0.35)' }}
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: '#FF6B57' }}>Rescue Mode</p>
              <h2 className="text-[20px] font-bold mb-2" style={{ color: '#F0EEF8' }}>Looks like yesterday got overwhelming.</h2>
              <p className="text-[14px] mb-4" style={{ color: '#9490B8' }}>We adjusted your plan to help you catch up.</p>
              <div className="flex gap-3">
                <button onClick={handleViewRescuePlan} className="flex-1 py-3 rounded-[14px] font-bold text-[14px]" style={{ backgroundColor: accentColor, color: '#F0EEF8' }}>View Plan</button>
                <button onClick={handleDismissRescue} className="flex-1 py-3 rounded-[14px] font-bold text-[14px]" style={{ backgroundColor: '#1A1830', color: '#F0EEF8' }}>Dismiss</button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[24px] font-bold" style={{ color: '#F0EEF8' }}>Today's tasks</h2>
            <p className="text-[13px]" style={{ color: '#9490B8' }}>{formattedDate}</p>
          </div>

          {todayTasks.length === 0 ? (
            <div className="rounded-[22px] px-2 py-5 text-center" style={{ backgroundColor: 'rgba(16, 16, 22, 0.92)', border: '1px solid rgba(139, 92, 246, 0.12)' }}>
              <h3 className="text-[17px] font-bold mb-1" style={{ color: '#F0EEF8' }}>No tasks today</h3>
            </div>
          ) : (
            <div className="space-y-4">
              {todayTasks.map((task, index) => (
                <button
                  key={task.id || index}
                  onClick={() => onNavigate('schedule')}
                  className="w-full rounded-[18px] p-4 text-left"
                  style={{ backgroundColor: 'rgba(16, 16, 22, 0.92)', border: '1px solid rgba(139, 92, 246, 0.12)', opacity: task.completed ? 0.65 : 1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[13px] font-bold uppercase" style={{ color: accentColor }}>{task.assignmentTitle}</p>
                    <p className="text-[12px]" style={{ color: '#7470A0' }}>{task.time}</p>
                  </div>
                  <p className="text-[13px] font-semibold mb-1" style={{ color: '#F0EEF8', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</p>
                  <p className="text-[13px]" style={{ color: '#7470A0' }}>Tap to view full schedule</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => onNavigate('add')}
          className="absolute right-7 bottom-24 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accentColor, color: '#F0EEF8', boxShadow: `0 14px 35px ${accentColor}60` }}
        >
          <Plus size={34} />
        </button>

        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between"
          style={{ backgroundColor: 'rgba(22, 25, 32, 0.96)', border: '1px solid #242830', boxShadow: '0 18px 45px rgba(0,0,0,0.45)', backdropFilter: 'blur(14px)' }}
        >
          <button onClick={() => onNavigate('home')}><Home size={24} color={accentColor} fill={accentColor} /></button>
          <button onClick={() => onNavigate('add')}><PlusCircle size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('schedule')}><Calendar size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('garden')}><Sprout size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('profile')}><User size={25} color="#8B909A" /></button>
        </div>
      </div>
    </div>
  )
}