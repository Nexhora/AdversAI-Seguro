
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

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

const publicPaths = ['/login', '/register', '/'];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    
    const isPublicPath = publicPaths.includes(pathname);

    if (!user && !isPublicPath) {
      router.push('/login');
    } else if (user && (pathname === '/login' || pathname === '/register' || pathname === '/')) {
      router.push('/dashboard/builder');
    }
  }, [user, loading, router, pathname]);

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const value = {
    user,
    loading,
    logout,
  };

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  // Si estamos en una ruta pública y no hemos iniciado sesión, o
  // si hemos iniciado sesión y no estamos en una ruta pública, renderizamos los hijos.
  // Esto evita un parpadeo del contenido protegido antes de la redirección.
  const isPublicPath = publicPaths.includes(pathname);
  if ((!user && isPublicPath) || (user && !isPublicPath)) {
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  // En cualquier otro caso (p. ej., usuario no logueado intentando acceder a ruta protegida),
  // mostramos un loader mientras se completa la redirección del efecto.
  return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin" />
      </div>
  );
};
