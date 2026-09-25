'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Eye, EyeOff, Fingerprint } from 'lucide-react';
import { useUser } from '../../lib/user-context';

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useUser();
  const [email, setEmail] = useState(user.loggedIn ? user.email : '');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const isReturning = user.loggedIn || !!user.name;
  const maskedEmail = email ? email.replace(/(.{2}).+(@.+)/, '$1****$2') : '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()).trim() || 'Demo User';
    login(name, email, 'consumer');
    router.push('/');
  };

  const handleBiometric = () => {
    login('Demo User', 'demo@smartassetz.ng', 'consumer');
    router.push('/');
  };

  return (
    <main className="min-h-[100dvh] flex flex-col px-4 py-8 sm:px-6 bg-[var(--brand-dark,#0b0610)] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(98,16,99,0.12)_0%,transparent_50%)]" />

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col flex-1">
        {/* Avatar + Welcome */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[var(--brand-purple,#621063)] to-[#e79e23] flex items-center justify-center text-lg font-black text-white ring-2 ring-[#e79e23]/30">
            {isReturning && user.name ? user.name.charAt(0).toUpperCase() : 'SA'}
          </div>
          <div>
            <p className="text-xs text-white/40">{isReturning ? 'Welcome Back,' : 'Welcome to'}</p>
            <p className="text-lg font-black text-white">{isReturning && user.name ? user.name : 'Smart Assetz'}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 flex-1">
          {/* Email */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <input
              type="email" required placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
            <span className="text-[10px] text-white/30">✏️</span>
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <Lock className="h-4 w-4 text-white/30 flex-shrink-0" />
            <input
              type={showPw ? 'text' : 'password'} placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="text-white/30 hover:text-white/50">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="text-right">
            <Link href="#" className="text-xs text-[#e79e23] hover:underline">Reset password</Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="w-full py-3.5 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white hover:brightness-110 transition">
            Log in
          </button>

          <p className="text-center text-xs text-[#e79e23]/70">
            <Link href="/auth/register" className="hover:underline">Sign in with Google, Apple, or OTP →</Link>
          </p>

          <p className="text-center text-xs text-white/30">
            <Link href="/onboarding" className="hover:text-white/50">View Product Tour &amp; Hostels</Link>
          </p>
        </form>

        {/* Bottom: Quick Links + Biometric */}
        <div className="flex flex-col items-center gap-6 pt-8 pb-4">
          <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/40">
            🔗 Quick links
          </div>

          <button onClick={handleBiometric} className="flex flex-col items-center gap-2 group">
            <div className="h-14 w-14 rounded-full border-2 border-[var(--brand-purple,#621063)] flex items-center justify-center group-hover:bg-[var(--brand-purple,#621063)]/20 transition">
              <Fingerprint className="h-7 w-7 text-[var(--brand-purple,#621063)]" />
            </div>
            <span className="text-[10px] text-white/30">One-touch biometric login</span>
          </button>
        </div>
      </div>
    </main>
  );
}
