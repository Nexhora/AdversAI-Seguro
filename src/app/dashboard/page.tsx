'use client';

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Bienvenido a tu Dashboard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Aquí podrás gestionar todas tus campañas publicitarias.
        </p>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-border p-12 text-center bg-card">
          <div className="rounded-full bg-primary/10 p-3">
            <PlusCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold">Crea tu primera campaña</h2>
          <p className="max-w-md text-muted-foreground">
            Comienza a generar recursos publicitarios con el poder de la inteligencia artificial.
          </p>
          <Button size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Crear Nueva Campaña
          </Button>
      </div>
    </div>
  );
}
