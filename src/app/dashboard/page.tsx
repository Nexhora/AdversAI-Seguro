
"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Redirige a la página principal que ahora es la de mantenimiento.
export default function DashboardRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
    }, [router]);

  return null;
}
