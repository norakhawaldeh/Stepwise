import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Trash2,
  CheckCircle2,
  Calendar,
  MoveRight,
} from 'lucide-react'

interface DarkResultsScreenProps {
  onStartOver: () => void
  onNavigate: (screen: string) => void
}

type StepTask = {
  id: string
  text: string
  time: string
  dayId: string
}

type DayGroup = {
  id: string
  title: string
}

export function DarkResultsScreen({ onStartOver, onNavigate }: DarkResultsScreenProps) {
  const [assignmentTitle, setAssignmentTitle] = useState('New Assignment')
  const [days, setDays] = useState<DayGroup[]>([])

  const [tasks, setTasks] = useState<StepTask[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [moveOpenId, setMoveOpenId] = useState<string | null>(null)
  const [added, setAdded] = useState(false)
  

  useEffect(() => {
  const generated = localStorage.getItem('stepwiseGeneratedPlan')
  const plan = generated ? JSON.parse(generated) : null

  if (!plan) return

  const draft = JSON.parse(
    localStorage.getItem('stepwiseDraftTask') || '{}'
  )

  const numDays = Math.min(Math.max(draft?.days || 3, 1), 7)

  setAssignmentTitle(plan.assignmentTitle)

  const startDate = new Date()

  const newDays = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(startDate)

    date.setDate(startDate.getDate() + i)

    return {
      id: `day-${i + 1}`,
      title: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    }
  })

  setDays(newDays)

  const aiTasks: StepTask[] = plan.subtasks.map(
    (task: any, index: number) => ({
      id: `task-${index + 1}`,

      text: task.text,

      time: task.time,

      dayId: `day-${Math.min(
        Math.max(task.dayNumber || 1, 1),
        numDays
      )}`,

      completed: false,
    })
  )

  setTasks(aiTasks)

  localStorage.setItem(
    'stepwiseSchedule',
    JSON.stringify({
      assignmentTitle: plan.assignmentTitle,
      days: newDays,
      tasks: aiTasks,
      startDate: new Date().toISOString(),
    })
  )
}, [])

  const updateTaskText = (taskId: string, value: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, text: value } : task))
    )
  }

  const moveTask = (taskId: string, newDayId: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, dayId: newDayId } : task))
    )
    setMoveOpenId(null)
  }

  const confirmDelete = () => {
    if (!deleteId) return
    setTasks((prev) => prev.filter((task) => task.id !== deleteId))
    setDeleteId(null)
  }

  const handleAddToSchedule = () => {
    const startDate = new Date()
    const deadlineDate = new Date(startDate)
    deadlineDate.setDate(startDate.getDate() + days.length - 1)

    localStorage.setItem(
      'stepwiseSchedule',
      JSON.stringify({
        assignmentTitle,
        startDate: startDate.toISOString(),
        deadlineDate: deadlineDate.toISOString(),
        totalDays: days.length,
        days,
        tasks: tasks.map((task) => ({
          ...task,
          assignmentTitle,
          completed: false,
        })),
      })
    )
    setAdded(true)
  }

  if (added) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#0D0F14' }}>
        <div className="max-w-[430px] mx-auto min-h-screen px-5 flex items-center">
          <div
            className="w-full rounded-[26px] p-6 text-center"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            <CheckCircle2 size={58} color="#00E5A0" className="mx-auto mb-5" />

            <h1 className="text-[26px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              Added to schedule
            </h1>

            <p className="text-[15px] leading-relaxed mb-6" style={{ color: '#A0A5B0' }}>
              Your plan is saved. You can now view your steps in the schedule.
            </p>

            <button
              onClick={() => onNavigate('schedule')}
              className="w-full py-4 rounded-[18px] font-bold text-[16px]"
              style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
            >
              View schedule
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-28">
          <button
            onClick={onStartOver}
            className="mb-7"
          >
            <ArrowLeft size={22} color="#00E5A0" />
          </button>

          <div className="mb-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: '#00E5A0' }}>
              Preview Plan
            </p>

            <h1 className="text-[28px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
              {assignmentTitle}
            </h1>

            <p className="text-[14px] leading-relaxed" style={{ color: '#A0A5B0' }}>
              Edit any step, move it to another day, or delete anything you don’t need.
            </p>
          </div>

          <div
            className="rounded-[22px] p-5 mb-5"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            {days.map((day, index) => {
              const dayTasks = tasks.filter((task) => task.dayId === day.id)

              return (
                <div
                  key={day.id}
                  className={index < days.length - 1 ? 'mb-6 pb-6 border-b' : ''}
                  style={{ borderColor: '#242830' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[16px] font-bold" style={{ color: '#F0F2F5' }}>
                      {day.title}
                    </h2>

                    <span className="text-[12px]" style={{ color: '#8B909A' }}>
                      {dayTasks.length} steps
                    </span>
                  </div>

                  {dayTasks.length === 0 && (
                    <p className="text-[13px] italic" style={{ color: '#8B909A' }}>
                      No steps here.
                    </p>
                  )}

                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-[16px] p-3 mb-3 relative"
                      style={{ backgroundColor: '#0D0F14', border: '1px solid #242830' }}
                    >
                      <textarea
                        value={task.text}
                        onChange={(e) => updateTaskText(task.id, e.target.value)}
                        className="w-full resize-none text-[14px] leading-snug focus:outline-none"
                        style={{
                          backgroundColor: 'transparent',
                          color: '#F0F2F5',
                          minHeight: '48px',
                        }}
                      />

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[12px]" style={{ color: '#8B909A' }}>
                          {task.time}
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <button
                              onClick={() => setMoveOpenId(moveOpenId === task.id ? null : task.id)}
                              className="px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1"
                              style={{ backgroundColor: '#20242D', color: '#A0A5B0' }}
                            >
                              <MoveRight size={13} />
                              Move
                            </button>

                            {moveOpenId === task.id && (
                              <div
                                className="absolute right-0 top-9 z-20 rounded-[14px] overflow-hidden"
                                style={{
                                  backgroundColor: '#20242D',
                                  border: '1px solid #242830',
                                  minWidth: '130px',
                                }}
                              >
                                {days.map((d) => (
                                  <button
                                    key={d.id}
                                    onClick={() => moveTask(task.id, d.id)}
                                    className="block w-full text-left px-3 py-2 text-[13px]"
                                    style={{
                                      color: d.id === task.dayId ? '#00E5A0' : '#F0F2F5',
                                    }}
                                  >
                                    {d.title}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => setDeleteId(task.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#20242D' }}
                          >
                            <Trash2 size={15} color="#FF6B57" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          <button
            onClick={handleAddToSchedule}
            className="w-full py-4 rounded-[18px] font-bold text-[16px] mb-4"
            style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
          >
            Add to schedule
          </button>

          <button
            onClick={onStartOver}
            className="w-full py-3 rounded-[18px] text-[14px] underline"
            style={{ color: '#8B909A' }}
          >
            Start over
          </button>
        </div>

        {deleteId && (
          <div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.62)' }}
          >
            <div
              className="w-full rounded-[22px] p-5"
              style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
            >
              <h2 className="text-[20px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
                Delete this step?
              </h2>

              <p className="text-[14px] mb-5" style={{ color: '#A0A5B0' }}>
                This will remove it from your plan.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 rounded-[14px] font-bold"
                  style={{ backgroundColor: '#20242D', color: '#F0F2F5' }}
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 rounded-[14px] font-bold"
                  style={{ backgroundColor: '#FF6B57', color: '#0D0F14' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}