import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface DarkLoginScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export function DarkLoginScreen({ onLogin, onSignUp }: DarkLoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[390px] mx-auto min-h-[844px] px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-[32px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
            Stepwise
          </h1>
          <p className="text-[15px]" style={{ color: '#8B909A' }}>
            Welcome back.
          </p>
        </div>

        {/* Login Form Card */}
        <div
          className="rounded-[20px] p-6 mb-6"
          style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
        >
          {/* Email */}
          <div className="mb-4">
            <label className="block text-[12px] uppercase tracking-wide mb-2" style={{ color: '#8B909A' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-[12px] uppercase tracking-wide mb-2" style={{ color: '#8B909A' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} color="#8B909A" /> : <Eye size={18} color="#8B909A" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <button className="text-[13px]" style={{ color: '#00E5A0' }}>
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={onLogin}
            className="w-full py-3.5 rounded-[14px] font-bold text-[16px] mb-6"
            style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
          >
            Log in
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#242830' }} />
            <span className="text-[13px]" style={{ color: '#8B909A' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#242830' }} />
          </div>

          {/* Google Button */}
          <button
            className="w-full py-3.5 rounded-[14px] border flex items-center justify-center gap-3 transition-colors"
            style={{ borderColor: '#242830', backgroundColor: 'transparent' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.96H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.04l3.007-2.333z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            <span className="text-[15px]" style={{ color: '#F0F2F5' }}>
              Continue with Google
            </span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-[14px]" style={{ color: '#8B909A' }}>
            Don't have an account?{' '}
          </span>
          <button onClick={onSignUp} className="text-[14px] font-bold" style={{ color: '#00E5A0' }}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
