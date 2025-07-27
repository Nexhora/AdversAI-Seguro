
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

const protectedPaths = ['/dashboard'];
const publicOnlyPaths = ['/login', '/register'];

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
    // No hacer nada hasta que la autenticación se resuelva
    if (loading) return; 

    const isProtected = protectedPaths.some(path => pathname.startsWith(path));
    const isPublicOnly = publicOnlyPaths.includes(pathname);
    const isRoot = pathname === '/';

    if (!user) {
      // Si el usuario no está autenticado, cualquier ruta que no sea pública
      // (o la raíz, que se gestionará después) debe redirigir a /login.
      if (isProtected || isRoot) {
        router.replace('/login');
      }
    } else {
      // Si el usuario está autenticado, redirigir desde rutas públicas
      // y desde la raíz al constructor del dashboard.
      if (isPublicOnly || isRoot) {
        router.replace('/dashboard/builder');
      }
    }

  }, [user, loading, router, pathname]);

  const logout = async () => {
    await signOut(auth);
    // Después de cerrar sesión, redirigir a la página de login.
    router.replace('/login');
  };

  const value = {
    user,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
