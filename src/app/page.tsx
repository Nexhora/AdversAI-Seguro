
'use client';

import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

/**
 * This is the main entry page for the application.
 * Its only responsibility is to check the auth state and redirect.
 * It shows a loading indicator while this check is happening.
 */
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // onAuthStateChanged is the most reliable way to get the current user
    // on the client-side, and it handles the case where Firebase is still initializing.
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // If user is logged in, redirect to the main dashboard page.
        router.replace('/dashboard/builder');
      } else {
        // If user is not logged in, redirect to the login page.
        router.replace('/login');
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);
  
  // Show a loading spinner while the auth state is being determined.
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
