'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

export default function NINPage() {
  const router = useRouter();
  const [nin, setNin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify/face-scan');
  };

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 bg-[var(--brand-dark,#0b0610)]">
      <div className="w-full max-w-sm mx-auto space-y-6">
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="Smart Assetz" width={48} height={48} className="h-12 w-12 rounded-xl" />
        </div>
        <div className="text-center space-y-2">
          <ShieldCheck className="h-10 w-10 text-[#e79e23] mx-auto" />
          <h1 className="text-2xl font-black text-white">Identity Verification</h1>
          <p className="text-xs text-white/50">Enter your NIN to verify your identity as a partner</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-white/40 block mb-1">National Identification Number (NIN)</label>
            <input type="text" required placeholder="12345678901" maxLength={11} value={nin} onChange={e => setNin(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white text-center tracking-[0.3em] font-mono placeholder:text-white/20 outline-none focus:border-[var(--brand-purple)]" />
            <p className="text-[10px] text-white/30 mt-1 text-center">{nin.length}/11 digits</p>
          </div>
          <button type="submit" disabled={nin.length !== 11}
            className="w-full py-3.5 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white hover:brightness-110 transition disabled:opacity-30 disabled:cursor-not-allowed">
            Continue to Face Scan
          </button>
        </form>
        <p className="text-[10px] text-white/20 text-center">Your data is encrypted and secure. We do not store your NIN.</p>
      </div>
    </main>
  );
}
