'use client';

import PropertyCard from '../components/PropertyCard';
import DockNavbar from '../components/DockNavbar';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import properties from '../../mocks/properties.json';
import { Heart } from 'lucide-react';

export default function SavedPage() {
  const saved = properties.slice(0, 3);

  return (
    <>
      <AppHeader />
      <main className="min-h-screen px-4 pt-4 pb-32 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="h-5 w-5 text-[#e79e23]" />
          <h1 className="text-xl sm:text-2xl font-black text-white">Saved Properties</h1>
        </div>
        <p className="text-xs text-white/40 mb-6">{saved.length} saved items (demo data)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {saved.map(p => <PropertyCard key={p.id} property={p} />)}
        </div>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
