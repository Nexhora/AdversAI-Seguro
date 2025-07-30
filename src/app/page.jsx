
"use client";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

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
       <div className="w-full max-w-md">
         {/* El formulario de Login/Registro irá aquí en el próximo paso */}
         <p className="text-center text-muted-foreground">
            Funcionalidad de autenticación en construcción.
         </p>
      </div>
    </main>
  );
}
