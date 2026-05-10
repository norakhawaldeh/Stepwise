import { Home, PlusCircle, Calendar, User, ChevronRight, ChevronDown } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  onTaskClick: (taskId: string) => void;
}

export function HomeScreen({ onNavigate, onTaskClick }: HomeScreenProps) {
  const tasks = [
    {
      id: '1',
      title: 'History Essay',
      progress: 1,
      total: 6,
      stepsLeft: 6,
      dueIn: 2,
      color: '#EF4444',
      urgency: 'urgent'
    },
    {
      id: '2',
      title: 'Math Problem Set',
      progress: 3,
      total: 5,
      stepsLeft: 2,
      dueIn: 4,
      color: '#F59E0B',
      urgency: 'medium'
    },
    {
      id: '3',
      title: 'Reading Response',
      progress: 4,
      total: 5,
      stepsLeft: 1,
      dueIn: 6,
      color: '#10B981',
      urgency: 'low'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EAF4FB' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[22px] font-bold" style={{ color: '#333' }}>
              Good evening, Nora 👋
            </h1>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D6ECFA' }}>
              <span className="text-[16px] font-semibold" style={{ color: '#3A8DC7' }}>N</span>
            </div>
          </div>
        </div>

        {/* Hero Card */}
        <div className="px-6 mb-6">
          <div
            className="rounded-2xl p-5 relative"
            style={{
              background: 'linear-gradient(135deg, #D6ECFA 0%, #EAF4FB 100%)',
            }}
          >
            <div className="text-[11px] font-semibold mb-2 tracking-wider" style={{ color: '#3A8DC7' }}>
              FOCUS RIGHT NOW
            </div>
            <h2 className="text-[18px] font-bold mb-3 leading-tight" style={{ color: '#1a1a1a' }}>
              Write your essay intro — just open a blank doc and start.
            </h2>
            <div className="flex items-center justify-between">
              <span className="inline-block px-2.5 py-1 rounded-md text-[12px]" style={{ backgroundColor: '#E8E8E8', color: '#666' }}>
                History Essay · due in 2 days
              </span>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3A8DC7' }}>
                <ChevronRight size={16} color="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Tasks Section */}
        <div className="px-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-bold" style={{ color: '#333' }}>
              Active Tasks
            </h3>
            <span className="text-[14px]" style={{ color: '#999' }}>
              3 tasks
            </span>
          </div>

          {/* Task Cards */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onTaskClick(task.id)}
                className="w-full bg-white rounded-xl p-3 border-l-4 text-left transition-all hover:shadow-md active:scale-[0.98]"
                style={{ borderLeftColor: task.color }}
              >
                <h4 className="text-[15px] font-bold mb-2" style={{ color: '#333' }}>
                  {task.title}
                </h4>

                {/* Progress Bar */}
                <div className="h-1.5 rounded-full mb-2" style={{ backgroundColor: '#F0F0F0' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      backgroundColor: '#3A8DC7',
                      width: `${(task.progress / task.total) * 100}%`
                    }}
                  />
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[12px]" style={{ color: '#999' }}>
                    {task.stepsLeft} steps left
                  </span>
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: task.color }}
                  >
                    Due in {task.dueIn} days
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Completed Section */}
        <div className="px-6 mb-6">
          <button className="w-full rounded-lg p-3 flex items-center justify-center gap-2 hover:opacity-70 transition-opacity" style={{ backgroundColor: '#F4F4F4' }}>
            <span className="text-[13px]" style={{ color: '#999' }}>
              ✓ 2 tasks completed this week
            </span>
            <ChevronDown size={14} color="#999" />
          </button>
        </div>

        {/* Bottom spacer for tab bar */}
        <div className="h-20" />
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around h-16 max-w-[390px] mx-auto w-full" style={{ borderColor: '#E0E0E0' }}>
        <button
          onClick={() => onNavigate('home')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <Home size={20} color="#3A8DC7" />
          <span className="text-[11px] font-medium" style={{ color: '#3A8DC7' }}>Home</span>
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
