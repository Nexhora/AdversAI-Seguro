'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent } from 'react';
import { Wand2 } from "lucide-react";


export default function NewCampaignPage() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Generando campaña para: ${productName}`);
    // Aquí llamaremos al flow de Genkit
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Crear Nueva Campaña</CardTitle>
          <CardDescription>
            Describe tu producto o servicio y la IA generará el contenido publicitario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="product-name">Nombre del Producto o Servicio</Label>
              <Input
                id="product-name"
                placeholder="Ej: Zapatillas para correr 'SpeedRunner'"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-description">Descripción detallada</Label>
              <Textarea
                id="product-description"
                placeholder="Describe las características, beneficios y público objetivo de tu producto. Cuanto más detalle, mejores serán los resultados."
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
                rows={6}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              <Wand2 className="mr-2 h-5 w-5" />
              Generar Contenido
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
