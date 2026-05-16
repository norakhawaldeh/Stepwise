import { useState } from 'react'
import {
  Sprout,
  Calendar,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Home,
  Info,
  LogOut,
  Palette,
  PlusCircle,
  ShieldCheck,
  User,
  Camera,
} from 'lucide-react'
import { supabase } from '../../supabaseClient'
import { AvatarUploadModal } from './AvatarUploadModal'
import { renderAvatar } from '../../avatarUtils'

interface ProfileScreenProps {
  onNavigate: (screen: string) => void
  username: string
  onUsernameChange: (name: string) => void
  avatarId: string | null
  uploadedImage: string | null
  onAvatarChange: (avatarId: string | null, uploadedImage: string | null) => void
}

type SettingsPage = 'main' | 'edit-profile' | 'logout'

export function DarkProfileScreen({
  onNavigate,
  username,
  onUsernameChange,
  avatarId,
  uploadedImage,
  onAvatarChange,
}: ProfileScreenProps) {
  const [page, setPage] = useState<SettingsPage>('main')
  const [editName, setEditName] = useState(username)
  const [email, setEmail] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)

  useState(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setEmail(user?.email || '')
    }
    loadUser()
  })

  const userInitials = editName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const avatar = renderAvatar(avatarId, uploadedImage, userInitials)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('stepwiseSchedule')
    localStorage.removeItem('stepwiseDraftTask')
    localStorage.removeItem('stepwiseGeneratedPlan')
    localStorage.removeItem('stepwiseAvatarId')
    localStorage.removeItem('stepwiseUploadedImage')
    onNavigate('login')
  }

  const handleSaveName = () => {
  const cleanedName = editName.trim() || 'User'

  onUsernameChange(cleanedName)
  localStorage.setItem('stepwiseUsername', cleanedName)
}

  const handleUploadImage = (imageData: string) => {
    onAvatarChange(null, imageData)
  }

  const handleSelectAvatar = (selectedAvatarId: string) => {
    onAvatarChange(selectedAvatarId, null)
    setPage('edit-profile')
  }

  const handleChooseAvatar = () => {
    setShowUploadModal(false)
    onNavigate('avatar-select')
  }

  const SettingRow = ({
    icon,
    title,
    subtitle,
    onClick,
    danger = false,
  }: {
    icon: React.ReactNode
    title: string
    subtitle: string
    onClick: () => void
    danger?: boolean
  }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-5 py-4 border-b last:border-b-0 text-left hover:opacity-80 transition"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div
        className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: danger ? 'rgba(255, 69, 58, 0.12)' : 'color-mix(in srgb, var(--accent-color) 12%, transparent)',
        }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className="text-[15px] font-bold"
          style={{ color: danger ? '#FF5A52' : '#F0F2F5' }}
        >
          {title}
        </h3>
        <p className="text-[13px] mt-0.5" style={{ color: '#A0A5B0' }}>
          {subtitle}
        </p>
      </div>

      <ChevronRight size={20} color="#8B909A" />
    </button>
  )

  const AvatarDisplay = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
    const sizeMap = {
      small: 'w-11 h-11',
      medium: 'w-28 h-28',
      large: 'w-32 h-32',
    }

    const textSizeMap = {
      small: 'text-base',
      medium: 'text-6xl',
      large: 'text-7xl',
    }

    if (avatar.type === 'image') {
      return (
        <img
          src={avatar.content}
          alt="Profile"
          className={`${sizeMap[size]} rounded-full object-cover`}
        />
      )
    }

    if (avatar.type === 'cute') {
      return (
        <div
          className={`${sizeMap[size]} rounded-full flex items-center justify-center ${textSizeMap[size]}`}
          style={{
            backgroundColor: avatar.bgColor,
            color: avatar.textColor,
          }}
        >
          {avatar.icon}
        </div>
      )
    }

    return (
      <div
        className={`${sizeMap[size]} rounded-full flex items-center justify-center font-bold ${textSizeMap[size]}`}
        style={{
          backgroundColor: avatar.bgColor,
          color: avatar.textColor,
          border: avatar.isBorder ? `3px solid ${avatar.textColor}` : 'none',
        }}
      >
        {avatar.initials}
      </div>
    )
  }

  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0D0F14 0%, #0D0F14 100%)',
      }}
    >
      {/* Modal */}
      {showUploadModal && (
        <AvatarUploadModal
          onClose={() => setShowUploadModal(false)}
          onUploadImage={handleUploadImage}
          onChooseAvatar={handleChooseAvatar}
        />
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-8 pb-32">
        {/* ─── MAIN PAGE ─── */}
        {page === 'main' && (
          <>
            <div className="flex items-start justify-between mb-10">
              <div>
                <h1 className="text-[32px] font-bold mb-1" style={{ color: '#F0F2F5' }}>
                  Settings
                </h1>
                <p className="text-[14px]" style={{ color: '#A0A5B0' }}>
                  Manage your preferences
                </p>
              </div>

              {/* Avatar - NO CAMERA ICON HERE */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  backgroundColor: '#161920',
                  border: '2px solid var(--accent-color)',
                }}
              >
                <AvatarDisplay size="small" />
              </div>
            </div>

            {/* Preferences Section */}
            <p className="text-[11px] font-bold tracking-widest mb-3 uppercase" style={{ color: '#8B909A' }}>
              Preferences
            </p>

            <div
              className="rounded-[20px] overflow-hidden mb-8 border"
              style={{ backgroundColor: '#161920', borderColor: '#242830' }}
            >
              <SettingRow
                icon={<User size={22} color="var(--accent-color)" />}
                title="Edit profile"
                subtitle="Update your name and avatar"
                onClick={() => setPage('edit-profile')}
              />
              <SettingRow
                icon={<Sprout size={22} color="var(--accent-color)" />}
                title="Notifications"
                subtitle="Manage reminders and alerts"
                onClick={() => onNavigate('notifications')}
              />
              <SettingRow
                icon={<Palette size={22} color="var(--accent-color)" />}
                title="Appearance"
                subtitle="Customize theme and colors"
                onClick={() => onNavigate('appearance')}
              />
            </div>

            {/* Account Section */}
            <p className="text-[11px] font-bold tracking-widest mb-3 uppercase" style={{ color: '#8B909A' }}>
              Account
            </p>

            <div
              className="rounded-[20px] overflow-hidden border"
              style={{ backgroundColor: '#161920', borderColor: '#242830' }}
            >
              <SettingRow
                icon={<ShieldCheck size={22} color="var(--accent-color)" />}
                title="Account & security"
                subtitle="Manage your account"
                onClick={() => onNavigate('account')}
              />
              <SettingRow
                icon={<HelpCircle size={22} color="var(--accent-color)" />}
                title="Help & feedback"
                subtitle="Get help or send feedback"
                onClick={() => onNavigate('help')}
              />
              <SettingRow
                icon={<Info size={22} color="var(--accent-color)" />}
                title="About Rooted"
                subtitle="Version and credits"
                onClick={() => onNavigate('about')}
              />
              <SettingRow
                icon={<LogOut size={22} color="#FF5A52" />}
                title="Log out"
                subtitle="Sign out of your account"
                onClick={() => setPage('logout')}
                danger
              />
            </div>
          </>
        )}

        {/* ─── EDIT PROFILE ─── */}
        {page === 'edit-profile' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setPage('main')}
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
              >
                <ChevronLeft size={24} color="#F0F2F5" />
              </button>

              <h1 className="text-[20px] font-bold text-center flex-1" style={{ color: '#F0F2F5' }}>
                Edit Profile
              </h1>

              <button
                onClick={handleSaveName}
                className="text-[14px] font-bold px-4 py-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent-color) 12%, transparent)', color: 'var(--accent-color)' }}
              >
                Save
              </button>
            </div>

            {/* Avatar with Camera Icon */}
<div className="flex justify-center mb-10">
  <div className="relative w-fit">
    
    {/* Avatar */}
    <div
      className="w-32 h-32 rounded-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-primary)',
        border: '2px solid var(--accent-color)',
      }}
    >
      <AvatarDisplay size="large" />
    </div>

    {/* Camera Button */}
    <button
      onClick={() => setShowUploadModal(true)}
