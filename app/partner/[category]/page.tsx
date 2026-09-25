'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, KeyRound, Building2, TrendingUp, Home, GraduationCap, Hotel, Plus, Eye, CalendarDays, BarChart3, Clock } from 'lucide-react';
import DockNavbar from '../../components/DockNavbar';
import Footer from '../../components/Footer';
import portals from '../../../mocks/portals.json';

const ICONS: Record<string, any> = { Users, KeyRound, Building2, TrendingUp, Home, GraduationCap, Hotel };

const ACTIVITIES: Record<string, string[]> = {
  agent: ['New listing submitted — Lekki Duplex', 'Client John O. scheduled inspection', 'Commission of ₦450K approved', 'New inquiry on Victoria Island flat', 'Monthly report generated'],
  seller: ['Property listed — Ajah Bungalow', 'Buyer inquiry from Emeka C.', 'Offer received: ₦42M', 'Listing views: 234 this week', 'Price reduction alert set'],
  landlord: ['Rent payment received — Unit 4B', 'Maintenance request: Plumbing', 'Tenant lease expires Dec 2026', 'New tenant application reviewed', 'Insurance renewed for Block A'],
  investor: ['Portfolio ROI updated: 18.5%', 'New syndication deal available', 'Dividend payout: ₦1.2M', 'Market analysis report ready', 'Property valuation increased 12%'],
  tenant: ['Rent due Dec 1 — ₦2.5M', 'Maintenance request submitted', 'Lease renewal notice sent', 'Utility bill: ₦45K', 'Community update posted'],
  student: ['Hostel booking confirmed — UNILAG', 'Roommate request from Ada', 'Semester payment due Jan 15', 'Room swap request available', 'Campus event: Open House'],
  'shortlet-hotel': ['New booking — 3 nights', 'Guest checkout: Room 204', 'Revenue this month: ₦890K', 'Review: 4.8★ from guest', 'Cleaning scheduled: Room 108'],
};

const ACTIONS: Record<string, string[]> = {
  agent: ['Add Listing', 'View Clients', 'Schedule Tour', 'Earnings Report'],
  seller: ['List Property', 'View Offers', 'Price History', 'Market Analysis'],
  landlord: ['Add Unit', 'Tenant List', 'Collect Rent', 'Maintenance Log'],
  investor: ['View Portfolio', 'New Investment', 'ROI Calculator', 'Market Trends'],
  tenant: ['Pay Rent', 'Raise Request', 'View Lease', 'Contact Landlord'],
  student: ['Find Hostel', 'My Bookings', 'Roommate Finder', 'Campus Map'],
  'shortlet-hotel': ['Add Listing', 'View Bookings', 'Set Pricing', 'Guest Reviews'],
};

export default function PortalPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const portal = portals.find(p => p.category === category);

  if (!portal) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white">Portal Not Found</h1>
          <Link href="/partner" className="mt-4 inline-block text-[#e79e23] text-sm hover:underline">Back to portals</Link>
        </div>
      </main>
    );
  }

  const Icon = ICONS[portal.icon] || Users;
  const activities = ACTIVITIES[category] || ACTIVITIES.agent;
  const actions = ACTIONS[category] || ACTIONS.agent;
  const stats = Object.entries(portal.stats);

  return (
    <>
      <main className="min-h-screen pb-32">
        {/* Banner */}
        <div className="px-4 py-8 border-b border-white/10" style={{ background: `linear-gradient(135deg, ${portal.color}20, #0b0610)` }}>
          <Link href="/partner" className="flex items-center gap-1 text-xs text-white/50 hover:text-white mb-4">
            <ArrowLeft className="h-3 w-3" /> Back to Partner Suite
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: portal.color + '30' }}>
              <Icon className="h-6 w-6" style={{ color: portal.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">{portal.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: portal.color }}>{portal.badge}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">DEMO ACCESS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map(([key, val]) => (
              <div key={key} className="glass-card p-4 text-center">
                <p className="text-xl font-black text-white">{val}</p>
                <p className="text-[10px] text-white/40 capitalize mt-1">{key}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <section>
            <h2 className="text-sm font-bold text-white mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {actions.map(action => (
                <button key={action} onClick={() => alert('Demo Mode')} className="glass-card p-4 text-center hover:border-[#e79e23]/30 transition group">
                  <Plus className="h-4 w-4 text-white/30 mx-auto mb-2 group-hover:text-[#e79e23] transition" />
                  <p className="text-xs font-semibold text-white/70">{action}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="text-sm font-bold text-white mb-3">Recent Activity</h2>
            <div className="glass-card divide-y divide-white/5">
              {activities.map((act, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-3">
                  <Clock className="h-3.5 w-3.5 text-white/20 flex-shrink-0" />
                  <p className="text-xs text-white/60">{act}</p>
                  <span className="ml-auto text-[10px] text-white/20">{i + 1}h ago</span>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Subscription Active — {portal.monthlyFee}</span>
          </div>
        </div>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
