'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bed, Bath, Maximize2, Calendar, MapPin } from 'lucide-react';
import CylindricalActionPill from '../../components/CylindricalActionPill';
import DockNavbar from '../../components/DockNavbar';
import Footer from '../../components/Footer';
import properties from '../../../mocks/properties.json';

export default function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const property = properties.find(p => p.slug === slug);

  if (!property) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white">Property Not Found</h1>
          <Link href="/properties" className="mt-4 inline-block text-[#e79e23] text-sm hover:underline">Browse all properties</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen pb-32">
        <div className="relative h-72 sm:h-96 w-full">
          <Image src={property.image} alt={property.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0610] via-transparent to-transparent" />
          <Link href="/properties" className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10 space-y-6">
          <div>
            <span className="px-2 py-0.5 rounded-full bg-[#e79e23]/20 text-[#e79e23] text-[10px] font-bold uppercase">{property.status}</span>
            <h1 className="text-2xl font-black text-white mt-2">{property.title}</h1>
            <p className="flex items-center gap-1 text-sm text-white/50 mt-1"><MapPin className="h-3.5 w-3.5" />{property.location}</p>
          </div>

          <p className="text-3xl font-black text-[#e79e23]">{property.formattedPrice}</p>
          <p className="text-sm text-white/60 leading-relaxed">{property.description}</p>

          {property.bedrooms > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Bed, label: 'Bedrooms', value: property.bedrooms },
                { icon: Bath, label: 'Bathrooms', value: property.bathrooms },
                { icon: Maximize2, label: 'Area', value: `${property.sqft} sqft` },
                { icon: Calendar, label: 'Year Built', value: property.yearBuilt || 'N/A' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <Icon className="h-5 w-5 mx-auto mb-1 text-[#e79e23]" />
                  <p className="text-xs text-white/40">{label}</p>
                  <p className="text-sm font-bold text-white">{value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="glass-card p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-sm font-black text-white">{property.agent.initial}</div>
            <div>
              <p className="text-sm font-bold text-white">{property.agent.name}</p>
              <p className="text-xs text-white/40">Listing Agent</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <CylindricalActionPill label="Secure with Escrow" price={property.formattedPrice} />
            <button onClick={() => alert('Demo Mode — Inspection scheduling is simulated.')} className="px-6 py-2.5 rounded-xl bg-white/10 text-sm font-bold text-white hover:bg-white/15 transition border border-white/10">
              Schedule Inspection
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
