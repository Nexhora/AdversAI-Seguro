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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-body">
       <header className="px-4 lg:px-6 h-20 flex items-center">
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <Logo className="size-8" />
          <span className="text-xl font-bold font-headline">AdVerseAI</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="rounded-lg border border-gray-700 bg-gray-800 text-white shadow-lg shadow-orange-500/10 p-6 space-y-4">
             <div className="grid grid-cols-2 text-center border-b border-gray-700">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={cn(
                    "p-3 font-bold transition-colors",
                    activeTab === 'login' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'
                  )}
                >
                  Login
                </button>
                <button 
                  onClick={() => setActiveTab('register')}
                   className={cn(
                    "p-3 font-bold transition-colors",
                    activeTab === 'register' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-400 hover:text-white'
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
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:ring-orange-500"
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
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:ring-orange-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600">
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
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:ring-orange-500"
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
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:ring-orange-500"
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
                     className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:ring-orange-500"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600">
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
