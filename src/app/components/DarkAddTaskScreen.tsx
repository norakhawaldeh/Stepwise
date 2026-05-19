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
  ImagePlus,
  X,
  FileText,
} from 'lucide-react'

interface DarkAddTaskScreenProps {
  onContinue: () => void
  onNavigate: (screen: string) => void
}

// 15 MB per file limit (base64 encoded files are ~33% larger, so keep some headroom)
const MAX_FILE_BYTES = 15 * 1024 * 1024

export function DarkAddTaskScreen({ onContinue, onNavigate }: DarkAddTaskScreenProps) {
  const [subject, setSubject] = useState('')
  const [assignmentName, setAssignmentName] = useState('')
  const [details, setDetails] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; type: string; data: string }[]
  >([])
  const [showCalendar, setShowCalendar] = useState(false)

  // ── File-too-large toast ──────────────────────────────────────────────────
  const [sizeWarning, setSizeWarning] = useState<string | null>(null)

  const showSizeWarning = (msg: string) => {
    setSizeWarning(msg)
    setTimeout(() => setSizeWarning(null), 4000)
  }

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    files.forEach((file) => {
      // Check size before reading
      if (file.size > MAX_FILE_BYTES) {
        showSizeWarning(
          `"${file.name}" is too large (max 15 MB). Try compressing it first.`
        )
        return
      }

      const reader = new FileReader()

      reader.onloadend = () => {
        setUploadedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            type: file.type,
            data: reader.result as string,
          },
        ])
      }

      reader.readAsDataURL(file)
    })

    // Reset so the same file can be re-selected if needed
    e.target.value = ''
  }

  const handleContinue = () => {
    if (
      !subject.trim() ||
      !assignmentName.trim() ||
      (!details.trim() && uploadedFiles.length === 0) ||
      !selectedDate
    ) {
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
        files: uploadedFiles,
        days: numberOfDays,
        selectedDate: selectedDate.toISOString(),
        deadlineDate: selectedDate.toISOString(),
      })
    )

    onContinue()
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0C0A18' }}>
<div className="max-w-[430px] mx-auto app-screen flex flex-col relative">
        {/* ── File-too-large toast ── */}
        {sizeWarning && (
          <div
            className="fixed left-1/2 -translate-x-1/2 top-6 z-50 px-5 py-3 rounded-[18px] max-w-[340px] w-[90%] text-center"
            style={{
              background: 'rgba(20,18,40,0.97)',
              border: '1px solid rgba(255,107,87,0.45)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.45)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <p className="text-[13.5px] font-semibold" style={{ color: '#FF8070' }}>
              {sizeWarning}
            </p>
          </div>
        )}

        <div className="flex-1 app-scroll px-5 pt-6">
          <button onClick={() => onNavigate('home')} className="mb-7">
            <ArrowLeft size={22} color="var(--accent-color)" />
          </button>

          <div className="mb-6 text-center">
            <h1 className="text-[28px] font-bold mb-2" style={{ color: '#F0EEF8' }}>
              Add Assignment
            </h1>
            <div className="mb-10 text-center">
              <p className="text-[14px] mb-4" style={{ color: '#9490B8' }}>
                Tell Rooted what you need to finish.
              </p>
              <div className="flex items-center gap-3 max-w-[220px] mx-auto">
                <div className="h-[5px] flex-1 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
                <div className="h-[5px] flex-1 rounded-full" style={{ backgroundColor: '#221E38' }} />
              </div>
            </div>
          </div>

          <div
            className="rounded-[22px] p-5 mb-4"
            style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}
          >
            <h2 className="text-[15px] font-bold mb-3" style={{ color: '#F0EEF8' }}>
              Subject / Class
            </h2>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Math, Biology, CS 1331"
              className="w-full px-4 py-3.5 rounded-[14px] border text-[15px] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
              style={{ backgroundColor: '#080616', borderColor: '#1E1C30', color: '#F0EEF8' }}
            />
          </div>

          <div
            className="rounded-[22px] p-5 mb-4"
            style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}
          >
            <h2 className="text-[15px] font-bold mb-3" style={{ color: '#F0EEF8' }}>
              Assignment Name
            </h2>
            <input
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
              placeholder="e.g. essay draft, homework 5"
              className="w-full px-4 py-3.5 rounded-[14px] border text-[15px] focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
              style={{ backgroundColor: '#080616', borderColor: '#1E1C30', color: '#F0EEF8' }}
            />
          </div>

          {/* ── Assignment Details (only section changed from original) ── */}
          <div
            className="rounded-[22px] p-5 mb-4"
            style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}
          >
            <h2 className="text-[15px] font-bold mb-1" style={{ color: '#F0EEF8' }}>
              Assignment Details
            </h2>

            <p className="text-[13px] leading-snug mb-4" style={{ color: '#7470A0' }}>
              Paste instructions, upload screenshots, or add notes Rooted should use.
            </p>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={`Paste assignment instructions here...\nExample:\n- Read chapters 1–4\n- Submit short response\n- Quiz next week\n- ...`}
              className="w-full min-h-[145px] resize-none px-4 py-4 rounded-[14px] border text-[12.5px] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[var(--accent-color)]"
              style={{ backgroundColor: '#080616', borderColor: '#1E1C30', color: '#F0EEF8' }}
            />

            <label
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-[14px] border cursor-pointer text-[14px] font-bold"
              style={{
                borderColor: 'rgba(139,92,246,0.35)',
                color: 'var(--accent-color)',
                backgroundColor: 'rgba(139,92,246,0.08)',
              }}
            >
              <ImagePlus size={18} />
              Upload files or screenshots
              <input
                type="file"
                accept="image/*,.pdf,application/pdf"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Uploaded file list */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-[12px] border px-3 py-3"
                    style={{ borderColor: '#1E1C30', backgroundColor: '#080616' }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {file.type.includes('pdf') ? (
                        <FileText size={18} color="var(--accent-color)" />
                      ) : (
                        <img
                          src={file.data}
                          alt={file.name}
                          className="w-10 h-10 object-cover rounded-[8px]"
                        />
                      )}
                      <p className="text-[13px] truncate" style={{ color: '#F0EEF8' }}>
                        {file.name}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      <X size={16} color="#A0A5B0" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Legacy image grid (kept for backwards compat) */}
            {uploadedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Assignment upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-[12px] border"
                      style={{ borderColor: '#1E1C30' }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setUploadedImages((prev) => prev.filter((_, i) => i !== index))
                      }
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#1A1830', border: '1px solid #2A2545' }}
                    >
                      <X size={14} color="#F0EEF8" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className="rounded-[22px] p-5 mb-5"
            style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}
          >
            <h2 className="text-[15px] font-bold mb-4" style={{ color: '#F0EEF8' }}>
              Due Date
            </h2>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full px-4 py-4 rounded-[14px] border text-[15px] flex items-center gap-3 text-left"
              style={{ backgroundColor: '#080616', borderColor: '#1E1C30', color: '#F0EEF8' }}
            >
              <Calendar size={18} color="var(--accent-color)" />
              <span style={{ color: selectedDate ? '#F0EEF8' : '#7470A0' }}>
                {selectedDateText}
              </span>
            </button>

            {showCalendar && (
              <div
                className="mt-4 rounded-[18px] p-4"
                style={{ backgroundColor: '#080616', border: '1px solid #1E1C30' }}
              >
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
                  <h3 className="font-bold text-[16px]" style={{ color: '#F0EEF8' }}>
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
                    <div key={d} className="text-[11px] uppercase" style={{ color: '#7470A0' }}>
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
                          color: isSelected ? '#0C0A18' : isPast ? '#3A3660' : '#F0EEF8',
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
            style={{ backgroundColor: 'var(--accent-color)', color: '#F0EEF8' }}
          >
            Continue →
          </button>
        </div>

        {/* Nav bar — untouched */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between"
          style={{ backgroundColor: 'rgba(22, 25, 32, 0.96)', border: '1px solid #242830' }}
        >
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