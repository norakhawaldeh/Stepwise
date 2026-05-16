import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void
}

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const [taskReminders, setTaskReminders] = useState(
    localStorage.getItem('stepwiseTaskReminders') === 'true'
  )
  const [focusReminders, setFocusReminders] = useState(
    localStorage.getItem('stepwiseFocusReminders') === 'true'
  )
  const [achievementAlerts, setAchievementAlerts] = useState(
    localStorage.getItem('stepwiseAchievementAlerts') === 'true'
  )
  const [weeklyProgress, setWeeklyProgress] = useState(
    localStorage.getItem('stepwiseWeeklyProgress') === 'true'
  )
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(
    localStorage.getItem('stepwiseQuietHours') === 'true'
  )
const [quietHoursStart, setQuietHoursStart] = useState(
  localStorage.getItem('stepwiseQuietHoursStart') || '22:00'
)

const [quietHoursEnd, setQuietHoursEnd] = useState(
  localStorage.getItem('stepwiseQuietHoursEnd') || '08:00'
)
  const askNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.')
      return false
    }

    if (Notification.permission === 'granted') return true

    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  

  const handleToggle = async (
    value: boolean,
    setter: (value: boolean) => void,
    storageKey: string,
    needsPermission = true
  ) => {
    const nextValue = !value

    if (nextValue && needsPermission) {
      const allowed = await askNotificationPermission()
      if (!allowed) return
    }

    setter(nextValue)
    localStorage.setItem(storageKey, String(nextValue))
  }

  useEffect(() => {
  const interval = setInterval(() => {
    runReminderCheck()
  }, 1000 * 60) // checks every 1 minute

  runReminderCheck()

  return () => clearInterval(interval)
}, [])

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
        backgroundColor: checked ? 'var(--accent-color)' : '#2A2F3A',
        justifyContent: checked ? 'flex-end' : 'flex-start',
      }}
    >
      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: '#F0F2F5' }} />
    </button>
  )
const getSentReminders = () => {
  return JSON.parse(localStorage.getItem('stepwiseSentReminders') || '{}')
}

const saveSentReminder = (id: string) => {
  const sent = getSentReminders()
  sent[id] = true
  localStorage.setItem('stepwiseSentReminders', JSON.stringify(sent))
}

const alreadySent = (id: string) => {
  const sent = getSentReminders()
  return sent[id]
}

const sendReminder = (id: string, title: string, body: string) => {
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return
  if (alreadySent(id)) return

  new Notification(title, { body })
  saveSentReminder(id)
}

