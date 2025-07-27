
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BotMessageSquare } from "lucide-react";

export default function AdGeneratorPage() {
    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <BotMessageSquare /> Generador de Anuncios
                    </CardTitle>
                    <CardDescription>
                        Esta sección está en construcción. Aquí podrás generar creatividades para tus campañas publicitarias utilizando IA.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <h3 className="mt-4 text-lg font-semibold">Próximamente</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Estamos trabajando para traer esta funcionalidad lo antes posible.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
