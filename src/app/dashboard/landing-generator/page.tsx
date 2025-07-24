
'use client';

import React, { useState, useTransition, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { nanoid } from 'nanoid';

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
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2, Sparkles, Frown, Pencil, Save, AlertCircle, RefreshCw, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { generateLandingPage } from '@/ai/flows/generate-landing-page-flow';
import { saveGeneratedPage } from '../actions';
import type { BuilderState } from '@/types';
import { GenerateLandingPageInputSchema, type GenerateLandingPageInput } from '@/ai/schemas/landing-page-generation';
import { PageRenderer } from '@/components/PageRenderer';
import { Textarea } from '@/components/ui/textarea';


const LandingPreview = ({ pageData }: { pageData: BuilderState }) => {
    if (!pageData || !pageData.page || pageData.page.length === 0) {
        return <div className='text-center p-8'>Contenido no válido para la vista previa.</div>;
    }
    
    return (
        <div>
           <PageRenderer sections={pageData.page} />
        </div>
    );
};


const ResultCard: React.FC<{
    status: 'idle' | 'loading' | 'error' | 'success';
    error?: Error | null;
    children?: React.ReactNode;
}> = ({ status, error, children }) => {
    switch (status) {
        case 'loading':
            return (
                <Card className="flex flex-col items-center justify-center p-10 text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <CardTitle>Generando la Estructura de tu Página...</CardTitle>
                    <CardDescription>La IA está analizando, escribiendo el copy y diseñando. Esto puede tardar unos segundos.</CardDescription>
                </Card>
            );
        case 'error':
            return (
                <Card className="flex flex-col items-center justify-center p-10 text-center border-dashed border-destructive">
                    <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                    <CardTitle>Error en la Generación</CardTitle>
                    <CardDescription className="max-w-md mx-auto">
                        La IA no pudo procesar tu solicitud. Inténtalo de nuevo con una descripción más detallada o una URL diferente.
                        {error && <code className="text-xs mt-2 block bg-muted p-2 rounded max-w-full overflow-auto whitespace-pre-wrap">{error.message}</code>}
                    </CardDescription>
                </Card>
            );
        case 'success':
            return <>{children}</>;
        case 'idle':
        default:
            return (
                <Card className="flex flex-col items-center justify-center p-10 text-center border-dashed">
                    <Frown className="h-12 w-12 text-muted-foreground mb-4" />
                    <CardTitle>Aquí aparecerá tu página de ventas</CardTitle>
                    <CardDescription>Describe tu producto o introduce una URL para que la IA construya una página de alta conversión para ti.</CardDescription>
                </Card>
            );
    }
};


export default function LandingGeneratorPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [isGenerating, startGeneration] = useTransition();
  const [isSaving, startSaving] = useTransition();

  const [generatedContent, setGeneratedContent] = useState<BuilderState | null>(null);
  
  const [generationError, setGenerationError] = useState<Error | null>(null);
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const form = useForm<GenerateLandingPageInput>({
    resolver: zodResolver(GenerateLandingPageInputSchema),
    defaultValues: {
      url: '',
      productDescription: '',
      targetAudience: '',
      colorPalette: 'moderno_oscuro',
    },
  });

  // Effect to load data from campaign generator
  useEffect(() => {
    const dataFromAd = localStorage.getItem('landingPageDataFromAd');
    if (dataFromAd) {
        try {
            const parsedData = JSON.parse(dataFromAd);
            form.setValue('productDescription', parsedData.productDescription);
            form.setValue('targetAudience', parsedData.targetAudience);
            toast({
                title: 'Información de Anuncio Cargada',
                description: 'Hemos rellenado el formulario con los datos de tu campaña publicitaria.'
            });
        } catch (e) {
            console.error("Failed to parse landing page data from ad", e);
        } finally {
            localStorage.removeItem('landingPageDataFromAd');
        }
    }
  }, [form, toast]);

  const onSubmit = useCallback((data: GenerateLandingPageInput) => {
    setGenerationStatus('loading');
    setGeneratedContent(null);
    setGenerationError(null);

    startGeneration(async () => {
      try {
        // The generateLandingPage flow now returns the full BuilderState with IDs
        const pageStructure = await generateLandingPage(data);
        
        if (!pageStructure || !pageStructure.page || pageStructure.page.length === 0) {
            throw new Error('La IA devolvió una respuesta inválida o vacía.');
        }
        
        setGeneratedContent(pageStructure);
        setGenerationStatus('success');
        toast({
          title: '¡Estructura Generada!',
          description: 'Tu página está lista para guardar o editar.',
        });

      } catch (error) {
        console.error("Error al generar la página:", error);
        setGenerationError(error instanceof Error ? error : new Error('Ocurrió un error inesperado.'));
        setGenerationStatus('error');
      }
    });
  }, [toast]);
  

  const handleEdit = useCallback(() => {
    if (!generatedContent) return;
    localStorage.setItem('generatedLandingPage', JSON.stringify(generatedContent));
    router.push('/dashboard/builder');
  }, [generatedContent, router]);

  const handleSave = useCallback(async () => {
    if (!user || !generatedContent) return;
    
    startSaving(async () => {
        try {
            const result = await saveGeneratedPage({
                userId: user.uid,
                siteContent: JSON.stringify(generatedContent),
            });
            toast({
                title: '¡Página Guardada!',
                description: `"${result.pageName}" se ha guardado en "Mis Sitios".`,
            });
            router.push('/dashboard/my-sites');
        } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Error al Guardar la Página',
              description: error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
            });
        }
    });

  }, [user, generatedContent, toast, router]);

  return (
    <div className="container mx-auto p-0 md:p-4 space-y-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Wand2 /> Generador de Páginas de Venta
          </CardTitle>
          <CardDescription>
            Introduce una URL para que la IA la analice y cree una página inspirada en su contenido, o describe tu producto manualmente.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Analizar URL (Opcional)</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="https://ejemplo.com/landing-page-exitosa"
                              {...field}
                            />
                        </FormControl>
                        <FormDescription>
                           Si proporcionas una URL, la IA ignorará los campos de abajo y extraerá el contenido de la página.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                 <div className="flex items-center gap-4">
                    <div className="flex-grow border-t"></div>
                    <span className="text-muted-foreground text-sm">O</span>
                    <div className="flex-grow border-t"></div>
                </div>

                <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Describe tu producto o servicio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ej: Un curso online de 10 módulos que enseña a dueños de negocios a crear anuncios efectivos en Facebook, incluso sin experiencia previa."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                            Sé lo más específico posible. Incluye qué es, para qué sirve y qué beneficios principales ofrece.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>¿A quién te diriges?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ej: Emprendedores y dueños de pequeñas empresas que luchan por atraer clientes online y se sienten abrumados por el marketing digital."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                            Describe a tu cliente ideal, sus problemas y sus deseos.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="colorPalette"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-2"><Palette/> Tono Visual</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="moderno_oscuro">Moderno y Oscuro (para productos digitales, SaaS)</SelectItem>
                                <SelectItem value="corporativo_claro">Corporativo y Claro (para servicios, consultoría)</SelectItem>
                                <SelectItem value="atrevido_creativo">Atrevido y Creativo (para marcas personales, eventos)</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormDescription>Elige un estilo para guiar el diseño de la IA.</FormDescription>
                    </FormItem>
                    )}
                />
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" disabled={isGenerating}>
                    {isGenerating ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : (<Sparkles className="mr-2 h-4 w-4" />)}
                    Generar Página con IA
                </Button>
            </CardFooter>
            </form>
        </Form>
      </Card>

      <ResultCard status={generationStatus} error={generationError}>
        {generatedContent && (
            <div className="space-y-6">
                <div className='text-center'>
                    <h2 className="text-2xl font-bold font-headline">Vista Previa de la Página Generada</h2>
                    <p className="text-muted-foreground">Así ha diseñado la IA la página de ventas para tu producto.</p>
                </div>
                
                <LandingPreview pageData={generatedContent} />

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 sticky bottom-4 z-10">
                    <Button onClick={handleSave} disabled={isSaving} className='flex-1 shadow-lg'>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4"/>}
                        Guardar en Mis Sitios
                    </Button>
                    <Button onClick={() => onSubmit(form.getValues())} variant="outline" disabled={isGenerating} className='flex-1 shadow-lg'>
                        {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4"/>}
                        Regenerar con los mismos datos
                    </Button>
                    <Button onClick={handleEdit} variant="secondary" className='flex-1 shadow-lg'>
                        <Pencil className="mr-2 h-4 w-4"/>
                        Editar en el Constructor
                    </Button>
                </div>
            </div>
        )}
      </ResultCard>

    </div>
  );
}
