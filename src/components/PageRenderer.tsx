
'use client';

import React from 'react';
import type { Section } from '@/types';
import * as SectionComponents from './sections';
import { AlertCircle } from 'lucide-react';

const componentMap: { [key: string]: React.ComponentType<any> } = SectionComponents;

const ErrorDisplay = ({ componentType, error, sectionId }: { componentType?: string; error: string; sectionId?: string }) => (
    <div className="p-4 my-2 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg">
        <div className='flex items-center gap-2 font-bold'>
            <AlertCircle className='h-5 w-5' />
            Error en la Sección {componentType ? `"${componentType}"` : ''}
        </div>
        <p className='text-sm mt-2'>{error}</p>
        {sectionId && <p className='text-xs mt-1 text-muted-foreground'>ID: {sectionId}</p>}
    </div>
);


export const PageRenderer = ({ sections }: { sections: Section[] }) => {
  if (!sections || !Array.isArray(sections)) {
    return (
        <ErrorDisplay error="No se proporcionaron secciones válidas para renderizar (el formato esperado es un array)." />
    );
  }

  return (
    <>
      {sections.map((section, index) => {
        try {
            if (!section || typeof section.type !== 'string') {
                throw new Error(`Elemento de sección inválido en el índice ${index}. Falta la propiedad 'type' o la sección es nula.`);
            }

            const Component = componentMap[section.type];
            
            if (!Component) {
                throw new Error(`Componente para el tipo de sección "${section.type}" no encontrado. Revisa si el componente está exportado correctamente en /components/sections/index.ts.`);
            }

            if (typeof section.props !== 'object' || section.props === null) {
                 // Permitimos props nulas o vacías, pero lo advertimos en la consola.
                 console.warn(`La sección tipo "${section.type}" en el índice ${index} no tiene un objeto 'props'.`);
            }
            
            return <Component key={section.id || index} {...section.props} />;

        } catch (e) {
             const errorMessage = e instanceof Error ? e.message : "Ocurrió un error desconocido al renderizar la sección.";
             console.error(errorMessage, section);
             return <ErrorDisplay key={`error-${index}`} componentType={section?.type} error={errorMessage} sectionId={section?.id} />;
        }
      })}
    </>
  );
};

    