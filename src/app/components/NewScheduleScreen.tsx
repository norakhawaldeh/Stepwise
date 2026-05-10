import { Home, PlusCircle, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface NewScheduleScreenProps {
  onNavigate: (screen: string) => void;
}

export function NewScheduleScreen({ onNavigate }: NewScheduleScreenProps) {
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
      color: '#F59E0B'
    },
    { time: '2:00 PM', task: null, duration: null, color: null },
    {
      time: '3:00 PM',
      task: 'Reading Response · Final edits',
      duration: '20 min · Stepwise planned',
      color: '#10B981'
    },
    {
      time: '5:00 PM',
      task: 'History Essay · Write section 2',
      duration: '60 min · Stepwise planned',
      color: '#FF6B4A'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF7' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full pb-20">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <h1 className="text-[26px] font-bold" style={{ color: '#1A1F36' }}>
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
                <span className="text-[11px] mb-1" style={{ color: '#999' }}>
                  {day.abbr}
                </span>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: day.isToday ? '#FF6B4A' : 'transparent',
                    color: day.isToday ? 'white' : '#1A1F36',
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
              <ChevronLeft size={16} color="#999" />
            </button>
            <span className="text-[13px]" style={{ color: '#999' }}>
              May 2026
            </span>
            <button>
              <ChevronRight size={16} color="#999" />
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-6">
            <button
              className="px-4 py-2 rounded-full text-[13px] font-medium"
              style={{ backgroundColor: '#FF6B4A', color: 'white' }}
            >
              All Tasks
            </button>
            <button
              className="px-4 py-2 rounded-full text-[13px] font-medium border"
              style={{ borderColor: '#D0D0D0', color: '#999' }}
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
                <div className="w-16 flex-shrink-0 pt-1">
                  <span className="text-[12px]" style={{ color: '#999' }}>
                    {item.time}
                  </span>
                </div>

                {/* Task Pill or Empty */}
                <div className="flex-1">
                  {item.task ? (
                    <div
                      className="rounded-xl p-3 relative overflow-hidden"
                      style={{ backgroundColor: '#1A1F36' }}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: item.color }}
                      />
                      <h4 className="text-[14px] font-bold mb-1 text-white pl-2">
                        {item.task}
                      </h4>
                      <p className="text-[12px] pl-2" style={{ color: '#C8C4E8' }}>
                        {item.duration}
                      </p>
                    </div>
                  ) : (
                    <div className="h-12 border-l-2 border-dashed" style={{ borderColor: '#E0E0E0' }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
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
          <PlusCircle size={20} color="#999" />
          <span className="text-[11px]" style={{ color: '#999' }}>Add Task</span>
        </button>
        <button
          onClick={() => onNavigate('schedule')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <Calendar size={20} color="#FF6B4A" />
          <span className="text-[11px] font-medium" style={{ color: '#FF6B4A' }}>Schedule</span>
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
