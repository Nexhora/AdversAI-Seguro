
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Esta página redirige al constructor de páginas, que es ahora la funcionalidad principal.
export default function DashboardRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/dashboard/builder');
    }, [router]);

  return null; // No renderizar nada mientras redirige
}
