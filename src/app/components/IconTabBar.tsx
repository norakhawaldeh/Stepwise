import { Home, PlusCircle, Calendar, Bell, User } from 'lucide-react';

interface IconTabBarProps {
  activeTab: 'home' | 'add' | 'schedule' | 'rescue' | 'profile';
  onNavigate: (screen: string) => void;
}

export function IconTabBar({ activeTab, onNavigate }: IconTabBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around h-16 max-w-[390px] mx-auto w-full"
      style={{ backgroundColor: '#161920' }}
    >
      <button
        onClick={() => onNavigate('home')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <Home
          size={24}
          color={activeTab === 'home' ? '#00E5A0' : '#8B909A'}
          fill={activeTab === 'home' ? '#00E5A0' : 'none'}
        />
      </button>
      <button
        onClick={() => onNavigate('add')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <PlusCircle
          size={24}
          color={activeTab === 'add' ? '#00E5A0' : '#8B909A'}
          fill="none"
        />
      </button>
      <button
        onClick={() => onNavigate('schedule')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <Calendar
          size={24}
          color={activeTab === 'schedule' ? '#00E5A0' : '#8B909A'}
          fill={activeTab === 'schedule' ? '#00E5A0' : 'none'}
        />
      </button>
      <button
        onClick={() => onNavigate('rescue')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <Bell
          size={24}
          color={activeTab === 'rescue' ? '#00E5A0' : '#8B909A'}
          fill={activeTab === 'rescue' ? '#00E5A0' : 'none'}
        />
      </button>
      <button
        onClick={() => onNavigate('profile')}
        className="flex items-center justify-center flex-1 py-2"
      >
        <User
          size={24}
          color={activeTab === 'profile' ? '#00E5A0' : '#8B909A'}
          fill={activeTab === 'profile' ? '#00E5A0' : 'none'}
        />
      </button>
    </div>
  );
}
