import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy } from "lucide-react";

export default function HomePage() {
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
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url-input">Analizar sitio web (Opcional)</Label>
                <div className="flex gap-2">
                  <Input id="url-input" placeholder="Pega la URL de tu producto o servicio aquí..." className="bg-input" />
                  <Button type="button" variant="outline">Analizar con IA</Button>
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
                <Button type="submit" size="lg" className="w-full md:w-1/2 font-bold text-lg">
                  Generar Ideas con IA
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for AI results */}
      <div id="results" className="w-full max-w-4xl mt-12 space-y-8">
        {/* Audience Analysis Results */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins">Análisis de Audiencia</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Content will be rendered here */}
          </CardContent>
        </Card>

        {/* Ad Concepts Results */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins">Conceptos de Anuncios</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AIDA and PAS cards will be rendered here */}
          </CardContent>
        </Card>

        {/* Image Prompt Generator Results */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-poppins">Generador de Prompts para Imágenes</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Image prompt content will be rendered here */}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
