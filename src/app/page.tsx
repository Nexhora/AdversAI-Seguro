
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <span className="text-xl font-bold font-headline">NEXHORA</span>
        </div>
        <div>
          <Button asChild variant="ghost">
            <Link href="/auth/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Registrarse <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-3xl">
           <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary-foreground">
             Crea Anuncios y Landing Pages con el Poder de la IA
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Bienvenido a NEXHORA, tu centro de control para lanzar campañas de marketing exitosas. Utiliza nuestras herramientas de IA para generar anuncios, crear páginas de aterrizaje y llevar tus ideas al siguiente nivel, sin necesidad de código.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/auth/register">
                Comenzar Gratis
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard/builder">
                Ir al Laboratorio
              </Link>
            </Button>
          </div>
        </div>
      </main>
       <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} NEXHORA by AdVerseAI. Todos los derechos reservados.
      </footer>
    </div>
  );
}
