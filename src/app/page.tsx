
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Esta es la página de entrada principal de la aplicación.
 * Su única responsabilidad es mostrar un indicador de carga.
 * Toda la lógica de redirección se maneja en AuthContext
 * para evitar bucles de renderizado y condiciones de carrera.
 */
export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
