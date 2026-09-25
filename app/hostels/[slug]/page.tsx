'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Wifi, Zap, Droplets, Shield, Dumbbell, BookOpen, WashingMachine, MapPin, Users, Calendar, BedDouble } from 'lucide-react';
import CylindricalActionPill from '../../components/CylindricalActionPill';
import DockNavbar from '../../components/DockNavbar';
import Footer from '../../components/Footer';
import hostels from '../../../mocks/hostels.json';

const AMENITY_ICONS: Record<string, any> = { WiFi: Wifi, Generator: Zap, Water: Droplets, Security: Shield, Gym: Dumbbell, 'Study Room': BookOpen, Laundry: WashingMachine };
const ROOM_LABELS: Record<string, string> = { single: 'Single Room', 'shared-2': 'Shared (2 per room)', 'shared-4': 'Shared (4 per room)' };

export default function HostelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const hostel = hostels.find(h => h.slug === slug);

  if (!hostel) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-black text-white">Hostel Not Found</h1>
          <Link href="/hostels" className="mt-4 inline-block text-[#e79e23] text-sm hover:underline">Browse hostels</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen pb-32">
        <div className="relative h-56 sm:h-72 w-full">
          <Image src={hostel.image} alt={hostel.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark,#0b0610)] via-transparent to-transparent" />
          <Link href="/hostels" className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-10 space-y-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">{hostel.name}</h1>
            <p className="flex items-center gap-1 text-sm text-white/50 mt-1"><MapPin className="h-3.5 w-3.5" />{hostel.university}</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-2xl sm:text-3xl font-black text-[#e79e23]">{hostel.formattedPrice}</p>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/60">
              <Star className="h-3 w-3 text-[#e79e23] fill-[#e79e23]" /> {hostel.rating} ({hostel.totalReviews} reviews)
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: BedDouble, label: 'Room Type', value: ROOM_LABELS[hostel.roomType] || hostel.roomType },
              { icon: Users, label: 'Available', value: `${hostel.availableRooms} rooms` },
              { icon: Calendar, label: 'Duration', value: 'Per Semester' },
              { icon: Star, label: 'Rating', value: `${hostel.rating}/5.0` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass-card p-3 sm:p-4 text-center">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 mx-auto mb-1 text-[#e79e23]" />
                <p className="text-[10px] text-white/40">{label}</p>
                <p className="text-xs font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-sm font-bold text-white mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {hostel.amenities.map(a => {
                const Icon = AMENITY_ICONS[a] || Shield;
                return (
                  <span key={a} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
                    <Icon className="h-3.5 w-3.5 text-[#e79e23]" /> {a}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Book */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <CylindricalActionPill label="Book Now" price={hostel.formattedPrice} />
            <button onClick={() => alert('Demo Mode — Campus tour scheduling is simulated.')}
              className="px-6 py-2.5 rounded-xl bg-white/10 text-sm font-bold text-white hover:bg-white/15 transition border border-white/10">
              Schedule Campus Visit
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <DockNavbar />
    </>
  );
}
