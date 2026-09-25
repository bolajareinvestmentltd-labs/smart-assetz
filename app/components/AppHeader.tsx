'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../lib/user-context';
import { Settings } from 'lucide-react';

export default function AppHeader() {
  const { user, greeting } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[var(--brand-dark)]/80 border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Avatar + Greeting */}
        <div className="flex items-center gap-3 min-w-0">
          {user.loggedIn ? (
            <Link href="/profile" className="flex-shrink-0">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--brand-purple)] to-[#e79e23] flex items-center justify-center text-sm font-black text-white ring-2 ring-[#e79e23]/30">
                {user.avatarType === 'emoji' ? user.avatar : user.name.charAt(0).toUpperCase()}
              </div>
            </Link>
          ) : (
            <Link href="/auth/login" className="flex-shrink-0 h-9 w-9 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/50">?</Link>
          )}
          <div className="min-w-0">
            {user.loggedIn ? (
              <>
                <p className="text-[10px] text-white/40 leading-none">{greeting}</p>
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
              </>
            ) : (
              <p className="text-xs text-white/50">Welcome to Smart Assetz</p>
            )}
          </div>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex-shrink-0">
          <Image src="/logo.svg" alt="Smart Assetz" width={40} height={40} className="h-10 w-10 rounded-lg" priority />
        </Link>

        {/* Right: Settings */}
        <Link href="/settings/theme" className="flex-shrink-0 h-9 w-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
          <Settings className="h-4 w-4 text-white/50" />
        </Link>
      </div>
    </header>
  );
}
