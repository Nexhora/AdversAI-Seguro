"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function AuthenticatedView({ user }) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Bienvenido de Nuevo
      </h1>
      <p className="text-lg leading-8 text-muted-foreground">
        Sesión iniciada como {user.email}.
      </p>
      <div className="flex justify-center gap-4">
        {/* Aquí irían los botones para ir al dashboard, etc. */}
      </div>
    </div>
  );
}

function UnauthenticatedView() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        AdVerseAI - Reconstrucción
      </h1>
      <p className="text-lg leading-8 text-muted-foreground">
        El sistema de autenticación funciona. Por favor, inicia sesión o regístrate.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          Iniciar Sesión
        </Link>
        <Link href="/register" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      {loading ? (
        <p className="text-lg leading-8 text-muted-foreground">Cargando...</p>
      ) : user ? (
        <AuthenticatedView user={user} />
      ) : (
        <UnauthenticatedView />
      )}
    </main>
  );
}
