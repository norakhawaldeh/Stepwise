import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Logo from './Logo'
import { supabase } from '../../supabaseClient'

interface DarkLoginScreenProps {
  onLogin: () => void
  onSignUp: () => void
}

export function DarkLoginScreen({ onLogin, onSignUp }: DarkLoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[390px] mx-auto min-h-[844px] px-6 py-12">
        <div
          className="ls-logo"
          style={{ marginBottom: '32px', textAlign: 'center' }}
        >
          <Logo size={68} showText={false} showTagline={false} />

          <h1
            style={{
              fontSize: '3.2rem',
              fontWeight: 850,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              marginTop: '14px',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: '#F0F2F5' }}>Step</span>
            <span style={{ color: '#00E5A0' }}>wise</span>
          </h1>

          <p
            style={{
              color: '#8B909A',
              fontSize: '0.95rem',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            Turn deadlines into doable steps.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div
            className="rounded-[20px] p-6 mb-6"
            style={{
              backgroundColor: '#161920',
              border: '1px solid #242830',
            }}
          >
            <div className="mb-4">
              <label
                className="block text-[12px] uppercase tracking-wide mb-2"
                style={{ color: '#8B909A' }}
              >
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                style={{
                  backgroundColor: '#0D0F14',
                  borderColor: '#242830',
                  color: '#F0F2F5',
                }}
              />
            </div>

            <div className="mb-2">
              <label
                className="block text-[12px] uppercase tracking-wide mb-2"
                style={{ color: '#8B909A' }}
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                  style={{
                    backgroundColor: '#0D0F14',
                    borderColor: '#242830',
                    color: '#F0F2F5',
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#8B909A" />
                  ) : (
                    <Eye size={18} color="#8B909A" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right mb-4">
              <button
                type="button"
                className="text-[13px]"
                style={{ color: '#00E5A0' }}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p
                style={{
                  color: '#FF6B57',
                  fontSize: '0.85rem',
                  marginBottom: '14px',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-[14px] font-bold text-[16px] mb-6 disabled:opacity-60"
              style={{
                backgroundColor: '#00E5A0',
                color: '#0D0F14',
              }}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: '#242830' }}
              />

              <span className="text-[13px]" style={{ color: '#8B909A' }}>
                or
              </span>

              <div
                className="flex-1 h-px"
                style={{ backgroundColor: '#242830' }}
              />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3.5 rounded-[14px] border flex items-center justify-center gap-3 transition-colors"
              style={{
                borderColor: '#242830',
                backgroundColor: 'transparent',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.96H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.04l3.007-2.333z" />
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
              </svg>

              <span className="text-[15px]" style={{ color: '#F0F2F5' }}>
                Continue with Google
              </span>
            </button>
          </div>
        </form>

        <div className="text-center">
          <span className="text-[14px]" style={{ color: '#8B909A' }}>
            Don't have an account?{' '}
          </span>

          <button
            type="button"
            onClick={onSignUp}
            className="text-[14px] font-bold"
            style={{ color: '#00E5A0' }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}