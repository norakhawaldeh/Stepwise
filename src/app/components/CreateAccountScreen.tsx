import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface CreateAccountScreenProps {
  onCreateAccount: () => void;
  onBackToLogin: () => void;
}

export function CreateAccountScreen({ onCreateAccount, onBackToLogin }: CreateAccountScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAF7' }}>
      <div className="max-w-[390px] mx-auto min-h-[844px] px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBackToLogin}
          className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
        >
          <ArrowLeft size={20} color="#1A1F36" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[28px] font-bold mb-2" style={{ color: '#1A1F36' }}>
            Create account
          </h1>
          <p className="text-[15px]" style={{ color: '#666' }}>
            Let's get you unstuck.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-[20px] p-6 mb-6 shadow-lg">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nora"
              className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
              style={{ borderColor: '#E0E0E0' }}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
              style={{ borderColor: '#E0E0E0' }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
                style={{ borderColor: '#E0E0E0' }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-[13px] font-bold mb-2" style={{ color: '#1A1F36' }}>
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-transparent"
                style={{ borderColor: '#E0E0E0' }}
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              className="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5"
              style={{
                borderColor: agreedToTerms ? '#FF6B4A' : '#D0D0D0',
                backgroundColor: agreedToTerms ? '#FF6B4A' : 'transparent',
              }}
            >
              {agreedToTerms && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
            <p className="text-[13px]" style={{ color: '#666' }}>
              I agree to the{' '}
              <a href="#" className="underline" style={{ color: '#FF6B4A' }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="underline" style={{ color: '#FF6B4A' }}>Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Create Account Button */}
        <button
          onClick={onCreateAccount}
          className="w-full py-3.5 rounded-[14px] text-white font-bold text-[16px] mb-6 shadow-lg"
          style={{
            backgroundColor: '#1A1F36',
            boxShadow: '0 4px 12px rgba(255, 107, 74, 0.3)',
          }}
        >
          Create my account
        </button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-[14px]" style={{ color: '#666' }}>
            Already have an account?{' '}
          </span>
          <button onClick={onBackToLogin} className="text-[14px] font-bold" style={{ color: '#FF6B4A' }}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
