import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { supabase } from '../../supabaseClient'

interface DarkLoginScreenProps {
  onLogin: () => void
  onSignUp: () => void
}

export function DarkLoginScreen({ onLogin, onSignUp }: DarkLoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResetToast, setShowResetToast] = useState(false)

  const accent = '#8B5CF6'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    })

    if (otpError) {
      const msg = otpError.message.toLowerCase()

      if (
        msg.includes('user not found') ||
        msg.includes('signup') ||
        msg.includes('create')
      ) {
        setLoading(false)
        setError("Email doesn't exist. Create an account first.")
        return
      }
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (loginError) {
      const msg = loginError.message.toLowerCase()

      if (
        msg.includes('invalid login credentials') ||
        msg.includes('invalid')
      ) {
        setError('Incorrect password. Please try again.')
        return
      }

      setError(loginError.message)
      return
    }

    onLogin()
  }

  const handleGoogleLogin = async () => {
    setError('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173',
      },
    })

    if (error) {
      setError(error.message)
    }
  }

  const handleForgotPassword = async () => {
    setError('')

    if (!email.trim()) {
      setError('Enter your email first, then tap forgot password.')
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'http://localhost:5173',
    })

    if (error) {
      setError(error.message)
      return
    }

    setShowResetToast(true)
    setTimeout(() => setShowResetToast(false), 3000)
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
          onClick={onSignUp}
          className="absolute left-7 top-10"
        >
          <ArrowLeft size={24} color={accent} />
        </button>

        {/* Logo + Header */}
        <div className="pt-20 text-center mb-12">
          <div
            className="mb-8"
            style={{
              fontSize: '4.8rem',
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
            className="text-[15px] font-bold tracking-[0.32em] uppercase mb-3"
            style={{ color: '#C8C2E0' }}
          >
            Welcome back
          </h1>

          <p className="text-[14px]" style={{ color: '#4E4A60' }}>
            Log in to continue your journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="space-y-3">

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
                required
                className="w-full h-[60px] rounded-[18px] border bg-transparent pl-[50px] pr-5 text-[15px] outline-none placeholder:text-[#35304A]"
                style={inputStyle}
              />
            </div>

            {/* Password */}
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
                required
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

            {/* Remember me + Forgot password row */}
            <div className="flex items-center justify-between pt-1 pb-1">
              {/* Remember me checkbox */}
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2"
              >
                <div
                  className="w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: rememberMe ? accent : '#252138',
                    backgroundColor: rememberMe ? accent : 'transparent',
                  }}
                >
                  {rememberMe && (
                    <svg width="10" height="8" viewBox="0 0 14 11" fill="none">
                      <path
                        d="M1 5.5L5 9.5L13 1"
                        stroke="#FFFFFF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[13px]" style={{ color: '#4E4A60' }}>
                  Remember me
                </span>
              </button>

              {/* Forgot password */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[13px] font-semibold"
                style={{ color: accent }}
              >
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-[12.5px]" style={{ color: '#FF6B6B' }}>
                {error}
              </p>
            )}

            {/* Log in button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[60px] rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] transition-transform mt-6"
              style={{
                background: 'linear-gradient(135deg, #3e0b96 0%, #4C1D95 100%)',
                color: '#FFFFFF',
                boxShadow: '0 8px 30px rgba(76,29,149,0.50)',
              }}
            >
              {loading ? 'Logging in...' : 'Log in'}
              {!loading && <ArrowRight size={0} />}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px" style={{ backgroundColor: '#3e3859' }} />
          <span className="text-[11px] tracking-widest" style={{ color: '#3e3859' }}>
            OR
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#3e3859' }} />
        </div>

        {/* Google sign-in */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full h-[60px] rounded-[18px] border flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          style={{
            borderColor: 'rgba(139,92,246,0.20)',
            backgroundColor: 'rgba(139,92,246,0.07)',
          }}
        >
          {/* Google icon */}
          <svg width="20" height="20" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.96H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.04l3.007-2.333z" />
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
          </svg>
          <span className="text-[15px] font-medium" style={{ color: '#C8C2E0' }}>
            Continue with Google
          </span>
        </button>

        {/* Sign up link */}
        <div className="text-center mt-8">
          <span className="text-[13.5px]" style={{ color: '#4E4A60' }}>
            Don't have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onSignUp}
            className="text-[13.5px] font-bold"
            style={{ color: accent }}
          >
            Create account
          </button>
        </div>
      </div>

      {/* Reset toast */}
      {showResetToast && (
        <div
          className="fixed left-1/2 -translate-x-1/2 bottom-8 px-5 py-3 rounded-[18px] z-50"
          style={{
            background: 'rgba(12,10,24,0.97)',
            border: '1px solid rgba(139,92,246,0.25)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <p className="text-[14px] font-medium" style={{ color: '#C8C2E0' }}>
            Password reset email sent
          </p>
        </div>
      )}
    </div>
  )
}