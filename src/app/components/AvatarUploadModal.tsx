import { useRef } from 'react'
import { Upload, Wand2, X } from 'lucide-react'

interface AvatarUploadModalProps {
  onClose: () => void
  onUploadImage: (imageData: string) => void
  onChooseAvatar: () => void
}

export function AvatarUploadModal({ onClose, onUploadImage, onChooseAvatar }: AvatarUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      onUploadImage(imageData)
      onClose()
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleChooseAvatar = () => {
    onChooseAvatar()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-[#161920] rounded-[28px] p-6 w-[90%] max-w-sm border"
        style={{ borderColor: '#242830' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#0D0F14' }}
        >
          <X size={20} color="#8B909A" />
        </button>

        <h2 className="text-[20px] font-bold mb-6" style={{ color: '#F0F2F5' }}>
          Update Avatar
        </h2>

        <div className="space-y-3">
          {/* Upload Photo */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-[16px] border transition hover:bg-opacity-50"
            style={{ backgroundColor: '#0D0F14', borderColor: '#242830' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent-color) 12%, transparent)' }}
            >
              <Upload size={24} color="var(--accent-color)" />
            </div>

            <div className="text-left">
              <p className="font-bold text-[15px]" style={{ color: '#F0F2F5' }}>
                Upload Photo
              </p>
              <p className="text-[13px]" style={{ color: '#A0A5B0' }}>
                From your library
              </p>
            </div>
          </button>

          {/* Choose Avatar */}
          <button
            onClick={handleChooseAvatar}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-[16px] border transition hover:bg-opacity-50"
            style={{ backgroundColor: '#0D0F14', borderColor: '#242830' }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'color-mix(in srgb, var(--accent-color) 12%, transparent)' }}
            >
              <Wand2 size={24} color="var(--accent-color)" />
            </div>

            <div className="text-left">
              <p className="font-bold text-[15px]" style={{ color: '#F0F2F5' }}>
                Choose Avatar
              </p>
              <p className="text-[13px]" style={{ color: '#A0A5B0' }}>
                Pick from our collection
              </p>
            </div>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  )
}