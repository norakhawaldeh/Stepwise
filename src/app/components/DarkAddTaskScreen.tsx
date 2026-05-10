import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ChevronDown } from 'lucide-react';
import { IconTabBar } from './IconTabBar';

interface DarkAddTaskScreenProps {
  onBuildPlan: () => void;
  onNavigate: (screen: string) => void;
}

export function DarkAddTaskScreen({ onBuildPlan, onNavigate }: DarkAddTaskScreenProps) {
  const [task, setTask] = useState('');
  const [timeMode, setTimeMode] = useState<'days' | 'date'>('days');
  const [days, setDays] = useState(3);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D0F14' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full px-6 py-12 pb-24">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} color="#00E5A0" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[26px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
            New Task
          </h1>
          <p className="text-[15px]" style={{ color: '#8B909A' }}>
            Two things. That's all we need.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-[20px] p-6 mb-6"
          style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
        >
          {/* Task Input */}
          <div className="mb-6">
            <label className="block text-[16px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              What's the task?
            </label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. history essay, math homework"
              className="w-full px-4 py-4 border rounded-xl text-[16px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />
          </div>

          {/* Time Section */}
          <div>
            <label className="block text-[16px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
              When does it need to be done?
            </label>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-5">
              <button
                onClick={() => setTimeMode('days')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: timeMode === 'days' ? '#00E5A0' : 'transparent',
                  color: timeMode === 'days' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${timeMode === 'days' ? '#00E5A0' : '#242830'}`,
                }}
              >
                In X days
              </button>
              <button
                onClick={() => setTimeMode('date')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: timeMode === 'date' ? '#00E5A0' : 'transparent',
                  color: timeMode === 'date' ? '#0D0F14' : '#8B909A',
                  border: `1px solid ${timeMode === 'date' ? '#00E5A0' : '#242830'}`,
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
                  className="w-12 h-12 rounded-full border flex items-center justify-center"
                  style={{ borderColor: '#242830' }}
                >
                  <Minus size={18} color="#00E5A0" />
                </button>
                <div className="flex items-center justify-center">
                  <span className="text-[28px] font-bold" style={{ color: '#F0F2F5' }}>
                    {days}
                  </span>
                </div>
                <button
                  onClick={() => setDays(days + 1)}
                  className="w-12 h-12 rounded-full border flex items-center justify-center"
                  style={{ borderColor: '#242830' }}
                >
                  <Plus size={18} color="#00E5A0" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* More Options Collapsible */}
        <button
          onClick={() => setShowMoreOptions(!showMoreOptions)}
          className="w-full py-3 rounded-xl mb-4 flex items-center justify-center gap-2 transition-all"
          style={{ backgroundColor: '#161920' }}
        >
          <span className="text-[13px]" style={{ color: '#8B909A' }}>⚙ More options</span>
          <ChevronDown
            size={14}
            color="#8B909A"
            style={{ transform: showMoreOptions ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          />
        </button>

        {/* Expanded Options */}
        {showMoreOptions && (
          <div
            className="rounded-[20px] p-6 mb-6"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            {/* Daily Availability */}
            <div className="mb-5">
              <label className="block text-[13px] uppercase tracking-wide mb-2" style={{ color: '#8B909A' }}>
                Daily availability
              </label>
              <select
                defaultValue="2 hrs"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
              >
                <option>1 hr</option>
                <option>2 hrs</option>
                <option>3 hrs</option>
                <option>4+ hrs</option>
              </select>
            </div>

            {/* Work Best */}
            <div className="mb-5">
              <label className="block text-[13px] uppercase tracking-wide mb-2" style={{ color: '#8B909A' }}>
                I work best
              </label>
              <select
                defaultValue="Night"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
              >
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Night</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-[13px] uppercase tracking-wide mb-3" style={{ color: '#8B909A' }}>
                Priority
              </label>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#8B909A',
                    border: '1px solid #242830',
                  }}
                >
                  Low
                </button>
                <button
                  className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#8B909A',
                    border: '1px solid #242830',
                  }}
                >
                  Medium
                </button>
                <button
                  className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                  style={{
                    backgroundColor: '#FF6B4A',
                    color: '#0D0F14',
                    border: '1px solid #FF6B4A',
                  }}
                >
                  High
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Build Plan Button */}
        <button
          onClick={onBuildPlan}
          className="w-full py-3.5 rounded-[14px] font-bold text-[16px]"
          style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
        >
          Build my plan →
        </button>
      </div>

      {/* Tab Bar */}
      <IconTabBar activeTab="add" onNavigate={onNavigate} />
    </div>
  );
}
