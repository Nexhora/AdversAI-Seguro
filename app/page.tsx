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
        <button className="h-11 rounded-md px-8 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium">
          Comenzar Ahora
        </button>
      </main>
    </div>
  );
}
