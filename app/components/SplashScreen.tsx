'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('sa-demo-splash')) {
      setVisible(false);
      return;
    }
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('sa-demo-splash', '1');
      }, 600);
    }, 2400);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b0610] transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(98,16,99,0.25)_0%,transparent_60%)] animate-pulse" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-[#621063] to-[#e79e23] flex items-center justify-center shadow-2xl shadow-purple-900/60 animate-bounce">
          <span className="text-4xl font-black text-white">SA</span>
        </div>
        <h1 className="text-2xl font-black text-white">Smart Assetz</h1>
        <p className="text-xs text-white/50 tracking-widest uppercase">Demo Experience</p>
        <div className="mt-6 h-1 w-48 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-[#621063] via-[#e79e23] to-[#621063] animate-[splashload_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
