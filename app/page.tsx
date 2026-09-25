'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PropertyCard from './components/PropertyCard';
import SplashScreen from './components/SplashScreen';
import DockNavbar from './components/DockNavbar';
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import properties from '../mocks/properties.json';
import hostels from '../mocks/hostels.json';
import { Building2, Sparkles, TrendingUp, Users, Search, GraduationCap, Star, MapPin, BadgeCheck, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Duplex', value: 'duplex' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Penthouse', value: 'penthouse' },
  { label: 'Land', value: 'land' },
  { label: 'Bungalow', value: 'bungalow' },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = properties.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.type.toLowerCase() === activeCategory;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = properties.filter(p => p.featured);

  return (
    <>
      <SplashScreen />
      <AppHeader />
      <main className="min-h-screen pb-32">

        {/* ── Hero Banner ── */}
        <section className="relative w-full h-[280px] sm:h-[340px] lg:h-[400px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=600&fit=crop"
            alt="Smart Assetz Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--brand-dark,#0b0610)]/70 via-[var(--brand-dark,#0b0610)]/40 to-[var(--brand-dark,#0b0610)]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Find Your<br />Dream Home
            </h1>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-white/70 max-w-md">
              Nigeria&apos;s premier platform to buy, sell, rent properties &amp; book student hostels.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 sm:mt-6">
              <Link href="/properties"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[var(--brand-purple,#621063)] text-xs sm:text-sm font-bold text-white hover:brightness-110 transition shadow-lg shadow-purple-900/40">
                Browse Properties
              </Link>
              <Link href="/hostels"
                className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition">
                Student Hostels
              </Link>
            </div>
          </div>
        </section>

        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          {/* ── Search Bar ── */}
          <div className="relative -mt-6 mb-6 max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder="Search properties by name or location..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[var(--brand-card,#181122)] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-purple)] shadow-xl"
            />
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
            {[
              { icon: Building2, label: '500+ Properties', color: 'var(--brand-purple,#621063)' },
              { icon: Users, label: '10K+ Users', color: 'var(--brand-magenta,#911b70)' },
              { icon: TrendingUp, label: '₦2B+ Value', color: '#e79e23' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="glass-card p-3 sm:p-4 text-center">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1 sm:mb-2" style={{ color }} />
                <p className="text-[10px] sm:text-xs font-bold text-white leading-tight">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Category Chips ── */}
          <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.value
                    ? 'bg-[var(--brand-purple,#621063)] text-white shadow-lg shadow-purple-900/30'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── Featured Section ── */}
          {activeCategory === 'all' && featured.length > 0 && (
            <section className="mb-8 sm:mb-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#e79e23]" />
                  <h2 className="text-base sm:text-lg font-black text-white">Featured Properties</h2>
                </div>
                <Link href="/properties" className="text-[10px] sm:text-xs text-[#e79e23] hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {featured.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            </section>
          )}

          {/* ── All Properties (filtered) ── */}
          <section className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-black text-white">
                {activeCategory === 'all' ? 'All Properties' : `${CATEGORIES.find(c => c.value === activeCategory)?.label || ''} Properties`}
              </h2>
              <span className="text-[10px] text-white/30">{filtered.length} results</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/40 text-sm">No properties match your filter.</p>
                <button onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="mt-3 text-xs text-[#e79e23] hover:underline">Clear filters</button>
              </div>
            )}
          </section>

          {/* ── Student Hostels Section ── */}
          {activeCategory === 'all' && (
            <section className="mb-8 sm:mb-10">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-[#0891b2]" />
                  <h2 className="text-base sm:text-lg font-black text-white">Student Hostels</h2>
                </div>
                <Link href="/hostels" className="text-[10px] sm:text-xs text-[#e79e23] hover:underline flex items-center gap-1">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {hostels.slice(0, 3).map(hostel => (
                  <Link key={hostel.id} href={`/hostels/${hostel.slug}`}
                    className="group glass-card overflow-hidden hover:border-[#0891b2]/30 transition">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={hostel.image} alt={hostel.name} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="(max-width:768px) 100vw, 33vw" />
                      {hostel.verified && (
                        <span className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-[10px] font-bold text-white">
                          <BadgeCheck className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </div>
                    <div className="p-3 sm:p-4 space-y-1.5">
                      <h3 className="text-sm font-bold text-white truncate">{hostel.name}</h3>
                      <p className="text-[10px] text-white/40 flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {hostel.university}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-[#e79e23]">{hostel.formattedPrice}</span>
                        <span className="flex items-center gap-1 text-[10px] text-white/50">
                          <Star className="h-3 w-3 text-[#e79e23] fill-[#e79e23]" /> {hostel.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
