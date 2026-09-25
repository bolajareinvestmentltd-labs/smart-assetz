'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScanFace } from 'lucide-react';

export default function FaceScanPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'ready' | 'scanning' | 'done'>('ready');

  const startScan = () => {
    setStatus('scanning');
    setProgress(0);
  };

  useEffect(() => {
    if (status !== 'scanning') return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus('done');
          setTimeout(() => router.push('/verify/success'), 800);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [status, router]);

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 bg-[var(--brand-dark,#0b0610)]">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white">Facial Biometrics</h1>
          <p className="text-xs text-white/50">Position your face within the frame</p>
        </div>

        {/* Face Frame */}
        <div className="relative h-64 w-64 sm:h-72 sm:w-72">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          {/* Progress ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="var(--brand-purple, #621063)" strokeWidth="2" strokeDasharray={`${progress * 3.01} 301`} strokeLinecap="round" className="transition-all duration-100" />
          </svg>
          {/* Center face icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`h-32 w-32 rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-300 ${status === 'done' ? 'border-emerald-400 bg-emerald-400/10' : status === 'scanning' ? 'border-[#e79e23] bg-[#e79e23]/5' : 'border-white/20'}`}>
              <ScanFace className={`h-16 w-16 transition-colors ${status === 'done' ? 'text-emerald-400' : status === 'scanning' ? 'text-[#e79e23] animate-pulse' : 'text-white/30'}`} />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="text-center space-y-2">
          {status === 'ready' && <p className="text-sm text-white/40">Tap to start scanning</p>}
          {status === 'scanning' && <p className="text-sm text-[#e79e23]">Scanning... {progress}%</p>}
          {status === 'done' && <p className="text-sm text-emerald-400 font-bold">Scan Complete ✓</p>}
        </div>

        {status === 'ready' && (
          <button onClick={startScan} className="px-8 py-3 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white hover:brightness-110 transition">
            Start Face Scan
          </button>
        )}

        <p className="text-[10px] text-white/20 text-center max-w-xs">This is a simulated biometric scan for demo purposes. No actual biometric data is captured.</p>
      </div>
    </main>
  );
}
