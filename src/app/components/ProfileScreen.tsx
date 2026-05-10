import { Home, PlusCircle, Calendar, User, ChevronRight, Bell, Moon, Clock, Sparkles, Lock, HelpCircle, LogOut } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EAF4FB' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full pb-20">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <h1 className="text-[22px] font-bold" style={{ color: '#333' }}>
            Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center">
            {/* Avatar */}
            <div
              className="w-18 h-18 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: '#D6ECFA', width: '72px', height: '72px' }}
            >
              <span className="text-[28px] font-bold" style={{ color: '#3A8DC7' }}>
                N
              </span>
            </div>

            {/* Name */}
            <h2 className="text-[18px] font-bold mb-2" style={{ color: '#333' }}>
              Nora
            </h2>

            {/* Streak Badge */}
            <div className="px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#3A8DC7' }}>
              <span className="text-[13px] font-medium text-white">
                🔥 5 day streak
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-3 w-full">
              <div className="flex-1 rounded-lg p-3 flex flex-col items-center" style={{ backgroundColor: '#F4F4F4' }}>
                <span className="text-[12px] mb-1" style={{ color: '#666' }}>
                  Tasks Done
                </span>
                <span className="text-[20px] font-bold" style={{ color: '#333' }}>
                  12
                </span>
              </div>
              <div className="flex-1 rounded-lg p-3 flex flex-col items-center" style={{ backgroundColor: '#F4F4F4' }}>
                <span className="text-[12px] mb-1" style={{ color: '#666' }}>
                  This Week
                </span>
                <span className="text-[20px] font-bold" style={{ color: '#333' }}>
                  3
                </span>
              </div>
              <div className="flex-1 rounded-lg p-3 flex flex-col items-center" style={{ backgroundColor: '#F4F4F4' }}>
                <span className="text-[12px] mb-1" style={{ color: '#666' }}>
                  On Time
                </span>
                <span className="text-[20px] font-bold" style={{ color: '#10B981' }}>
                  92%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="px-6 mb-3">
          <h3 className="text-[12px] font-semibold tracking-wider mb-3" style={{ color: '#999' }}>
            PREFERENCES
          </h3>

          <div className="bg-white rounded-2xl overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0F0' }}>
              <Bell size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#333' }}>
                  Notifications
                </div>
                <div className="text-[13px]" style={{ color: '#999' }}>
                  Daily reminders on
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0F0' }}>
              <Moon size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#333' }}>
                  Work Hours
                </div>
                <div className="text-[13px]" style={{ color: '#999' }}>
                  Night owl mode
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0F0' }}>
              <Clock size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#333' }}>
                  Default Daily Time
                </div>
                <div className="text-[13px]" style={{ color: '#999' }}>
                  2 hours/day
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
              <Sparkles size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#333' }}>
                  AI Breakdown Style
                </div>
                <div className="text-[13px]" style={{ color: '#999' }}>
                  Detailed steps
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>
          </div>
        </div>

        {/* Account Section */}
        <div className="px-6 mb-6">
          <h3 className="text-[12px] font-semibold tracking-wider mb-3" style={{ color: '#999' }}>
            ACCOUNT
          </h3>

          <div className="bg-white rounded-2xl overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0F0' }}>
              <User size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#333' }}>
                  Edit Profile
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0F0' }}>
              <Lock size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#333' }}>
                  Privacy
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0F0' }}>
              <HelpCircle size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#333' }}>
                  Help & FAQ
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
              <LogOut size={20} color="#EF4444" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#EF4444' }}>
                  Log Out
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around h-16 max-w-[390px] mx-auto w-full" style={{ borderColor: '#E0E0E0' }}>
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
          <Calendar size={20} color="#999" />
          <span className="text-[11px]" style={{ color: '#999' }}>Schedule</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <User size={20} color="#3A8DC7" />
          <span className="text-[11px] font-medium" style={{ color: '#3A8DC7' }}>Profile</span>
        </button>
      </div>
    </div>
  );
}
