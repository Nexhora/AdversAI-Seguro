
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, firebaseCredentialsExist } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
// The FirebaseErrorNotice component is removed as it was causing build issues.

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
      // Replaced the failing component with a simple div to avoid build errors.
      return (
        <div style={{ fontFamily: 'sans-serif', color: '#dc2626', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backgroundColor: '#fef2f2' }}>
            <div style={{ maxWidth: '450px', width: '100%', border: '1px solid #fca5a5', padding: '1.5rem', borderRadius: '0.5rem' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    Error de Configuración de Firebase
                </h1>
                <p style={{ marginTop: '0.5rem', color: '#b91c1c' }}>La aplicación no puede continuar sin una conexión válida a Firebase.</p>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>La configuración en `src/lib/firebase.ts` parece estar incompleta. Por favor, asegúrate de que el objeto `firebaseConfig` contenga las claves correctas de tu proyecto.</p>
            </div>
        </div>
      );
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
        throw new Error('useAuth must be in an AuthProvider');
    }
    return context;
};
