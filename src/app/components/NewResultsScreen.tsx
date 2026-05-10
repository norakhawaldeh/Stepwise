import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface NewResultsScreenProps {
  onStartOver: () => void;
  onNavigate: (screen: string) => void;
}

export function NewResultsScreen({ onStartOver, onNavigate }: NewResultsScreenProps) {
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

  const days = [
    {
      id: '1',
      title: 'Today — Research & outline',
      time: '1h 30m',
      tasks: [
        { id: '1-1', name: 'Find and skim 3 sources', time: '30 min' },
        { id: '1-2', name: 'Write your outline', time: '60 min' },
      ]
    },
    {
      id: '2',
      title: 'Day 2 — Writing',
      time: '1h 45m',
      tasks: [
        { id: '2-1', name: 'Write intro + section 1', time: '45 min' },
        { id: '2-2', name: 'Write sections 2 and 3', time: '60 min' },
      ]
    },
    {
      id: '3',
      title: 'Day 3 — Polish',
      time: '50m',
      tasks: [
        { id: '3-1', name: 'Edit and proofread', time: '30 min' },
        { id: '3-2', name: 'Format and submit', time: '20 min' },
      ]
    },
  ];

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
        <h1 className="text-[26px] font-bold mb-6" style={{ color: '#1A1F36' }}>
          Your Plan
        </h1>

        {/* Hero Action Card */}
        <div
          className="rounded-[20px] p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, #1A1F36 0%, #2D2250 100%)',
          }}
        >
          <div className="text-[11px] font-semibold mb-3 tracking-wider" style={{ color: '#FF6B4A' }}>
            DO THIS RIGHT NOW
          </div>
          <h2 className="text-[20px] font-bold text-white mb-3 leading-tight">
            Open a blank doc and write your essay title and 3 bullet points.
          </h2>
          <p className="text-[13px] italic" style={{ color: '#C8C4E8' }}>
            Starting with structure beats starting with research.
          </p>
        </div>

        {/* Urgency Meter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[14px] font-medium" style={{ color: '#1A1F36' }}>
              Urgency
            </span>
            <span className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ backgroundColor: '#F59E0B', color: 'white' }}>
              Get moving
            </span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#F0F0EC' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ backgroundColor: '#F59E0B', width: '55%' }}
            />
          </div>
        </div>

        {/* Plan Card */}
        <div className="bg-white rounded-[20px] p-5 mb-6 shadow-lg">
          <h3 className="text-[16px] font-bold mb-5" style={{ color: '#1A1F36' }}>
            3-day plan
          </h3>

          {days.map((day, idx) => (
            <div
              key={day.id}
              className={idx < days.length - 1 ? 'mb-5 pb-5 border-b' : 'mb-5'}
              style={{ borderColor: '#F0F0EC' }}
            >
              {/* Day Header */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-[14px] font-bold" style={{ color: '#1A1F36' }}>
                  {day.title}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[12px]" style={{ backgroundColor: '#F0F0EC', color: '#666' }}>
                  {day.time}
                </span>
              </div>

              {/* Tasks */}
              {day.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 mb-3 cursor-pointer"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                      style={{
                        borderColor: checkedTasks.has(task.id) ? '#FF6B4A' : '#D0D0D0',
                        backgroundColor: checkedTasks.has(task.id) ? '#FF6B4A' : 'transparent',
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
                      className="text-[14px] mb-1"
                      style={{ color: '#1A1F36' }}
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
          <div className="rounded-xl p-4" style={{ backgroundColor: '#FAFAF7' }}>
            <div className="flex gap-2">
              <span className="flex-shrink-0" style={{ color: '#FF6B4A' }}>💡</span>
              <p className="text-[13px] leading-relaxed" style={{ color: '#666' }}>
                Work in 25-minute sprints — your brain performs better this way.
              </p>
            </div>
          </div>
        </div>

        {/* Start Over Link */}
        <button
          onClick={onStartOver}
          className="text-[14px] underline mx-auto block hover:opacity-70 transition-opacity"
          style={{ color: '#999' }}
        >
          ← Start over
        </button>
      </div>
    </div>
  );
}
