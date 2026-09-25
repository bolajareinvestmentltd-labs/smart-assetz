'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Wallet, Briefcase, User } from 'lucide-react';

const NAV = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/properties', icon: Search, label: 'Search' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/partner', icon: Briefcase, label: 'Partner' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function DockNavbar() {
  const pathname = usePathname();

  // Hide dock on auth/onboarding/verify pages
  const hiddenPaths = ['/auth', '/onboarding', '/verify'];
  if (hiddenPaths.some(p => pathname.startsWith(p))) return null;

  return (
    <nav className="dock-nav" role="navigation" aria-label="Main navigation">
      {NAV.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href));
        return (
          <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-2 sm:px-3 py-1 rounded-xl transition hover:bg-white/5" aria-current={active ? 'page' : undefined}>
            <Icon className={`h-[18px] w-[18px] sm:h-5 sm:w-5 transition ${active ? 'text-[#e79e23]' : 'text-white/40'}`} strokeWidth={active ? 2.5 : 2} />
            <span className={`text-[9px] sm:text-[10px] font-semibold leading-none ${active ? 'text-[#e79e23]' : 'text-white/30'}`}>{label}</span>
            {active && <div className="h-0.5 w-4 rounded-full bg-[#e79e23] shadow-[0_0_6px_#e79e23] mt-0.5" />}
          </Link>
        );
      })}
    </nav>
  );
}
