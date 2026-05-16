import { useEffect, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Sprout,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Leaf,
  MoreVertical,
  PlusCircle,
  Trash2,
  User,
  X,
} from 'lucide-react'

interface DarkScheduleScreenProps {
  onNavigate: (screen: string) => void
}

type ScheduleItem = {
  id: string
  time: string
  title: string
  subject: string
  task: string
  duration: string
  dayId: string
  completed?: boolean
}

type AssignmentInfo = {
  title: string
  subject: string
  details: string
  deadlineDate: string | null
}

export function DarkScheduleScreen({ onNavigate }: DarkScheduleScreenProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [assignment, setAssignment] = useState<AssignmentInfo>({
    title: 'Untitled Assignment',
    subject: 'General',
    details: '',
    deadlineDate: null,
  })

  const [selectedDayIndex, setSelectedDayIndex] = useState(0)
  const [menuTaskId, setMenuTaskId] = useState<string | null>(null)
  const [showCalendarView, setShowCalendarView] = useState(false)
  const [showDueSheet, setShowDueSheet] = useState(false)
  const [showAssignmentDetails, setShowAssignmentDetails] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth())
  const [calendarYear, setCalendarYear] = useState(today.getFullYear())
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)
  const [expandedTaskIds, setExpandedTaskIds] = useState<string[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const DAYS_TO_SHOW = 365

  const loadSchedule = () => {
    const saved = localStorage.getItem('stepwiseSchedule')
    const draftSaved = localStorage.getItem('stepwiseDraftTask')
    if (!saved) return

    const parsed = JSON.parse(saved)
    const draft = draftSaved ? JSON.parse(draftSaved) : {}

    const assignmentTitle = parsed.assignmentTitle || draft.title || 'Untitled Assignment'
    const subject = parsed.subject || draft.subject || 'General'
    const details = parsed.details || draft.details || ''
    const deadlineDate = parsed.deadlineDate || draft.deadlineDate || draft.selectedDate || null
    
    setAssignment({
      title: assignmentTitle,
      subject,
      details,
      deadlineDate,
    })

    const formattedTasks: ScheduleItem[] = (parsed.tasks || []).map((task: any, index: number) => ({
      id: task.id || `task-${index + 1}`,
      time: task.timeOfDay || `${9 + index}:00 AM`,
      title: task.assignmentTitle || assignmentTitle,
      subject: task.subject || subject,
      task: task.text || task.task || '',
      duration: task.time || task.duration || '30 min',
      dayId: task.dayId || 'day-1',
      completed: task.completed || false,
    }))

    setSchedule(formattedTasks)
  }

  useEffect(() => {
    loadSchedule()
  }, [])

  const savedSchedule = localStorage.getItem('stepwiseSchedule')
const parsedSchedule = savedSchedule ? JSON.parse(savedSchedule) : null

const getDateOnly = (date: Date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const startDate = parsedSchedule?.startDate
  ? getDateOnly(new Date(parsedSchedule.startDate))
  : today

const weekDays = Array.from({ length: DAYS_TO_SHOW }, (_, i) => {
  const date = new Date(today)
  date.setDate(today.getDate() + i)

  return {
    date,
    label: date.toLocaleDateString('en-US', { weekday: 'short' }),
    day: date.getDate(),
    full: date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }),
  }
})
const todayIndex = weekDays.findIndex(
  (day) => day.date.getTime() === today.getTime()
)

  const selectedDate = weekDays[selectedDayIndex].date
  const getTaskDate = (dayId: string) => {
  const dayNumber = Number(dayId?.replace('day-', '') || 1)

  const taskDate = new Date(startDate)
  taskDate.setDate(startDate.getDate() + dayNumber - 1)

  return taskDate
}

