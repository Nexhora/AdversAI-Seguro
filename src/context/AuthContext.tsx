
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, firebaseCredentialsExist } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

const FirebaseConfigurationNotice = () => {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center text-foreground">
        <div className="flex items-center gap-4 mb-8">
            <Logo className="size-12 text-primary" />
            <div>
                <h1 className="text-4xl font-semibold font-headline leading-tight">Nexhora</h1>
                <p className="text-lg text-muted-foreground">AdversAI</p>
            </div>
        </div>
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Error de Configuración de Firebase</CardTitle>
                <CardDescription>
                    Las credenciales de Firebase no están configuradas correctamente en el archivo 
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">.env</code>.
                    Por favor, contacta al soporte o revisa la configuración de tu proyecto.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>La aplicación no puede continuar sin una conexión válida a Firebase.</p>
            </CardContent>
        </Card>
      </div>
    );
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!firebaseCredentialsExist) {
        setLoading(false);
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  if (loading) {
     return (
        <div className="flex h-screen items-center justify-center">
            <p>Cargando aplicación...</p>
        </div>
    );
  }

  if (!firebaseCredentialsExist) {
    return <FirebaseConfigurationNotice />;
  }

  const value = {
    user,
    loading,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
