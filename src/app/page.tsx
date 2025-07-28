
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/**
 * This is the main entry page for the application.
 * Its only responsibility is to show a loading indicator.
 * All redirection logic is handled in AuthContext, which will navigate 
 * the user to /login or /dashboard based on their auth state.
 */
export default function HomePage() {
  const { loading } = useAuth();
  
  // Show a loading spinner while the auth state is being determined.
  // The AuthContext will handle the redirection once loading is complete.
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
