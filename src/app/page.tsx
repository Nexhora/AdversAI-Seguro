import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-20 flex items-center">
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <Logo className="size-8" />
          <span className="text-xl font-bold font-headline">AdVerseAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Login
          </Link>
          <Button asChild>
            <Link href="/login?tab=register">Empezar Gratis</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Crea Campañas Publicitarias con{" "}
                    <span className="text-primary">Inteligencia Artificial</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Nuestra plataforma utiliza IA para generar textos, imágenes y estrategias completas para tus anuncios. Ahorra tiempo, optimiza tu presupuesto y alcanza a tu audiencia ideal.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/login?tab=register">
                      Crea tu primera campaña
                    </Link>
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="abstract marketing"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
