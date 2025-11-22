import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, TEST_CREDENTIALS } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => boolean;
  signup: (email: string, pass: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('aegpt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, pass: string): boolean => {
    // Mock Login Logic
    if (email === TEST_CREDENTIALS.email && pass === TEST_CREDENTIALS.password) {
      const testUser: User = {
        userId: 'test-user-001',
        email: email,
        name: 'Test User',
        subscriptionStatus: true,
        validUntil: '2099-01-01'
      };
      setUser(testUser);
      localStorage.setItem('aegpt_user', JSON.stringify(testUser));
      return true;
    }
    
    // Allow generic login for demo if not specific test user
    if (email && pass) {
      const demoUser: User = {
        userId: `user-${Date.now()}`,
        email: email,
        name: email.split('@')[0],
        subscriptionStatus: true,
        validUntil: '2099-01-01'
      };
      setUser(demoUser);
      localStorage.setItem('aegpt_user', JSON.stringify(demoUser));
      return true;
    }
    return false;
  };

  const signup = (email: string, pass: string) => {
    // Auto-login after signup with "Free Test Mode" privileges
    login(email, pass);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aegpt_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};