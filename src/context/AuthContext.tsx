
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define public and protected routes
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/register'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const pathIsProtected = protectedRoutes.some(path => pathname.startsWith(path));
    const pathIsPublic = publicRoutes.includes(pathname);

    // If not authenticated and trying to access a protected route, redirect to login
    if (!user && pathIsProtected) {
      router.replace('/login');
    }

    // If authenticated and trying to access a public-only route (like login), redirect to dashboard
    if (user && pathIsPublic) {
      router.replace('/dashboard/builder');
    }

    // If authenticated and on the root page, redirect to dashboard
    if (user && pathname === '/') {
       router.replace('/dashboard/builder');
    }

    // If not authenticated and on the root page, redirect to login
    if (!user && pathname === '/') {
        router.replace('/login');
    }

  }, [user, loading, router, pathname]);

  const logout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  const value = {
    user,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
