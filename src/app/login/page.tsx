
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Redirige a la página principal que ahora es la de mantenimiento.
export default function LoginPageRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    }, [router]);

  return null;
}
