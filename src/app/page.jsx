import Logo from "@/components/Logo";

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4 text-center">
        <Logo />
        <h1 className="font-poppins text-5xl font-bold tracking-tight">
          <span className="text-primary">Nexhora</span> presenta
        </h1>
        <h2 className="font-pt-sans text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          AdversAI
        </h2>
        <p className="font-pt-sans text-lg text-muted-foreground">
          Tu copiloto inteligente para campañas de publicidad.
        </p>
      </div>
    </main>
  );
}
