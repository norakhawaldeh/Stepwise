import { Home, PlusCircle, Calendar, Sprout, User } from 'lucide-react';
interface IconTabBarProps {
  activeTab: 'home' | 'add' | 'schedule' | 'garden' | 'profile';
  onNavigate: (screen: string) => void;
}

export function IconTabBar({ activeTab, onNavigate }: IconTabBarProps) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] py-1.5 flex items-center justify-between" 
      style={{ backgroundColor: 'rgba(22, 25, 32, 0.96)', border: '1px solid #242830' }}
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <Home
          size={25}
          color={activeTab === 'home' ? 'var(--accent-color)' : '#8B909A'}
          fill={activeTab === 'home' ? 'var(--accent-color)' : 'none'}
        />
      </button>
      <button
        onClick={() => onNavigate('add')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <PlusCircle
          size={25}
          color={activeTab === 'add' ? 'var(--accent-color)' : '#8B909A'}
          fill="none"
        />
      </button>
      <button
        onClick={() => onNavigate('schedule')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <Calendar
          size={25}
          color={activeTab === 'schedule' ? 'var(--accent-color)' : '#8B909A'}
          fill={activeTab === 'schedule' ? 'var(--accent-color)' : 'none'}
        />
      </button>
      <button
        onClick={() => onNavigate('garden')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <Sprout
          size={26}
          color={activeTab === 'garden' ? 'var(--accent-color)' : '#8B909A'}
          fill={activeTab === 'garden' ? 'var(--accent-color)' : 'none'}
        />
      </button>
      <button
        onClick={() => onNavigate('profile')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <User
          size={25}
          color={activeTab === 'profile' ? 'var(--accent-color)' : '#8B909A'}
          fill={activeTab === 'profile' ? 'var(--accent-color)' : 'none'}
        />
      </button>
    </div>
  );
}
