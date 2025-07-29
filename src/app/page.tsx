import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="size-8" />
            <span className="text-xl font-bold font-headline">AdVerseAI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
             <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
          </nav>
          <Button asChild>
            <Link href="/login?tab=register">Empezar Gratis</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight">
                    Crea Campañas de Marketing con IA
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Genera anuncios, landing pages y contenido optimizado en minutos. Transforma tu estrategia de marketing hoy.
                </p>
                
                <div className="mt-10">
                    <Button asChild size="lg">
                        <Link href="/login?tab=register">Comenzar a Construir Gratis</Link>
                    </Button>
                </div>
            </div>
        </div>
      </main>

       {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AdVerseAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
