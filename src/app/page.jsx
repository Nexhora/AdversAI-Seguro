import Logo from "@/components/Logo";

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <h1 className="text-4xl font-bold tracking-tight text-center">
          Bienvenido a <span className="text-primary">AdVerseAI</span>
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          Tu copiloto inteligente para campañas de publicidad.
        </p>
      </div>
    </main>
  );
}