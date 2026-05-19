import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'

interface DarkGeneratingPlanScreenProps {
  onBack: () => void
  onDone: () => void
}

export function DarkGeneratingPlanScreen({ onBack, onDone }: DarkGeneratingPlanScreenProps) {
  const [progress, setProgress] = useState(10)
  const [message, setMessage] = useState('Reading your assignment details...')
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    let progressInterval: number | undefined

    const messages = [
      'Reading your assignment details...',
      'Checking uploaded files...',
      'Breaking it into smaller steps...',
      'Spreading tasks across your days...',
      'Finalizing your plan...',
    ]

    let messageIndex = 0

    progressInterval = window.setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + 4))
      messageIndex = Math.min(messageIndex + 1, messages.length - 1)
      setMessage(messages[messageIndex])
    }, 700)

    const generatePlan = async () => {
      const startedAt = Date.now()
      const minimumTime = 6000

      try {
        const saved = localStorage.getItem('stepwiseDraftTask')
        const draft = saved ? JSON.parse(saved) : null

        if (!draft) throw new Error('No draft task found.')
        const filesForAI = (draft.files || []).map((file: any) => {
          if (file.type?.startsWith('image/')) {
            return file
          }

          return {
            name: file.name,
            type: file.type,
            data: '',
          }
        })
        const response = await fetch('http://localhost:3001/api/generate-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: draft.subject,
            title: draft.title,
            details: draft.details || '',
            files: filesForAI,
            days: draft.days,
            selectedDate: draft.selectedDate,
            estimatedMinutes: draft.confirmedEstimatedMinutes,
          }),
        })

        if (!response.ok) {
  const errorText = await response.text()
  console.error('Backend error:', errorText)
  alert(errorText)
  throw new Error('Failed to generate plan.')
}

        const plan = await response.json()
        localStorage.setItem('stepwiseGeneratedPlan', JSON.stringify(plan))

        const elapsed = Date.now() - startedAt
        const remaining = Math.max(0, minimumTime - elapsed)
        await new Promise((resolve) => setTimeout(resolve, remaining))

        if (progressInterval) clearInterval(progressInterval)

        setProgress(100)
        setMessage('Your plan is ready.')
        setTimeout(() => onDone(), 1200)
      } catch (error) {
        console.error(error)
        if (progressInterval) clearInterval(progressInterval)
        alert('Plan generation failed.')
        onBack()
      }
    }

    generatePlan()

    return () => {
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [onBack, onDone])

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0C0A18' }}>
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative px-5 pt-8 pb-28">
        <button onClick={onBack} className="mb-16">
          <ArrowLeft size={22} color="var(--accent-color)" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div
            className="w-28 h-28 rounded-[28px] flex items-center justify-center mb-8"
            style={{
              backgroundColor: 'rgba(139,92,246,0.12)',
              border: '1px solid rgba(139,92,246,0.28)',
            }}
          >
            {progress === 100 ? (
              <CheckCircle2 size={52} color="var(--accent-color)" />
            ) : (
              <Sparkles size={50} color="var(--accent-color)" />
            )}
          </div>

          <h1 className="text-[26px] font-bold mb-3" style={{ color: '#F0EEF8' }}>
            Building your schedule...
          </h1>

          <p className="text-[15px] leading-relaxed mb-8 max-w-[310px]" style={{ color: '#9490B8' }}>
            {message}
          </p>

          <div className="w-full rounded-full h-2 mb-3" style={{ backgroundColor: '#1A1830' }}>
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${progress}%`, backgroundColor: 'var(--accent-color)' }}
            />
          </div>

          <p className="text-[13px] mb-8" style={{ color: '#7470A0' }}>
            {progress}%
          </p>

          <div
            className="w-full rounded-[20px] p-5 text-left"
            style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}
          >
            <p className="text-[14px] font-bold mb-4" style={{ color: '#F0EEF8' }}>
              This includes:
            </p>

            {[
              'Reading typed instructions',
              'Using uploaded screenshots when available',
              'Using uploaded PDF names/details as context',
              'Spreading work across available days',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <CheckCircle2 size={17} color="var(--accent-color)" />
                <p className="text-[13px]" style={{ color: '#9490B8' }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}