'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, CreditCard, Wallet } from 'lucide-react';
import DockNavbar from '../components/DockNavbar';

export default function CheckoutPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'card' | 'wallet'>('card');

  const handlePay = () => router.push('/checkout/success');

  return (
    <>
      <main className="min-h-screen px-4 pt-6 pb-32 sm:px-6 max-w-lg mx-auto space-y-6">
        <Link href="/" className="flex items-center gap-1 text-xs text-white/50 hover:text-white"><ArrowLeft className="h-3 w-3" /> Back</Link>
        <h1 className="text-2xl font-black text-white">Checkout</h1>

        {/* Order Summary */}
        <div className="glass-card p-4 space-y-3">
          <h2 className="text-sm font-bold text-white">Order Summary</h2>
          <div className="flex justify-between text-xs"><span className="text-white/50">Escrow Deposit</span><span className="text-white font-bold">₦2,000,000</span></div>
          <div className="flex justify-between text-xs"><span className="text-white/50">Service Fee (1.5%)</span><span className="text-white font-bold">₦30,000</span></div>
          <div className="border-t border-white/10 pt-2 flex justify-between text-sm"><span className="text-white font-bold">Total</span><span className="text-[#e79e23] font-black">₦2,030,000</span></div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white">Payment Method</h2>
          {[
            { id: 'card' as const, icon: CreditCard, label: 'Pay with Card (Paystack)', desc: 'Visa, Mastercard, Verve' },
            { id: 'wallet' as const, icon: Wallet, label: 'Pay from Wallet', desc: 'Balance: ₦250,000' },
          ].map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition ${method === m.id ? 'border-[#e79e23] bg-[#e79e23]/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
              <m.icon className={`h-5 w-5 ${method === m.id ? 'text-[#e79e23]' : 'text-white/40'}`} />
              <div className="text-left"><p className="text-xs font-bold text-white">{m.label}</p><p className="text-[10px] text-white/40">{m.desc}</p></div>
            </button>
          ))}
        </div>

        {/* Security */}
        <div className="flex items-center gap-2 text-[10px] text-white/30">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Your payment is secured with 256-bit SSL encryption</span>
        </div>

        <button onClick={handlePay} className="w-full py-3.5 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white hover:brightness-110 transition">
          Pay ₦2,030,000
        </button>
      </main>
      <DockNavbar />
    </>
  );
}
