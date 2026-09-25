import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0610] pb-28 sm:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; 2026 Smart Assetz Demo. All rights reserved.</p>
        <p>Built by <Link href="https://jclab-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="font-semibold text-white underline-offset-4 hover:underline">Jare&apos;s Choice Labs (JCLs)</Link></p>
      </div>
    </footer>
  );
}
