
'use client';

import { useEffect, useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Briefcase, Loader2, AlertTriangle, ExternalLink, Plus, Trash2, Pencil } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import { getUserPages, deletePageData } from '../actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { useToast } from '@/hooks/use-toast';
import type { BuilderState } from '@/types';


interface SavedPage {
    id: string;
    name: string;
    updatedAt: string;
    createdAt: string;
}

export default function MySitesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [savedPages, setSavedPages] = useState<SavedPage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, startDeletingTransition] = useTransition();

    const [pageToDelete, setPageToDelete] = useState<SavedPage | null>(null);

    const fetchUserPages = async () => {
        if (!user) return;
        setLoading(true);
        setError(null);
        try {
            const pages = await getUserPages(user.uid);
            if (pages === null) {
                 setError("No se pudieron cargar las páginas. Puede que haya un problema con la conexión.");
                 setSavedPages([]);
            } else {
                setSavedPages(pages as SavedPage[]);
            }
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : "No se pudieron cargar los datos de tus páginas.");
            setSavedPages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && user) {
            fetchUserPages();
        } else if (!authLoading && !user) {
            // El layout se encargará de la redirección
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, authLoading]);

    const handleDelete = async () => {
        if (!pageToDelete || !user) return;
        
        startDeletingTransition(async () => {
            try {
                await deletePageData(user.uid, pageToDelete.id);
                toast({ title: '¡Éxito!', description: `La página "${pageToDelete.name}" ha sido eliminada.` });
                setSavedPages(prev => prev.filter(p => p.id !== pageToDelete.id));
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
    
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Fecha no disponible';
        try {
            const date = new Date(dateString);
            if(isNaN(date.getTime())) return 'Fecha inválida';
            return date.toLocaleString();
        } catch (e) {
            return 'Fecha inválida'; 
        }
    }

    return (
        <div className='p-4'>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Briefcase /> Mis Páginas Guardadas
                    </CardTitle>
                    <CardDescription>
                        Aquí puedes ver la lista de todas tus páginas creadas.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="ml-4">Cargando tus páginas...</p>
                        </div>
                    ) : error ? (
                         <div className="flex flex-col items-center justify-center py-10 text-destructive border-2 border-dashed border-destructive/50 rounded-lg">
                            <AlertTriangle className="h-8 w-8 mb-2" />
                            <p className='font-semibold'>Error al cargar las páginas</p>
                            <p className='text-sm text-center'>{error}</p>
                        </div>
                    ) : savedPages.length > 0 ? (
                        <div className="space-y-4">
                           <div className="border rounded-md">
                                {savedPages.map(page => (
                                    <div key={page.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b last:border-b-0 gap-4">
                                        <div className='flex-1'>
                                            <p className="font-semibold">{page.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Actualizado: {formatDate(page.updatedAt)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Button asChild variant="outline" size="sm">
                                                <a href={`/preview/${user?.uid}/${page.id}`} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="mr-2 h-4 w-4"/>
                                                    Vista Previa
                                                </a>
                                            </Button>
                                            <Button asChild variant="secondary" size="sm">
                                                <Link href={`/dashboard/builder?pageId=${page.id}`}>
                                                    <Pencil className="mr-2 h-4 w-4"/>
                                                    Editar
                                                </Link>
                                            </Button>
                                            <Button variant="destructive" size="icon" onClick={() => setPageToDelete(page)} disabled={isDeleting}>
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                           </div>
                        </div>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No tienes páginas guardadas</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Empieza a crear una página en el laboratorio para verla aquí.</p>
                        </div>
                    )}
                </CardContent>
                 
                <CardFooter className="gap-4 border-t pt-6">
                    <Button asChild>
                        <Link href="/dashboard/builder">
                            <Plus className="mr-2 h-4 w-4" />
                            Crear Nueva Página
                        </Link>
                    </Button>
                </CardFooter>
            
            </Card>

            <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás absolutely seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente la página
                        <span className="font-semibold"> {pageToDelete?.name} </span>
                        de nuestros servidores.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setPageToDelete(null)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Sí, eliminar
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
