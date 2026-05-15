export type AvatarType = 'initial' | 'cute' | 'gradient' | 'colorful' | 'upload'

export interface Avatar {
  id: string
  type: AvatarType
  icon?: string
  label: string
  bgColor?: string
}

// Avatar configurations (without initials - those are set by user)
export const AVATARS: Avatar[] = [
  // Initial Avatars - these will show user's initials
  { id: 'initial-teal', type: 'initial', label: 'Teal', bgColor: '#00E5A0' },
  { id: 'initial-white', type: 'initial', label: 'White', bgColor: '#F0F2F5' },
  { id: 'initial-gray', type: 'initial', label: 'Gray', bgColor: '#8B909A' },
  { id: 'initial-outline', type: 'initial', label: 'Outline', bgColor: 'transparent' },

  // Cute Icon Avatars
  { id: 'sprout', type: 'cute', icon: '🌱', label: 'Sprout' },
  { id: 'flower', type: 'cute', icon: '🌸', label: 'Flower' },
  { id: 'leaf', type: 'cute', icon: '🍃', label: 'Leaf' },
  { id: 'star', type: 'cute', icon: '⭐', label: 'Star' },
  { id: 'sparkles', type: 'cute', icon: '✨', label: 'Sparkles' },
  { id: 'heart', type: 'cute', icon: '❤️', label: 'Heart' },
  { id: 'smile', type: 'cute', icon: '😊', label: 'Smile' },
  { id: 'sun', type: 'cute', icon: '☀️', label: 'Sun' },
  { id: 'cloud', type: 'cute', icon: '☁️', label: 'Cloud' },
  { id: 'tree', type: 'cute', icon: '🌳', label: 'Tree' },

  // Gradient Avatars - these will show user's initials
  { id: 'gradient-teal', type: 'gradient', label: 'Teal', bgColor: '#00E5A0' },
  { id: 'gradient-blue', type: 'gradient', label: 'Blue', bgColor: '#2F9BFF' },
  { id: 'gradient-white', type: 'gradient', label: 'White', bgColor: '#F0F2F5' },
  { id: 'gradient-gray', type: 'gradient', label: 'Gray', bgColor: '#8B909A' },

  // Colorful Avatars - these will show user's initials
  { id: 'color-blue', type: 'colorful', label: 'Blue', bgColor: '#3B82F6' },
  { id: 'color-purple', type: 'colorful', label: 'Purple', bgColor: '#8B5CF6' },
  { id: 'color-pink', type: 'colorful', label: 'Pink', bgColor: '#EC4899' },
  { id: 'color-orange', type: 'colorful', label: 'Orange', bgColor: '#F97316' },
  { id: 'color-red', type: 'colorful', label: 'Red', bgColor: '#EF4444' },
  { id: 'color-green', type: 'colorful', label: 'Green', bgColor: '#22C55E' },
]

export const getAvatarById = (id: string): Avatar | undefined => {
  return AVATARS.find(avatar => avatar.id === id)
}

export const getAvatarColor = (avatarId: string | null): string => {
  if (!avatarId) return '#00E5A0'
  const avatar = getAvatarById(avatarId)
  return avatar?.bgColor || '#00E5A0'
}

export const renderAvatar = (
  avatarId: string | null,
  uploadedImage: string | null,
  userInitials: string
) => {
  // If user uploaded a photo
  if (uploadedImage) {
    return { type: 'image', content: uploadedImage }
  }

  // If user selected an avatar
  if (avatarId) {
    const avatar = getAvatarById(avatarId)
    if (avatar) {
      if (avatar.type === 'cute') {
        return {
          type: 'cute',
          icon: avatar.icon,
          bgColor: '#2A2F3A',
          textColor: '#0D0F14',
        }
      }
      // Initial, gradient, colorful - all show user's initials
      return {
        type: 'initial',
        initials: userInitials,
        bgColor: avatar.bgColor,
        textColor: avatar.bgColor === 'transparent' ? '#00E5A0' : (avatar.bgColor === '#F0F2F5' ? '#0D0F14' : '#F0F2F5'),
        isBorder: avatar.bgColor === 'transparent',
      }
    }
  }

  // Fallback to user's initials in teal
  return {
    type: 'initial',
    initials: userInitials,
    bgColor: '#00E5A0',
    textColor: '#0D0F14',
  }
}