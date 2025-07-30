"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, LoaderCircle } from "lucide-react";

// Helper component to parse and render text with bold tags
const BoldRenderer = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p className="text-muted-foreground whitespace-pre-wrap">
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-bold text-foreground">{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
    </p>
  );
};

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState({});

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResults(null);

    // Simulate AI response
    setTimeout(() => {
      setResults({
        audienceAnalysis: {
          refinedSegments: "**Jóvenes Eco-Conscientes (22-35 años):** Viven en zonas urbanas, con educación superior. Valoran la sostenibilidad, la ética y la transparencia de las marcas. Son activos en redes sociales como Instagram y Pinterest, y siguen a influencers de estilo de vida saludable y ecologismo.",
          emergingTrends: "**Minimalismo y Consumo Consciente:** Existe una tendencia creciente a comprar menos pero de mayor calidad y con menor impacto ambiental. La audiencia busca productos duraderos y multifuncionales que se alineen con sus valores.",
          competitiveAnalysis: "**Competidor A (EcoClean):** Se enfoca en la potencia de limpieza, pero su comunicación es menos cálida y personal. **Competidor B (GreenWash):** Usa un marketing muy 'verde', pero ha recibido críticas por falta de transparencia en sus ingredientes. Nuestra oportunidad está en combinar eficacia, transparencia y una conexión emocional."
        },
        adConcepts: [
          {
            id: 'aida',
            framework: "AIDA (Atención, Interés, Deseo, Acción)",
            description: "Capta la atención, genera interés, crea deseo e impulsa a la acción. Ideal para respuesta directa.",
            headline: "Tu Hogar, Tu Planeta, Una Sola Decisión. 🌿",
            primaryText: "Descubre Nexhora, la revolución en limpieza ecológica que protege a tu familia y al medio ambiente sin sacrificar la eficacia. Imagina un hogar impecable, con un aroma fresco y natural, sabiendo que estás tomando la mejor decisión para el futuro. ¡Únete al cambio! Haz clic y recibe un 20% de descuento en tu primer pedido.",
            cta: "Comprar con Descuento"
          },
          {
            id: 'pas',
            framework: "PAS (Problema, Agitación, Solución)",
            description: "Identifica un problema, agita la emoción y presenta tu producto como la solución definitiva.",
            headline: "Los Químicos Tóxicos se Acabaron. ¿Tu Familia está Segura?",
            primaryText: "Los limpiadores convencionales pueden dejar residuos tóxicos en tus superficies, afectando la salud de tus seres queridos y mascotas. Cada día, sin saberlo, podrías estar exponiendo a tu familia a ingredientes agresivos. Nexhora te ofrece paz mental con nuestra fórmula 100% natural y biodegradable. Respira tranquilo.",
            cta: "Elige Seguridad"
          }
        ],
        imagePrompt: {
          spanish: "Una imagen luminosa y moderna de una cocina impecable. La luz del sol entra por la ventana, reflejándose en una encimera de mármol donde descansa una elegante botella de Nexhora junto a un limón fresco y unas hojas de eucalipto. El ambiente transmite paz, limpieza y naturalidad.",
          english: "A bright and modern image of a spotless kitchen. Sunlight streams through the window, reflecting on a marble countertop where an elegant bottle of Nexhora rests next to a fresh lemon and some eucalyptus leaves. The atmosphere conveys peace, cleanliness, and naturalness."
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center p-8 font-sans">
      <header className="flex flex-col items-center space-y-2 mb-12 text-center">
        <Logo />
        <h1 className="font-poppins text-4xl font-bold text-foreground">
          Nexhora
        </h1>
        <p className="font-pt-sans text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          AdversAI
        </p>
        <p className="font-pt-sans text-lg text-muted-foreground pt-4 max-w-2xl">
          Tu copiloto inteligente para campañas de publicidad. Pega una URL para un análisis automático o completa los campos manualmente.
        </p>
      </header>

      <div className="w-full max-w-4xl space-y-8">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins">Crea tu próxima campaña</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url-input">Analizar sitio web (Opcional)</Label>
                <div className="flex gap-2">
                  <Input id="url-input" placeholder="Pega la URL de tu producto o servicio aquí..." className="bg-input" />
                  <Button type="button" variant="outline" disabled={isLoading}>Analizar con IA</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="product-name">¿Qué vas a vender? (Producto/Servicio)</Label>
                  <Input id="product-name" placeholder="Ej: Zapatillas deportivas ecológicas" className="bg-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand-name">Nombre de la Marca (Opcional)</Label>
                  <Input id="brand-name" placeholder="Ej: EcoRun" className="bg-input" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-audience">Público Objetivo</Label>
                <Textarea id="target-audience" placeholder="Describe a tu cliente ideal. Ej: Jóvenes de 20-30 años, conscientes del medio ambiente, interesados en el running y la moda sostenible." className="bg-input" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-objective">Objetivo de la Campaña</Label>
                <Textarea id="campaign-objective" placeholder="¿Qué quieres lograr? Ej: Aumentar las ventas online un 20% en el próximo trimestre." className="bg-input" />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="remarketing" />
                <Label htmlFor="remarketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Campaña de Remarketing
                </Label>
              </div>

              <div className="text-center pt-4">
                <Button type="submit" size="lg" className="w-full md:w-1/2 font-bold text-lg" disabled={isLoading}>
                  {isLoading ? <LoaderCircle className="animate-spin mr-2" /> : null}
                  {isLoading ? 'Generando...' : 'Generar Ideas con IA'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {isLoading && (
        <div className="w-full max-w-4xl mt-12 text-center">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground mt-4">Analizando y generando conceptos... esto puede tardar un momento.</p>
        </div>
      )}

      {results && (
        <div id="results" className="w-full max-w-4xl mt-12 space-y-8">
          {/* Audience Analysis Results */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins">Análisis de Audiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Segmentos Refinados</AccordionTrigger>
                  <AccordionContent>
                    <BoldRenderer text={results.audienceAnalysis.refinedSegments} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Tendencias Emergentes</AccordionTrigger>
                  <AccordionContent>
                    <BoldRenderer text={results.audienceAnalysis.emergingTrends} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Análisis Competitivo</AccordionTrigger>
                  <AccordionContent>
                    <BoldRenderer text={results.audienceAnalysis.competitiveAnalysis} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Ad Concepts Results */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins">Conceptos de Anuncios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {results.adConcepts.map(concept => (
                <div key={concept.id} className="border border-border/70 rounded-lg p-4">
                  <h4 className="font-poppins font-bold text-primary">{concept.framework}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{concept.description}</p>
                  
                  <div className="space-y-1 mb-2">
                    <Label>Título Sugerido</Label>
                    <div className="flex items-center gap-2">
                      <p className="flex-grow text-foreground p-2 bg-input rounded-md">{concept.headline}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(concept.headline, `${concept.id}-headline`)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label>Texto Principal Sugerido</Label>
                     <div className="flex items-start gap-2">
                      <p className="flex-grow text-foreground p-2 bg-input rounded-md whitespace-pre-wrap">{concept.primaryText}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(concept.primaryText, `${concept.id}-primary`)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Image Prompt Generator Results */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-poppins">Generador de Prompts para Imágenes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Prompt Sugerido (Español)</Label>
                <Textarea value={results.imagePrompt.spanish} readOnly className="bg-input h-24" />
              </div>
               <div>
                <Label>Prompt Sugerido (Inglés - Para IA de Imágenes)</Label>
                 <div className="flex items-center gap-2">
                  <Textarea value={results.imagePrompt.english} readOnly className="bg-input h-24" />
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(results.imagePrompt.english, 'prompt-en')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
