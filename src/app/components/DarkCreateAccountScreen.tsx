import { useState } from 'react'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react'
import { supabase } from '../../supabaseClient'

interface DarkCreateAccountScreenProps {
  onCreateAccount: () => void
  onBackToLogin: () => void
  onBackToSplash: () => void
}

export function DarkCreateAccountScreen({
  onCreateAccount,
  onBackToLogin,
  onBackToSplash,
}: DarkCreateAccountScreenProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const accent = '#8B5CF6'

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError('')

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }

   const passwordRegex =
      /^(?=.*[A-Z])(?=.*[\d\W]).{8,}$/

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters and include a capital letter and number or symbol.'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.')
      return
    }

    try {
      setLoading(true)

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      if (error) {
        const message = error.message.toLowerCase()

        if (message.includes('rate limit')) {
          setError('Too many signup attempts. Wait a few minutes and try again.')
          return
        }

        if (
          message.includes('already') ||
          message.includes('registered') ||
          message.includes('exists')
        ) {
          setError('An account with this email already exists. Try logging in instead.')
          return
        }

        setError(error.message)
        return
      }

      localStorage.setItem('stepwiseUsername', name)
      onCreateAccount()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    borderColor: 'rgba(139,92,246,0.20)',
    color: '#E0DCF0',
    backgroundColor: 'rgba(139,92,246,0.07)',
  }

  return (
    <div
      className="min-h-screen overflow-y-auto"
      style={{
        background:
          'radial-gradient(ellipse 80% 38% at 50% 0%, rgba(80,30,170,0.35) 0%, transparent 58%), #060610',
        fontFamily: '"Nunito", "Outfit", "DM Sans", "Plus Jakarta Sans", system-ui, sans-serif',
      }}
    >
      <div className="max-w-[430px] mx-auto min-h-screen px-7 pt-12 pb-10 relative">

        {/* Back button */}
        <button
          type="button"
          onClick={onBackToSplash}
          className="absolute left-7 top-10"
        >
          <ArrowLeft size={24} color={accent} />
        </button>

        {/* Logo + Header */}
        <div className="pt-20 text-center mb-9">
          <div
            className="mb-6"
            style={{
              fontSize: '4.6rem',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#ECEAF8' }}>roo</span>
            <span style={{ color: accent }}>t</span>
            <span style={{ color: '#ECEAF8' }}>ed</span>
          </div>

          <h1
            className="text-[14px] font-bold tracking-[0.36em] uppercase mb-3"
            style={{ color: '#C8C2E0' }}
          >
            Create your account
          </h1>

          <p className="text-[14px]" style={{ color: '#4E4A60' }}>
            Build better habits. Grow every day.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateAccount}>
          <div className="space-y-3">

            {/* Full name */}
            <div className="relative">
              <User
                size={20}
                color="#5B5080"
                className="absolute left-5 top-1/2 -translate-y-1/2"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full h-[60px] rounded-[18px] border bg-transparent pl-[50px] pr-5 text-[15px] outline-none placeholder:text-[#35304A]"
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                size={20}
                color="#5B5080"
                className="absolute left-5 top-1/2 -translate-y-1/2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full h-[60px] rounded-[18px] border bg-transparent pl-[50px] pr-5 text-[15px] outline-none placeholder:text-[#35304A]"
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock
                  size={20}
                  color="#5B5080"
                  className="absolute left-5 top-1/2 -translate-y-1/2"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-[60px] rounded-[18px] border bg-transparent pl-[50px] pr-14 text-[15px] outline-none placeholder:text-[#35304A]"
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#3E3858" />
                  ) : (
                    <Eye size={20} color="#3E3858" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2 pl-1">
                <div
                  className="w-[2.5px] h-[13px] rounded-full shrink-0"
                  style={{ backgroundColor: accent, opacity: 0.45 }}
                />
                <p className="text-[12px]" style={{ color: '#625989' }}>
                  Use 8+ characters, 1 capital letter, and 1 number or symbol
                </p>
              </div>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <Lock
                size={20}
                color="#5B5080"
                className="absolute left-5 top-1/2 -translate-y-1/2"
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-[60px] rounded-[18px] border bg-transparent pl-[50px] pr-14 text-[15px] outline-none placeholder:text-[#35304A]"
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#3E3858" />
                ) : (
                  <Eye size={20} color="#3E3858" />
                )}
              </button>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <button
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className="w-[20px] h-[20px] rounded-[5px] border flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  borderColor: agreedToTerms ? accent : '#252138',
                  backgroundColor: agreedToTerms ? accent : 'transparent',
                }}
              >
                {agreedToTerms && (
                  <svg width="11" height="9" viewBox="0 0 14 11" fill="none">
                    <path
                      d="M1 5.5L5 9.5L13 1"
                      stroke="#FFFFFF"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              <p className="text-[13px] leading-6" style={{ color: '#4E4A60' }}>
                I agree to the{' '}
                <a href="#" className="underline" style={{ color: accent }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline" style={{ color: accent }}>
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[12.5px]" style={{ color: '#FF6B6B' }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] transition-transform mt-8"
              style={{
                background: 'linear-gradient(135deg, #3e0b96 0%, #4C1D95 100%)',
                color: '#FFFFFF',
                boxShadow: '0 8px 30px rgba(76,29,149,0.50)',
              }}
            >
              {loading ? 'Creating account...' : 'Create my account'}
              {!loading && <ArrowRight size={0} />}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-9">
          <div className="flex-1 h-px" style={{ backgroundColor: '#3e3859' }} />
          <span className="text-[11px] tracking-widest" style={{ color: '#3e3859' }}>
            OR
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#3e3859' }} />
        </div>

        {/* Log in link */}
        <div className="text-center">
          <span className="text-[13.5px]" style={{ color: '#4E4A60' }}>
            Already have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-[13.5px] font-bold"
            style={{ color: accent }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  )
}