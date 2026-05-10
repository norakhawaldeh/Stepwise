import { useState } from 'react';
import { ArrowLeft, Home, PlusCircle, Calendar, User, Minus, Plus } from 'lucide-react';

interface NewAddTaskScreenProps {
  onBuildPlan: () => void;
  onNavigate: (screen: string) => void;
}

export function NewAddTaskScreen({ onBuildPlan, onNavigate }: NewAddTaskScreenProps) {
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [timeMode, setTimeMode] = useState<'days' | 'date'>('days');
  const [days, setDays] = useState(3);
  const [dailyTime, setDailyTime] = useState('~2 hrs/day');
  const [preference, setPreference] = useState('Night owl');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF7' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full px-6 py-12 pb-24">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} color="#1A1F36" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[26px] font-bold mb-2" style={{ color: '#1A1F36' }}>
            New Task
          </h1>
          <p className="text-[15px]" style={{ color: '#666' }}>
            Tell it what you have to do.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[20px] p-6 mb-6 shadow-lg">
          {/* Task Input */}
          <div className="mb-5">
            <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
              What's the task?
            </label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. 10-page history essay"
              className="w-full px-4 py-3 border rounded-xl text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
              style={{ borderColor: '#E0E0E0' }}
            />
          </div>

          {/* Context Input */}
          <div className="mb-5">
            <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
              Extra context
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. needs 5 sources, haven't started"
              rows={3}
              className="w-full px-4 py-3 border rounded-xl text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
              style={{ borderColor: '#E0E0E0' }}
            />
          </div>

          {/* Time Section */}
          <div className="mb-5">
            <label className="block text-[13px] font-bold mb-3" style={{ color: '#1A1F36' }}>
              How long do you have?
            </label>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTimeMode('days')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: timeMode === 'days' ? '#FF6B4A' : 'transparent',
                  color: timeMode === 'days' ? 'white' : '#1A1F36',
                  border: `2px solid ${timeMode === 'days' ? '#FF6B4A' : '#D0D0D0'}`,
                }}
              >
                Days
              </button>
              <button
                onClick={() => setTimeMode('date')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: timeMode === 'date' ? '#FF6B4A' : 'transparent',
                  color: timeMode === 'date' ? 'white' : '#1A1F36',
                  border: `2px solid ${timeMode === 'date' ? '#FF6B4A' : '#D0D0D0'}`,
                }}
              >
                Pick a date
              </button>
            </div>

            {/* Days Counter */}
            {timeMode === 'days' && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setDays(Math.max(1, days - 1))}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: '#1A1F36' }}
                >
                  <Minus size={16} color="#1A1F36" />
                </button>
                <div className="w-20 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F0F0EC' }}>
                  <span className="text-[32px] font-bold" style={{ color: '#1A1F36' }}>
                    {days}
                  </span>
                </div>
                <button
                  onClick={() => setDays(days + 1)}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: '#1A1F36' }}
                >
                  <Plus size={16} color="#1A1F36" />
                </button>
              </div>
            )}
          </div>

          {/* Dropdowns */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
                Daily time
              </label>
              <select
                value={dailyTime}
                onChange={(e) => setDailyTime(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
                style={{ borderColor: '#E0E0E0' }}
              >
                <option>~1 hr/day</option>
                <option>~2 hrs/day</option>
                <option>~3 hrs/day</option>
                <option>~4+ hrs/day</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
                I am a...
              </label>
              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
                style={{ borderColor: '#E0E0E0' }}
              >
                <option>Morning person</option>
                <option>Night owl</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Build Plan Button */}
        <button
          onClick={onBuildPlan}
          className="w-full py-3.5 rounded-[14px] text-white font-bold text-[16px] shadow-lg relative overflow-hidden"
          style={{ backgroundColor: '#1A1F36' }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: '#FF6B4A' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: '0 4px 12px rgba(255, 107, 74, 0.3)' }}
          />
          Build my plan →
        </button>
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white flex items-center justify-around h-16 max-w-[390px] mx-auto w-full shadow-lg">
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <Home size={20} color="#999" />
          <span className="text-[11px]" style={{ color: '#999' }}>Home</span>
        </button>
        <button
          onClick={() => onNavigate('add')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <PlusCircle size={20} color="#FF6B4A" />
          <span className="text-[11px] font-medium" style={{ color: '#FF6B4A' }}>Add Task</span>
        </button>
        <button
          onClick={() => onNavigate('schedule')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <Calendar size={20} color="#999" />
          <span className="text-[11px]" style={{ color: '#999' }}>Schedule</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <User size={20} color="#999" />
          <span className="text-[11px]" style={{ color: '#999' }}>Profile</span>
        </button>
      </div>
    </div>
  );
}
