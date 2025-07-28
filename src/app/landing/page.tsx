
'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Si el usuario ya está autenticado, lo redirigimos al dashboard.
    // Esto previene que un usuario logueado vea la página de bienvenida.
    if (!loading && user) {
      router.replace('/dashboard/builder');
    }
  }, [user, loading, router]);
  
  // No renderizar nada mientras se verifica el estado de autenticación para evitar parpadeos.
  if (loading || user) {
      return (
        <div className="flex h-screen items-center justify-center bg-background">
            {/* Puedes mostrar un loader aquí si lo deseas */}
        </div>
      );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <div className="absolute top-4 left-4">
            <Logo className="size-10 text-primary" />
        </div>
        <Card className="w-full max-w-lg text-center shadow-2xl">
            <CardHeader>
                <CardTitle className="font-headline text-4xl">Bienvenido a NEXHORA</CardTitle>
                <CardDescription className="text-lg">
                    Tu plataforma para construir y lanzar campañas publicitarias con el poder de la IA.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                 <p>Para continuar, por favor, inicia sesión o crea una nueva cuenta.</p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/auth/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/auth/register">Registrarse</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
        <footer className="absolute bottom-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} NEXHORA by AdVerseAI. Todos los derechos reservados.</p>
        </footer>
    </div>
  );
}
