
"use client";

import { createContext, useContext, ReactNode } from 'react';

// Se crea un contexto falso para que el resto de la aplicación no falle.
// La funcionalidad de autenticación está desactivada temporalmente.

interface AuthContextType {
  user: null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  logout: () => {},
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = {
    user: null,
    loading: false,
    logout: () => {}
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
