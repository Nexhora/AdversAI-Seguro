"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Target, TestTube2, CheckShield } from "lucide-react";
import { Logo } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-headline">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo className="h-6 w-6" />
          <span className="sr-only">AdVerseAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                    Crea Campañas de Publicidad con IA
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl font-body">
                    AdVerseAI utiliza inteligencia artificial para analizar audiencias, generar creatividades y predecir el rendimiento de tus anuncios.
                  </p>
                </div>
              </div>
              <div className="w-full max-w-md mx-auto">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                  <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold">Comienza Gratis</h2>
                    <p className="text-muted-foreground font-body">
                      Regístrate para empezar a crear tu primera campaña.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Nombre</Label>
                        <Input id="first-name" placeholder="Juan" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Apellido</Label>
                        <Input id="last-name" placeholder="Pérez" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="juan.perez@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input id="password" type="password" />
                    </div>
                    <Button type="submit" className="w-full">
                      Crear Cuenta
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid items-start gap-6 lg:grid-cols-4 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <Target className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Análisis de Audiencia</h3>
                <p className="mt-2 text-muted-foreground font-body">
                  Segmenta tu público objetivo con precisión gracias a la IA.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BrainCircuit className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Ideación Creativa</h3>
                <p className="mt-2 text-muted-foreground font-body">
                  Genera múltiples conceptos de anuncios: textos, imágenes y CTAs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <TestTube2 className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Predicción y A/B Test</h3>
                <p className="mt-2 text-muted-foreground font-body">
                  Predice el rendimiento y configura tests A/B para optimizar resultados.
                </p>
              </div>
               <div className="flex flex-col items-center text-center">
                <CheckShield className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Creación Ética</h3>
                <p className="mt-2 text-muted-foreground font-body">
                  Asegura la seguridad de marca y el cumplimiento legal con nuestros checks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AdVerseAI. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Términos de Servicio
          </Link>
          <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Política de Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
