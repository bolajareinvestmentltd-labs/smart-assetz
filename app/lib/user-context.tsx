'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const AVATARS = ['😎', '🦊', '🐱', '🦁', '🐸', '🌺', '🔥', '💎'];

interface UserState {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  avatarType: 'emoji' | 'initials';
  role: string;
  kycStatus: 'none' | 'pending' | 'verified';
  walletBalance: number;
  referralCode: string;
  totalReferrals: number;
  memberSince: string;
  loggedIn: boolean;
}

const DEFAULT_USER: UserState = {
  name: '', email: '', phone: '', avatar: '😎', avatarType: 'initials',
  role: 'consumer', kycStatus: 'none', walletBalance: 0, referralCode: '',
  totalReferrals: 0, memberSince: '', loggedIn: false,
};

const DEMO_USER: UserState = {
  name: 'Demo User', email: 'demo@smartassetz.ng', phone: '+234 800 123 4567',
  avatar: '😎', avatarType: 'initials', role: 'consumer', kycStatus: 'verified',
  walletBalance: 250000, referralCode: 'DEMO2026', totalReferrals: 5,
  memberSince: '2025-06-15', loggedIn: true,
};

type UserContextType = {
  user: UserState;
  updateUser: (partial: Partial<UserState>) => void;
  login: (name: string, email: string, role: string) => void;
  logout: () => void;
  greeting: string;
  avatars: string[];
};

const UserContext = createContext<UserContextType>({
  user: DEFAULT_USER, updateUser: () => {}, login: () => {}, logout: () => {},
  greeting: 'Hello', avatars: AVATARS,
});

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

function getGreetingEmoji(): string {
  const h = new Date().getHours();
  if (h < 12) return '☀️';
  if (h < 17) return '🌤️';
  return '🌙';
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState>(DEFAULT_USER);
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const saved = localStorage.getItem('sa-user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setGreeting(`${getGreeting()} ${getGreetingEmoji()}`);
    const interval = setInterval(() => setGreeting(`${getGreeting()} ${getGreetingEmoji()}`), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (user.loggedIn) localStorage.setItem('sa-user', JSON.stringify(user));
  }, [user]);

  const updateUser = (partial: Partial<UserState>) => setUser(prev => ({ ...prev, ...partial }));

  const login = (name: string, email: string, role: string) => {
    const u: UserState = {
      ...DEMO_USER, name, email, role, loggedIn: true,
      memberSince: new Date().toISOString().split('T')[0],
      referralCode: `SA${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    };
    setUser(u);
    localStorage.setItem('sa-user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem('sa-user');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, login, logout, greeting, avatars: AVATARS }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
