import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Flag,
  Home,
  PlusCircle,
  Bell,
  User,
  Plus,
  Minus,
} from 'lucide-react'

interface DarkAddTaskScreenProps {
  onBuildPlan: () => void
  onNavigate: (screen: string) => void
}

type Priority = 'Low' | 'Medium' | 'High'

export function DarkAddTaskScreen({ onBuildPlan, onNavigate }: DarkAddTaskScreenProps) {
  const [taskTitle, setTaskTitle] = useState('')
  const [details, setDetails] = useState('')
  const [dueMode, setDueMode] = useState<'days' | 'date'>('days')
  const [days, setDays] = useState(3)
  const [priority, setPriority] = useState<Priority>('Medium')
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const today = new Date()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth())
  const [calendarYear, setCalendarYear] = useState(today.getFullYear())

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

  const selectedDateText = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : ''

  const handleGeneratePlan = () => {
    const numberOfDays =
      dueMode === 'days'
        ? days
        : selectedDate
          ? Math.max(1, Math.ceil((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
          : 3

    localStorage.setItem(
      'stepwiseDraftTask',
      JSON.stringify({
        title: taskTitle || 'Untitled Task',
        details,
        priority,
        days: numberOfDays,
        dueMode,
        selectedDate: selectedDate?.toISOString() || null,
      })
    )

    onBuildPlan()
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-36">
          <button onClick={() => onNavigate('home')} className="mb-7">
            <ArrowLeft size={22} color="#00E5A0" />
          </button>

          <div className="mb-6">
            <h1 className="text-[28px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
              New Task
            </h1>
            <p className="text-[15px]" style={{ color: '#A0A5B0' }}>
              Add the assignment. Stepwise will break it down.
            </p>
          </div>

          <div className="rounded-[22px] p-5 mb-4" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[16px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              What’s the task?
            </h2>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Study for math exam"
              className="w-full px-4 py-3.5 rounded-[14px] border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0]"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />
          </div>

          <div className="rounded-[22px] p-5 mb-4" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[16px] font-bold mb-1" style={{ color: '#F0F2F5' }}>
              Assignment details
            </h2>
            <p className="text-[13px] leading-snug mb-4" style={{ color: '#8B909A' }}>
              Paste instructions or explain how you want to work on it.
            </p>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={`Paste details here...

Example:
- Read chapters 1–4
- Review notes
- Make flashcards
- Complete practice problems`}
              className="w-full min-h-[170px] resize-none px-4 py-4 rounded-[14px] border text-[14px] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#00E5A0]"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />

            <button
              type="button"
              className="mt-3 px-3 py-2 rounded-full text-[13px] font-semibold flex items-center gap-2"
              style={{ backgroundColor: 'rgba(0, 229, 160, 0.12)', color: '#00E5A0' }}
            >
              <Clipboard size={15} />
              Paste from clipboard
            </button>
          </div>

          <div className="rounded-[22px] p-5 mb-4" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[16px] font-bold mb-4" style={{ color: '#F0F2F5' }}>
              When is it due?
            </h2>

            <div className="flex gap-3 mb-5">
              <button
                type="button"
                onClick={() => setDueMode('days')}
                className="flex-1 py-3 rounded-full font-semibold text-[14px]"
                style={{
                  backgroundColor: dueMode === 'days' ? '#00E5A0' : 'transparent',
                  color: dueMode === 'days' ? '#0D0F14' : '#A0A5B0',
                  border: '1px solid #242830',
                }}
              >
                In X days
              </button>

              <button
                type="button"
                onClick={() => setDueMode('date')}
                className="flex-1 py-3 rounded-full font-semibold text-[14px] flex items-center justify-center gap-2"
                style={{
                  backgroundColor: dueMode === 'date' ? '#00E5A0' : 'transparent',
                  color: dueMode === 'date' ? '#0D0F14' : '#A0A5B0',
                  border: '1px solid #242830',
                }}
              >
                <Calendar size={16} />
                Pick date
              </button>
            </div>

            {dueMode === 'days' && (
              <div className="flex items-center justify-center gap-7">
                <button onClick={() => setDays(Math.max(1, days - 1))} className="w-11 h-11 rounded-full flex items-center justify-center" style={{ border: '1px solid #242830', color: '#00E5A0' }}>
                  <Minus size={18} />
                </button>

                <div className="flex items-end gap-2">
                  <span className="text-[30px] font-bold" style={{ color: '#F0F2F5' }}>{days}</span>
                  <span className="text-[14px] mb-1" style={{ color: '#A0A5B0' }}>days</span>
                </div>

                <button onClick={() => setDays(days + 1)} className="w-11 h-11 rounded-full flex items-center justify-center" style={{ border: '1px solid #242830', color: '#00E5A0' }}>
                  <Plus size={18} />
                </button>
              </div>
            )}

            {dueMode === 'date' && (
              <div className="rounded-[18px] p-4" style={{ backgroundColor: '#0D0F14', border: '1px solid #242830' }}>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => calendarMonth === 0 ? (setCalendarMonth(11), setCalendarYear(calendarYear - 1)) : setCalendarMonth(calendarMonth - 1)}>
                    <ChevronLeft size={22} color="#00E5A0" />
                  </button>
                  <h3 className="font-bold text-[16px]" style={{ color: '#F0F2F5' }}>{monthName}</h3>
                  <button onClick={() => calendarMonth === 11 ? (setCalendarMonth(0), setCalendarYear(calendarYear + 1)) : setCalendarMonth(calendarMonth + 1)}>
                    <ChevronRight size={22} color="#00E5A0" />
                  </button>
                </div>

                {selectedDate && (
                  <p className="text-[13px] mb-3 text-center" style={{ color: '#00E5A0' }}>
                    Selected: {selectedDateText}
                  </p>
                )}

                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-[11px] uppercase" style={{ color: '#8B909A' }}>{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {calendarDays.map((day, index) => {
                    const isSelected =
                      selectedDate &&
                      day === selectedDate.getDate() &&
                      calendarMonth === selectedDate.getMonth() &&
                      calendarYear === selectedDate.getFullYear()

                    return (
                      <button
                        key={index}
                        disabled={!day}
                        onClick={() => day && setSelectedDate(new Date(calendarYear, calendarMonth, day))}
                        className="h-9 rounded-full text-[14px]"
                        style={{
                          color: isSelected ? '#0D0F14' : day ? '#F0F2F5' : 'transparent',
                          backgroundColor: isSelected ? '#00E5A0' : 'transparent',
                        }}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-[22px] p-5 mb-4" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[16px] font-bold mb-1" style={{ color: '#F0F2F5' }}>Priority</h2>

            <div className="flex gap-3 mt-4">
              {(['Low', 'Medium', 'High'] as Priority[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setPriority(level)}
                  className="flex-1 py-3 rounded-full font-semibold text-[13px] flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: priority === level ? '#00E5A0' : '#20242D',
                    color: priority === level ? '#0D0F14' : '#F0F2F5',
                  }}
                >
                  <Flag size={15} />
                  {level}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="w-full py-4 rounded-[18px] flex items-center justify-center gap-2 mb-4"
            style={{ backgroundColor: '#161920', border: '1px solid #242830', color: '#A0A5B0' }}
          >
            More options
            <ChevronDown size={17} />
          </button>

          <button
            type="button"
            onClick={handleGeneratePlan}
            className="w-full py-4 rounded-[18px] font-bold text-[16px] mb-6"
            style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
          >
            Generate plan →
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between" style={{ backgroundColor: 'rgba(22, 25, 32, 0.96)', border: '1px solid #242830' }}>
          <button onClick={() => onNavigate('home')}><Home size={24} color="#8B909A" /></button>
          <button onClick={() => onNavigate('add')}><PlusCircle size={25} color="#00E5A0" /></button>
          <button onClick={() => onNavigate('schedule')}><Calendar size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('rescue')}><Bell size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('profile')}><User size={25} color="#8B909A" /></button>
        </div>
      </div>
    </div>
  )
}