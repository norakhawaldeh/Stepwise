import { ArrowRight } from 'lucide-react';
import { IconTabBar } from './IconTabBar';

interface DarkRescueModeScreenProps {
  onNavigate: (screen: string) => void;
  onAcceptPlan: () => void;
}

export function DarkRescueModeScreen({ onNavigate, onAcceptPlan }: DarkRescueModeScreenProps) {
  const todayTasks = [
    { id: '1', name: 'Write outline + intro', time: '75 min', color: '#FF6B4A' },
    { id: '2', name: 'Complete questions 1-5', time: '30 min', color: '#FF6B4A' },
    { id: '3', name: 'Final edits', time: '20 min', color: '#FF6B4A' }
  ];

  const tomorrowTasks = [
    { id: '4', name: 'Write sections 2 and 3', time: '60 min', color: '#FFAA5A' },
    { id: '5', name: 'Complete questions 6-10', time: '30 min', color: '#FFAA5A' }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0C0A18' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full px-6 py-12 pb-24">
        <div className="mb-8 text-center">
          <h1 className="text-[24px] font-bold mb-2" style={{ color: '#F0EEF8' }}>You missed yesterday.</h1>
          <p className="text-[15px]" style={{ color: '#7470A0' }}>No guilt — here's your updated plan.</p>
        </div>

        <div className="rounded-[20px] p-5 mb-6" style={{ backgroundColor: '#1F1410', border: '1px solid rgba(255, 107, 74, 0.4)' }}>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: '#FF6B4A' }}>WHAT CHANGED</div>
          <div className="mb-3 pb-3 border-b" style={{ borderColor: 'rgba(255, 107, 74, 0.2)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[14px] line-through" style={{ color: '#7470A0' }}>Write outline (was yesterday)</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight size={14} color="#FF6B4A" />
              <span className="text-[14px]" style={{ color: '#F0EEF8' }}>Write outline + intro (today, 75 min)</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[14px] line-through" style={{ color: '#7470A0' }}>Write intro (was today)</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight size={14} color="#FF6B4A" />
              <span className="text-[14px]" style={{ color: '#F0EEF8' }}>Combined with outline above</span>
            </div>
          </div>
        </div>

        <h2 className="text-[16px] font-bold mb-4" style={{ color: '#F0EEF8' }}>Your Rescue Plan</h2>

        <div className="rounded-[16px] p-4 mb-3" style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}>
          <h3 className="text-[14px] font-bold mb-3" style={{ color: '#F0EEF8' }}>Today — Make up + continue</h3>
          {todayTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 mb-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: task.color }} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px]" style={{ color: '#F0EEF8' }}>{task.name}</span>
                  <span className="text-[12px]" style={{ color: '#7470A0' }}>{task.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[16px] p-4 mb-6" style={{ backgroundColor: '#141228', border: '1px solid #1E1C30' }}>
          <h3 className="text-[14px] font-bold mb-3" style={{ color: '#F0EEF8' }}>Tomorrow — Finish strong</h3>
          {tomorrowTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 mb-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: task.color }} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px]" style={{ color: '#F0EEF8' }}>{task.name}</span>
                  <span className="text-[12px]" style={{ color: '#7470A0' }}>{task.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onAcceptPlan} className="w-full py-3.5 rounded-[14px] font-bold text-[16px] mb-3" style={{ backgroundColor: 'var(--accent-color)', color: '#F0EEF8' }}>
          Got it — let's go
        </button>
        <button onClick={() => onNavigate('add')} className="text-[14px] underline mx-auto block hover:opacity-70 transition-opacity" style={{ color: '#7470A0' }}>
          Adjust the plan instead →
        </button>
      </div>
      <IconTabBar activeTab="rescue" onNavigate={onNavigate} />
    </div>
  );
}