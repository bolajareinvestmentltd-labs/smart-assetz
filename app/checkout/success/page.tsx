'use client';

import Link from 'next/link';
import { CheckCircle2, Home, FileText } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 bg-[var(--brand-dark,#0b0610)]">
      <div className="w-full max-w-sm mx-auto text-center space-y-6">
        <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-black text-white">Payment Successful!</h1>
        <p className="text-sm text-white/50">Your escrow deposit of ₦2,030,000 has been secured. The seller will be notified.</p>
        <div className="glass-card p-4 text-left space-y-2">
          <div className="flex justify-between text-xs"><span className="text-white/40">Transaction ID</span><span className="text-white font-mono">TXN-DEMO-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span></div>
          <div className="flex justify-between text-xs"><span className="text-white/40">Date</span><span className="text-white">{new Date().toLocaleDateString()}</span></div>
          <div className="flex justify-between text-xs"><span className="text-white/40">Status</span><span className="text-emerald-400 font-bold">Confirmed</span></div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/" className="w-full py-3 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white flex items-center justify-center gap-2 hover:brightness-110 transition">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <button onClick={() => alert('Demo Mode — Receipt download simulated')} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white/60 flex items-center justify-center gap-2 hover:bg-white/10 transition">
            <FileText className="h-4 w-4" /> Download Receipt
          </button>
        </div>
      </div>
    </main>
  );
}
