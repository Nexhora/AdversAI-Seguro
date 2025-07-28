
'use client';

import React, { useEffect, useState } from 'react';
import { getPageData } from '@/app/dashboard/actions';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';
import type { BuilderState } from '@/types';
import { PageRenderer } from '@/components/PageRenderer';

interface PageData {
    name: string;
    content: BuilderState;
}

export default function PreviewPage() {
  const params = useParams();
  const slug = params.slug as string[] | undefined;
  const [userId, pageId] = slug || [];
  
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !pageId) {
        setError('URL inválida. Faltan datos del usuario o de la página.');
        setLoading(false);
        return;
    }
    
    const fetchPage = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPageData(userId, pageId);
        if (data && data.content) {
          try {
            const parsedContent: BuilderState = JSON.parse(data.content);
             // Validar la estructura básica
            if (parsedContent && Array.isArray(parsedContent.page)) {
                 setPageData({ name: data.name, content: parsedContent });
            } else {
                 throw new Error("El contenido de la página no tiene el formato esperado (debe ser un objeto con una propiedad 'page' que es un array).");
            }
          } catch (e) {
             console.error("Error al analizar JSON:", e);
             throw new Error('El contenido de la página parece estar dañado y no se pudo analizar.');
          }
        } else {
          setError('Página no encontrada. Asegúrate de que la URL es correcta y la página está guardada.');
        }
      } catch (e) {
        console.error("Error al obtener la página:", e);
        setError(e instanceof Error ? e.message : 'Ocurrió un error inesperado al cargar la página.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPage();
  }, [userId, pageId]);

  if (loading) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="ml-2">Cargando vista previa...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-destructive p-8 bg-background">
            <AlertTriangle className="h-8 w-8 mb-4" />
            <p className='text-lg font-semibold'>Error al Cargar la Página</p>
            <p className='text-sm'>{error}</p>
        </div>
    );
  }
  
  if (!pageData) {
     return (
        <div className="flex min-h-screen flex-col items-center justify-center text-muted-foreground p-8 bg-background">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p>No se encontraron datos para esta página.</p>
        </div>
    );
  }

  return (
      <PageRenderer sections={pageData.content.page} />
  );
}
