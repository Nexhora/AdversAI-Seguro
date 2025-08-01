import { Logo } from '@/components/icons';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container relative mx-auto flex h-20 items-center justify-center px-4 md:px-6">
        <Link href="/" className="absolute left-4 flex items-center gap-3 md:left-6">
          <Logo className="h-8 w-8" />
          <div>
            <span className="block text-xl font-bold font-display leading-tight">NEXHORA</span>
            <span className="block text-xs text-muted-foreground">AdversAI</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
           <Link href="#beneficios" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Beneficios</Link>
           <Link href="#herramientas" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Herramientas</Link>
        </nav>
      </div>
    </header>
  );
}
