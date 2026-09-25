'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Users, KeyRound, Building2, TrendingUp, Home, GraduationCap, Hotel } from 'lucide-react';
import { useUser } from '../../lib/user-context';

const ROLES = [
  { id: 'consumer', label: 'Consumer', desc: 'Browse & buy properties', icon: Home },
  { id: 'agent', label: 'Agent', desc: 'List & manage properties', icon: Users },
  { id: 'seller', label: 'Seller', desc: 'Sell your properties', icon: KeyRound },
  { id: 'landlord', label: 'Landlord', desc: 'Manage rental units', icon: Building2 },
  { id: 'investor', label: 'Investor', desc: 'Track investments', icon: TrendingUp },
  { id: 'student', label: 'Student', desc: 'Find campus hostels', icon: GraduationCap },
  { id: 'tenant', label: 'Tenant', desc: 'Manage your rental', icon: Home },
  { id: 'shortlet-hotel', label: 'Short-Let Host', desc: 'List short-term rentals', icon: Hotel },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useUser();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('consumer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    login(name, email, role);
    const partnerRoles = ['agent', 'seller', 'landlord', 'investor', 'shortlet-hotel'];
    if (partnerRoles.includes(role)) {
      router.push('/verify/nin');
    } else {
      router.push('/');
    }
  };

  return (
    <main className="min-h-[100dvh] flex flex-col px-4 py-8 sm:px-6 bg-[var(--brand-dark,#0b0610)] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(98,16,99,0.12)_0%,transparent_50%)]" />

      <div className="relative z-10 w-full max-w-sm mx-auto">
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="Smart Assetz" width={48} height={48} className="h-12 w-12 rounded-xl" />
        </div>
        <h1 className="text-2xl font-black text-white text-center mb-1">Create Account</h1>
        <p className="text-xs text-white/40 text-center mb-8">Step {step} of 2</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <input type="text" required placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 outline-none focus:border-[var(--brand-purple)]" />
              <input type="email" required placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 outline-none focus:border-[var(--brand-purple)]" />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 outline-none focus:border-[var(--brand-purple)]" />
            </>
          ) : (
            <>
              <p className="text-sm text-white/60 mb-2">Select your role:</p>
              <div className="grid grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                {ROLES.map(r => {
                  const Icon = r.icon;
                  return (
                    <button key={r.id} type="button" onClick={() => setRole(r.id)}
                      className={`p-3 rounded-xl border text-left transition ${role === r.id ? 'border-[#e79e23] bg-[#e79e23]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                      <Icon className={`h-5 w-5 mb-1 ${role === r.id ? 'text-[#e79e23]' : 'text-white/40'}`} />
                      <p className="text-xs font-bold text-white">{r.label}</p>
                      <p className="text-[10px] text-white/40">{r.desc}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button type="submit" className="w-full py-3.5 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white hover:brightness-110 transition">
            {step === 1 ? 'Continue' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-white/30 mt-6">
          Already have an account? <Link href="/auth/login" className="text-[#e79e23] hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
