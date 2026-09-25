'use client';

import DockNavbar from '../components/DockNavbar';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useUser } from '../lib/user-context';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, History, CreditCard, Smartphone } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, type: 'credit', label: 'Wallet Top-up', amount: '+₦50,000', time: '2h ago', color: '#22c55e' },
  { id: 2, type: 'debit', label: 'Escrow Deposit — Lekki Duplex', amount: '-₦2,000,000', time: '1d ago', color: '#ef4444' },
  { id: 3, type: 'credit', label: 'Referral Bonus', amount: '+₦5,000', time: '3d ago', color: '#22c55e' },
  { id: 4, type: 'debit', label: 'Inspection Fee', amount: '-₦15,000', time: '5d ago', color: '#ef4444' },
  { id: 5, type: 'credit', label: 'Paystack Transfer', amount: '+₦100,000', time: '1w ago', color: '#22c55e' },
];

export default function WalletPage() {
  const { user } = useUser();
  const balance = user.loggedIn ? '₦250,000' : '₦0';

  return (
    <>
      <AppHeader />
      <main className="min-h-screen px-4 pt-4 pb-32 sm:px-6 max-w-lg mx-auto space-y-6">
        {/* Balance Card */}
        <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, var(--brand-purple,#621063), var(--brand-magenta,#911b70))' }}>
          <Wallet className="h-6 w-6 text-white/60 mx-auto mb-2" />
          <p className="text-xs text-white/60">Wallet Balance</p>
          <p className="text-3xl sm:text-4xl font-black text-white mt-1">{balance}</p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <button onClick={() => alert('Demo Mode')} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 text-xs font-bold text-white hover:bg-white/30 transition">
              <Plus className="h-3.5 w-3.5" /> Fund
            </button>
            <button onClick={() => alert('Demo Mode')} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 text-xs font-bold text-white hover:bg-white/30 transition">
              <History className="h-3.5 w-3.5" /> History
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: ArrowUpRight, label: 'Transfer', color: '#621063' },
            { icon: CreditCard, label: 'Pay Bills', color: '#e79e23' },
            { icon: Smartphone, label: 'Top Up', color: '#0891b2' },
          ].map(({ icon: Icon, label, color }) => (
            <button key={label} onClick={() => alert('Demo Mode')} className="glass-card p-4 flex flex-col items-center gap-2 hover:border-white/20 transition">
              <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <span className="text-[10px] font-semibold text-white/60">{label}</span>
            </button>
          ))}
        </div>

        {/* Transactions */}
        <section>
          <h2 className="text-sm font-bold text-white mb-3">Recent Transactions</h2>
          <div className="glass-card divide-y divide-white/5">
            {TRANSACTIONS.map(tx => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: tx.color + '15' }}>
                  {tx.type === 'credit' ? <ArrowDownLeft className="h-4 w-4" style={{ color: tx.color }} /> : <ArrowUpRight className="h-4 w-4" style={{ color: tx.color }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{tx.label}</p>
                  <p className="text-[10px] text-white/30">{tx.time}</p>
                </div>
                <span className="text-xs font-bold" style={{ color: tx.color }}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
