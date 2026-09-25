'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Car, GraduationCap, Hotel, ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  { icon: Building2, title: 'Real Estate', desc: 'Buy, sell, and rent premium properties across Nigeria with escrow protection.', color: '#621063' },
  { icon: Car, title: 'Automotive', desc: 'Find verified vehicles, schedule test drives, and trade with confidence.', color: '#e79e23' },
  { icon: GraduationCap, title: 'Student Hostels', desc: 'Book verified campus hostels with transparent pricing and reviews.', color: '#0891b2' },
  { icon: Hotel, title: 'Short-Lets & Hotels', desc: 'Discover premium short-term rentals and hotel accommodations.', color: '#e11d48' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];
  const Icon = slide.icon;

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 bg-[var(--brand-dark,#0b0610)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(98,16,99,0.15)_0%,transparent_60%)]" />

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <Image src="/logo.svg" alt="Smart Assetz" width={56} height={56} className="h-14 w-14 rounded-xl" priority />

        {/* Slide */}
        <div className="w-full text-center space-y-4 min-h-[200px] flex flex-col items-center justify-center">
          <div className="h-20 w-20 rounded-2xl flex items-center justify-center mx-auto transition-colors duration-300" style={{ backgroundColor: slide.color + '25' }}>
            <Icon className="h-10 w-10 transition-colors duration-300" style={{ color: slide.color }} />
          </div>
          <h2 className="text-2xl font-black text-white">{slide.title}</h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">{slide.desc}</p>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setStep(i)} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-[#e79e23]' : 'w-2 bg-white/20'}`} />
          ))}
        </div>

        {/* Nav Arrows */}
        <div className="flex items-center gap-4 w-full">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/10 transition">
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <div className="flex-1" />
          {step < SLIDES.length - 1 ? (
            <button onClick={() => setStep(step + 1)} className="h-10 w-10 rounded-full bg-[var(--brand-purple,#621063)] flex items-center justify-center hover:brightness-110 transition">
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          ) : null}
        </div>

        {/* Auth Buttons */}
        <div className="w-full space-y-3 pt-4">
          <Link href="/auth/login" className="block w-full py-3.5 rounded-xl bg-[var(--brand-purple,#621063)] text-center text-sm font-bold text-white hover:brightness-110 transition">
            Log In
          </Link>
          <Link href="/auth/register" className="block w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-center text-sm font-bold text-white/80 hover:bg-white/10 transition">
            Create Account
          </Link>
          <Link href="/" className="block text-center text-xs text-white/40 hover:text-white/60 transition pt-2">
            Skip &amp; Browse Properties →
          </Link>
        </div>
      </div>
    </main>
  );
}
