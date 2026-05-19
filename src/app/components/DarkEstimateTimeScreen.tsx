import { useEffect, useState } from 'react'
import { ArrowLeft, Clock, Minus, Plus, Sparkles, Home, PlusCircle, Calendar, Bell, User } from 'lucide-react'

interface DarkEstimateTimeScreenProps {
  onBack: () => void
  onGeneratePlan: () => void
  onNavigate: (screen: string) => void
}

export function DarkEstimateTimeScreen({ onBack, onGeneratePlan, onNavigate }: DarkEstimateTimeScreenProps) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(12)
  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(0)
  const [reason, setReason] = useState('Looking at your assignment details...')

  useEffect(() => {
    const interval = setInterval(() => setProgress((prev) => (prev >= 92 ? prev : prev + 8)), 250)
    const estimateTime = async () => {
      try {
        const saved = localStorage.getItem('stepwiseDraftTask')
        const draft = saved ? JSON.parse(saved) : null
        if (!draft) { setLoading(false); return }
        const response = await fetch('http://localhost:3001/api/estimate-time', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject: draft.subject, title: draft.title, details: draft.details, selectedDate: draft.selectedDate }),
        })
        if (!response.ok) throw new Error('Failed to estimate time')
        const estimate = await response.json()
        const totalMinutes = Math.max(15, Math.round(estimate.estimatedMinutes || 60))
        setHours(Math.floor(totalMinutes / 60))
        setMinutes(totalMinutes % 60)
        setReason(estimate.shortReason || 'This is our best estimate based on your details.')
        localStorage.setItem('stepwiseDraftTask', JSON.stringify({ ...draft, aiEstimatedMinutes: totalMinutes, estimatedReason: estimate.shortReason }))
      } catch (error) {
        console.error(error); setHours(1); setMinutes(30); setReason('We made a safe estimate, but feel free to adjust it.')
      } finally {
        setProgress(100); setTimeout(() => setLoading(false), 450)
      }
    }
    estimateTime()
    return () => clearInterval(interval)
  }, [])

  const totalMinutes = hours * 60 + minutes
  const handleGenerate = () => {
    const saved = localStorage.getItem('stepwiseDraftTask')
    const draft = saved ? JSON.parse(saved) : null
    if (!draft) return
    localStorage.setItem('stepwiseDraftTask', JSON.stringify({ ...draft, confirmedEstimatedMinutes: Math.max(15, totalMinutes) }))
    onGeneratePlan()
  }
  const adjustMinutes = (change: number) => { let n = totalMinutes + change; n = Math.max(15, n); setHours(Math.floor(n / 60)); setMinutes(n % 60) }

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0C0A18' }}>
        <div className="max-w-[430px] mx-auto h-screen flex flex-col relative px-5 pt-8 pb-28">
          <button onClick={onBack} className="mb-16"><ArrowLeft size={22} color="var(--accent-color)" /></button>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mb-8" style={{ backgroundColor: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.28)' }}>
              <Sparkles size={46} color="var(--accent-color)" />
            </div>
            <h1 className="text-[25px] font-bold mb-3" style={{ color: '#F0EEF8' }}>Analyzing your assignment...</h1>
            <p className="text-[15px] leading-relaxed mb-8 max-w-[300px]" style={{ color: '#9490B8' }}>Stepwise is estimating how much time this will take.</p>
            <div className="w-full rounded-full h-2 mb-3" style={{ backgroundColor: '#1A1830' }}>
              <div className="h-2 rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: 'var(--accent-color)' }} />
            </div>
            <p className="text-[13px]" style={{ color: '#7470A0' }}>{progress}%</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0C0A18' }}>
      <div className="max-w-[430px] mx-auto h-screen flex flex-col relative">
        <div className="flex-1 overflow-y-auto px-5 pt-8 pb-36">
          <button onClick={onBack} className="mb-7"><ArrowLeft size={22} color="var(--accent-color)" /></button>
          <div className="mb-7 text-center">
            <h1 className="text-[28px] font-bold mb-2" style={{ color: '#F0EEF8' }}>Review Estimated Time</h1>
            <div className="mb-10 text-center">
              <p className="text-[15px] mb-4" style={{ color: '#9490B8' }}>We estimated how long this assignment may take.</p>
              <div className="flex items-center gap-3">
                <div className="h-[5px] flex-1 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
                <div className="h-[5px] flex-1 rounded-full" style={{ backgroundColor: 'var(--accent-color)' }} />
              </div>
            </div>
          </div>

          <div className="rounded-[24px] p-6 mb-5 text-center" style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}>
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(139,92,246,0.12)' }}>
              <Clock size={42} color="var(--accent-color)" />
            </div>
            <p className="text-[14px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: 'var(--accent-color)' }}>Estimated Time</p>
            <h2 className="text-[34px] font-bold mb-2" style={{ color: '#F0EEF8' }}>{hours}h {minutes}m</h2>
            <p className="text-[14px] leading-relaxed" style={{ color: '#9490B8' }}>{reason}</p>
          </div>

          <div className="rounded-[22px] p-5 mb-5" style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}>
            <h2 className="text-[16px] font-bold mb-2" style={{ color: '#F0EEF8' }}>Adjust if needed</h2>
            <p className="text-[12px] mb-5" style={{ color: '#7470A0' }}>Be honest! This helps Stepwise create a realistic plan.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[13px] mb-2" style={{ color: '#9490B8' }}>Hours</p>
                <div className="flex items-center justify-between rounded-[16px] px-3 py-3" style={{ backgroundColor: '#080616', border: '1px solid #1E1C30' }}>
                  <button onClick={() => setHours(Math.max(0, hours - 1))}><Minus size={18} color="var(--accent-color)" /></button>
                  <span className="text-[22px] font-bold" style={{ color: '#F0EEF8' }}>{hours}</span>
                  <button onClick={() => setHours(hours + 1)}><Plus size={18} color="var(--accent-color)" /></button>
                </div>
              </div>
              <div>
                <p className="text-[13px] mb-2" style={{ color: '#9490B8' }}>Minutes</p>
                <div className="flex items-center justify-between rounded-[16px] px-3 py-3" style={{ backgroundColor: '#080616', border: '1px solid #1E1C30' }}>
                  <button onClick={() => adjustMinutes(-15)}><Minus size={18} color="var(--accent-color)" /></button>
                  <span className="text-[22px] font-bold" style={{ color: '#F0EEF8' }}>{minutes}</span>
                  <button onClick={() => adjustMinutes(15)}><Plus size={18} color="var(--accent-color)" /></button>
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleGenerate} className="w-full py-4 rounded-[18px] font-bold text-[16px]" style={{ backgroundColor: 'var(--accent-color)', color: '#F0EEF8' }}>Generate Plan →</button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between" style={{ backgroundColor: 'rgba(22, 25, 32, 0.96)', border: '1px solid #242830' }}>
          <button onClick={() => onNavigate('home')}><Home size={24} color="#8B909A" /></button>
          <button onClick={() => onNavigate('add')}><PlusCircle size={25} color="var(--accent-color)" /></button>
          <button onClick={() => onNavigate('schedule')}><Calendar size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('garden')}><Bell size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('profile')}><User size={25} color="#8B909A" /></button>
        </div>
      </div>
    </div>
  )
}