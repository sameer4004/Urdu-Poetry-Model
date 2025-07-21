import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { theme } = useTheme();

  const inputBase = `w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`;
  const inputPass = `w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ${theme === 'dark' ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-500'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('براہ کرم تمام فیلڈز بھریں');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('پاس ورڈ میں مطابقت نہیں');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے');
      setIsLoading(false);
      return;
    }

    const success = await signup(name, email, password);
    if (!success) {
      setError('اکاؤنٹ بنانے میں خرابی');
    }
    setIsLoading(false);
  };

  return (
    <div className={theme === 'dark' ? "bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-md" : "bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"}>
      <div className="text-center mb-8">
        <h2 className={theme === 'dark' ? "text-3xl font-bold text-white mb-2" : "text-3xl font-bold text-gray-800 mb-2"}>نیا اکاؤنٹ</h2>
        <p className={theme === 'dark' ? "text-gray-300" : "text-gray-600"}>شاعری کی دنیا میں خوش آمدید</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
        <div>
          <label className={theme === 'dark' ? "block text-sm font-medium text-gray-200 mb-2" : "block text-sm font-medium text-gray-700 mb-2"}>
            نام
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputBase}
              placeholder="آپ کا نام"
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <label className={theme === 'dark' ? "block text-sm font-medium text-gray-200 mb-2" : "block text-sm font-medium text-gray-700 mb-2"}>
            ای میل
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputBase}
              placeholder="ای میل درج کریں"
              dir="ltr"
              autoComplete="new-email"
            />
          </div>
        </div>

        <div>
          <label className={theme === 'dark' ? "block text-sm font-medium text-gray-200 mb-2" : "block text-sm font-medium text-gray-700 mb-2"}>
            پاس ورڈ
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputPass}
              placeholder="پاس ورڈ درج کریں"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className={theme === 'dark' ? "block text-sm font-medium text-gray-200 mb-2" : "block text-sm font-medium text-gray-700 mb-2"}>
            پاس ورڈ کی تصدیق
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputBase}
              placeholder="پاس ورڈ دوبارہ لکھیں"
              autoComplete="new-password"
            />
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
          className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'اکاؤنٹ بن رہا ہے...' : 'اکاؤنٹ بنائیں'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className={theme === 'dark' ? "text-gray-300" : "text-gray-600"}>
          پہلے سے اکاؤنٹ ہے؟{' '}
          <button
            onClick={onSwitchToLogin}
            className={theme === 'dark' ? "text-white hover:text-gray-300 font-medium transition-colors" : "text-gray-800 hover:text-gray-600 font-medium transition-colors"}
          >
            لاگ ان کریں
          </button>
        </p>
      </div>
    </div>
  );
};