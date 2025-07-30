"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login/registration
    router.push("/dashboard");
  };

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-8 font-sans">
      <header className="flex flex-col items-center space-y-2 mb-12 text-center">
        <Logo />
        <h1 className="font-poppins text-4xl font-bold text-foreground">
          Nexhora
        </h1>
        <p className="font-pt-sans text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          AdversAI
        </p>
      </header>
      
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
          <TabsTrigger value="register">Crear Cuenta</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-center font-poppins text-2xl">Bienvenido de Vuelta</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="bg-input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="********" 
                    className="bg-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="pt-4">
                   <Button type="submit" className="w-full font-bold">Iniciar Sesión</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
           <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-center font-poppins text-2xl">Crea tu Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-6">
                 <div className="space-y-2">
                  <Label htmlFor="register-name">Nombre</Label>
                  <Input 
                    id="register-name" 
                    type="text" 
                    placeholder="Tu Nombre" 
                    className="bg-input" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="bg-input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="Mínimo 6 caracteres" 
                    className="bg-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <div className="pt-4">
                   <Button type="submit" className="w-full font-bold">Crear Cuenta Gratis</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
