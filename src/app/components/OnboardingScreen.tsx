import { useState } from 'react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [userType, setUserType] = useState<'student' | 'working' | 'both'>('student');
  const [workTime, setWorkTime] = useState<'morning' | 'afternoon' | 'night'>('night');
  const [dailyTime, setDailyTime] = useState(2);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #1A1F36 0%, #2D2250 100%)',
      }}
    >
      <div className="max-w-[390px] mx-auto w-full px-6 py-12 flex-1 flex flex-col">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white opacity-30" />
          <div className="w-2 h-2 rounded-full bg-white opacity-30" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[26px] font-bold text-white mb-2">
            Let's set you up
          </h1>
          <p className="text-[15px]" style={{ color: '#C8C4E8' }}>
            This takes 30 seconds.
          </p>
        </div>

        {/* Setup Card */}
        <div
          className="rounded-[20px] p-6 mb-8 flex-1 flex flex-col"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
        >
          {/* Question 1 */}
          <div className="mb-8">
            <label className="block text-[15px] font-bold text-white mb-3">
              What describes you?
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setUserType('student')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: userType === 'student' ? '#FF6B4A' : 'transparent',
                  color: 'white',
                  border: userType === 'student' ? 'none' : '2px solid white',
                }}
              >
                Student
              </button>
              <button
                onClick={() => setUserType('working')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: userType === 'working' ? '#FF6B4A' : 'transparent',
                  color: 'white',
                  border: userType === 'working' ? 'none' : '2px solid white',
                }}
              >
                Working professional
              </button>
              <button
                onClick={() => setUserType('both')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: userType === 'both' ? '#FF6B4A' : 'transparent',
                  color: 'white',
                  border: userType === 'both' ? 'none' : '2px solid white',
                }}
              >
                Both
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="mb-8">
            <label className="block text-[15px] font-bold text-white mb-3">
              When do you work best?
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setWorkTime('morning')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: workTime === 'morning' ? '#FF6B4A' : 'transparent',
                  color: 'white',
                  border: workTime === 'morning' ? 'none' : '2px solid white',
                }}
              >
                Morning
              </button>
              <button
                onClick={() => setWorkTime('afternoon')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: workTime === 'afternoon' ? '#FF6B4A' : 'transparent',
                  color: 'white',
                  border: workTime === 'afternoon' ? 'none' : '2px solid white',
                }}
              >
                Afternoon
              </button>
              <button
                onClick={() => setWorkTime('night')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: workTime === 'night' ? '#FF6B4A' : 'transparent',
                  color: 'white',
                  border: workTime === 'night' ? 'none' : '2px solid white',
                }}
              >
                Night owl
              </button>
            </div>
          </div>

          {/* Question 3 */}
          <div className="flex-1">
            <label className="block text-[15px] font-bold text-white mb-3">
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
                  background: `linear-gradient(to right, #FF6B4A 0%, #FF6B4A ${((dailyTime - 0.5) / 3.5) * 100}%, rgba(255, 255, 255, 0.2) ${((dailyTime - 0.5) / 3.5) * 100}%, rgba(255, 255, 255, 0.2) 100%)`,
                }}
              />
              <div className="flex justify-between text-[13px] text-white opacity-70 mt-2">
                <span>30 min</span>
                <span>4+ hrs</span>
              </div>
              <div className="text-center mt-4">
                <span className="text-white font-bold text-[18px]">
                  {dailyTime} hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onComplete}
          className="w-full py-3.5 rounded-[14px] text-white font-bold text-[16px] shadow-lg"
          style={{ backgroundColor: '#FF6B4A' }}
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
          background: #FF6B4A;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FF6B4A;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
