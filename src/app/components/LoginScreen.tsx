import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import Logo from './Logo'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up real auth (Supabase etc.)
    navigate('/home')
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#0D0F14',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ls-logo { animation: fadeUp 0.55s ease 0s both; }
        .ls-card { animation: fadeUp 0.55s ease 0.1s both; }
        .ls-foot { animation: fadeUp 0.55s ease 0.2s both; }

        .sw-input {
          width: 100%;
          background: #0D0F14;
          border: 1px solid #242830;
          border-radius: 12px;
          padding: 13px 16px;
          color: #F0F2F5;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .sw-input::placeholder { color: #8B909A; }
        .sw-input:focus { border-color: #00E5A0; }

        .sw-label {
          display: block;
          color: #8B909A;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .sw-btn-primary {
          width: 100%;
          background: #00E5A0;
          color: #0D0F14;
          border: none;
          border-radius: 14px;
          padding: 15px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .sw-btn-primary:hover  { opacity: 0.88; }
        .sw-btn-primary:active { transform: scale(0.98); }

        .sw-btn-google {
          width: 100%;
          background: transparent;
          color: #F0F2F5;
          border: 1px solid #242830;
          border-radius: 14px;
          padding: 14px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: border-color 0.2s, background 0.2s;
        }
        .sw-btn-google:hover { border-color: #8B909A; background: #161920; }
      `}</style>

      {/* Logo + greeting */}
      <div className="ls-logo" style={{ marginBottom: '32px', textAlign: 'center' }}>
        <Logo size={72} showText showTagline={false} />
        <p style={{ color: '#8B909A', fontSize: '0.95rem', marginTop: '10px' }}>
          Welcome back.
        </p>
      </div>

      {/* Card */}
      <div
        className="ls-card"
        style={{
          width: '100%',
          maxWidth: '400px',
          background: '#161920',
          border: '1px solid #242830',
          borderRadius: '20px',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {/* Email */}
          <div>
            <label className="sw-label">Email</label>
            <input
              className="sw-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="sw-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="sw-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: '48px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{
                  position: 'absolute', right: '14px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#8B909A', display: 'flex', alignItems: 'center',
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div style={{ textAlign: 'right', marginTop: '-8px' }}>
            <span style={{ color: '#00E5A0', fontSize: '0.88rem', cursor: 'pointer' }}>
              Forgot password?
            </span>
          </div>

          <button type="submit" className="sw-btn-primary">
            Log in
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: '#242830' }} />
          <span style={{ color: '#8B909A', fontSize: '0.85rem' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#242830' }} />
        </div>

        {/* Google */}
        <button className="sw-btn-google">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </div>

      {/* Footer */}
      <div className="ls-foot" style={{ marginTop: '24px', fontSize: '0.9rem', color: '#8B909A' }}>
        Don't have an account?{' '}
        <span
          style={{ color: '#00E5A0', fontWeight: 600, cursor: 'pointer' }}
          onClick={() => navigate('/signup')}
        >
          Sign up
        </span>
      </div>
    </div>
  )
}