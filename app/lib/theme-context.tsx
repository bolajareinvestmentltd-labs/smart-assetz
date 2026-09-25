'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const THEMES = [
  { id: 'purple', label: 'Royal Purple', primary: '#621063', secondary: '#911b70', accent: '#e79e23', surface: '#120a1c', card: '#181122', dark: '#0b0610' },
  { id: 'navy', label: 'Deep Navy', primary: '#1e3a5f', secondary: '#2c5282', accent: '#e79e23', surface: '#0c1929', card: '#132238', dark: '#060e18' },
  { id: 'teal', label: 'Ocean Teal', primary: '#0d6e6e', secondary: '#0891b2', accent: '#e79e23', surface: '#0a1f1f', card: '#112828', dark: '#050f0f' },
  { id: 'rose', label: 'Warm Rose', primary: '#9f1239', secondary: '#e11d48', accent: '#e79e23', surface: '#1c0a12', card: '#261020', dark: '#0f050a' },
  { id: 'magenta', label: 'Neon Magenta', primary: '#86198f', secondary: '#a21caf', accent: '#e79e23', surface: '#1a0a1c', card: '#241028', dark: '#0d050f' },
  { id: 'charcoal', label: 'Charcoal', primary: '#374151', secondary: '#4b5563', accent: '#e79e23', surface: '#111318', card: '#1a1d24', dark: '#0a0b0e' },
  { id: 'slate', label: 'Cool Slate', primary: '#334155', secondary: '#475569', accent: '#38bdf8', surface: '#0f1521', card: '#16202e', dark: '#080c13' },
  { id: 'black', label: 'Pure Black', primary: '#18181b', secondary: '#27272a', accent: '#e79e23', surface: '#09090b', card: '#121214', dark: '#000000' },
];

type Theme = typeof THEMES[0];
type ThemeContextType = { theme: Theme; themes: Theme[]; setThemeId: (id: string) => void };

const ThemeContext = createContext<ThemeContextType>({ theme: THEMES[0], themes: THEMES, setThemeId: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState('purple');

  useEffect(() => {
    const saved = localStorage.getItem('sa-theme');
    if (saved) setThemeId(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('sa-theme', themeId);
    const t = THEMES.find(th => th.id === themeId) || THEMES[0];
    const root = document.documentElement;
    root.style.setProperty('--brand-purple', t.primary);
    root.style.setProperty('--brand-magenta', t.secondary);
    root.style.setProperty('--brand-surface', t.surface);
    root.style.setProperty('--brand-card', t.card);
    root.style.setProperty('--brand-dark', t.dark);
  }, [themeId]);

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, themes: THEMES, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export { THEMES };
