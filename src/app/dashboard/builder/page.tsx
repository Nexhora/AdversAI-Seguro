
'use client';

import React, { useState, useTransition, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Save, Loader2, FolderDown, Eye, FlaskConical, AlertTriangle, Trash2, Copy, ArrowUp, ArrowDown, LayoutTemplate } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { savePageData, getUserPages, getPageData, deletePageData } from '../actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { nanoid } from 'nanoid';
import type { BuilderState, Section } from '@/types';
import { PageRenderer } from '@/components/PageRenderer';

interface SavedPage {
    id: string;
    name: string;
    content: string; // El contenido es un string JSON
    updatedAt: string;
}

const EMPTY_STATE: BuilderState = { page: [] };

const HOME_PAGE_TEMPLATE: BuilderState = {
  page: [
    {
      id: nanoid(),
      type: "Hero",
      props: {
        title: "Construye tu Próxima Gran Idea",
        subtitle: "Arrastra, suelta y edita componentes para crear una página increíble en minutos. Sin necesidad de código.",
        buttonText: "Empezar a Construir",
        bgColor: "bg-gray-900",
        textColor: "text-white",
        textAlign: "center"
      }
    },
    {
      id: nanoid(),
      type: "Features",
      props: {
        title: "Todo lo que Necesitas",
        subtitle: "Componentes flexibles y potentes para dar vida a tu visión.",
        features: [
          {
            icon: "Zap",
            title: "Rápido e Intuitivo",
            description: "Nuestra interfaz está diseñada para que te muevas a la velocidad de la luz."
          },
          {
            icon: "BookOpen",
            title: "Componentes Flexibles",
            description: "Personaliza cada sección para que se ajuste perfectamente a tu marca y mensaje."
          },
          {
            icon: "MousePointerClick",
            title: "Vista Previa Instantánea",
            description: "Mira exactamente cómo se verá tu página antes de publicarla."
          }
        ],
        bgColor: "bg-background",
        textColor: "text-foreground"
      }
    }
  ]
};


