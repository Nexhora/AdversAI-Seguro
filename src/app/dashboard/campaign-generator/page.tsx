
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Bot,
  Loader2,
  Sparkles,
  Clipboard,
  ClipboardCheck,
  Search,
  CheckCircle,
  AlertCircle,
  BarChart,
  Lightbulb,
  Frown,
  RefreshCw,
  Eye,
  ImageIcon,
  Wand2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type {
  AdCreative,
  PerformancePrediction,
  EthicalCheck,
  AudienceAnalysis,
} from '@/types';
import { analyzeUrlForCampaign } from '@/ai/flows/analyze-url-flow';
import { generateAdCreative } from '@/ai/flows/creative-ideation';
import { predictAdPerformance } from '@/ai/flows/performance-prediction';
import { ethicalAdCreation } from '@/ai/flows/ethical-ad-creation';
import { analyzeAudience } from '@/ai/flows/audience-analysis';
import { generateImage } from '@/ai/flows/image-generation-flow';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  url: z.string().url({ message: 'Por favor, introduce una URL válida.' }).optional().or(z.literal('')),
  brandName: z.string().optional(),
  industry: z.string().min(1, 'La industria es requerida.'),
  productName: z.string().min(1, 'El nombre del producto es requerido.'),
  productDescription: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.'),
  toneOfVoice: z.string().min(1, 'El tono de voz es requerido.'),
  campaignObjective: z.string().min(1, 'El objetivo de la campaña es requerido.'),
  targetAudience: z.string().min(10, 'La descripción de la audiencia debe tener al menos 10 caracteres.'),
  keywords: z.string().min(1, 'Las palabras clave son requeridas.'),
  isRemarketing: z.boolean().default(false),
  historicalData: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Helper Component: ResultCard
const ResultCard = ({ title, icon: Icon, children, badgeText, badgeVariant = "default", ...props }: { title: string; icon: React.ElementType; children: React.ReactNode; badgeText?: string; badgeVariant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;[key: string]: any; }) => {
  return (
      <Card {...props}>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className="h-5 w-5 text-primary" />
            {title}
            {badgeText && <Badge variant={badgeVariant} className="ml-auto">{badgeText}</Badge>}
            </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
            {children}
        </CardContent>
      </Card>
  );
};

