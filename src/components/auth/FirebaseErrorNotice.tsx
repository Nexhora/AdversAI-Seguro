
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

export const FirebaseErrorNotice = () => {
    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <Card className="max-w-md w-full border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle/> Error de Configuración de Firebase
                    </Title>
                    <CardDescription className="text-destructive/90">
                        La aplicación no puede continuar sin una conexión válida a Firebase.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">La configuración en `src/lib/firebase.ts` parece estar incompleta. Por favor, asegúrate de que el objeto `firebaseConfig` contenga las claves correctas de tu proyecto.</p>
                </CardContent>
            </Card>
        </div>
    );
};
