import { ChevronRight, Bell, Moon, Clock, Sparkles, User, Lock, HelpCircle, LogOut } from 'lucide-react';
import { IconTabBar } from './IconTabBar';

interface DarkProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function DarkProfileScreen({ onNavigate }: DarkProfileScreenProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0D0F14' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full pb-20">
        {/* Status Bar Space */}
        <div className="h-12" />

        {/* Header */}
        <div className="px-6 mb-6">
          <h1 className="text-[26px] font-bold" style={{ color: '#F0F2F5' }}>
            Profile
          </h1>
        </div>

        {/* Profile Card */}
        <div className="px-6 mb-6">
          <div
            className="rounded-[20px] p-6 flex flex-col items-center"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            {/* Avatar */}
            <div
              className="rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: '#0D0F14', border: '2px solid #00E5A0', width: '80px', height: '80px' }}
            >
              <span className="text-[30px] font-bold" style={{ color: '#00E5A0' }}>N</span>
            </div>

            {/* Name */}
            <h2 className="text-[20px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
              Nora
            </h2>

            {/* Streak Badge */}
            <div className="px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#00E5A0' }}>
              <span className="text-[13px] font-bold" style={{ color: '#0D0F14' }}>
                🔥 5 day streak
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-3 w-full">
              <div className="flex-1 rounded-xl p-3 flex flex-col items-center" style={{ backgroundColor: '#0D0F14' }}>
                <span className="text-[12px] mb-1" style={{ color: '#8B909A' }}>
                  Tasks Done
                </span>
                <span className="text-[22px] font-bold" style={{ color: '#F0F2F5' }}>
                  12
                </span>
              </div>
              <div className="flex-1 rounded-xl p-3 flex flex-col items-center" style={{ backgroundColor: '#0D0F14' }}>
                <span className="text-[12px] mb-1" style={{ color: '#8B909A' }}>
                  This Week
                </span>
                <span className="text-[22px] font-bold" style={{ color: '#F0F2F5' }}>
                  3
                </span>
              </div>
              <div className="flex-1 rounded-xl p-3 flex flex-col items-center" style={{ backgroundColor: '#0D0F14' }}>
                <span className="text-[12px] mb-1" style={{ color: '#8B909A' }}>
                  On Time
                </span>
                <span className="text-[22px] font-bold" style={{ color: '#00E5A0' }}>
                  92%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="px-6 mb-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#8B909A' }}>
            PREFERENCES
          </h3>

          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#161920' }}>
            <button className="w-full flex items-center gap-3 p-4 border-b transition-colors" style={{ borderColor: '#242830' }}>
              <Bell size={20} color="#8B909A" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#F0F2F5' }}>
                  Notifications
                </div>
                <div className="text-[13px]" style={{ color: '#8B909A' }}>
                  Daily reminders on
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b transition-colors" style={{ borderColor: '#242830' }}>
              <Moon size={20} color="#8B909A" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#F0F2F5' }}>
                  Work Hours
                </div>
                <div className="text-[13px]" style={{ color: '#8B909A' }}>
                  Night owl mode
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b transition-colors" style={{ borderColor: '#242830' }}>
              <Clock size={20} color="#8B909A" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#F0F2F5' }}>
                  Daily Time
                </div>
                <div className="text-[13px]" style={{ color: '#8B909A' }}>
                  2 hours/day
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 transition-colors">
              <Sparkles size={20} color="#8B909A" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#F0F2F5' }}>
                  AI Style
                </div>
                <div className="text-[13px]" style={{ color: '#8B909A' }}>
                  Detailed steps
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>
          </div>
        </div>

        {/* Account Section */}
        <div className="px-6 mb-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: '#8B909A' }}>
            ACCOUNT
          </h3>

          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#161920' }}>
            <button className="w-full flex items-center gap-3 p-4 border-b transition-colors" style={{ borderColor: '#242830' }}>
              <User size={20} color="#8B909A" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#F0F2F5' }}>
                  Edit Profile
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b transition-colors" style={{ borderColor: '#242830' }}>
              <Lock size={20} color="#8B909A" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#F0F2F5' }}>
                  Privacy
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 border-b transition-colors" style={{ borderColor: '#242830' }}>
              <HelpCircle size={20} color="#8B909A" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#F0F2F5' }}>
                  Help & FAQ
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>

            <button className="w-full flex items-center gap-3 p-4 transition-colors">
              <LogOut size={20} color="#FF4D4D" />
              <div className="flex-1 text-left">
                <div className="text-[15px] font-medium" style={{ color: '#FF4D4D' }}>
                  Log Out
                </div>
              </div>
              <ChevronRight size={18} color="#8B909A" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <IconTabBar activeTab="profile" onNavigate={onNavigate} />
    </div>
  );
}
