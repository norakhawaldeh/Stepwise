import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  PlusCircle,
  Sprout,
  User,
} from 'lucide-react'

interface DarkAddTaskScreenProps {
  onContinue: () => void
  onNavigate: (screen: string) => void
}

export function DarkAddTaskScreen({ onContinue, onNavigate }: DarkAddTaskScreenProps) {
  const [subject, setSubject] = useState('')
  const [assignmentName, setAssignmentName] = useState('')
  const [details, setDetails] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)

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
    ? selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : 'Pick a due date'

  const handleContinue = () => {
    if (!subject.trim() || !assignmentName.trim() || !details.trim() || !selectedDate) {
      alert('Please fill out subject/class, assignment name, details, and due date.')
      return
    }

    const start = new Date()
    start.setHours(0, 0, 0, 0)

    const due = new Date(selectedDate)
    due.setHours(0, 0, 0, 0)

    const numberOfDays = Math.max(
      1,
      Math.ceil((due.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    )

    localStorage.setItem(
      'stepwiseDraftTask',
      JSON.stringify({
        subject: subject.trim(),
        title: assignmentName.trim(),
        details: details.trim(),
        days: numberOfDays,
        selectedDate: selectedDate.toISOString(),
        deadlineDate: selectedDate.toISOString(),
      })
    )

    onContinue()
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-36">
          <button onClick={() => onNavigate('home')} className="mb-7">
            <ArrowLeft size={22} color="var(--accent-color)" />
          </button>

          <div className="mb-6 text-center">
            <h1 className="text-[28px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
              Add Assignment
            </h1>

            <div className="mb-10 text-center">
              <p className="text-[14px] mb-4" style={{ color: '#A0A5B0' }}>
                Tell Rooted what you need to finish.
              </p>

              <div className="flex items-center gap-3 max-w-[220px] mx-auto">
                <div className="h-[5px] flex-1 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
                <div className="h-[5px] flex-1 rounded-full" style={{ backgroundColor: '#2A2F3A' }} />
              </div>
            </div>
          </div>

          <div className="rounded-[22px] p-5 mb-4" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[15px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              Subject / Class
            </h2>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Math, Biology, CS 1331"
              className="w-full px-4 py-3.5 rounded-[14px] border text-[15px] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />
          </div>

          <div className="rounded-[22px] p-5 mb-4" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[15px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              Assignment Name
            </h2>
            <input
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="e.g. essay draft, homework 5"
              className="w-full px-4 py-3.5 rounded-[14px] border text-[15px] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />
          </div>

          <div className="rounded-[22px] p-5 mb-4" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[15px] font-bold mb-1" style={{ color: '#F0F2F5' }}>
              Assignment Details
            </h2>
            <p className="text-[13px] leading-snug mb-4" style={{ color: '#8B909A' }}>
              Paste instructions, requirements, chapters, or anything important.
            </p>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={`Example:
- Read chapters 1–4
- Take notes
- Submit short response
- Quiz next week`}
              className="w-full min-h-[155px] resize-none px-4 py-4 rounded-[14px] border text-[14px] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />
          </div>

          <div className="rounded-[22px] p-5 mb-5" style={{ backgroundColor: '#161920', border: '1px solid #242830' }}>
            <h2 className="text-[15px] font-bold mb-4" style={{ color: '#F0F2F5' }}>
              Due Date
            </h2>

            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full px-4 py-4 rounded-[14px] border text-[15px] flex items-center gap-3 text-left"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            >
              <Calendar size={18} color="var(--accent-color)" />
              <span style={{ color: selectedDate ? '#F0F2F5' : '#8B909A' }}>
                {selectedDateText}
              </span>
            </button>

            {showCalendar && (
              <div className="mt-4 rounded-[18px] p-4" style={{ backgroundColor: '#0D0F14', border: '1px solid #242830' }}>
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() =>
                      calendarMonth === 0
                        ? (setCalendarMonth(11), setCalendarYear(calendarYear - 1))
                        : setCalendarMonth(calendarMonth - 1)
                    }
                  >
                    <ChevronLeft size={22} color="var(--accent-color)" />
                  </button>

                  <h3 className="font-bold text-[16px]" style={{ color: '#F0F2F5' }}>
                    {monthName}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      calendarMonth === 11
                        ? (setCalendarMonth(0), setCalendarYear(calendarYear + 1))
                        : setCalendarMonth(calendarMonth + 1)
                    }
                  >
                    <ChevronRight size={22} color="var(--accent-color)" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-[11px] uppercase" style={{ color: '#8B909A' }}>
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-3 text-center">
                  {calendarDays.map((day, index) => {
                    if (!day) return <div key={index} />

                    const date = new Date(calendarYear, calendarMonth, day)
                    date.setHours(0, 0, 0, 0)

                    const todayOnly = new Date()
                    todayOnly.setHours(0, 0, 0, 0)

                    const isPast = date < todayOnly

                    const isSelected =
                      selectedDate &&
                      day === selectedDate.getDate() &&
                      calendarMonth === selectedDate.getMonth() &&
                      calendarYear === selectedDate.getFullYear()

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={isPast}
                        onClick={() => {
                          setSelectedDate(new Date(calendarYear, calendarMonth, day))
                          setShowCalendar(false)
                        }}
                        className="w-9 h-9 mx-auto rounded-full text-[14px] font-bold flex items-center justify-center"
                        style={{
                          color: isSelected ? '#0D0F14' : isPast ? '#555B66' : '#F0F2F5',
                          backgroundColor: isSelected ? 'var(--accent-color)' : 'transparent',
                          opacity: isPast ? 0.45 : 1,
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

          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-4 rounded-[18px] font-bold text-[16px] mb-6"
            style={{ backgroundColor: 'var(--accent-color)', color: '#0D0F14' }}
          >
            Continue →
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between" style={{ backgroundColor: 'rgba(22, 25, 32, 0.96)', border: '1px solid #242830' }}>
          <button onClick={() => onNavigate('home')}><Home size={24} color="#8B909A" /></button>
          <button onClick={() => onNavigate('add')}><PlusCircle size={25} color="var(--accent-color)" /></button>
          <button onClick={() => onNavigate('schedule')}><Calendar size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('garden')}><Sprout size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('profile')}><User size={25} color="#8B909A" /></button>
        </div>
      </div>
    </div>
  )
}