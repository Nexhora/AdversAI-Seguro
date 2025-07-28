"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";
import { Logo } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
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
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Recupera el control de tu privacidad
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  AdVerseAI te protege de la publicidad invasiva y los rastreadores, dándote una experiencia online
                  más segura y privada.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login" prefetch={false}>
                  <Button>Empieza Gratis</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Bloqueo Avanzado</h3>
                <p className="mt-2 text-muted-foreground">
                  Nuestra tecnología de vanguardia bloquea anuncios y rastreadores de forma más eficaz que las
                  soluciones tradicionales.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Lock className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Privacidad Mejorada</h3>
                <p className="mt-2 text-muted-foreground">
                  Protege tus datos personales y tu actividad online de miradas indiscretas.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <EyeOff className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Navegación sin Foco</h3>
                <p className="mt-2 text-muted-foreground">
                  Disfruta de una experiencia de navegación más rápida y limpia, sin distracciones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AdVerseAI. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Términos de Servicio
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Política de Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}