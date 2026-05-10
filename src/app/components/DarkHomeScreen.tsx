import { ChevronRight } from 'lucide-react';
import { IconTabBar } from './IconTabBar';

interface DarkHomeScreenProps {
  onNavigate: (screen: string) => void;
  onTaskClick: (taskId: string) => void;
}

export function DarkHomeScreen({ onNavigate, onTaskClick }: DarkHomeScreenProps) {
  const todaysTasks = [
    {
      id: '1',
      title: 'Write essay intro',
      time: '45 min',
      progress: 0,
      project: 'History Essay',
      color: '#FF6B4A'
    },
    {
      id: '2',
      title: 'Complete questions 1–5',
      time: '30 min',
      progress: 50,
      project: 'Math Problem Set',
      color: '#FFAA5A'
    },
    {
      id: '3',
      title: 'Final edits',
      time: '20 min',
      progress: 80,
      project: 'Reading Response',
      color: '#00E5A0'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D0F14' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full pb-20">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-[26px] font-bold" style={{ color: '#F0F2F5' }}>
              Stepwise
            </h1>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#0D0F14', border: '2px solid #242830' }}
            >
              <span className="text-[16px] font-semibold" style={{ color: '#00E5A0' }}>N</span>
            </div>
          </div>
          <p className="text-[13px]" style={{ color: '#8B909A' }}>
            Sunday, May 10
          </p>
        </div>

        {/* Hero Focus Card */}
        <div className="px-6 mb-6">
          <div
            className="rounded-[20px] p-6 relative overflow-hidden"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            {/* Subtle teal left border glow */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{
                background: 'linear-gradient(180deg, #00E5A0 0%, rgba(0, 229, 160, 0.3) 100%)',
                boxShadow: '0 0 12px rgba(0, 229, 160, 0.4)',
              }}
            />
            <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: '#00E5A0' }}>
              TODAY'S FOCUS
            </div>
            <h2 className="text-[22px] font-bold mb-3 leading-tight" style={{ color: '#F0F2F5' }}>
              Write your essay intro — just open a blank doc and start.
            </h2>
            <div className="flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-lg text-[13px]" style={{ backgroundColor: '#242830', color: '#8B909A' }}>
                History Essay · 45 min
              </div>
              <button
                onClick={() => onTaskClick('1')}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#00E5A0' }}
              >
                <ChevronRight size={18} color="#0D0F14" />
              </button>
            </div>
          </div>
        </div>

        {/* Today's Tasks Section */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold" style={{ color: '#F0F2F5' }}>
              Today's Tasks
            </h3>
            <span className="text-[13px]" style={{ color: '#8B909A' }}>
              May 10
            </span>
          </div>

          {/* Task Cards */}
          <div className="space-y-3 mb-6">
            {todaysTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                className="w-full rounded-[20px] p-4 text-left transition-all hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: task.color }}
                    />
                    <span className="text-[15px] font-bold" style={{ color: '#F0F2F5' }}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[13px]" style={{ color: '#8B909A' }}>
                    {task.time}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 rounded-full mb-2" style={{ backgroundColor: '#242830' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      backgroundColor: task.color,
                      width: `${task.progress}%`
                    }}
                  />
                </div>

                {/* Project Label */}
                <p className="text-[12px]" style={{ color: '#8B909A' }}>
                  {task.project}
                </p>
              </button>
            ))}
          </div>

          {/* View Full Plan */}
          <button
            onClick={() => onNavigate('schedule')}
            className="w-full py-3 rounded-full text-[14px] font-medium transition-all"
            style={{ backgroundColor: '#161920', border: '1px solid #242830', color: '#F0F2F5' }}
          >
            View full plan →
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      <IconTabBar activeTab="home" onNavigate={onNavigate} />
    </div>
  );
}
