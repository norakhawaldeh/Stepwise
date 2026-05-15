import { useState } from 'react'
import { ChevronLeft, HelpCircle, MessageSquare, Bug, Lightbulb, Send } from 'lucide-react'
import { supabase } from '../../supabaseClient'

interface HelpFeedbackScreenProps {
  onNavigate: (screen: string) => void
}

export function HelpFeedbackScreen({ onNavigate }: HelpFeedbackScreenProps) {
  const [feedbackType, setFeedbackType] = useState('General')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
  if (!message.trim()) return

  setSent(false)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from('feedback').insert([
    {
      user_id: user?.id,
      email: user?.email,
      type: feedbackType,
      message: message.trim(),
    },
  ])

  if (error) {
    console.error(error)
    alert('Feedback could not be sent. Please try again.')
    return
  }

  setSent(true)
  setMessage('')
}
const currentAccentColor =
  localStorage.getItem('stepwise-accent-color') || '#3B82F6'
  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, color-mix(in srgb, var(--accent-color) 8%, transparent), transparent 35%), var(--bg-primary)',
      }}
    >
      <div className="max-w-[430px] mx-auto w-full h-screen flex flex-col relative">
        <div className="px-5 pt-8 pb-6 flex items-center justify-between border-b" style={{ borderColor: '#242830' }}>
          <button
            onClick={() => onNavigate('profile')}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            <ChevronLeft size={24} color="#F0F2F5" />
          </button>

          <h1 className="text-[20px] font-bold" style={{ color: '#F0F2F5' }}>
            Help & Feedback
          </h1>

          <div className="w-11" />
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-8 pb-32">
          <div className="rounded-[24px] p-5 mb-10 border"
            style={{
                backgroundColor: '#161920',
                borderColor: '#242830',
            }}
            >
  <div className="flex items-center gap-4 mb-3">
    <div
      className="w-14 h-14 rounded-[18px] flex items-center justify-center flex-shrink-0"
      style={{
        backgroundColor: `${currentAccentColor}20`,
      }}
    >
      <HelpCircle size={28} color={currentAccentColor} />
    </div>

    <h2
      className="text-[20px] font-bold"
      style={{ color: '#F0F2F5' }}
    >
      Need help?
    </h2>
  </div>

  <p
    className="text-[12px] leading-5"
    style={{ color: '#A0A5B0' }}
  >
    Send feedback, report bugs, or tell us what would make Stepwise better.
  </p>
</div>

          <p className="text-[11px] font-bold tracking-widest mb-3 uppercase" style={{ color: '#8B909A' }}>
            Feedback type
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'General', icon: MessageSquare },
              { label: 'Bug', icon: Bug },
              { label: 'Idea', icon: Lightbulb },
            ].map((item) => {
              const Icon = item.icon
              const active = feedbackType === item.label

              return (
                <button
                  key={item.label}
                  onClick={() => setFeedbackType(item.label)}
                  className="rounded-[18px] p-4 flex flex-col items-center gap-2 border"
                  style={{
                    backgroundColor: active
                      ? 'color-mix(in srgb, var(--accent-color) 16%, transparent)'
                      : '#161920',
                    borderColor: active ? 'var(--accent-color)' : '#242830',
                  }}
                >
                  <Icon size={22} color={active ? 'var(--accent-color)' : '#A0A5B0'} />

                  <span
                    className="text-[12px] font-bold"
                    style={{ color: active ? 'var(--accent-color)' : '#A0A5B0' }}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="text-[11px] font-bold tracking-widest mb-3 uppercase" style={{ color: '#8B909A' }}>
            Message
          </p>

          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setSent(false)
            }}
            placeholder="Write your feedback here..."
            className="w-full min-h-[170px] rounded-[20px] p-4 border outline-none resize-none text-[14px]"
            style={{
              backgroundColor: '#161920',
              borderColor: '#242830',
              color: '#F0F2F5',
            }}
          />

          {sent && (
            <p className="text-[13px] mt-3 font-semibold" style={{ color: 'var(--accent-color)' }}>
              Thanks — your feedback was saved.
            </p>
          )}

          <button
            onClick={handleSend}
            className="w-full mt-5 py-4 rounded-[18px] font-bold flex items-center justify-center gap-2"
            style={{
              backgroundColor: message.trim() ? 'var(--accent-color)' : '#20242D',
              color: message.trim() ? '#0D0F14' : '#8B909A',
            }}
          >
            <Send size={18} />
            Send Feedback
          </button>
        </div>
      </div>
    </div>
  )
}