
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
                        Crea anuncios efectivos describiendo tu producto o servicio.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <h3 className="mt-4 text-lg font-semibold">Funcionalidad en Desarrollo</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Esta área se encuentra en construcción activa.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
