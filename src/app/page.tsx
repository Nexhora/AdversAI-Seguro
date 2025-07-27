
"use client";

import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Mail, Settings } from 'lucide-react';
import Link from 'next/link';

export default function MaintenancePage() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white font-body flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="size-8 text-primary" />
            <span className="text-xl font-bold font-headline">Nexhora</span>
          </Link>
          <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
            <a href="mailto:soporte@nexhora.com">
              <Mail className="mr-2 h-4 w-4" />
              Contactar Soporte
            </a>
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <section className="relative py-20 md:py-32 overflow-hidden text-center">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
             <div className="container mx-auto px-4 md:px-6 relative z-10">
                <Settings className="w-16 h-16 mx-auto text-primary animate-spin" style={{ animationDuration: '5s' }}/>
                <h1 className="mt-8 text-4xl md:text-6xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    En Mantenimiento
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                    Estamos realizando mejoras importantes en nuestra infraestructura. La plataforma volverá a estar disponible en breve.
                </p>
                 <p className="mt-4 max-w-2xl mx-auto text-md text-gray-500">
                    Lamentamos profundamente los inconvenientes que esto pueda causar. Estamos trabajando sin descanso para resolver un problema de compatibilidad con nuestro proveedor de hosting.
                </p>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Nexhora. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
