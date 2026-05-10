import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface DarkCreateAccountScreenProps {
  onCreateAccount: () => void;
  onBackToLogin: () => void;
}

export function DarkCreateAccountScreen({ onCreateAccount, onBackToLogin }: DarkCreateAccountScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0D0F14' }}>
      <div className="max-w-[390px] mx-auto min-h-[844px] px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} color="#00E5A0" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold mb-2" style={{ color: '#F0F2F5' }}>
            Create account
          </h1>
          <p className="text-[15px]" style={{ color: '#8B909A' }}>
            Let's get you unstuck.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-[20px] p-6 mb-6"
          style={{ backgroundColor: '#161920', border: '1px solid #242830' }}
        >
          {/* Name */}
          <div className="mb-4">
            <label className="block text-[12px] uppercase tracking-wide mb-2" style={{ color: '#8B909A' }}>
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nora"
              className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
              style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
            />
          </div>

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
          <div className="mb-4">
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

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-[12px] uppercase tracking-wide mb-2" style={{ color: '#8B909A' }}>
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-1 focus:ring-[#00E5A0] focus:border-transparent"
                style={{ backgroundColor: '#0D0F14', borderColor: '#242830', color: '#F0F2F5' }}
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={18} color="#8B909A" /> : <Eye size={18} color="#8B909A" />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5"
              style={{
                borderColor: agreedToTerms ? '#00E5A0' : '#242830',
                backgroundColor: agreedToTerms ? '#00E5A0' : 'transparent',
              }}
            >
              {agreedToTerms && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="#0D0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <p className="text-[13px]" style={{ color: '#8B909A' }}>
              I agree to the{' '}
              <a href="#" className="underline" style={{ color: '#00E5A0' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="underline" style={{ color: '#00E5A0' }}>Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Create Account Button */}
        <button
          onClick={onCreateAccount}
          className="w-full py-3.5 rounded-[14px] font-bold text-[16px] mb-6"
          style={{ backgroundColor: '#00E5A0', color: '#0D0F14' }}
        >
          Create my account
        </button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-[14px]" style={{ color: '#8B909A' }}>
            Already have an account?{' '}
          </span>
          <button onClick={onBackToLogin} className="text-[14px] font-bold" style={{ color: '#00E5A0' }}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
