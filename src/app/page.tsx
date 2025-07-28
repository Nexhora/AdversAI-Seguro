"use client";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          AdVerseAI - Reconstrucción
        </h1>
        {loading ? (
          <p className="text-lg leading-8 text-muted-foreground">Cargando...</p>
        ) : user ? (
          <p className="text-lg leading-8 text-muted-foreground">
            Bienvenido, {user.email}. El sistema de autenticación funciona.
          </p>
        ) : (
          <p className="text-lg leading-8 text-muted-foreground">
            No has iniciado sesión. El sistema de autenticación funciona.
          </p>
        )}
      </div>
    </main>
  );
}
