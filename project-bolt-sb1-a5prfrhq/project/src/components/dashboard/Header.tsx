import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme === 'dark' ? "bg-black shadow-lg border-b border-gray-800" : "bg-white shadow-lg border-b border-gray-200"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <h1 className={theme === 'dark' ? "text-2xl font-bold text-white mr-2" : "text-2xl font-bold text-black mr-2"}>
                اردو شاعری
              </h1>
              <span className="text-2xl mr-2">🌙</span>
              <button
                onClick={toggleTheme}
                className={theme === 'dark' ? "px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 ml-2" : "px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300 ml-2"}
              >
                {theme === 'dark' ? 'Light 🌞' : 'Dark 🌙'}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={theme === 'dark' ? "flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg" : "flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg"}>
              <User className={theme === 'dark' ? "w-5 h-5 text-white" : "w-5 h-5 text-black"} />
              <span className={theme === 'dark' ? "text-white font-medium" : "text-black font-medium"}>{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className={theme === 'dark' ? "flex items-center space-x-2 px-4 py-2 text-white hover:text-black hover:bg-white rounded-lg transition-colors duration-200" : "flex items-center space-x-2 px-4 py-2 text-black hover:text-white hover:bg-black rounded-lg transition-colors duration-200"}
            >
              <LogOut className="w-5 h-5" />
              <span>لاگ آؤٹ</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};