const getDateOnly = (date: Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const getTaskDate = (startDate: Date, dayId: string) => {
  const dayNumber = Number(dayId?.replace('day-', '') || 1)

  const taskDate = new Date(startDate)
  taskDate.setDate(startDate.getDate() + dayNumber - 1)

  return taskDate
}

const isWithinReminderWindow = (targetDate: Date, minutesBefore: number) => {
  const now = new Date()
  const reminderTime = new Date(targetDate)
  reminderTime.setMinutes(reminderTime.getMinutes() - minutesBefore)

  const diff = Math.abs(now.getTime() - reminderTime.getTime())

  return diff <= 1000 * 60 // within 1 minute
}
const isQuietHoursNow = () => {
  const enabled = localStorage.getItem('stepwiseQuietHours') === 'true'
  if (!enabled) return false

  const start = localStorage.getItem('stepwiseQuietHoursStart') || '22:00'
  const end = localStorage.getItem('stepwiseQuietHoursEnd') || '08:00'

  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)

  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin

  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes < endMinutes
  }

  return currentMinutes >= startMinutes || currentMinutes < endMinutes
}
const runReminderCheck = async () => {
  const enabled = localStorage.getItem('stepwiseTaskReminders') === 'true'
  if (!enabled) return
  if (isQuietHoursNow()) return
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return
  

  const saved = localStorage.getItem('stepwiseSchedule')
  if (!saved) return

  const parsed = JSON.parse(saved)

  const assignmentTitle =
    parsed.assignmentTitle || parsed.title || 'Assignment'

  const deadlineDate = parsed.deadlineDate
  if (!deadlineDate) return

  const dueDate = new Date(deadlineDate)

  const tasks = parsed.tasks || []
  const incompleteTasks = tasks.filter((task: any) => !task.completed)

  // Assignment reminders
  const assignmentReminders = [
    {
      label: '1day',
      minutes: 24 * 60,
      title: `${assignmentTitle} is due tomorrow 🌱`,
      body: `You have ${incompleteTasks.length} unfinished task${
        incompleteTasks.length === 1 ? '' : 's'
      }.`,
    },
    {
      label: '2hr',
      minutes: 2 * 60,
      title: `${assignmentTitle} is due in 2 hours`,
      body: `Finish your remaining work while you still have time.`,
    },
    {
      label: '1hr',
      minutes: 60,
      title: `Final reminder: ${assignmentTitle}`,
      body: `This assignment is due in 1 hour.`,
    },
  ]

  assignmentReminders.forEach((reminder) => {
    if (isWithinReminderWindow(dueDate, reminder.minutes)) {
      sendReminder(
        `assignment-${assignmentTitle}-${reminder.label}`,
        reminder.title,
        reminder.body
      )
    }
  })

  // Subtask reminders
  const startDate = parsed.startDate
    ? getDateOnly(new Date(parsed.startDate))
    : getDateOnly(new Date())

  tasks.forEach((task: any) => {
    if (task.completed) return

    const taskDate = getTaskDate(startDate, task.dayId)

    const taskTime = task.timeOfDay || task.time || '6:00 PM'
    const [time, modifier] = taskTime.split(' ')
    let [hours, minutes] = time.split(':').map(Number)

    if (modifier === 'PM' && hours !== 12) hours += 12
    if (modifier === 'AM' && hours === 12) hours = 0

    taskDate.setHours(hours, minutes || 0, 0, 0)

    const taskText = task.text || task.task || 'your task'

    const subtaskReminders = [
      {
        label: '1day',
        minutes: 24 * 60,
        title: `Subtask due tomorrow`,
        body: taskText,
      },
      {
        label: '2hr',
        minutes: 2 * 60,
        title: `Subtask due in 2 hours`,
        body: taskText,
      },
      {
        label: '1hr',
        minutes: 60,
        title: `Subtask due in 1 hour`,
        body: taskText,
      },
    ]

    subtaskReminders.forEach((reminder) => {
      if (isWithinReminderWindow(taskDate, reminder.minutes)) {
        sendReminder(
          `subtask-${task.id}-${reminder.label}`,
          reminder.title,
          reminder.body
        )
      }
    })
  })
}
  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, color-mix(in srgb, var(--accent-color) 8%, transparent), transparent 35%), var(--bg-primary)',
      }}
    >
      <div className="max-w-[430px] mx-auto w-full h-screen flex flex-col relative">
        <div
          className="px-5 pt-8 pb-6 flex items-center justify-between border-b"
          style={{ borderColor: '#242830' }}
        >
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

        <div className="flex-1 overflow-y-auto px-5 py-8 pb-32">
          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#8B909A' }}>
            Reminders
          </p>

          <div
            className="rounded-[20px] overflow-hidden border mb-8"
            style={{ backgroundColor: '#161920', borderColor: '#242830' }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex-1">
                <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                  Task reminders
                </h3>
                <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                  Get reminded about unfinished tasks
                </p>
              </div>
              <Toggle
                checked={taskReminders}
                onClick={() =>
                  handleToggle(taskReminders, setTaskReminders, 'stepwiseTaskReminders')
                }
              />
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="flex-1">
                <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                  Focus reminders
                </h3>
                <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                  Stay on track with focus sessions
                </p>
              </div>
              <Toggle
                checked={focusReminders}
                onClick={() =>
                  handleToggle(focusReminders, setFocusReminders, 'stepwiseFocusReminders')
                }
              />
            </div>

            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex-1">
                <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                  Achievement alerts
                </h3>
                <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                  Get notified about achievements
                </p>
              </div>
              <Toggle
                checked={achievementAlerts}
                onClick={() =>
                  handleToggle(
                    achievementAlerts,
                    setAchievementAlerts,
                    'stepwiseAchievementAlerts'
                  )
                }
              />
            </div>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#8B909A' }}>
            Reports
          </p>

          <div
            className="rounded-[20px] overflow-hidden border mb-8"
            style={{ backgroundColor: '#161920', borderColor: '#242830' }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex-1">
                <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                  Weekly progress
                </h3>
                <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                  Receive weekly progress updates
                </p>
              </div>
              <Toggle
                checked={weeklyProgress}
                onClick={() =>
                  handleToggle(weeklyProgress, setWeeklyProgress, 'stepwiseWeeklyProgress')
                }
              />
            </div>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#8B909A' }}>
            Quiet Hours
          </p>
        <div>
          <div
            className="rounded-[20px] overflow-hidden border mb-8"
            style={{ backgroundColor: '#161920', borderColor: '#242830' }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex-1">
                <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                  Quiet hours
                </h3>
                <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
                  Pause reminders during rest time
                </p>
              </div>

              <Toggle
                checked={quietHoursEnabled}
                onClick={() => {
                  const nextValue = !quietHoursEnabled

                  setQuietHoursEnabled(nextValue)

                  localStorage.setItem('stepwiseQuietHours', String(nextValue))
                }}
              />
            </div>

            {quietHoursEnabled && (
              <div
                className="px-5 py-4 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="text-[13px] block mb-2" style={{ color: '#A0A5B0' }}>
                    From
                  </label>

                  <input
                    type="time"
                    value={quietHoursStart}
                    onChange={(e) => {
                      setQuietHoursStart(e.target.value)
                      localStorage.setItem('stepwiseQuietHoursStart', e.target.value)
                    }}
                    className="w-full rounded-[12px] px-3 py-2 text-[14px]"
                    style={{
                      backgroundColor: '#0D0F14',
                      color: '#F0F2F5',
                      border: '1px solid #242830',
                    }}
                  />
                </div>

                <div>
                  <label className="text-[13px] block mb-2" style={{ color: '#A0A5B0' }}>
                    To
                  </label>

                  <input
                    type="time"
                    value={quietHoursEnd}
                    onChange={(e) => {
                      setQuietHoursEnd(e.target.value)
                      localStorage.setItem('stepwiseQuietHoursEnd', e.target.value)
                    }}
                    className="w-full rounded-[12px] px-3 py-2 text-[14px]"
                    style={{
                      backgroundColor: '#0D0F14',
                      color: '#F0F2F5',
                      border: '1px solid #242830',
                    }}
                  />
                </div>
              </div>

              <p className="text-[12px] leading-5" style={{ color: '#8B909A' }}>
                Reminders will pause during this time.
              </p>
            </div>
            )}
            </div>
          </div>
          <p className="text-[12px] mt-4 leading-5 text-center" style={{ color: '#8B909A' }}>
            Browser notifications work while the app is open. Real phone push notifications coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}