const EditPanel = ({ selectedSection, onChange, onMove, onDelete, onDuplicate, sectionIndex, totalSections }: { 
    selectedSection: Section | null;
    onChange: (newSection: Section) => void;
    onMove: (direction: 'up' | 'down') => void;
    onDelete: () => void;
    onDuplicate: () => void;
    sectionIndex: number | null;
    totalSections: number;
}) => {
  if (!selectedSection || sectionIndex === null) return (
    <div className='p-4 text-center text-muted-foreground'>
        <FlaskConical className="mx-auto mb-2 h-8 w-8" />
        <p>Selecciona una sección para editar sus propiedades.</p>
    </div>
  );

  const handleChange = (field: string, value: any) => {
    if (!selectedSection) return;
    onChange({
      ...selectedSection,
      props: {
        ...selectedSection.props,
        [field]: value,
      },
    });
  };
  
  const renderField = (key: string, value: any) => {
    // Una heurística simple para renderizar diferentes tipos de entrada
    if (typeof value === 'string') {
        if (value.length > 100 || value.includes('\n')) {
             return (
                <div key={key} className="space-y-2">
                    <Label htmlFor={`prop-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                    <Textarea id={`prop-${key}`} value={value} onChange={(e) => handleChange(key, e.target.value)} className="w-full" rows={5} />
                </div>
            )
        }
        return (
            <div key={key} className="space-y-2">
                <Label htmlFor={`prop-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                <Input type="text" id={`prop-${key}`} value={value} onChange={(e) => handleChange(key, e.target.value)} className="w-full" />
            </div>
        )
    }
    // Añade más manejadores de tipos según sea necesario (número, booleano para interruptores, etc.)
    return null;
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Editando: {selectedSection.type}</h3>
      <Separator className='my-4' />
      <ScrollArea className="h-[calc(100vh-350px)]">
        <div className="space-y-4 pr-4">
            {selectedSection.props && Object.keys(selectedSection.props).length > 0 ? (
                Object.entries(selectedSection.props).map(([key, value]) => renderField(key, value))
            ) : (
                <p className='text-sm text-muted-foreground'>Esta sección no tiene propiedades editables.</p>
            )}
        </div>
      </ScrollArea>
      <Separator className='my-4' />
      <div className='space-y-2'>
        <h4 className='font-semibold'>Acciones</h4>
        <div className='grid grid-cols-2 gap-2'>
            <Button variant="outline" size="sm" onClick={() => onMove('up')} disabled={sectionIndex === 0}><ArrowUp className='mr-2 h-4 w-4' /> Mover Arriba</Button>
            <Button variant="outline" size="sm" onClick={() => onMove('down')} disabled={sectionIndex === totalSections - 1}><ArrowDown className='mr-2 h-4 w-4' /> Mover Abajo</Button>
            <Button variant="outline" size="sm" onClick={onDuplicate}><Copy className='mr-2 h-4 w-4' /> Duplicar</Button>
            <Button variant="destructive" size="sm" onClick={onDelete}><Trash2 className='mr-2 h-4 w-4' /> Eliminar</Button>
        </div>
      </div>
    </div>
  );
};

const BuilderPageContent = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSaving, startSavingTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState<{ id: string, name: string } | null>(null);
    
  const [state, setState] = useState<BuilderState>(EMPTY_STATE);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [pageName, setPageName] = useState('');
  const [savedPages, setSavedPages] = useState<SavedPage[]>([]);
  const [isLoadingPages, startLoadingPages] = useTransition();
  const [pageToDelete, setPageToDelete] = useState<SavedPage | null>(null);
  const [isDeleting, startDeletingTransition] = useTransition();

  
  const loadPageFromUrl = useCallback(async (pageId: string) => {
      if (!user) return;
      setIsLoading(true);
      try {
          const pageData = await getPageData(user.uid, pageId);
          if (pageData && pageData.content) {
              const contentToLoad = JSON.parse(pageData.content);
              if (contentToLoad) {
                  setState(contentToLoad);
                  setPageName(pageData.name);
                  setActivePage({ id: pageId, name: pageData.name });
                  toast({ title: "¡Página Cargada!", description: `Editando "${pageData.name}".` });
              } else {
                  toast({ variant: 'destructive', title: 'Error de Contenido', description: 'El formato de la página guardada está dañado. Se cargará un lienzo en blanco.' });
                  router.replace('/dashboard/builder', { scroll: false });
                  setState(EMPTY_STATE);
              }
          } else {
              toast({ variant: 'destructive', title: 'Error', description: 'No se pudo encontrar la página para editar. Se cargará un lienzo en blanco.' });
              router.replace('/dashboard/builder', { scroll: false });
              setState(EMPTY_STATE);
          }
      } catch (error) {
          console.error("Error al cargar datos de la página: ", error);
          toast({ variant: 'destructive', title: 'Error al Cargar', description: 'No se pudieron obtener los datos de la página. Se cargará un lienzo en blanco.' });
          setState(EMPTY_STATE);
          router.replace('/dashboard/builder', { scroll: false });
      } finally {
          setIsLoading(false);
      }
  }, [user, router, toast]);
  

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
        // Auth context will handle redirect
        setIsLoading(false);
        return;
    }
    
    const pageIdToLoad = searchParams.get('pageId');
    if (pageIdToLoad) {
        loadPageFromUrl(pageIdToLoad);
    } else {
        setState(EMPTY_STATE);
        setActivePage(null);
        setPageName('');
        setIsLoading(false);
    }
    
  }, [searchParams, user, authLoading, loadPageFromUrl]);


  if (authLoading || isLoading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /> <span className="ml-2">Cargando laboratorio...</span></div>
  }
  
  if (!user) {
    return null;
  }
  
  const handleSectionClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex(index);
  }

  const handleEditChange = (newSectionData: Section) => {
    if (selectedIndex === null) return;
    const updatedSections = [...state.page];
    updatedSections[selectedIndex] = newSectionData;
    setState({ page: updatedSections });
  }

  const handleMoveSection = (direction: 'up' | 'down') => {
    if (selectedIndex === null || state.page.length < 2) return;
    const newSections = [...state.page];
    const newIndex = direction === 'up' ? selectedIndex - 1 : selectedIndex + 1;
    if(newIndex >= 0 && newIndex < newSections.length) {
        const item = newSections.splice(selectedIndex, 1)[0];
        newSections.splice(newIndex, 0, item);
        setState({ page: newSections });
        setSelectedIndex(newIndex);
    }
  }

  const handleDeleteSection = () => {
    if (selectedIndex === null) return;
    const newSections = state.page.filter((_, i) => i !== selectedIndex);
    setState({ page: newSections });
    setSelectedIndex(null);
  }

  const handleDuplicateSection = () => {
    if (selectedIndex === null) return;
    const sectionToDuplicate = state.page[selectedIndex];
    const newSection = {
        ...sectionToDuplicate,
        id: nanoid(),
    };
    const newSections = [...state.page];
    newSections.splice(selectedIndex + 1, 0, newSection);
    setState({ page: newSections });
    setSelectedIndex(selectedIndex + 1);
  }

  const handleSave = () => {
    setPageName(activePage?.name || pageName || 'Mi Nueva Página');
    setSaveDialogOpen(true);
  };

  const handleConfirmSave = () => {
    if (!pageName) {
      toast({ variant: "destructive", title: "Error", description: "El nombre de la página no puede estar vacío."});
      return;
    }

    startSavingTransition(async () => {
      try {
        const result = await savePageData({
            userId: user.uid,
            pageId: activePage?.id,
            pageName: pageName,
            siteContent: JSON.stringify(state),
        });

        if (result.pageId) {
            setActivePage({ id: result.pageId, name: pageName });
            if (!activePage?.id || activePage?.id !== result.pageId) {
                router.replace(`/dashboard/builder?pageId=${result.pageId}`, { scroll: false });
            }
        }
        
        toast({ title: '¡Éxito!', description: result.message });
        setSaveDialogOpen(false);
      } catch (error) {
        console.error("Error saving page:", error);
        toast({
            variant: 'destructive',
            title: 'Error al Guardar',
            description: error instanceof Error ? error.message : 'No se pudo guardar la página.',
        });
      }
    });
  }
  
  const handleLoad = () => {
    setLoadDialogOpen(true);
    startLoadingPages(async () => {
        try {
            const pages = await getUserPages(user.uid);
            if (pages) {
                setSavedPages(pages as SavedPage[]);
            } else {
                 toast({ variant: 'destructive', title: 'Error', description: 'No se pudieron cargar tus páginas.' });
                 setSavedPages([]);
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error', description: 'Ocurrió un error al buscar tus páginas guardadas.' });
            setSavedPages([]);
        }
    });
  };

  const handleLoadPage = (pageId: string) => {
    if (activePage?.id === pageId) {
        setLoadDialogOpen(false);
        return;
    }
    router.push(`/dashboard/builder?pageId=${pageId}`);
    setLoadDialogOpen(false);
  };

  const handlePreview = () => {
    if (activePage?.id) {
         window.open(`/preview/${user.uid}/${activePage.id}`, '_blank');
         return;
    }
    toast({
        title: 'Guarda primero',
        description: 'Debes guardar la página para poder previsualizarla.',
        variant: 'destructive'
    });
  };

  const confirmDeletePage = async () => {
    if (!pageToDelete || !user) return;

    startDeletingTransition(async () => {
        try {
            await deletePageData(user.uid, pageToDelete.id);
            toast({ title: '¡Éxito!', description: `La página "${pageToDelete.name}" ha sido eliminada.` });
            setSavedPages(prev => prev.filter(p => p.id !== pageToDelete.id));
             if (activePage?.id === pageToDelete.id) {
                router.replace('/dashboard/builder');
                setState(EMPTY_STATE);
                setActivePage(null);
                setPageName('');
            }
        } catch (error) {
             toast({
                variant: 'destructive',
                title: 'Error al eliminar',
                description: error instanceof Error ? error.message : 'No se pudo eliminar la página.',
            });
        } finally {
            setPageToDelete(null);
        }
    });
  };

  const handleLoadTemplate = () => {
    setState(HOME_PAGE_TEMPLATE);
    setPageName('Copia de la Plantilla de Inicio');
    setActivePage(null);
    toast({
      title: '¡Plantilla Cargada!',
      description: 'Ya puedes editar la página de inicio y guardarla como tuya.'
    })
  }

  return (
    <div className="flex h-full w-full bg-muted/40">
        <aside className="w-80 flex-shrink-0 border-r bg-background overflow-y-auto">
            <div className="p-4">
                <Card>
                        <CardHeader>
                        <CardTitle>Controles</CardTitle>
                            <CardDescription>Guarda, carga o previsualiza tu página.</CardDescription>
                        </CardHeader>
                </Card>
                    <div className="p-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={handleSave} disabled={state.page.length === 0}><Save className="mr-2 h-4 w-4" /> Guardar</Button>
                    <Button variant="outline" size="sm" onClick={handleLoad}><FolderDown className="mr-2 h-4 w-4" /> Cargar</Button>
                    <Button variant="outline" size="sm" onClick={handlePreview} disabled={!activePage?.id}><Eye className="mr-2 h-4 w-4" /> Vista Previa</Button>
                </div>
            </div>
            <Separator />
            <EditPanel
                selectedSection={selectedIndex !== null ? state.page[selectedIndex] : null}
                onChange={handleEditChange}
                onMove={handleMoveSection}
                onDelete={handleDeleteSection}
                onDuplicate={handleDuplicateSection}
                sectionIndex={selectedIndex}
                totalSections={state.page.length}
            />
        </aside>
        <main className="flex-1 p-4 overflow-auto bg-muted" onClick={() => setSelectedIndex(null)}>
            <div className="mx-auto h-full w-full max-w-full bg-background shadow-sm rounded-lg">
                {state.page.length > 0 ? (
                    <ScrollArea className='h-full'>
                        <div className='p-2'>
                        {state.page.map((section, index) => (
                            <div 
                                key={section.id || index} 
                                onClick={(e) => handleSectionClick(index, e)}
                                className={`relative p-2 border-2 ${selectedIndex === index ? 'border-primary' : 'border-transparent'} hover:border-blue-400/50 cursor-pointer rounded-md my-1 transition-all duration-200 group`}
                            >
                                {selectedIndex === index && <div className='absolute top-0 left-0 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-br-md rounded-tl-md z-10'>{section.type}</div>}
                                <PageRenderer sections={[section]} />
                            </div>
                        ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="flex flex-col items-center justify-center p-10 min-h-[300px] border-2 border-dashed rounded-lg bg-background h-full">
                        <FlaskConical className="w-16 h-16 text-muted-foreground/50 mb-4"/>
                        <h3 className='text-xl font-semibold'>El lienzo está en blanco</h3>
                        <p className="text-muted-foreground mb-4 text-center max-w-sm">Carga una página guardada o empieza con una plantilla.</p>
                        <div className='flex flex-wrap justify-center gap-4'>
                            <Button onClick={handleLoad}>
                                <FolderDown className="mr-2 h-4 w-4" />
                                Cargar Página
                            </Button>
                             <Button variant="outline" onClick={handleLoadTemplate}>
                                <LayoutTemplate className="mr-2 h-4 w-4" />
                                Usar Plantilla de Inicio
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </main>

        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{activePage ? 'Actualizar Página' : 'Guardar Nueva Página'}</DialogTitle>
                    <DialogDescription>
                        Dale un nombre a tu página para guardarla y poder acceder a ella más tarde.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="page-name">Nombre de la Página</Label>
                    <Input id="page-name" value={pageName} onChange={(e) => setPageName(e.target.value)} placeholder="Mi increíble landing page" />
                </div>
                <DialogFooter>
                     <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                     </DialogClose>
                    <Button onClick={handleConfirmSave} disabled={isSaving}>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {activePage ? 'Actualizar' : 'Guardar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Cargar Página Guardada</DialogTitle>
                    <DialogDescription>Selecciona una de tus páginas para continuar editando.</DialogDescription>
                </DialogHeader>
                 <ScrollArea className="h-72">
                    <div className="p-4">
                        {isLoadingPages ? (
                            <div className="flex items-center justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                        ) : savedPages.length > 0 ? (
                            <div className="space-y-2">
                                {savedPages.map(page => (
                                    <div key={page.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50">
                                        <div>
                                            <p className="font-semibold">{page.name}</p>
                                            <p className="text-xs text-muted-foreground">Actualizado: {new Date(page.updatedAt).toLocaleString()}</p>
                                        </div>
                                        <div className='flex gap-2'>
                                            <Button size="sm" variant="secondary" onClick={() => handleLoadPage(page.id)}>Cargar</Button>
                                            <Button size="sm" variant="destructive" onClick={() => setPageToDelete(page)} disabled={isDeleting}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 border-2 border-dashed rounded-lg">
                                <AlertTriangle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                <p className="text-muted-foreground">No tienes páginas guardadas.</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        
        <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta acción no se puede deshacer. Esto eliminará permanentemente la página
                    <span className="font-semibold"> {pageToDelete?.name} </span>.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setPageToDelete(null)}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeletePage} disabled={isDeleting}>
                    {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Sí, eliminar
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}

export default function BuilderPage() {
    return (
        <React.Suspense fallback={<div className="flex h-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <BuilderPageContent />
        </React.Suspense>
    )
}

    