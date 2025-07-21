import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-0 bg-[#f7ecd7] relative overflow-hidden" style={{ fontFamily: 'Noto Nastaliq Urdu, serif' }}>
      {/* Ghalib image left side, flush with top, left, and bottom edges */}
      <div className="absolute left-0 top-0 bottom-0 h-full w-[350px] flex items-end z-1" style={{ background: 'linear-gradient(to right, #f7ecd7 80%, transparent 100%)' }}>
        <img
          src="/ghalib.jpg"
          alt="Mirza Ghalib"
          className="h-full w-full object-cover shadow-2xl"
          style={{ zIndex: 1, background: 'transparent' }}
        />
      </div>
      {/* Centered card and title */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-[#222] mb-2 flex items-center justify-center gap-2">
            <span>✨</span> اردو شاعری <span>✨</span>
          </h1>
          <p className="text-[#4b3f2a] text-xl mb-6">خوبصورت شاعری کا خزانہ</p>
        </div>
        <div className="w-full flex justify-center">
          {isLogin ? (
            <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
      {/* Paper/vintage effect dots */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-10 left-1/2 w-2 h-2 rounded-full bg-[#bfae8e] opacity-60"></div>
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-[#e2d3b7] opacity-80"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 rounded-full bg-[#bfae8e] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 rounded-full bg-[#e2d3b7] opacity-80"></div>
        <div className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-[#bfae8e] opacity-60"></div>
      </div>
    </div>
  );
};