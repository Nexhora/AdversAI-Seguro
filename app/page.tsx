import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Crea Campañas Publicitarias con IA
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8">
          AdVerseAI te ayuda a generar conceptos creativos, textos persuasivos y estrategias de segmentación para tus anuncios.
        </p>
        <Button size="lg">Comenzar Ahora</Button>
      </main>
    </div>
  );
}