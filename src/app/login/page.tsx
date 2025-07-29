"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "register" ? "register" : "login";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("Inicio de sesión exitoso");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log("¡Cuenta creada exitosamente!");
      // TODO: Guardar nombre en la base de datos de usuarios
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
      alert("Error al crear la cuenta.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
       <header className="px-4 lg:px-6 h-20 flex items-center">
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <Logo className="size-8" />
          <span className="text-xl font-bold font-headline">AdVerseAI</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-lg border bg-card text-card-foreground shadow-lg p-6 space-y-4">
             <div className="grid grid-cols-2 text-center border-b">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={cn(
                    "p-3 font-bold transition-colors",
                    activeTab === 'login' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Login
                </button>
                <button 
                  onClick={() => setActiveTab('register')}
                   className={cn(
                    "p-3 font-bold transition-colors",
                    activeTab === 'register' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  Registro
                </button>
            </div>

            {activeTab === 'login' && (
              <form className="space-y-4 pt-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan.perez@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Iniciar Sesión
                </Button>
              </form>
            )}

            {activeTab === 'register' && (
              <form className="space-y-4 pt-4" onSubmit={handleRegister}>
                 <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Juan Pérez"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="juan.perez@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Contraseña</Label>
                  <Input
                    id="password-register"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Crear Cuenta Gratis
                </Button>
              </form>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