const visibleSchedule = schedule.filter((item) => {
  const taskDate = getTaskDate(item.dayId)

  return taskDate.getTime() === selectedDate.getTime()
})

  const totalMinutes = visibleSchedule.reduce((sum, item) => {
    const minutes = parseInt(item.duration)
    return sum + (isNaN(minutes) ? 0 : minutes)
  }, 0)

  const completedCount = visibleSchedule.filter((item) => item.completed).length

  const selectedDateText = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const assignmentDueDate = assignment.deadlineDate ? new Date(assignment.deadlineDate) : null
  if (assignmentDueDate) assignmentDueDate.setHours(0, 0, 0, 0)

  const isAssignmentDueSelectedDay =
    assignmentDueDate?.getTime() === selectedDate.getTime()

  const remainingSubtasks = schedule.filter((item) => !item.completed).length
  const assignmentCompleted = schedule.length > 0 && schedule.every((item) => item.completed)

  const dueAssignments = isAssignmentDueSelectedDay
    ? [
        {
          ...assignment,
          remainingSubtasks,
          completed: assignmentCompleted,
        },
      ]
    : []

  const subjectColor = useMemo(() => {
    const options = ['#00E5A0', '#2F9BFF', '#8B5CF6', '#FF8DBA', '#ff54d1']
    const text = assignment.subject || 'General'
    const index = text.charCodeAt(0) % options.length
    return options[index]
  }, [assignment.subject])

  const saveTasksToStorage = (updated: ScheduleItem[]) => {
    setSchedule(updated)

    const saved = localStorage.getItem('stepwiseSchedule')
    if (!saved) return

    const parsed = JSON.parse(saved)

    const updatedTasks = (parsed.tasks || []).map((task: any) => {
      const match = updated.find((item) => item.id === task.id)
      return match ? { ...task, completed: match.completed } : task
    })

    localStorage.setItem(
      'stepwiseSchedule',
      JSON.stringify({
        ...parsed,
        subject: assignment.subject,
        details: assignment.details,
        deadlineDate: assignment.deadlineDate,
        tasks: updatedTasks,
      })
    )
  }

  const markComplete = (id: string) => {
    const updated = schedule.map((item) =>
      item.id === id ? { ...item, completed: true } : item
    )

    saveTasksToStorage(updated)
    setMenuTaskId(null)

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.75 },
    })

    navigator.vibrate?.(45)
  }

  const markIncomplete = (id: string) => {
    const updated = schedule.map((item) =>
      item.id === id ? { ...item, completed: false } : item
    )

    saveTasksToStorage(updated)
    setMenuTaskId(null)
  }

  const deleteTask = (id: string) => {
    const updated = schedule.filter((item) => item.id !== id)
    setSchedule(updated)

    const saved = localStorage.getItem('stepwiseSchedule')
    if (saved) {
      const parsed = JSON.parse(saved)
      const updatedTasks = (parsed.tasks || []).filter((task: any) => task.id !== id)

      localStorage.setItem(
        'stepwiseSchedule',
        JSON.stringify({
          ...parsed,
          tasks: updatedTasks,
        })
      )
    }

    setMenuTaskId(null)
  }

  const goPreviousDay = () => setSelectedDayIndex((prev) => Math.max(0, prev - 1))
  const goNextDay = () =>
  setSelectedDayIndex((prev) => Math.min(DAYS_TO_SHOW - 1, prev + 1))

  const monthName = new Date(calendarYear, calendarMonth).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate()
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay()

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const toggleTaskDetails = (id: string) => {
    setExpandedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((taskId) => taskId !== id) : [...prev, id]
    )
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(0, 229, 160, 0.08), transparent 35%), var(--bg-primary)',
        }}
      >
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-28">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-[30px] font-bold" style={{ color: '#F0F2F5' }}>
              Schedule
            </h1>

            <button
              onClick={() => setShowCalendarView(true)}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#161920',
                border: '1px solid #242830',
              }}
            >
              <Calendar size={22} color="var(--accent-color)" />
            </button>
          </div>

          <div className="flex justify-between -ml-2">
            {weekDays.map((day, i) => {
              const isSelected = selectedDayIndex === i

              return (
                <button
                  key={day.full}
                  onClick={() => setSelectedDayIndex(i)}
                  className="flex flex-col items-center gap-2"
                >
                  <span
                    className="text-[12px] font-bold"
                    style={{ color: isSelected ? 'var(--accent-color)' : '#A0A5B0' }}
                  >
                    {day.label}
                  </span>

                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[18px] font-bold"
                    style={{
                      backgroundColor: isSelected ? 'var(--accent-color)' : 'transparent',
                      color: isSelected ? '#0D0F14' : '#F0F2F5',
                      boxShadow: isSelected ? '0 0 24px rgba(0, 229, 160, 0.38)' : 'none',
                    }}
                  >
                    {day.day}
                  </div>

                  {isSelected && (
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[21px] font-bold mt-4">
              {weekDays[selectedDayIndex].full}
            </h2>

            <div className="flex gap-3">
              <button
                onClick={goPreviousDay}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#161920' }}
              >
                <ChevronLeft size={20} color="#F0F2F5" />
              </button>

              <button
                onClick={goNextDay}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#161920' }}
              >
                <ChevronRight size={22} color="#F0F2F5" />
              </button>
            </div>
          </div>

          <div
            className="rounded-[20px] mb-4 overflow-visible"
            style={{
              backgroundColor: 'rgba(22, 25, 32, 0.82)',
              border: '1px solid #242830',
              boxShadow: '0 18px 45px rgba(0,0,0,0.22)',
            }}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: '#242830' }}>
              <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                Your Plan
              </h3>

              <p className="text-[13px] font-semibold" style={{ color: 'var(--accent-color)' }}>
                {visibleSchedule.length} task{visibleSchedule.length === 1 ? '' : 's'} today
              </p>
            </div>

            <div className="px-4 py-4 space-y-5">
              {visibleSchedule.length === 0 && (
                <div className="py-5 text-center">
                  <p className="text-[14px]" style={{ color: '#A0A5B0' }}>
                    No tasks for this day. You’re chilling 😎
                  </p>
                </div>
              )}

              {visibleSchedule.map((item) => (
                <div key={item.id} className="grid grid-cols-[68px_1fr] gap-3">
                  <p className="text-[13px] pt-1" style={{ color: '#A0A5B0' }}>
                    {item.time}
                  </p>

                  <div className="relative pl-5">
                    <div
                      className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.completed ? 'var(--accent-color)' : subjectColor }}
                    />

                    <div
                      className="absolute left-[4px] top-6 bottom-0 w-px"
                      style={{ backgroundColor: 'rgba(160, 165, 176, 0.16)' }}
                    />

                    <div className="relative py-1">
                      <div className="flex items-start gap-3">

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className="text-[14px] font-bold"
                                style={{
                                  color: '#F0F2F5',
                                  textDecoration: item.completed ? 'line-through' : 'none',
                                }}
                              >
                                {item.title}
                            </h4>

                            {item.completed && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                style={{
                                  backgroundColor: 'rgba(0, 229, 160, 0.13)',
                                  color: 'var(--accent-color)',
                                }}
                              >
                                Completed
                              </span>
                            )}
                          </div>

                          <p className="text-[15px] mb-2" style={{ color: '#84c4ff' }}>
                            {item.subject}
                          </p>
                          {expandedTaskIds.includes(item.id) ? (
  <p
    className="text-[13px] leading-snug mb-2"
    style={{ color: '#A0A5B0' }}
  >
    {item.task}{' '}
    <button
      onClick={() => toggleTaskDetails(item.id)}
      className="text-[13px]"
      style={{ color: 'var(--accent-color)' }}
    >
      show less
    </button>
  </p>
) : (
  <p
    className="text-[13px] leading-snug mb-2"
    style={{ color: '#A0A5B0' }}
  >
    {item.task.length > 38 ? `${item.task.slice(0, 38)}... ` : item.task}

    {item.task.length > 38 && (
      <button
        onClick={() => toggleTaskDetails(item.id)}
        className="text-[13px]"
        style={{ color: 'var(--accent-color)' }}
      >
        view more
      </button>
    )}
  </p>
)}
                          <p className="text-[12px] flex items-center gap-1" style={{ color: '#A0A5B0' }}>
                            <Clock size={13} />
                            {item.duration}
                          </p>
                        </div>

                        <div className="relative">
                          <button
                            onClick={() => setMenuTaskId(menuTaskId === item.id ? null : item.id)}
                          >
                            <MoreVertical size={19} color="#A0A5B0" />
                          </button>

                          {menuTaskId === item.id && (
                            <div
                              className="absolute right-0 top-7 w-44 rounded-[14px] p-2 z-[999]"
                              style={{
                                backgroundColor: '#161920',
                                border: '1px solid #242830',
                                boxShadow: '0 12px 30px rgba(0,0,0,0.48)',
                              }}
                            >
                              <button
                                onClick={() =>
                                  item.completed
                                    ? markIncomplete(item.id)
                                    : markComplete(item.id)
                                }
                                className="w-full text-left px-3 py-2 rounded-[10px] text-[13px] font-medium"
                                style={{ color: '#F0F2F5' }}
                              >
                                {item.completed ? 'Mark as incomplete' : 'Mark as complete'}
                              </button>

                              <button
                                onClick={() => deleteTask(item.id)}
                                className="w-full text-left px-3 py-2 rounded-[10px] text-[13px] font-medium flex items-center gap-2"
                                style={{ color: '#FF6B6B' }}
                              >
                                <Trash2 size={14} />
                                Delete task
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowDueSheet(true)}
            className="w-full rounded-[20px] p-4 mb-4 flex items-center justify-between"
            style={{
              backgroundColor: 'rgba(22, 25, 32, 0.82)',
              border: '1px solid #242830',
            }}
          >
            <div className="flex items-center gap-4">
              <Calendar size={22} color="var(--accent-color)" />
              <span className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                Assignments Due
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold"
                style={{ backgroundColor: '#2A2F3A', color: '#F0F2F5' }}
              >
                {dueAssignments.length}
              </span>
              <ChevronRight size={20} color="#A0A5B0" />
            </div>
          </button>

          <div
            className="rounded-[22px] p-5 flex items-center gap-4"
            style={{
              backgroundColor: 'rgba(22, 25, 32, 0.82)',
              border: '1px solid #242830',
            }}
          >
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center"
              style={{ backgroundColor: 'rgba(106, 109, 108, 0.1)' }}
            >
              <Leaf size={28} color="var(--accent-color)" />
            </div>

            <div>
              <h3 className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                {completedCount > 0 ? 'Keep going! 🌱' : 'You got this 🌱'}
              </h3>
              <p className="text-[12px] leading-relaxed" style={{ color: '#A0A5B0' }}>
                {completedCount > 0
                  ? `You completed ${completedCount} task${completedCount === 1 ? '' : 's'} today.`
                  : `You’re on track to finish ${schedule.length} task${schedule.length === 1 ? '' : 's'} this week.`}
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between"
          style={{
            backgroundColor: 'rgba(22, 25, 32, 0.96)',
            border: '1px solid #242830',
            boxShadow: '0 18px 45px rgba(0,0,0,0.45)',
            backdropFilter: 'blur(14px)',
          }}
        >
          <button onClick={() => onNavigate('home')}>
            <Home size={24} color="#8B909A" />
          </button>

          <button onClick={() => onNavigate('add')}>
            <PlusCircle size={25} color="#8B909A" />
          </button>

          <button onClick={() => onNavigate('schedule')}>
            <Calendar size={25} color="var(--accent-color)" fill="var(--accent-color)" />
          </button>

          <button onClick={() => onNavigate('garden')}>
            <Sprout size={25} color="#8B909A" />
          </button>

          <button onClick={() => onNavigate('profile')}>
            <User size={25} color="#8B909A" />
          </button>
        </div>

        {showDueSheet && (
          <div
            className="absolute inset-0 z-50 flex items-end"
            style={{ backgroundColor: 'rgba(0,0,0,0.68)' }}
          >
            <div
              className="w-full rounded-t-[28px] px-5 pt-4 pb-8"
              style={{ backgroundColor: '#11141A', border: '1px solid #242830' }}
            >
              <div className="w-14 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: '#3A404D' }} />

              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="text-[24px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
                    Assignments Due
                  </h2>
                  <p className="text-[14px]" style={{ color: '#A0A5B0' }}>
                    {selectedDateText}
                  </p>
                </div>

                <button
                  onClick={() => setShowDueSheet(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#20242D' }}
                >
                  <X size={20} color="#F0F2F5" />
                </button>
              </div>

              <div className="space-y-3 mb-5">
                {dueAssignments.length === 0 ? (
                  <div
                    className="rounded-[18px] p-5 text-center"
                    style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
                  >
                    <p className="text-[14px]" style={{ color: '#A0A5B0' }}>
                      Nothing due this day.
                    </p>
                  </div>
                ) : (
                  dueAssignments.map((item) => (
                    <button
                      key={item.title}
                      onClick={() => setShowAssignmentDetails(true)}
                      className="w-full rounded-[18px] p-4 flex items-center justify-between text-left"
                      style={{
                        backgroundColor: '#161920',
                        border: '1px solid #242830',
                        opacity: item.completed ? 0.7 : 1,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: subjectColor }}
                        />

                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${subjectColor}22` }}
                        >
                          <BookOpen size={24} color={subjectColor} />
                        </div>

                        <div>
                          <h3
                            className="text-[15px] font-bold mb-1"
                            style={{
                              color: '#F0F2F5',
                              textDecoration: item.completed ? 'line-through' : 'none',
                            }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-[13px]" style={{ color: '#A0A5B0' }}>
                            {item.subject}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className="px-3 py-1 rounded-full text-[11px] font-bold"
                          style={{
                            backgroundColor: item.completed
                              ? 'rgba(0, 229, 160, 0.13)'
                              : 'rgba(0, 229, 160, 0.12)',
                            color: 'var(--accent-color)',
                          }}
                        >
                          {item.completed ? 'Completed' : 'Due Today'}
                        </span>

                        <p className="text-[11px] mt-2" style={{ color: '#8B909A' }}>
                          {item.remainingSubtasks} left
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>

              
            </div>
          </div>
        )}
        {expandedTaskId && (
  <div
    className="absolute inset-0 z-[60] flex items-end"
    style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}
  >
    <div
      className="w-full rounded-t-[28px] px-5 pt-4 pb-8"
      style={{ backgroundColor: '#11141A', border: '1px solid #242830' }}
    >
      <div className="w-14 h-1 rounded-full mx-auto mb-5" style={{ backgroundColor: '#3A404D' }} />

      {(() => {
        const selectedTask = schedule.find((task) => task.id === expandedTaskId)
        if (!selectedTask) return null

        return (
          <>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[16px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: subjectColor }}>
                  {selectedTask.subject}
                </p>

                <h2 className="text-[19px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
                  {selectedTask.title}
                </h2>

                <p className="text-[14px]" style={{ color: '#A0A5B0' }}>
                  {selectedTask.duration}
                </p>
              </div>

              <button
                onClick={() => setExpandedTaskId(null)}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#20242D' }}
              >
                <X size={20} color="#F0F2F5" />
              </button>
            </div>

            <div
              className="rounded-[18px] p-4"
              style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
            >
              <h3 className="text-[15px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
                Subtask Details
              </h3>

              <p className="text-[14px] leading-relaxed" style={{ color: '#A0A5B0' }}>
                {selectedTask.task}
              </p>
            </div>
          </>
        )
      })()}
    </div>
  </div>
)}
        {showAssignmentDetails && (
  <div
    className="absolute inset-0 z-[60] flex items-end"
    style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}
  >
    <div
      className="w-full rounded-t-[28px] px-5 pt-4 pb-8 max-h-[82vh] overflow-y-auto"
      style={{ backgroundColor: '#11141A', border: '1px solid #242830' }}
    >
      <div
        className="w-14 h-1 rounded-full mx-auto mb-5"
        style={{ backgroundColor: '#3A404D' }}
      />

      <div className="flex items-start justify-between mb-5">
        <div>
          <p
            className="text-[16px] font-bold uppercase tracking-[0.16em] mb-2"
            style={{ color: subjectColor }}
          >
            {assignment.subject}
          </p>

          <h2
            className="text-[24px] font-bold mb-2"
            style={{ color: '#F0F2F5' }}
          >
            {assignment.title}
          </h2>

          <p className="text-[14px]" style={{ color: '#A0A5B0' }}>
            Due{' '}
            {assignmentDueDate?.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <button
          onClick={() => setShowAssignmentDetails(false)}
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#20242D' }}
        >
          <X size={20} color="#F0F2F5" />
        </button>
      </div>

      <div
        className="rounded-[18px] p-4 mb-4"
        style={{
          backgroundColor: '#161920',
          border: '1px solid #242830',
        }}
      >
        <h3
          className="text-[15px] font-bold mb-2"
          style={{ color: '#F0F2F5' }}
        >
          Assignment Details
        </h3>

        <p
          className="text-[14px] leading-relaxed whitespace-pre-line"
          style={{ color: '#A0A5B0' }}
        >
          {assignment.details || 'No extra details were added.'}
        </p>
      </div>

      <div
        className="rounded-[18px] p-4"
        style={{
          backgroundColor: '#161920',
          border: '1px solid #242830',
        }}
      >
        <h3
          className="text-[15px] font-bold mb-3"
          style={{ color: '#F0F2F5' }}
        >
          Subtasks
        </h3>

        <div className="space-y-3">
          {schedule.map((task) => (
            <div key={task.id} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: task.completed
                    ? 'var(--accent-color)'
                    : 'transparent',
                  border: task.completed
                    ? '2px solid var(--accent-color)'
                    : '2px solid #8B909A',
                }}
              >
                {task.completed && (
                  <Check size={12} color="#0D0F14" />
                )}
              </div>

              <div>
                <p
                  className="text-[14px] font-semibold"
                  style={{
                    color: '#F0F2F5',
                    textDecoration: task.completed
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {task.task}
                </p>

                <p
                  className="text-[12px]"
                  style={{ color: '#8B909A' }}
                >
                  {task.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

          {/* DELETE BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowDeleteModal(true)
            }}
            className="w-full py-4 rounded-[18px] mt-6 flex items-center justify-center"
            style={{
              backgroundColor: 'rgba(255, 59, 48, 0.12)',
              border: '1px solid rgba(255, 59, 48, 0.24)',
              color: '#FF5A52',
            }}
          >
            Delete Assignment
          </button>
        </div>
      </div>
    )}
    {showDeleteModal && (
  <div className="fixed inset-0 z-[120] bg-black/70 flex items-center justify-center px-5">
    <div
      className="w-full max-w-[340px] rounded-[28px] p-6"
      style={{
        backgroundColor: '#161920',
        border: '1px solid #242830',
      }}
    >
      <h2
        className="text-center text-[22px] font-bold mb-3"
        style={{ color: '#F0F2F5' }}
      >
        Delete Assignment?
      </h2>

      <p
        className="text-center text-[14px] leading-relaxed mb-5"
        style={{ color: '#A0A5B0' }}
      >
        Deleting this assignment will also remove all subtasks,
        schedule progress, and completion history.
        This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="flex-1 py-3 rounded-[16px]"
          style={{
            backgroundColor: '#20242D',
            color: '#F0F2F5',
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            // DELETE LOGIC HERE
            setShowDeleteModal(false)
          }}
          className="flex-1 py-3 rounded-[16px]"
          style={{
            backgroundColor: '#FF453A',
            color: 'white',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
        {showCalendarView && (
          <div
            className="absolute inset-0 flex items-center justify-center px-5 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.68)' }}
          >
            <div
              className="w-full rounded-[24px] p-5"
              style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
            >
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={() => {
                    if (calendarMonth === 0) {
                      setCalendarMonth(11)
                      setCalendarYear(calendarYear - 1)
                    } else {
                      setCalendarMonth(calendarMonth - 1)
                    }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#20242D' }}
                >
                  <ChevronLeft size={20} color="#F0F2F5" />
                </button>

                <h2 className="text-[20px] font-bold" style={{ color: '#F0F2F5' }}>
                  {monthName}
                </h2>

                <button
                  onClick={() => {
                    if (calendarMonth === 11) {
                      setCalendarMonth(0)
                      setCalendarYear(calendarYear + 1)
                    } else {
                      setCalendarMonth(calendarMonth + 1)
                    }
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#20242D' }}
                >
                  <ChevronRight size={20} color="#F0F2F5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                  <div
                    key={d}
                    className="text-center text-[11px] font-bold"
                    style={{ color: '#8B909A' }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-3">
                {calendarDays.map((day, index) => {
                  if (!day) return <div key={index} />

                  const dayIndexFromToday = Math.floor(
                    (new Date(calendarYear, calendarMonth, day).getTime() -
                      today.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )

                  const isInVisibleWeek = dayIndexFromToday >= 0 && dayIndexFromToday < DAYS_TO_SHOW
                  const hasTasks = schedule.some((task) => task.dayId === `day-${dayIndexFromToday + 1}`)

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isInVisibleWeek) {
                          setSelectedDayIndex(dayIndexFromToday)
                          setShowCalendarView(false)
                        }
                      }}
                      className="w-10 h-10 mx-auto rounded-full text-[14px] font-bold relative flex items-center justify-center"
                      style={{
                        backgroundColor:
                          isInVisibleWeek && selectedDayIndex === dayIndexFromToday
                            ? 'var(--accent-color)'
                            : '#20242D',
                        color:
                          isInVisibleWeek && selectedDayIndex === dayIndexFromToday
                            ? '#0D0F14'
                            : isInVisibleWeek
                              ? '#F0F2F5'
                              : '#555B66',
                        opacity: isInVisibleWeek ? 1 : 0.45,
                      }}
                    >
                      {day}

                      {hasTasks && (
                        <span
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: 'var(--accent-color)' }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setShowCalendarView(false)}
                className="w-full mt-5 py-3 rounded-[14px] font-bold"
                style={{ backgroundColor: '#20242D', color: '#F0F2F5' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}