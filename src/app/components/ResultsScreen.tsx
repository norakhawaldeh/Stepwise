import { useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface ResultsScreenProps {
  onStartOver: () => void;
  onNavigate?: (screen: string) => void;
}

export function ResultsScreen({ onStartOver, onNavigate }: ResultsScreenProps) {
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (taskId: string) => {
    const newChecked = new Set(checkedTasks);
    if (newChecked.has(taskId)) {
      newChecked.delete(taskId);
    } else {
      newChecked.add(taskId);
    }
    setCheckedTasks(newChecked);
  };

  const tasks = [
    { id: '1', day: 'Today', title: 'Research & outline', tasks: [
      { id: '1-1', name: 'Find and skim 3 sources', time: '30 min' },
      { id: '1-2', name: 'Write your essay outline', time: '60 min' },
    ], total: '1h 30m' },
    { id: '2', day: 'Day 2', title: 'Writing', tasks: [
      { id: '2-1', name: 'Write intro + section 1', time: '45 min' },
      { id: '2-2', name: 'Write section 2 + 3', time: '60 min' },
    ], total: '1h 45m' },
    { id: '3', day: 'Day 3', title: 'Polish', tasks: [
      { id: '3-1', name: 'Edit and proofread', time: '30 min' },
      { id: '3-2', name: 'Format and submit', time: '20 min' },
    ], total: '50m' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EAF4FB' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full px-6 py-8 pb-24">
        {/* Back Button */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={20} color="#666" />
            <span className="text-[14px]" style={{ color: '#666' }}>Back to Home</span>
          </button>
        )}

        {/* Action Card */}
        <div className="rounded-2xl p-5 mb-6 shadow-sm" style={{ backgroundColor: '#D6ECFA' }}>
          <div className="text-[11px] font-semibold mb-2 tracking-wider" style={{ color: '#3A8DC7' }}>
            DO THIS RIGHT NOW
          </div>
          <h2 className="text-[20px] font-bold mb-2 leading-tight" style={{ color: '#1a1a1a' }}>
            Open a blank doc and write your essay title and three bullet points for your argument.
          </h2>
          <p className="text-[14px] italic" style={{ color: '#666' }}>
            Starting with structure beats starting with research.
          </p>
        </div>

        {/* Urgency Meter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[14px] font-medium" style={{ color: '#333' }}>
              Urgency Level
            </span>
            <span className="px-3 py-1 rounded-full text-[13px] font-medium" style={{ backgroundColor: '#FFA726', color: 'white' }}>
              Get moving
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E0E0E0' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ backgroundColor: '#FFA726', width: '55%' }}
            />
          </div>
        </div>

        {/* Plan Card */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <h3 className="text-[16px] font-bold mb-4" style={{ color: '#333' }}>
            3-day plan
          </h3>

          {tasks.map((daySection, idx) => (
            <div key={daySection.id} className={idx < tasks.length - 1 ? 'mb-5 pb-5 border-b' : 'mb-4'} style={{ borderColor: '#F0F0F0' }}>
              {/* Day Header */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-[15px] font-semibold" style={{ color: '#333' }}>
                  {daySection.day} — {daySection.title}
                </span>
                <span className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ backgroundColor: '#E8E8E8', color: '#555' }}>
                  {daySection.total}
                </span>
              </div>

              {/* Tasks */}
              {daySection.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 mb-3 cursor-pointer group"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                      style={{
                        borderColor: checkedTasks.has(task.id) ? '#3A8DC7' : '#D0D0D0',
                        backgroundColor: checkedTasks.has(task.id) ? '#3A8DC7' : 'transparent',
                      }}
                    >
                      {checkedTasks.has(task.id) && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-[14px] mb-1 transition-all"
                      style={{
                        color: checkedTasks.has(task.id) ? '#999' : '#333',
                        textDecoration: checkedTasks.has(task.id) ? 'line-through' : 'none',
                      }}
                    >
                      {task.name}
                    </div>
                    <div className="text-[12px]" style={{ color: '#999' }}>
                      {task.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Tip Box */}
          <div className="rounded-lg p-4" style={{ backgroundColor: '#F0F8FF' }}>
            <div className="flex gap-2">
              <span className="flex-shrink-0">💡</span>
              <p className="text-[13px] leading-relaxed" style={{ color: '#555' }}>
                Write in 25-minute focused sprints with 5-minute breaks — your brain works better this way.
              </p>
            </div>
          </div>
        </div>

        {/* Start Over Link */}
        <button
          onClick={onStartOver}
          className="text-[14px] underline mx-auto block hover:opacity-70 transition-opacity"
          style={{ color: '#666' }}
        >
          ← Start over with a new task
        </button>
      </div>
    </div>
  );
}