// Helper Component: CopyableText
const CopyableText = ({ text, onCopy }: { text: string; onCopy: (text: string) => void; }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        onCopy(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };
    
    return (
      <div className="relative group">
        <p className="whitespace-pre-wrap pr-8 text-muted-foreground">{text}</p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={handleCopy}
        >
          {isCopied ? <ClipboardCheck className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
        </Button>
      </div>
    );
};


export default function CampaignGenerator() {
  const { toast } = useToast();
  const router = useRouter();
  const [isAnalyzingUrl, startUrlAnalysis] = useTransition();
  const [isGenerating, startGeneration] = useTransition();
  const [isAnalyzing, startAnalysis] = useTransition();

  const [adCreatives, setAdCreatives] = useState<AdCreative[]>([]);
  const [predictions, setPredictions] = useState<Record<number, PerformancePrediction | null>>({});
  const [ethicalChecks, setEthicalChecks] = useState<Record<number, EthicalCheck | null>>({});
  const [audienceAnalysis, setAudienceAnalysis] = useState<AudienceAnalysis | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      brandName: '',
      industry: '',
      productName: '',
      productDescription: '',
      toneOfVoice: 'Amistoso',
      campaignObjective: 'Generar leads',
      targetAudience: '',
      keywords: '',
      isRemarketing: false,
      historicalData: 'CTR promedio 1.5%, Tasa de Conversión 3%, CPA $25',
    },
  });

  const handleUrlAnalysis = async () => {
    const url = form.getValues('url');
    if (!url) {
      toast({
        variant: 'destructive',
        title: 'URL Requerida',
        description: 'Por favor, introduce una URL para analizar.',
      });
      return;
    }

    startUrlAnalysis(async () => {
      try {
        const result = await analyzeUrlForCampaign({ url });
        form.setValue('brandName', result.brandName);
        form.setValue('productName', result.productName);
        form.setValue('productDescription', result.productDescription);
        form.setValue('targetAudience', result.targetAudience);
        // @ts-ignore - aicopilot can't see all definitions
        form.setValue('keywords', result.features || result.keywords || '');
        // @ts-ignore
        form.setValue('industry', result.industry || '');
        toast({
          title: '¡Análisis Completado!',
          description: 'Hemos rellenado el formulario con la información de la URL.',
        });
      } catch (error) {
        console.error('Error analyzing URL:', error);
        toast({
          variant: 'destructive',
          title: 'Error en el Análisis',
          description:
            error instanceof Error ? error.message : 'No se pudo analizar la URL.',
        });
      }
    });
  };

  const onSubmit = async (data: FormData) => {
    startGeneration(async () => {
      try {
        // Reset previous results
        setAdCreatives([]);
        setPredictions({});
        setEthicalChecks({});
        setAudienceAnalysis(null);

        // Generate ad copy first
        const creatives = await generateAdCreative(data);
        setAdCreatives(creatives); // Set creatives without images first
        toast({
          title: '¡Textos Generados!',
          description: 'Ahora, la IA está creando las imágenes para tus anuncios.',
        });
        
        // Now, generate images for each creative
        const imagePromises = creatives.map(creative => 
            generateImage({ prompt: creative.visualDescriptionEnglish })
        );

        const imageResults = await Promise.all(imagePromises);

        const creativesWithImages = creatives.map((creative, index) => ({
            ...creative,
            imageUrl: imageResults[index].imageUrl,
        }));
        
        setAdCreatives(creativesWithImages);
        toast({
          title: '¡Anuncios Completos!',
          description: 'Hemos creado dos conceptos con imágenes para ti.',
        });

      } catch (error) {
        console.error('Error generating creatives:', error);
        toast({
          variant: 'destructive',
          title: 'Error al Generar',
          description:
            error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
        });
      }
    });
  };

  const handleRunAnalysis = (index: number) => {
    const creative = adCreatives[index];
    const formData = form.getValues();
    if (!creative) return;

    startAnalysis(async () => {
      try {
        const adText = `${creative.primaryText} ${creative.headline} ${creative.description}`;
        
        // Run predictions and ethical checks in parallel
        const [predictionResult, ethicalResult, audienceResult] = await Promise.all([
          predictAdPerformance({
            headline: creative.headline,
            bodyText: `${creative.primaryText} ${creative.description}`,
            targetAudience: formData.targetAudience,
            campaignGoal: formData.campaignObjective,
            historicalData: formData.historicalData || 'No disponible',
          }),
          ethicalAdCreation({
            adText,
            brandGuidelines: `Tono de voz: ${formData.toneOfVoice}.`,
            legalRequirements: 'Cumplir con las políticas de publicidad estándar. No hacer promesas falsas.',
          }),
          audienceAnalysis ? Promise.resolve(null) : analyzeAudience({ // Only run if not already run
              demographics: formData.targetAudience,
              psychographics: 'Interesados en soluciones innovadoras para marketing digital.',
              behavior: 'Buscan herramientas que ahorren tiempo y mejoren el rendimiento.',
              industry: formData.industry,
          })
        ]);

        setPredictions(prev => ({ ...prev, [index]: predictionResult }));
        setEthicalChecks(prev => ({ ...prev, [index]: ethicalResult }));
        if (audienceResult) {
            setAudienceAnalysis(audienceResult);
        }

        toast({
          title: `Análisis para el Anuncio ${index + 1} Completo`,
          description: 'Revisa las predicciones y el chequeo ético.',
        });
      } catch (error) {
        console.error(`Error analyzing ad ${index + 1}:`, error);
        toast({
          variant: 'destructive',
          title: `Error en el Análisis del Anuncio ${index + 1}`,
          description: 'No se pudo completar el análisis.',
        });
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
        title: "¡Copiado!",
        description: "El texto se ha copiado al portapapeles."
    })
  };

  const handleCreateLandingPage = (ad: AdCreative) => {
    const campaignData = form.getValues();
    const params = new URLSearchParams({
        productDescription: `Basado en el anuncio con titular "${ad.headline}", describe el producto: ${campaignData.productDescription}`,
        targetAudience: campaignData.targetAudience,
    });
    
    router.push(`/dashboard/landing-generator?${params.toString()}`);
  };

  return (
    <div className="p-4 space-y-8">
      {/* Columna del Formulario */}
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Bot /> Generador de Campañas
          </CardTitle>
          <CardDescription>
            Rellena este formulario o introduce una URL para empezar a crear
            anuncios con IA.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Paso 1: Información Clave</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Analizar URL (Opcional)</FormLabel>
                          <div className="flex gap-2">
                            <Input
                              placeholder="https://tu-pagina.com"
                              {...field}
                            />
                            <Button
                              type="button"
                              onClick={handleUrlAnalysis}
                              disabled={isAnalyzingUrl}
                            >
                              {isAnalyzingUrl ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Search className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormDescription>
                            La IA leerá tu web y rellenará los campos por ti.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name="brandName" render={({ field }) => (<FormItem><FormLabel>Nombre de la Marca</FormLabel><FormControl><Input placeholder="Ej: Nexhora" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="industry" render={({ field }) => (<FormItem><FormLabel>Industria</FormLabel><FormControl><Input placeholder="Ej: Marketing Digital" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="productName" render={({ field }) => (<FormItem><FormLabel>Nombre del Producto/Servicio</FormLabel><FormControl><Input placeholder="Ej: Generador de Anuncios con IA" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="productDescription" render={({ field }) => (<FormItem><FormLabel>Descripción del Producto</FormLabel><FormControl><Textarea placeholder="Describe tu producto, sus beneficios y qué problema soluciona." {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Paso 2: Tono y Audiencia</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <FormField control={form.control} name="toneOfVoice" render={({ field }) => (<FormItem><FormLabel>Tono de Voz</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona un tono" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Amistoso">Amistoso</SelectItem><SelectItem value="Profesional">Profesional</SelectItem><SelectItem value="Divertido">Divertido</SelectItem><SelectItem value="Urgente">Urgente</SelectItem><SelectItem value="Informativo">Informativo</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="campaignObjective" render={({ field }) => (<FormItem><FormLabel>Objetivo de la Campaña</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona un objetivo" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Generar leads">Generar Leads</SelectItem><SelectItem value="Ventas online">Ventas Online</SelectItem><SelectItem value="Reconocimiento de marca">Reconocimiento de Marca</SelectItem><SelectItem value="Tráfico al sitio web">Tráfico al Sitio Web</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="targetAudience" render={({ field }) => (<FormItem><FormLabel>Audiencia Objetivo</FormLabel><FormControl><Textarea placeholder="Describe a tu cliente ideal (edad, intereses, profesión, etc.)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="keywords" render={({ field }) => (<FormItem><FormLabel>Palabras Clave</FormLabel><FormControl><Input placeholder="IA, marketing, anuncios, ... (separadas por comas)" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Paso 3: Opciones Avanzadas</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <FormField control={form.control} name="isRemarketing" render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Campaña de Remarketing</FormLabel><FormDescription>Actívalo si te diriges a usuarios que ya te conocen.</FormDescription></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="historicalData" render={({ field }) => (<FormItem><FormLabel>Datos Históricos (Opcional)</FormLabel><FormControl><Textarea placeholder="Añade datos de campañas pasadas para mejorar las predicciones. Ej: CTR 2%, CPA $15" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button type="submit" className="w-full" disabled={isGenerating}>
                {isGenerating ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : (<Sparkles className="mr-2 h-4 w-4" />)}
                Generar Anuncios
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Columna de Resultados */}
      <div className="w-full mx-auto space-y-6">
        {isGenerating && (
          <Card className="flex flex-col items-center justify-center p-10 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <CardTitle>Generando tus anuncios...</CardTitle>
            <CardDescription>La IA está trabajando. Esto puede tardar unos segundos.</CardDescription>
          </Card>
        )}

        {adCreatives.length === 0 && !isGenerating && (
          <Card className="flex flex-col items-center justify-center p-10 text-center border-dashed">
            <Frown className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>Aún no hay anuncios</CardTitle>
            <CardDescription>Completa el formulario y haz clic en "Generar Anuncios" para ver la magia.</CardDescription>
          </Card>
        )}

        {adCreatives.length > 0 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button onClick={() => adCreatives.forEach((_, i) => handleRunAnalysis(i))} variant="outline" disabled={isAnalyzing}>
                  {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BarChart className="mr-2 h-4 w-4" />}
                  Ejecutar todos los análisis
                </Button>
              </CardContent>
            </Card>

            {adCreatives.map((ad, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <CardTitle className="flex items-center">
                      Concepto de Anuncio {index + 1}
                      <Badge variant="secondary" className="ml-2">{ad.framework}</Badge>
                    </CardTitle>
                    <Button onClick={() => handleRunAnalysis(index)} variant="ghost" size="sm" className="ml-auto" disabled={isAnalyzing}>
                      {isAnalyzing && predictions[index] === undefined ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                      <span className="ml-2 hidden md:inline">Analizar</span>
                    </Button>
                  </div>
                  <CardDescription>
                    {ad.framework === 'AIDA' && <strong>Atención, Interés, Deseo, Acción.</strong>}
                    {ad.framework === 'PAS' && <strong>Problema, Agitación, Solución.</strong>}
                    {' Un framework clásico para guiar al usuario a través del embudo de conversión.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Columna de Texto del Anuncio */}
                  <div className="space-y-4">
                    <ResultCard title="Textos del Anuncio" icon={Lightbulb}>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Texto Principal</h4>
                          <CopyableText text={ad.primaryText} onCopy={copyToClipboard} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Titular</h4>
                          <CopyableText text={ad.headline} onCopy={copyToClipboard} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Descripción</h4>
                          <CopyableText text={ad.description} onCopy={copyToClipboard} />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Llamada a la Acción</h4>
                          <CopyableText text={ad.callToAction} onCopy={copyToClipboard} />
                        </div>
                      </div>
                    </ResultCard>

                    {ethicalChecks[index] && (
                      <ResultCard title="Análisis Ético" icon={ethicalChecks[index]!.isEthical ? CheckCircle : AlertCircle} badgeText={ethicalChecks[index]!.isEthical ? 'Aprobado' : 'Revisar'} badgeVariant={ethicalChecks[index]!.isEthical ? 'default' : 'destructive'}>
                        <p className="text-muted-foreground">{ethicalChecks[index]!.explanation}</p>
                        {ethicalChecks[index]!.suggestedAlternatives.length > 0 && (
                          <div className="mt-2">
                            <h4 className="font-semibold">Alternativas sugeridas:</h4>
                            <ul className="list-disc list-inside text-muted-foreground">
                              {ethicalChecks[index]!.suggestedAlternatives.map((alt, i) => <li key={i}>{alt}</li>)}
                            </ul>
                          </div>
                        )}
                      </ResultCard>
                    )}
                  </div>

                  {/* Columna de Visual y Predicciones */}
                  <div className="space-y-4">
                    <ResultCard title="Visual del Anuncio" icon={ImageIcon}>
                      <div className="space-y-4">
                        <div className="aspect-video w-full rounded-md border bg-muted flex items-center justify-center">
                          {ad.imageUrl ? (
                            <Image
                              src={ad.imageUrl}
                              alt={ad.visualDescription}
                              width={512}
                              height={288}
                              className="rounded-md object-cover"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-8 w-8 animate-spin" />
                              <span>Generando imagen...</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Prompt (Descripción de la Imagen)</h4>
                          <CopyableText text={ad.visualDescription} onCopy={copyToClipboard} />
                        </div>
                      </div>
                    </ResultCard>

                    {predictions[index] && (
                      <ResultCard title="Predicciones de Rendimiento" icon={BarChart}>
                        <div className="space-y-2">
                          <div className="flex justify-between"><span>CTR Predicho:</span> <span className="font-bold">{predictions[index]!.predictedCTR.toFixed(2)}%</span></div>
                          <div className="flex justify-between"><span>Conversión Predicha:</span> <span className="font-bold">{predictions[index]!.predictedConversionRate.toFixed(2)}%</span></div>
                          <div className="flex justify-between"><span>CPA Predicho:</span> <span className="font-bold">${predictions[index]!.predictedCPA.toFixed(2)}</span></div>
                          <Separator className="my-2" />
                          <p className="text-muted-foreground"><span className="font-semibold">Recomendación A/B Test:</span> {predictions[index]!.aBTestingRecommendation}</p>
                        </div>
                      </ResultCard>
                    )}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full" onClick={() => handleCreateLandingPage(ad)}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Crear Landing Page para este Anuncio
                  </Button>
                </div>
              </Card>
            ))}
             {audienceAnalysis && (
                <ResultCard title="Análisis de Audiencia" icon={Eye}>
                    <div className="space-y-2">
                        <h4 className="font-semibold">Segmentos Clave</h4>
                        <p className="text-muted-foreground">{audienceAnalysis.refinedSegments}</p>
                        <h4 className="font-semibold">Tendencias Emergentes</h4>
                        <p className="text-muted-foreground">{audienceAnalysis.emergingTrends}</p>
                        <h4 className="font-semibold">Análisis Competitivo</h4>
                        <p className="text-muted-foreground">{audienceAnalysis.competitiveAnalysis}</p>
                    </div>
                </ResultCard>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
