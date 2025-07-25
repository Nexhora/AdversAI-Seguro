
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
                   Las credenciales de Firebase no están configuradas correctamente. La aplicación no puede continuar.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Por favor, asegúrate de que todas las variables de entorno `NEXT_PUBLIC_FIREBASE_*` estén definidas en tu archivo `.env` o en la configuración de tu proveedor de hosting.</p>
            </CardContent>
        </Card>
    </div>
);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // If Firebase is not configured, we stop loading and the notice will be displayed.
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
  
  // Display loading indicator while checking for credentials and auth state.
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className='ml-2'>Cargando aplicación...</p>
      </div>
    );
  }
  
  // If Firebase is not configured, show the error notice instead of the app.
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
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
