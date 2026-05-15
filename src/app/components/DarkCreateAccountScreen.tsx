import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../../supabaseClient'

interface DarkCreateAccountScreenProps {
  onCreateAccount: () => void
  onBackToLogin: () => void
}

export function DarkCreateAccountScreen({
  onCreateAccount,
  onBackToLogin,
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

  if (password.length < 6) {
    setError('Password must be at least 6 characters.')
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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
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

    // SUCCESS
    console.log('Account created:', data)

    // save username locally for now
    localStorage.setItem('stepwise_username', name)

    // go to onboarding/home
    onCreateAccount()

  } catch (err) {
    setError('Something went wrong. Please try again.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[390px] mx-auto min-h-[844px] px-6 py-12">
        <button
          type="button"
          onClick={onBackToLogin}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} color="#00E5A0" />
        </button>

        <div className="mb-6">
          <h1 className="text-[28px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
            Create account
          </h1>
          <p className="text-[15px]" style={{ color: '#8B909A' }}>
            Start breaking deadlines into doable steps.
          </p>
        </div>

        <form onSubmit={handleCreateAccount}>
          <div
            className="rounded-[20px] p-6 mb-6"
            style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
          >
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
              />
            </div>

            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                  style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={18} color="#8B909A" /> : <Eye size={18} color="#8B909A" />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                  style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff size={18} color="#8B909A" /> : <Eye size={18} color="#8B909A" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5"
                style={{
                  borderColor: agreedToTerms ? '#00E5A0' : '#242830',
                  backgroundColor: agreedToTerms ? '#00E5A0' : 'transparent',
                }}
              >
                {agreedToTerms && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1.5"
                      stroke="#0D0F14"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              <p className="text-[13px]" style={{ color: '#8B909A' }}>
                I agree to the{' '}
                <a href="#" className="underline" style={{ color: '#00E5A0' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline" style={{ color: '#00E5A0' }}>
                  Privacy Policy
                </a>
              </p>
            </div>

            {error && (
              <p className="text-[13px] mt-4" style={{ color: '#FF6B57' }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-[14px] font-bold text-[16px] mb-6 disabled:opacity-60"
            style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
          >
            {loading ? 'Creating account...' : 'Create my account'}
          </button>
        </form>

        <div className="text-center">
          <span className="text-[14px]" style={{ color: '#8B909A' }}>
            Already have an account?{' '}
          </span>
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-[14px] font-bold"
            style={{ color: '#00E5A0' }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  )
}