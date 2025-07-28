
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    // Dado que este proveedor ahora solo vive dentro de las rutas del dashboard,
    // la lógica es más simple: si no hay usuario, redirige a login.
    if (!user) {
      router.replace('/auth/login');
    }

  }, [user, loading, router]);

  const logout = async () => {
    await signOut(auth);
    router.replace('/');
  };

  const value = {
    user,
    loading,
    logout,
  };

  // Mientras se carga, no mostramos nada para evitar parpadeos.
  // La redirección se encargará si no hay sesión.
   if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  // Si no hay usuario, el useEffect de arriba ya habrá iniciado la redirección.
  // Renderizar children solo si hay un usuario evita mostrar brevemente el dashboard
  // antes de redirigir.
  return <AuthContext.Provider value={value}>{user ? children : null}</AuthContext.Provider>;
};
