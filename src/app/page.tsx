
'use client';

import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

/**
 * This is the main entry page for the application.
 * Its only responsibility is to show a loading indicator or an error.
 * All redirection logic is handled in AuthContext.
 */
export default function HomePage() {
  const { loading } = useAuth();
  
  // Check if Firebase configuration is missing
  const firebaseConfigMissing = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (firebaseConfigMissing) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
           <Alert variant="destructive" className="max-w-lg">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error de Configuración de Firebase</AlertTitle>
                <AlertDescription>
                    Las credenciales de Firebase no están configuradas correctamente. 
                    Esto puede ocurrir si la aplicación no se ha desplegado correctamente o si las variables de entorno no están disponibles. 
                    Por favor, contacta al soporte o revisa la configuración de tu proyecto.
                    <br/><br/>
                    La aplicación no puede continuar sin una conexión válida a Firebase.
                </AlertDescription>
              </Alert>
        </div>
      )
  }

  // Show a loading spinner while the auth state is being determined.
  // The AuthContext will handle the redirection once loading is complete.
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
