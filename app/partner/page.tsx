'use client';

import Link from 'next/link';
import { Users, KeyRound, Building2, TrendingUp, Home, GraduationCap, Hotel, ArrowRight } from 'lucide-react';
import DockNavbar from '../components/DockNavbar';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import portals from '../../mocks/portals.json';

const ICONS: Record<string, any> = { Users, KeyRound, Building2, TrendingUp, Home, GraduationCap, Hotel };

export default function PartnerPage() {
  return (
    <>
      <AppHeader />
      <main className="min-h-screen px-4 pt-4 pb-32 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="px-3 py-1 rounded-full bg-[#e79e23]/20 text-[#e79e23] text-[10px] font-bold tracking-widest uppercase">Demo</span>
          <h1 className="text-3xl font-black text-white mt-3">Partner Suite</h1>
          <p className="text-sm text-white/50 mt-2">Choose your portal to explore dedicated tools and workflows</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portals.map(portal => {
            const Icon = ICONS[portal.icon] || Users;
            const stats = Object.entries(portal.stats);
            return (
              <div key={portal.category} className="glass-card p-6 space-y-4 group hover:border-[#e79e23]/30 transition">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: portal.color + '30' }}>
                    <Icon className="h-5 w-5" style={{ color: portal.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{portal.name}</h3>
                    <span className="text-[10px] font-bold tracking-wider" style={{ color: portal.color }}>{portal.badge}</span>
                  </div>
                </div>
                <p className="text-xs text-white/50">{portal.description}</p>
                <div className="grid grid-cols-3 gap-2">
                  {stats.map(([key, val]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm font-black text-white">{val}</p>
                      <p className="text-[10px] text-white/30 capitalize">{key}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[10px] text-white/30">{portal.monthlyFee}</span>
                  <Link href={portal.route} className="flex items-center gap-1 text-xs font-bold text-[#e79e23] hover:underline">
                    Enter Portal <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
