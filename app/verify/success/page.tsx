'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useUser } from '../../lib/user-context';

export default function VerifySuccessPage() {
  const router = useRouter();
  const { updateUser, user } = useUser();

  useEffect(() => {
    updateUser({ kycStatus: 'verified' });
  }, []);

  const partnerRoles = ['agent', 'seller', 'landlord', 'investor', 'shortlet-hotel'];
  const dashboardLink = partnerRoles.includes(user.role) ? `/partner/${user.role}` : '/';

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 bg-[var(--brand-dark,#0b0610)]">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 text-center">
        <div className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-black text-white">Verification Successful</h1>
        <p className="text-sm text-white/50">Your identity has been verified. You now have full access to your partner portal.</p>
        <Link href={dashboardLink} className="w-full py-3.5 rounded-xl bg-[var(--brand-purple,#621063)] text-center text-sm font-bold text-white hover:brightness-110 transition">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
