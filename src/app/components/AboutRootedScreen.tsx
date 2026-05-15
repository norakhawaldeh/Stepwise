import { ChevronLeft, Sparkles, Brain, CalendarDays, Shield } from 'lucide-react'

interface AboutRootedScreenProps {
  onNavigate: (screen: string) => void
}

export function AboutRootedScreen({
  onNavigate,
}: AboutRootedScreenProps) {
  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(0, 229, 160, 0.08), transparent 35%), #0D0F14',
      }}
    >
      {/* Header */}
      <div
        className="px-5 pt-8 pb-6 flex items-center justify-between border-b"
        style={{ borderColor: '#242830' }}
      >
        <button
          onClick={() => onNavigate('profile')}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: '#161920',
            border: '1px solid #242830',
          }}
        >
          <ChevronLeft size={24} color="#F0F2F5" />
        </button>

        <h1
          className="text-[20px] font-bold"
          style={{ color: '#F0F2F5' }}
        >
          About Rooted
        </h1>

        <div className="w-11" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8 pb-32">

        {/* App Card */}
        <div
          className="rounded-[28px] p-6 border mb-6"
          style={{
            backgroundColor: '#161920',
            borderColor: '#242830',
          }}
        >
          <div className="flex items-center gap-4 mb-5">
            <div
              className="w-16 h-16 rounded-[22px] flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(204, 253, 222, 0.12)',
              }}
            >
              <Sparkles size={32} color="var(--accent-color)" />
            </div>

            <div>
              <h2
                className="text-[24px] font-bold"
                style={{ color: '#F0F2F5' }}
              >
                Rooted
              </h2>

              <p
                className="text-[13px]"
                style={{ color: '#A0A5B0' }}
              >
                Version 1.0.0
              </p>
            </div>
          </div>

          <p
            className="text-[14px] leading-7"
            style={{ color: '#D3D7DF' }}
          >
            Rooted helps students stop procrastinating by turning overwhelming assignments into manageable daily steps.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">

          {/* Feature 1 */}
          <div
            className="rounded-[22px] p-5 border flex items-start gap-4"
            style={{
              backgroundColor: '#161920',
              borderColor: '#242830',
            }}
          >
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(204, 253, 222, 0.12)',
              }}
            >
              <Brain size={22} color="var(--accent-color)" />
            </div>

            <div>
              <h3
                className="text-[15px] font-bold mb-1"
                style={{ color: '#F0F2F5' }}
              >
                AI Planning
              </h3>

              <p
                className="text-[13px] leading-6"
                style={{ color: '#A0A5B0' }}
              >
                Break assignments into realistic step-by-step study plans.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div
            className="rounded-[22px] p-5 border flex items-start gap-4"
            style={{
              backgroundColor: '#161920',
              borderColor: '#242830',
            }}
          >
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(204, 253, 222, 0.12)',
              }}
            >
              <CalendarDays size={22} color="var(--accent-color)" />
            </div>

            <div>
              <h3
                className="text-[15px] font-bold mb-1"
                style={{ color: '#F0F2F5' }}
              >
                Daily Scheduling
              </h3>

              <p
                className="text-[13px] leading-6"
                style={{ color: '#A0A5B0' }}
              >
                Stay organized with clear daily tasks and deadlines.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div
            className="rounded-[22px] p-5 border flex items-start gap-4"
            style={{
              backgroundColor: '#161920',
              borderColor: '#242830',
            }}
          >
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(204, 253, 222, 0.12)',
              }}
            >
              <Shield size={22} color="var(--accent-color)" />
            </div>

            <div>
              <h3
                className="text-[15px] font-bold mb-1"
                style={{ color: '#F0F2F5' }}
              >
                Built for Students
              </h3>

              <p
                className="text-[13px] leading-6"
                style={{ color: '#A0A5B0' }}
              >
                Designed to reduce stress and make productivity feel manageable.
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mb-8">
          <p
            className="text-[16px] italic"
            style={{ color: '#D3D7DF' }}
          >
            “Small steps every day.”
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p
            className="text-[12px]"
            style={{ color: '#6B7280' }}
          >
            Created with ❤️ for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}