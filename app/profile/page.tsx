'use client';

import { useState } from 'react';
import Link from 'next/link';
import DockNavbar from '../components/DockNavbar';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { useUser } from '../lib/user-context';
import properties from '../../mocks/properties.json';
import { MapPin, Calendar, Star, ShieldCheck, Wallet, Gift, Pencil, LogOut, Settings, Palette } from 'lucide-react';

const REVIEWS = [
  { name: 'Sophia Loren', rating: 4.5, text: 'A great experience. Very professional and responsive.', date: '11.12.2025', ago: '20 mins ago' },
  { name: 'John Clark', rating: 4.0, text: 'Good communication. Quick to respond to inquiries.', date: '08.11.2025', ago: '2 days ago' },
  { name: 'Ada Obi', rating: 5.0, text: 'Excellent service! Highly recommended for property deals.', date: '01.10.2025', ago: '1 week ago' },
];

export default function ProfilePage() {
  const { user, updateUser, logout, avatars } = useUser();
  const [tab, setTab] = useState<'feed' | 'reviews'>('feed');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const userListings = properties.slice(0, 3);

  return (
    <>
      <AppHeader />
      <main className="min-h-screen px-4 pt-4 pb-32 sm:px-6 max-w-lg mx-auto space-y-5">
        {/* Avatar + Info */}
        <div className="flex flex-col items-center gap-3">
          <button onClick={() => setShowAvatarPicker(true)} className="relative group">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[var(--brand-purple,#621063)] to-[#e79e23] flex items-center justify-center text-3xl font-black text-white ring-4 ring-[var(--brand-dark,#0b0610)]">
              {user.avatarType === 'emoji' ? user.avatar : (user.name?.charAt(0).toUpperCase() || 'D')}
            </div>
            {user.kycStatus === 'verified' && (
              <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center ring-2 ring-[var(--brand-dark)]">
                <ShieldCheck className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Pencil className="h-4 w-4 text-white" />
            </div>
          </button>

          <h2 className="text-lg font-black text-white">{user.name || 'Demo User'}</h2>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white">42 Posts</span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-white">
              <Star className="h-3 w-3 text-[#e79e23]" /> 4.0 Rating
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 text-xs text-white/40">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Lagos, Nigeria</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> User since {user.memberSince || '06/2025'}</span>
          </div>
        </div>

        {/* Avatar Picker Modal */}
        {showAvatarPicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowAvatarPicker(false)}>
            <div className="bg-[var(--brand-card,#181122)] border border-white/10 rounded-2xl p-6 max-w-xs mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="text-sm font-bold text-white mb-4 text-center">Choose Your Avatar</h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {avatars.map(emoji => (
                  <button key={emoji} onClick={() => { updateUser({ avatar: emoji, avatarType: 'emoji' }); setShowAvatarPicker(false); }}
                    className={`h-12 w-12 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition ${user.avatar === emoji && user.avatarType === 'emoji' ? 'ring-2 ring-[#e79e23]' : 'bg-white/5'}`}>
                    {emoji}
                  </button>
                ))}
              </div>
              <button onClick={() => { updateUser({ avatarType: 'initials' }); setShowAvatarPicker(false); }}
                className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/60 hover:bg-white/10 transition">
                Use My Initials Instead
              </button>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-2">
          <Link href="/wallet" className="glass-card p-3 flex flex-col items-center gap-1 hover:border-white/20 transition">
            <Wallet className="h-5 w-5 text-[#e79e23]" />
            <span className="text-[10px] font-semibold text-white/60">Wallet</span>
          </Link>
          <Link href="/settings/theme" className="glass-card p-3 flex flex-col items-center gap-1 hover:border-white/20 transition">
            <Palette className="h-5 w-5 text-[var(--brand-purple,#621063)]" />
            <span className="text-[10px] font-semibold text-white/60">Themes</span>
          </Link>
          <div className="glass-card p-3 flex flex-col items-center gap-1">
            <Gift className="h-5 w-5 text-emerald-400" />
            <span className="text-[10px] font-semibold text-white/60">{user.referralCode || 'DEMO2026'}</span>
          </div>
        </div>

        {/* Feed / Reviews Tabs */}
        <div className="flex gap-2">
          <button onClick={() => setTab('feed')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${tab === 'feed' ? 'bg-[var(--brand-purple,#621063)] text-white' : 'bg-white/5 text-white/50'}`}>Feed</button>
          <button onClick={() => setTab('reviews')} className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${tab === 'reviews' ? 'bg-[var(--brand-purple,#621063)] text-white' : 'bg-white/5 text-white/50'}`}>Reviews</button>
        </div>

        {/* Tab Content */}
        {tab === 'feed' ? (
          <div className="space-y-3">
            <p className="text-xs text-white/40">Total Items {userListings.length}</p>
            {userListings.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-white/40">Total Reviews {REVIEWS.length}</p>
            {REVIEWS.map((r, i) => (
              <div key={i} className="glass-card p-4 flex gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--brand-purple)] to-[#e79e23] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">{r.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white">{r.name}</p>
                    <div className="flex items-center gap-0.5">{Array.from({ length: 5 }, (_, j) => <Star key={j} className={`h-3 w-3 ${j < Math.floor(r.rating) ? 'text-[#e79e23] fill-[#e79e23]' : 'text-white/20'}`} />)}</div>
                  </div>
                  <p className="text-[10px] text-white/50 mt-1">{r.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-white/30">{r.date}</span>
                    <span className="text-[10px] text-[#e79e23]">{r.ago}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-4">
          <button onClick={() => alert('Demo Mode')} className="w-full py-3 rounded-xl bg-[var(--brand-purple,#621063)] text-sm font-bold text-white flex items-center justify-center gap-2 hover:brightness-110 transition">
            <Pencil className="h-4 w-4" /> Edit Profile
          </button>
          <button onClick={() => { logout(); }} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white/60 flex items-center justify-center gap-2 hover:bg-white/10 transition">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