className="absolute bottom-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-110"   
   style={{
        backgroundColor: 'var(--accent-color)',
        boxShadow: '0 4px 12px rgba(0, 229, 160, 0.3)',
      }}
    >
      <Camera size={20} color="#0D0F14" />
    </button>

  </div>
</div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="text-[13px] font-bold mb-2 block" style={{ color: '#A0A5B0' }}>
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-5 py-4 rounded-[14px] border text-[15px] font-medium"
                  style={{
                    backgroundColor: '#161920',
                    borderColor: '#242830',
                    color: '#F0F2F5',
                  }}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-[13px] font-bold mb-2 block" style={{ color: '#A0A5B0' }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-5 py-4 rounded-[14px] border text-[15px] cursor-not-allowed"
                  style={{
                    backgroundColor: '#0D0F14',
                    borderColor: '#242830',
                    color: '#6F7580',
                  }}
                />
                <p className="text-[12px] mt-2" style={{ color: '#6F7580' }}>
                  Email cannot be changed here
                </p>
              </div>
            </div>
          </>
        )}

        {/* ─── LOG OUT ─── */}
        {page === 'logout' && (
          <>
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setPage('main')}
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
              >
                <ChevronLeft size={24} color="#F0F2F5" />
              </button>

              <h1 className="text-[20px] font-bold text-center flex-1" style={{ color: '#F0F2F5' }}>
                Log Out
              </h1>

              <div className="w-11" />
            </div>

            <div className="flex flex-col items-center justify-center pt-16">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: 'rgba(255,69,58,0.12)' }}
              >
                <LogOut size={44} color="#FF5A52" />
              </div>

              <h2 className="text-[22px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
                Log out?
              </h2>

              <p className="text-[14px] mb-10 text-center max-w-xs" style={{ color: '#A0A5B0' }}>
                You'll need to log back in to access your account.
              </p>

              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-[16px] font-bold mb-3 text-white text-[15px]"
                style={{ backgroundColor: '#FF453A' }}
              >
                Log Out
              </button>

              <button
                onClick={() => setPage('main')}
                className="w-full py-4 rounded-[16px] font-bold text-[15px]"
                style={{ backgroundColor: '#20242D', color: '#F0F2F5' }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tab Bar */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 w-[calc(100%-32px)] rounded-[26px] px-5 py-3.5 flex items-center justify-between" style={{ backgroundColor: 'rgba(22, 25, 32, 0.96)', border: '1px solid #242830' }}>
          <button onClick={() => onNavigate('home')}><Home size={24} color="#8B909A" /></button>
          <button onClick={() => onNavigate('add')}><PlusCircle size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('schedule')}><Calendar size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('garden')}><Sprout size={25} color="#8B909A" /></button>
          <button onClick={() => onNavigate('profile')}><User size={25} color="var(--accent-color)" /></button>
        </div>
    </div>
  )
}