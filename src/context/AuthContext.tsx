
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, firebaseCredentialsExist } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Loader2 } from 'lucide-react';

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

const FirebaseConfigurationNotice = () => (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <Card className="max-w-md w-full border-destructive">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle/> Error de Configuración de Firebase
                </CardTitle>
                <CardDescription className="text-destructive/90">
                   La aplicación no puede continuar sin una conexión válida a Firebase.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">La configuración en `src/lib/firebase.ts` parece estar incompleta. Por favor, asegúrate de que el objeto `firebaseConfig` contenga las claves correctas de tu proyecto.</p>
            </CardContent>
        </Card>
    </div>
);


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
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  if (!firebaseCredentialsExist) {
      return <FirebaseConfigurationNotice />;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className='ml-2'>Conectando con la aplicación...</p>
      </div>
    );
  }

  const value = {
    user,
    loading,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
