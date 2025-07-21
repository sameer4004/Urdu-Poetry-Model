import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('براہ کرم تمام فیلڈز بھریں');
      setIsLoading(false);
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('غلط ای میل یا پاس ورڈ');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-[#f7ecd7] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-[#e2d3b7]" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#2d2d2d] mb-2">خوش آمدید</h2>
        <p className="text-[#4b3f2a]">اپنے اکاؤنٹ میں لاگ ان کریں</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
        <div>
          <label className="block text-sm font-medium text-[#4b3f2a] mb-2">
            ای میل
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#bfae8e] w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#e2d3b7] rounded-lg focus:ring-2 focus:ring-[#bfae8e] focus:border-transparent transition-all duration-200 bg-[#fdf6ee] text-[#2d2d2d] placeholder-[#bfae8e]"
              placeholder="ای میل درج کریں"
              dir="ltr"
              style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
              autoComplete="new-email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4b3f2a] mb-2">
            پاس ورڈ
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#bfae8e] w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 border border-[#e2d3b7] rounded-lg focus:ring-2 focus:ring-[#bfae8e] focus:border-transparent transition-all duration-200 bg-[#fdf6ee] text-[#2d2d2d] placeholder-[#bfae8e]"
              placeholder="پاس ورڈ درج کریں"
              style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#bfae8e] hover:text-[#4b3f2a]"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2d4c2a] text-white py-3 rounded-lg hover:bg-[#1e331a] transition-colors duration-200 font-extrabold text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
        >
          {isLoading ? 'لاگ ان ہو رہا ہے...' : 'لاگ ان کریں'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-[#4b3f2a]">
          کیا آپ کا اکاؤنٹ نہیں ہے؟{' '}
          <button
            onClick={onSwitchToSignup}
            className="text-[#2d4c2a] hover:text-[#1e331a] font-extrabold transition-colors"
            style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}
          >
            نیا اکاؤنٹ بنائیں
          </button>
        </p>
      </div>
    </div>
  );
};