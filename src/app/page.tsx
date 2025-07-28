'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This component acts as a router. It checks the auth state and redirects
// to the appropriate page. It is never intended to be visible to the user.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/dashboard/builder');
      } else {
        router.replace('/auth/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
