import { useState } from 'react';

interface DarkOnboardingScreenProps {
  onComplete: () => void;
}

export function DarkOnboardingScreen({ onComplete }: DarkOnboardingScreenProps) {
  const [userType, setUserType] = useState<'student' | 'professional' | 'both'>('student');
  const [workTime, setWorkTime] = useState<'morning' | 'afternoon' | 'night'>('night');
  const [dailyTime, setDailyTime] = useState(2);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[390px] mx-auto w-full px-6 py-12 flex-1 flex flex-col">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00E5A0' }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#242830' }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#242830' }} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[26px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
            Let's set you up
          </h1>
          <p className="text-[15px]" style={{ color: '#8B909A' }}>
            This takes 30 seconds.
          </p>
        </div>

        {/* Setup Card */}
        <div
          className="rounded-[20px] p-6 mb-8 flex-1 flex flex-col"
          style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
        >
          {/* Question 1 */}
          <div className="mb-8">
            <label className="block text-[15px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              What describes you?
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setUserType('student')}
                className="flex-1 py-2.5 px-3 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: userType === 'student' ? '#00E5A0' : 'transparent',
                  color: userType === 'student' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${userType === 'student' ? '#00E5A0' : '#242830'}`,
                }}
              >
                Student
              </button>
              <button
                onClick={() => setUserType('professional')}
                className="flex-1 py-2.5 px-3 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: userType === 'professional' ? '#00E5A0' : 'transparent',
                  color: userType === 'professional' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${userType === 'professional' ? '#00E5A0' : '#242830'}`,
                }}
              >
                Professional
              </button>
              <button
                onClick={() => setUserType('both')}
                className="flex-1 py-2.5 px-3 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: userType === 'both' ? '#00E5A0' : 'transparent',
                  color: userType === 'both' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${userType === 'both' ? '#00E5A0' : '#242830'}`,
                }}
              >
                Both
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-8">
            <label className="block text-[15px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              When do you work best?
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setWorkTime('morning')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: workTime === 'morning' ? '#00E5A0' : 'transparent',
                  color: workTime === 'morning' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${workTime === 'morning' ? '#00E5A0' : '#242830'}`,
                }}
              >
                Morning
              </button>
              <button
                onClick={() => setWorkTime('afternoon')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: workTime === 'afternoon' ? '#00E5A0' : 'transparent',
                  color: workTime === 'afternoon' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${workTime === 'afternoon' ? '#00E5A0' : '#242830'}`,
                }}
              >
                Afternoon
              </button>
              <button
                onClick={() => setWorkTime('night')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: workTime === 'night' ? '#00E5A0' : 'transparent',
                  color: workTime === 'night' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${workTime === 'night' ? '#00E5A0' : '#242830'}`,
                }}
              >
                Night owl
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="flex-1">
            <label className="block text-[15px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              Daily time available?
            </label>
            <div className="relative">
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.5"
                value={dailyTime}
                onChange={(e) => setDailyTime(parseFloat(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #00E5A0 0%, #00E5A0 ${((dailyTime - 0.5) / 3.5) * 100}%, #242830 ${((dailyTime - 0.5) / 3.5) * 100}%, #242830 100%)`,
                }}
              />
              <div className="text-center mt-4">
                <span className="font-bold text-[18px]" style={{ color: '#F0F2F5' }}>
                  {dailyTime} hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onComplete}
          className="w-full py-3.5 rounded-[14px] font-bold text-[16px]"
          style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
        >
          Let's go →
        </button>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00E5A0;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00E5A0;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
