import React, { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fake login: always succeed, set fake user
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setUser({ name: 'مہمان', email });
    setIsAuthenticated(true);
    setIsLoading(false);
    return true;
  };

  // Fake signup: always succeed, set fake user
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setUser({ name: name || 'مہمان', email });
    setIsAuthenticated(true);
    setIsLoading(false);
    return true;
  };

  // Fake logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};