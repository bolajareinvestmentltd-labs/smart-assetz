'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import DockNavbar from '../components/DockNavbar';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import properties from '../../mocks/properties.json';

export default function PropertiesPage() {
  const [query, setQuery] = useState('');
  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <AppHeader />
      <main className="min-h-screen px-4 pt-4 pb-32 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-black text-white mb-1">All Properties</h1>
        <p className="text-xs text-white/40 mb-4">{properties.length} properties available</p>
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input type="text" placeholder="Search by title or location..." value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--brand-purple)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
        {filtered.length === 0 && <p className="text-center text-white/40 py-12 text-sm">No properties match your search.</p>}
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
