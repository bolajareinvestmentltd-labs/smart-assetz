'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Star, Bed, Bath, Maximize2 } from 'lucide-react';

interface Property {
  id: number; title: string; slug: string; price: number; formattedPrice: string;
  type: string; location: string; bedrooms: number; bathrooms: number; sqft: number;
  image: string; verified: boolean; featured: boolean;
  agent: { name: string; initial: string }; description: string; status: string;
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.slug}`} className="group block rounded-2xl border border-white/10 bg-[#181122] hover:border-white/20 transition overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={property.image} alt={property.title} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="(max-width:768px) 100vw, 33vw" />
        {property.verified && (
          <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/90 text-[10px] font-bold text-white">
            <BadgeCheck className="h-3 w-3" /> Verified
          </span>
        )}
        {property.featured && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e79e23]/90 text-[10px] font-bold text-white">
            <Star className="h-3 w-3" /> Featured
          </span>
        )}
        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-black/60 text-[10px] font-semibold text-white uppercase">{property.status}</span>
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-bold text-white truncate">{property.title}</h3>
        <p className="text-xs text-white/50">{property.location}</p>
        <p className="text-sm font-black text-[#e79e23]">{property.formattedPrice}</p>
        {property.bedrooms > 0 && (
          <div className="flex items-center gap-3 text-[10px] text-white/40">
            <span className="flex items-center gap-1"><Bed className="h-3 w-3" />{property.bedrooms} Bed</span>
            <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{property.bathrooms} Bath</span>
            <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" />{property.sqft} sqft</span>
          </div>
        )}
        <div className="flex items-center gap-2 pt-1">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center text-[10px] font-bold text-white">{property.agent.initial}</div>
          <span className="text-[10px] text-white/50">{property.agent.name}</span>
        </div>
      </div>
    </Link>
  );
}
