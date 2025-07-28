
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Mail, KeyRound, User } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
     if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      toast({
        title: '¡Registro exitoso!',
        description: 'Tu cuenta ha sido creada. ¡Bienvenido!',
      });
      router.push('/dashboard/builder');
    } catch (err: any) {
      console.error(err);
       if (err.code === 'auth/email-already-in-use') {
          setError('Este correo electrónico ya está en uso. Por favor, intenta con otro.');
      } else if (err.code === 'auth/invalid-email') {
          setError('El formato del correo electrónico no es válido.');
      } else if (err.code === 'auth/weak-password') {
          setError('La contraseña es demasiado débil.');
      } else {
          setError('Ha ocurrido un error inesperado al registrar la cuenta.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
            <Link href="/" className="flex justify-center mb-4">
                <Logo className="size-12 text-primary" />
            </Link>
          <CardTitle className="font-headline text-3xl">Crear una Cuenta</CardTitle>
          <CardDescription>Regístrate para empezar a construir</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error de Registro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
             <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
               <div className="relative">
                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                 <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                    className="pl-10"
                />
               </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
               <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                 <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="pl-10"
                />
               </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
               <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
            <p className="w-full">¿Ya tienes cuenta? <Link href="/auth/login" className="font-semibold text-primary hover:underline">Inicia Sesión</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
