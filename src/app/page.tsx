"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

function AuthenticatedView({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener in AuthContext will handle the user state change.
      // We can optionally redirect here if needed, but the view will update automatically.
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Bienvenido de Nuevo
      </h1>
      <p className="text-lg leading-8 text-muted-foreground">
        Sesión iniciada como {user.email}.
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={handleLogout} variant="secondary">Cerrar Sesión</Button>
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
        Por favor, inicia sesión o regístrate para continuar.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild>
           <Link href="/login">Iniciar Sesión</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/register">Registrarse</Link>
        </Button>
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
