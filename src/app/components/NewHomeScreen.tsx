import { Home, PlusCircle, Calendar, User, ChevronRight } from 'lucide-react';

interface NewHomeScreenProps {
  onNavigate: (screen: string) => void;
  onTaskClick: (taskId: string) => void;
}

export function NewHomeScreen({ onNavigate, onTaskClick }: NewHomeScreenProps) {
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
      color: '#F59E0B'
    },
    {
      id: '3',
      title: 'Final edits',
      time: '20 min',
      progress: 80,
      project: 'Reading Response',
      color: '#10B981'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF7' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full pb-20">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-[26px] font-bold" style={{ color: '#1A1F36' }}>
              Stepwise
            </h1>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1A1F36' }}>
              <span className="text-[16px] font-semibold text-white">N</span>
            </div>
          </div>
          <p className="text-[13px]" style={{ color: '#999' }}>
            Sunday, May 10
          </p>
        </div>

        {/* Hero Focus Card */}
        <div className="px-6 mb-6">
          <div
            className="rounded-[20px] p-6 relative"
            style={{
              background: 'linear-gradient(135deg, #1A1F36 0%, #2D2250 100%)',
            }}
          >
            <div className="text-[11px] font-semibold mb-3 tracking-wider" style={{ color: '#FF6B4A' }}>
              TODAY'S FOCUS
            </div>
            <h2 className="text-[22px] font-bold text-white mb-3 leading-tight">
              Write your essay intro — just open a blank doc and start.
            </h2>
            <div className="flex items-center justify-between">
              <div className="px-3 py-1.5 rounded-lg text-[13px] text-white" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
                History Essay · 45 min
              </div>
              <button
                onClick={() => onTaskClick('1')}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FF6B4A' }}
              >
                <ChevronRight size={18} color="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Today's Tasks Section */}
        <div className="px-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] font-bold" style={{ color: '#1A1F36' }}>
              Today's Tasks
            </h3>
            <span className="text-[13px]" style={{ color: '#999' }}>
              May 10
            </span>
          </div>

          {/* Task Cards */}
          <div className="space-y-3 mb-6">
            {todaysTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                className="w-full bg-white rounded-[20px] p-4 text-left shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: task.color }}
                    />
                    <span className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
                      {task.title}
                    </span>
                  </div>
                  <span className="text-[13px]" style={{ color: '#999' }}>
                    {task.time}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 rounded-full mb-2" style={{ backgroundColor: '#F0F0EC' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      backgroundColor: task.color,
                      width: `${task.progress}%`
                    }}
                  />
                </div>

                {/* Project Label */}
                <p className="text-[12px]" style={{ color: '#999' }}>
                  {task.project}
                </p>
              </button>
            ))}
          </div>

          {/* View Full Plan */}
          <button
            onClick={() => onNavigate('schedule')}
            className="w-full py-3 rounded-full text-[14px] font-medium transition-all hover:shadow-md"
            style={{ backgroundColor: '#F0F0EC', color: '#1A1F36' }}
          >
            View full plan →
          </button>
        </div>

        {/* Bottom spacer for tab bar */}
        <div className="h-4" />
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white flex items-center justify-around h-16 max-w-[390px] mx-auto w-full shadow-lg">
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <Home size={20} color="#FF6B4A" />
          <span className="text-[11px] font-medium" style={{ color: '#FF6B4A' }}>Home</span>
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
