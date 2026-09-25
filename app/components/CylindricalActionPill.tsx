'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function CylindricalActionPill({ label, price }: { label: string; price: string }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-0 rounded-full bg-[var(--brand-card,#1a1025)] border border-white/10 overflow-hidden shadow-lg">
        <span className="px-3 sm:px-4 py-2.5 text-[10px] sm:text-xs font-semibold text-white/70">{label}</span>
        <span className="px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-black text-[#e79e23] border-x border-white/10">{price}</span>
        <button onClick={() => setShowModal(true)} className="h-10 w-10 flex items-center justify-center bg-[var(--brand-purple,#621063)] hover:brightness-110 transition rounded-full m-1">
          <ArrowRight className="h-4 w-4 text-white" />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-[var(--brand-card,#181122)] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-sm mx-4 text-center" onClick={e => e.stopPropagation()}>
            <ShieldCheck className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-black text-white">Escrow Deposit</h3>
            <p className="text-sm text-white/50 mt-2">Your {price} deposit will be held securely in escrow until the transaction is verified.</p>
            <div className="flex flex-col gap-3 mt-6">
              <button onClick={() => { setShowModal(false); router.push('/checkout'); }}
                className="w-full px-6 py-3 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white hover:brightness-110 transition">
                Proceed to Checkout
              </button>
              <button onClick={() => setShowModal(false)}
                className="w-full px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/50 hover:bg-white/10 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
