'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Star, Wifi, Zap, Droplets, Shield, Dumbbell, BookOpen, WashingMachine, MapPin, BadgeCheck } from 'lucide-react';
import AppHeader from '../components/AppHeader';
import DockNavbar from '../components/DockNavbar';
import Footer from '../components/Footer';
import hostels from '../../mocks/hostels.json';

const AMENITY_ICONS: Record<string, any> = { WiFi: Wifi, Generator: Zap, Water: Droplets, Security: Shield, Gym: Dumbbell, 'Study Room': BookOpen, Laundry: WashingMachine };

export default function HostelsPage() {
  const [query, setQuery] = useState('');
  const filtered = hostels.filter(h =>
    h.name.toLowerCase().includes(query.toLowerCase()) ||
    h.university.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <AppHeader />
      <main className="min-h-screen px-4 pt-4 pb-32 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-black text-white mb-1">Student Hostels</h1>
        <p className="text-xs text-white/40 mb-4">Verified campus accommodation across Nigeria</p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input type="text" placeholder="Search by hostel or university..." value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-purple)]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(hostel => (
            <Link key={hostel.id} href={`/hostels/${hostel.slug}`}
              className="group block rounded-2xl border border-white/10 bg-[var(--brand-card,#181122)] hover:border-white/20 transition overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={hostel.image} alt={hostel.name} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                {hostel.verified && (
                  <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-[10px] font-bold text-white">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-bold text-white">
                  {hostel.availableRooms} rooms left
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold text-white truncate">{hostel.name}</h3>
                <p className="text-xs text-white/50 flex items-center gap-1"><MapPin className="h-3 w-3" />{hostel.university}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-[#e79e23]">{hostel.formattedPrice}</p>
                  <span className="flex items-center gap-1 text-xs text-white/50">
                    <Star className="h-3 w-3 text-[#e79e23] fill-[#e79e23]" /> {hostel.rating} ({hostel.totalReviews})
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hostel.amenities.slice(0, 4).map(a => {
                    const Icon = AMENITY_ICONS[a] || Shield;
                    return (
                      <span key={a} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-white/40">
                        <Icon className="h-2.5 w-2.5" /> {a}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-white/40 py-12 text-sm">No hostels match your search.</p>}
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
