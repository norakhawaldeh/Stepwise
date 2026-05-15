import { ChevronLeft } from 'lucide-react'
import { AVATARS } from '../../avatarUtils'

interface AvatarSelectScreenProps {
  onNavigate: (screen: string) => void
  onSelectAvatar: (avatarId: string) => void
  username: string
}

export function AvatarSelectScreen({ onNavigate, onSelectAvatar, username }: AvatarSelectScreenProps) {
  const userInitials = username.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  const handleSelectAvatar = (avatarId: string) => {
    onSelectAvatar(avatarId)
    // Go back to profile
    onNavigate('profile')
  }

  // Group avatars by type
  const initialAvatars = AVATARS.filter(a => a.type === 'initial')
  const cuteAvatars = AVATARS.filter(a => a.type === 'cute')
  const colorfulAvatars = AVATARS.filter(
  a => a.type === 'gradient' || a.type === 'colorful'
).filter((avatar, index, arr) => {
  if (avatar.label !== 'Blue') return true
  return arr.findIndex(a => a.label === 'Blue') === index
})

  const AvatarButton = ({ avatar }: { avatar: typeof AVATARS[0] }) => {
    const isImage = avatar.type === 'cute'

    return (
      <button
        onClick={() => handleSelectAvatar(avatar.id)}
        className="flex flex-col items-center gap-3"
        title={avatar.label}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl hover:scale-110 transition"
          style={{
            backgroundColor: avatar.bgColor,
            color: isImage ? undefined : (avatar.bgColor === 'transparent' ? 'var(--accent-color)' : (avatar.bgColor === '#F0F2F5' ? '#0D0F14' : '#F0F2F5')),
            border: avatar.bgColor === 'transparent' ? `2px solid var(--accent-color)` : 'none',
          }}
        >
          {isImage ? avatar.icon : userInitials}
        </div>
        <p className="text-xs text-center w-20 line-clamp-1" style={{ color: '#A0A5B0' }}>
          {avatar.label}
        </p>
      </button>
    )
  }

  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(0, 229, 160, 0.08), transparent 35%), #0D0F14',
      }}
    >
      <div className="max-w-[430px] mx-auto w-full h-screen flex flex-col relative">
        {/* Header */}
        <div className="px-5 pt-8 pb-6 flex items-center justify-between border-b" style={{ borderColor: '#242830' }}>
          <button
            onClick={() => onNavigate('profile')}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            <ChevronLeft size={24} color="#F0F2F5" />
          </button>

          <h1 className="text-[20px] font-bold" style={{ color: '#F0F2F5' }}>
            Choose Avatar
          </h1>

          <div className="w-11" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-8 pb-32">
          {/* Initial Avatars */}
          <div className="mb-12">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#8B909A' }}>
              Initial Avatars
            </p>
            <div className="grid grid-cols-3 gap-6">
              {initialAvatars.map(avatar => (
                <AvatarButton key={avatar.id} avatar={avatar} />
              ))}
            </div>
          </div>

          {/* Cute Avatars */}
          <div className="mb-12">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#8B909A' }}>
              Cute Icons
            </p>
            <div className="grid grid-cols-3 gap-6">
              {cuteAvatars.map(avatar => (
                <AvatarButton key={avatar.id} avatar={avatar} />
              ))}
            </div>
          </div>

          {/* Colorful Avatars */}
          <div className="mb-12">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#8B909A' }}>
              Colorful
            </p>
            <div className="grid grid-cols-3 gap-6">
              {colorfulAvatars.map(avatar => (
                <AvatarButton key={avatar.id} avatar={avatar} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}