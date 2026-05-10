import { Home, PlusCircle, Calendar, User, ChevronRight, Bell, Moon, Clock, Sparkles, Lock, HelpCircle, LogOut } from 'lucide-react';

interface NewProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function NewProfileScreen({ onNavigate }: NewProfileScreenProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAFAF7' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full pb-20">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <h1 className="text-[26px] font-bold" style={{ color: '#1A1F36' }}>
            Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-[20px] p-6 flex flex-col items-center shadow-lg">
            {/* Avatar */}
            <div
              className="rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: '#1A1F36', width: '80px', height: '80px' }}
            >
              <span className="text-[30px] font-bold text-white">N</span>
            </div>

            {/* Name */}
            <h2 className="text-[20px] font-bold mb-2" style={{ color: '#1A1F36' }}>
              Nora
            </h2>

            {/* Streak Badge */}
            <div className="px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#FF6B4A' }}>
              <span className="text-[13px] font-medium text-white">
                🔥 5 day streak
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-3 w-full">
              <div className="flex-1 rounded-xl p-3 flex flex-col items-center" style={{ backgroundColor: '#F0F0EC' }}>
                <span className="text-[12px] mb-1" style={{ color: '#666' }}>
                  Tasks Done
                </span>
                <span className="text-[20px] font-bold" style={{ color: '#1A1F36' }}>
                  12
                </span>
              </div>
              <div className="flex-1 rounded-xl p-3 flex flex-col items-center" style={{ backgroundColor: '#F0F0EC' }}>
                <span className="text-[12px] mb-1" style={{ color: '#666' }}>
                  This Week
                </span>
                <span className="text-[20px] font-bold" style={{ color: '#1A1F36' }}>
                  3
                </span>
              </div>
              <div className="flex-1 rounded-xl p-3 flex flex-col items-center" style={{ backgroundColor: '#F0F0EC' }}>
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
          <h3 className="text-[11px] font-semibold tracking-wider mb-3" style={{ color: '#999' }}>
            PREFERENCES
          </h3>

          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EC' }}>
              <Bell size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
                  Notifications
                </div>
                <div className="text-[13px]" style={{ color: '#999' }}>
                  Daily reminders on
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EC' }}>
              <Moon size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
                  Work Hours
                </div>
                <div className="text-[13px]" style={{ color: '#999' }}>
                  Night owl mode
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EC' }}>
              <Clock size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
                  Daily Time
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
                <div className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
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
          <h3 className="text-[11px] font-semibold tracking-wider mb-3" style={{ color: '#999' }}>
            ACCOUNT
          </h3>

          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EC' }}>
              <User size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
                  Edit Profile
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EC' }}>
              <Lock size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
                  Privacy
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#F0F0EC' }}>
              <HelpCircle size={20} color="#666" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-bold" style={{ color: '#1A1F36' }}>
                  Help & FAQ
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
              <LogOut size={20} color="#EF4444" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-bold" style={{ color: '#EF4444' }}>
                  Log Out
                </div>
              </div>
              <ChevronRight size={18} color="#CCC" />
            </button>
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
          <Calendar size={20} color="#999" />
          <span className="text-[11px]" style={{ color: '#999' }}>Schedule</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className="flex flex-col items-center gap-1 flex-1 py-2"
        >
          <User size={20} color="#FF6B4A" />
          <span className="text-[11px] font-medium" style={{ color: '#FF6B4A' }}>Profile</span>
        </button>
      </div>
    </div>
  );
}
