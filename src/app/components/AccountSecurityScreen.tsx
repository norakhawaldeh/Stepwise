import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  Mail,
  Lock,
  CalendarDays,
  Trash2,
  X,
} from 'lucide-react'
import { supabase } from '../../supabaseClient'

interface AccountSecurityScreenProps {
  onNavigate: (screen: string) => void
}

export function AccountSecurityScreen({ onNavigate }: AccountSecurityScreenProps) {
  const [email, setEmail] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setEmail(user?.email || '')

      if (user?.created_at) {
        setCreatedAt(
          new Date(user.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        )
      }
    }

    loadUser()
  }, [])

  const handleChangeEmail = async () => {
    setMessage('')
    setErrorMessage('')

    if (!newEmail.trim()) {
      setErrorMessage('Please enter a new email.')
      return
    }

    const { error } = await supabase.auth.updateUser({
      email: newEmail.trim(),
    })

    if (error) {
      setErrorMessage(error.message)
      return
    }

    setMessage('We sent a confirmation link to your new email address.')
    setShowEmailModal(false)
    setNewEmail('')
  }

  const handleChangePassword = async () => {
    setMessage('')
    setErrorMessage('')

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setErrorMessage(error.message)
      return
    }

    setMessage('Password updated successfully.')
    setShowPasswordModal(false)
    setNewPassword('')
    setConfirmPassword('')
  }

  const Row = ({
    icon,
    title,
    subtitle,
    action,
    onClick,
    danger = false,
  }: {
    icon: React.ReactNode
    title: string
    subtitle: string
    action?: string
    onClick?: () => void
    danger?: boolean
  }) => (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="w-full flex items-center gap-4 px-5 py-4 border-b last:border-b-0 text-left"
      style={{ borderColor: '#242830' }}
    >
      <div
        className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
        style={{
          backgroundColor: danger
            ? 'rgba(255, 69, 58, 0.12)'
            : 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
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

        {subtitle && (
          <p className="text-[13px] mt-0.5 truncate" style={{ color: '#A0A5B0' }}>
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <p
          className="text-[13px] font-bold"
          style={{ color: danger ? '#FF5A52' : 'var(--accent-color)' }}
        >
          {action}
        </p>
      )}
    </button>
  )

  return (
    <div
      className="w-full h-screen flex flex-col overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at top left, color-mix(in srgb, var(--accent-color) 8%, transparent), transparent 35%), var(--bg-primary)',
      }}
    >
      <div className="max-w-[430px] mx-auto w-full h-screen flex flex-col relative">
        {/* Header */}
        <div
          className="px-5 pt-8 pb-6 flex items-center justify-between border-b"
          style={{ borderColor: '#242830' }}
        >
          <button
            onClick={() => onNavigate('profile')}
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            <ChevronLeft size={24} color="#F0F2F5" />
          </button>

          <h1 className="text-[20px] font-bold" style={{ color: '#F0F2F5' }}>
            Account & Security
          </h1>

          <div className="w-11" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-8 pb-32">
          {message && (
            <div
              className="rounded-[16px] px-4 py-3 mb-5"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent-color) 14%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent-color) 25%, transparent)',
              }}
            >
              <p className="text-[13px] font-semibold" style={{ color: 'var(--accent-color)' }}>
                {message}
              </p>
            </div>
          )}

          {errorMessage && (
            <div
              className="rounded-[16px] px-4 py-3 mb-5"
              style={{
                backgroundColor: 'rgba(255, 69, 58, 0.12)',
                border: '1px solid rgba(255, 69, 58, 0.24)',
              }}
            >
              <p className="text-[13px] font-semibold" style={{ color: '#FF5A52' }}>
                {errorMessage}
              </p>
            </div>
          )}

          <p
            className="text-[11px] font-bold tracking-widest mb-3 uppercase"
            style={{ color: '#8B909A' }}
          >
            Account
          </p>

          <div
            className="rounded-[20px] overflow-hidden mb-8 border"
            style={{ backgroundColor: '#161920', borderColor: '#242830' }}
          >
            <Row
              icon={<CalendarDays size={22} color="var(--accent-color)" />}
              title="Account created"
              subtitle={createdAt || 'Loading...'}
            />

            <Row
              icon={<Mail size={22} color="var(--accent-color)" />}
              title="Email"
              subtitle={email || 'No email found'}
              action="Change"
              onClick={() => setShowEmailModal(true)}
            />

            <Row
              icon={<Lock size={22} color="var(--accent-color)" />}
              title="Password"
              subtitle="Update your login password"
              action="Change"
              onClick={() => setShowPasswordModal(true)}
            />
          </div>

          <p
            className="text-[11px] font-bold tracking-widest mb-3 uppercase"
            style={{ color: '#8B909A' }}
          >
            Danger Zone
          </p>

          <div
            className="rounded-[20px] overflow-hidden border"
            style={{ backgroundColor: '#161920', borderColor: '#242830' }}
          >
            <Row
              icon={<Trash2 size={22} color="#FF5A52" />}
              title="Delete account"
              subtitle=""
              action="Delete"
              danger
              onClick={() => setShowDeleteConfirm(true)}
            />
          </div>
        </div>

        {/* Change Email Modal */}
        {showEmailModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-5 bg-black/70">
            <div
              className="w-full max-w-[340px] rounded-[28px] p-6"
              style={{
                backgroundColor: '#161920',
                border: '1px solid #242830',
              }}
            >
              <button
                onClick={() => setShowEmailModal(false)}
                className="ml-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#20242D' }}
              >
                <X size={18} color="#F0F2F5" />
              </button>

              <h2 className="text-[22px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
                Change Email
              </h2>

              <p className="text-[14px] mb-5" style={{ color: '#A0A5B0' }}>
                Enter your new email address. You may need to confirm it through email.
              </p>

              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="New email"
                className="w-full px-4 py-3 rounded-[14px] border mb-5 outline-none"
                style={{
                  backgroundColor: '#0D0F14',
                  borderColor: '#242830',
                  color: '#F0F2F5',
                }}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 py-3 rounded-[16px] font-bold"
                  style={{ backgroundColor: '#20242D', color: '#F0F2F5' }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleChangeEmail}
                  className="flex-1 py-3 rounded-[16px] font-bold"
                  style={{ backgroundColor: 'var(--accent-color)', color: '#0D0F14' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-5 bg-black/70">
            <div
              className="w-full max-w-[340px] rounded-[28px] p-6"
              style={{
                backgroundColor: '#161920',
                border: '1px solid #242830',
              }}
            >
              <button
                onClick={() => setShowPasswordModal(false)}
                className="ml-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#20242D' }}
              >
                <X size={18} color="#F0F2F5" />
              </button>

              <h2 className="text-[22px] font-bold mb-3" style={{ color: '#F0F2F5' }}>
                Change Password
              </h2>

              <p className="text-[14px] mb-5" style={{ color: '#A0A5B0' }}>
                Enter a new password for your account.
              </p>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full px-4 py-3 rounded-[14px] border mb-3 outline-none"
                style={{
                  backgroundColor: '#0D0F14',
                  borderColor: '#242830',
                  color: '#F0F2F5',
                }}
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-[14px] border mb-5 outline-none"
                style={{
                  backgroundColor: '#0D0F14',
                  borderColor: '#242830',
                  color: '#F0F2F5',
                }}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 rounded-[16px] font-bold"
                  style={{ backgroundColor: '#20242D', color: '#F0F2F5' }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleChangePassword}
                  className="flex-1 py-3 rounded-[16px] font-bold"
                  style={{ backgroundColor: 'var(--accent-color)', color: '#0D0F14' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center px-5 bg-black/70">
            <div
              className="w-full max-w-[340px] rounded-[28px] p-6"
              style={{
                backgroundColor: '#161920',
                border: '1px solid #242830',
              }}
            >
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="ml-auto mb-2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#20242D' }}
              >
                <X size={18} color="#F0F2F5" />
              </button>

              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: 'rgba(255, 69, 58, 0.12)' }}
              >
                <Trash2 size={30} color="#FF5A52" />
              </div>

              <h2 className="text-[22px] font-bold text-center mb-3" style={{ color: '#F0F2F5' }}>
                Delete account?
              </h2>

              <p className="text-[14px] leading-relaxed text-center mb-6" style={{ color: '#A0A5B0' }}>
                This will permanently delete your account and cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 rounded-[16px] font-bold"
                  style={{ backgroundColor: '#20242D', color: '#F0F2F5' }}
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    alert('Delete account logic coming next')
                    setShowDeleteConfirm(false)
                  }}
                  className="flex-1 py-3 rounded-[16px] font-bold"
                  style={{ backgroundColor: '#FF453A', color: 'white' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}