import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconTabBar } from './IconTabBar';

interface DarkScheduleScreenProps {
  onNavigate: (screen: string) => void;
}

export function DarkScheduleScreen({ onNavigate }: DarkScheduleScreenProps) {
  const days = [
    { abbr: 'Mon', date: 6, isToday: false },
    { abbr: 'Tue', date: 7, isToday: false },
    { abbr: 'Wed', date: 8, isToday: false },
    { abbr: 'Thu', date: 9, isToday: false },
    { abbr: 'Fri', date: 10, isToday: false },
    { abbr: 'Sat', date: 11, isToday: false },
    { abbr: 'Sun', date: 12, isToday: true },
  ];

  const schedule = [
    {
      time: '9:00 AM',
      task: 'History Essay · Write intro + section 1',
      duration: '45 min · Stepwise planned',
      color: '#FF6B4A'
    },
    {
      time: '11:00 AM',
      task: 'Math Problem Set · Questions 1–10',
      duration: '30 min · Stepwise planned',
      color: '#FFAA5A'
    },
    { time: '2:00 PM', task: null, duration: null, color: null },
    {
      time: '3:00 PM',
      task: 'Reading Response · Final edits',
      duration: '20 min · Stepwise planned',
      color: '#00E5A0'
    },
    {
      time: '5:00 PM',
      task: 'History Essay · Write section 2',
      duration: '60 min · Stepwise planned',
      color: '#FF6B4A'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D0F14' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full pb-20">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <h1 className="text-[26px] font-bold" style={{ color: '#F0F2F5' }}>
            Schedule
          </h1>
        </div>

        {/* Week Strip */}
        <div className="px-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            {days.map((day, idx) => (
              <button
                key={idx}
                className="flex flex-col items-center gap-1 flex-1"
              >
                <span className="text-[11px] mb-1" style={{ color: '#8B909A' }}>
                  {day.abbr}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: day.isToday ? '#00E5A0' : 'transparent',
                    color: day.isToday ? '#0D0F14' : '#F0F2F5',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  {day.date}
                </div>
              </button>
            ))}
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button>
              <ChevronLeft size={16} color="#8B909A" />
            </button>
            <span className="text-[13px]" style={{ color: '#8B909A' }}>
              May 2026
            </span>
            <button>
              <ChevronRight size={16} color="#8B909A" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-6">
            <button
              className="px-4 py-2 rounded-full text-[13px] font-medium"
              style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
            >
              All Tasks
            </button>
            <button
              className="px-4 py-2 rounded-full text-[13px] font-medium"
              style={{ backgroundColor: '#161920', border: '1px solid #242830', color: '#8B909A' }}
            >
              Due Today
            </button>
          </div>
        </div>

        {/* Schedule List */}
        <div className="px-6">
          <div className="space-y-4">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                {/* Time */}
                <div className="w-14 flex-shrink-0 pt-1">
                  <span className="text-[12px]" style={{ color: '#8B909A' }}>
                    {item.time}
                  </span>
                </div>

                {/* Task Pill or Empty */}
                <div className="flex-1">
                  {item.task ? (
                    <div
                      className="rounded-xl p-3 relative overflow-hidden"
                      style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: item.color }}
                      />
                      <h4 className="text-[14px] font-bold mb-1 pl-2" style={{ color: '#F0F2F5' }}>
                        {item.task}
                      </h4>
                      <p className="text-[12px] pl-2" style={{ color: '#8B909A' }}>
                        {item.duration}
                      </p>
                    </div>
                  ) : (
                    <div className="h-12 border-l-2 border-dashed" style={{ borderColor: '#242830' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <IconTabBar activeTab="schedule" onNavigate={onNavigate} />
    </div>
  );
}
