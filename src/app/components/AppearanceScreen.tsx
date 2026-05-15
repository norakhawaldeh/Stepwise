import { useState } from 'react'
import { ChevronLeft, Check } from 'lucide-react'

interface AppearanceScreenProps {
  onNavigate: (screen: string) => void
  currentTheme: 'light' | 'dark' | 'system'
  currentAccentColor: string
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void
  onAccentColorChange: (color: string) => void
}

export function AppearanceScreen({
  onNavigate,
  currentTheme,
  currentAccentColor,
  onThemeChange,
  onAccentColorChange,
}: AppearanceScreenProps) {
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>(currentTheme)
  const [selectedColor, setSelectedColor] = useState(currentAccentColor)
  const [saveStatus, setSaveStatus] = useState<'save' | 'saved'>('save')

  const ACCENT_COLORS = [
  { name: 'Teal', value: '#00E5A0' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Amber', value: '#FFAA5A' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Lime', value: '#84CC16' },
  { name: 'Emerald', value: '#10B981' },
]

  

  const handleSave = () => {
    onThemeChange(selectedTheme)
    onAccentColorChange(selectedColor)
    
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus('save'), 2000)
  }

  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0D0F14 0%, #0D0F14 100%)',
      }}
    >
      {/* Header with Save Button */}
      <div className="px-5 pt-8 pb-6 flex items-center justify-between border-b" style={{ borderColor: '#242830' }}>
        <button
          onClick={() => onNavigate('profile')}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
        >
          <ChevronLeft size={24} color="#F0F2F5" />
        </button>

        <h1 className="text-[20px] font-bold" style={{ color: '#F0F2F5' }}>
          Appearance
        </h1>

        <button
          onClick={handleSave}
          className="text-[14px] font-bold px-4 py-2 rounded-full flex items-center gap-2 transition"
          style={{
            backgroundColor: saveStatus === 'saved' ? 'color-mix(in srgb, var(--accent-color) 12%, transparent)' : 'color-mix(in srgb, var(--accent-color) 12%, transparent)',
            color: saveStatus === 'saved' ? 'var(--accent-color)' : 'var(--accent-color)',
          }}
        >
          {saveStatus === 'saved' && <Check size={16} />}
          {saveStatus === 'saved' ? 'Saved' : 'Save'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-8 pb-32">
        
    

        {/* Accent Color Section */}
        <div className="mb-10">
          <h2 className="text-[16px] font-bold mb-5" style={{ color: '#F0F2F5' }}>
            Accent Color
          </h2>

          <div className="flex gap-4 flex-wrap">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className="relative transition hover:scale-110"
                title={color.name}
              >
                <div
                  className="w-14 h-14 rounded-full"
                  style={{ backgroundColor: color.value }}
                />
                {selectedColor === color.value && (
                  <div className="absolute inset-0 rounded-full" style={{ border: '3px solid white' }} />
                )}
              </button>
            ))}
          </div>
          <div className="mt-6">
  <p
    className="text-[13px] font-bold mb-3"
    style={{ color: '#A0A5B0' }}
  >
    Custom Color
  </p>

  <div className="flex items-center gap-4">
    <input
      type="color"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
      className="w-16 h-16 rounded-full cursor-pointer border-0 bg-transparent"
      style={{
        WebkitAppearance: 'none',
        padding: 0,
      }}
    />

    <div>
      <p
        className="text-[14px] font-bold"
        style={{ color: '#F0F2F5' }}
      >
        Pick any color
      </p>

      <p
        className="text-[12px]"
        style={{ color: '#A0A5B0' }}
      >
        Your accent updates across the app
      </p>
    </div>
  </div>
</div>

          <p className="text-[14px] mt-20" style={{ color: '#A0A5B0' }}>
            Selected: <span style={{ color: selectedColor, fontWeight: 'bold' }}>●</span> {ACCENT_COLORS.find(c => c.value === selectedColor)?.name || 'Custom'}
          </p>
        </div>

        {/* Preview Section */}
        <div>
          <div
            className="rounded-[20px] p-5 border overflow-hidden"
            style={{ backgroundColor: '#161920', borderColor: '#242830' }}
          >
            {/* Sample Button */}
            <button
              className="w-full py-4 rounded-[14px] font-bold text-[14px] text-white mb-3"
              style={{ backgroundColor: selectedColor }}
            >
              Preview Button
            </button>

            

            
          </div>
        </div>
      </div>
    </div>
  )
}