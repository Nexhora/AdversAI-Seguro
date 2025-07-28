"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if loading is finished and there's no user
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };


  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>;
  }

  // Do not render the dashboard if there is no user. The useEffect above will handle redirection.
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
       <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">AdVerseAI</h1>
        <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">{user.email}</span>
            <Button onClick={handleLogout} variant="outline">Cerrar Sesión</Button>
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-3xl">Crea tu Próxima Campaña de Éxito</CardTitle>
            <CardDescription>
              Describe tu producto, tu público y deja que nuestra IA genere una campaña publicitaria optimizada para ti.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="product-name">Nombre del Producto o Servicio</Label>
                <Input id="product-name" placeholder="Ej: Zapatillas para correr 'Speedster 2.0'" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target-audience">Público Objetivo</Label>
                <Input id="target-audience" placeholder="Ej: Corredores urbanos, 25-40 años, interesados en tecnología" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="product-description">Descripción Detallada</Label>
                <Textarea
                  id="product-description"
                  placeholder="Describe las características clave, beneficios y qué hace único a tu producto."
                  className="min-h-[120px]"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Generar Campaña con IA
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
