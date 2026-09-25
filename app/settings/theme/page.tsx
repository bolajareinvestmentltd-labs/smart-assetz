'use client';

import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';

export default function ThemePage() {
  const { theme, themes, setThemeId } = useTheme();

  return (
    <main className="min-h-[100dvh] px-4 py-8 sm:px-6 bg-[var(--brand-dark,#0b0610)]">
      <div className="max-w-sm mx-auto space-y-8">
        <Link href="/profile" className="flex items-center gap-1 text-xs text-white/50 hover:text-white">
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white">CHANGE YOUR<br />APP APPEARANCE</h1>
          <p className="text-sm text-white/50">Customize how your dashboard will look.</p>
        </div>

        {/* Preview Card */}
        <div className="rounded-2xl border border-white/10 p-4 space-y-3" style={{ backgroundColor: theme.card }}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: theme.primary }}>SA</div>
            <div>
              <p className="text-xs font-bold text-white">Smart Assetz</p>
              <p className="text-[10px] text-white/30">{theme.label} Theme</p>
            </div>
          </div>
          <div className="h-16 rounded-xl" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }} />
          <div className="flex gap-2">
            <div className="flex-1 h-8 rounded-lg" style={{ backgroundColor: theme.primary + '40' }} />
            <div className="flex-1 h-8 rounded-lg bg-white/5" />
          </div>
        </div>

        {/* Color Dots */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {themes.map(t => (
            <button key={t.id} onClick={() => setThemeId(t.id)}
              className={`h-10 w-10 rounded-full relative transition-transform hover:scale-110 ${theme.id === t.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--brand-dark)] scale-110' : ''}`}
              style={{ backgroundColor: t.primary }}
              title={t.label}
            >
              {theme.id === t.id && <Check className="h-4 w-4 text-white absolute inset-0 m-auto" />}
            </button>
          ))}
        </div>

        {/* Labels */}
        <div className="grid grid-cols-2 gap-2">
          {themes.map(t => (
            <button key={t.id} onClick={() => setThemeId(t.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${theme.id === t.id ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}>
              <span className="inline-block h-2 w-2 rounded-full mr-2" style={{ backgroundColor: t.primary }} />
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
