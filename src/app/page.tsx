
"use client";

import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, BookOpen, MousePointerClick } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/login?tab=register');
  };

  return (
    <div className="w-full bg-gray-900 text-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="size-8 text-primary" />
            <span className="text-xl font-bold font-headline">Nexhora</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
             <Link href="#beneficios" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Beneficios</Link>
             <Link href="#herramientas" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Herramientas</Link>
             <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Login</Link>
          </nav>
          <Button asChild className="hidden md:block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600">
            <Link href="/login?tab=register">Empezar Gratis</Link>
          </Button>
           <Button asChild className="md:hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600">
            <Link href="/login">Acceder</Link>
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
             <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
             <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Construye Páginas de Venta Espectaculares
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                    Crea y personaliza landing pages de alta conversión en minutos. Sin necesidad de experiencia técnica. Empieza a construir tu futuro hoy.
                </p>
                
                <div className="mt-10 max-w-xl mx-auto">
                     <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleFormSubmit}>
                        <Input required type="email" placeholder="Tu email para empezar" className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-orange-500 rounded-md" />
                         <Button type="submit" size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600">
                           Comenzar Ahora
                        </Button>
                    </form>
                </div>
            </div>
        </section>

        {/* Beneficios Section */}
        <section id="beneficios" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-orange-900/50 border border-orange-500/30 rounded-lg">
                            <Zap className="w-6 h-6 text-orange-400"/>
                        </div>
                        <h3 className="text-xl font-bold font-headline">Velocidad Exponencial</h3>
                        <p className="mt-2 text-gray-400">Lanza páginas completas en una fracción del tiempo que te llevaría con otras herramientas.</p>
                    </div>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-orange-900/50 border border-orange-500/30 rounded-lg">
                            <BookOpen className="w-6 h-6 text-orange-400"/>
                        </div>
                        <h3 className="text-xl font-bold font-headline">Control Creativo Total</h3>
                        <p className="mt-2 text-gray-400">Ajusta cada detalle, desde los colores hasta la disposición, para que coincida con tu visión.</p>
                    </div>
                    <div className="text-center">
                         <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-orange-900/50 border border-orange-500/30 rounded-lg">
                           <MousePointerClick className="w-6 h-6 text-orange-400"/>
                        </div>
                        <h3 className="text-xl font-bold font-headline">Resultados Medibles</h3>
                        <p className="mt-2 text-gray-400">Crea páginas optimizadas para convertir visitantes en clientes de manera efectiva.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Herramientas Section */}
        <section id="herramientas" className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Tu Laboratorio Creativo</h2>
                    <p className="mt-4 text-lg text-gray-400">Desde la idea hasta la publicación, nuestra plataforma te da las herramientas para triunfar.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="group relative rounded-lg overflow-hidden border border-white/10 transition-all hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10">
                        <Image src="https://placehold.co/600x400.png" alt="Constructor Visual" width={600} height={400} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint="website builder interface" />
                    </div>
                    <div className='text-left'>
                        <h3 className='text-2xl font-bold font-headline'>Constructor Visual Intuitivo</h3>
                        <p className='mt-2 text-gray-400'>Arrastra, suelta y edita. Construir páginas nunca ha sido tan fácil. Olvídate del código y enfócate en tu mensaje.</p>
                        <ul className='mt-4 space-y-2 text-gray-300'>
                            <li className='flex items-center gap-2'><Zap className='text-orange-400 size-4'/> Edición en tiempo real</li>
                            <li className='flex items-center gap-2'><Zap className='text-orange-400 size-4'/> Componentes pre-diseñados</li>
                            <li className='flex items-center gap-2'><Zap className='text-orange-400 size-4'/> Vistas previas instantáneas</li>
                        </ul>
                    </div>
                </div>
             </div>
        </section>

        {/* Prueba Social Section */}
        <section className="py-20 bg-gray-900/50">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">No confíes en nuestra palabra, confía en sus resultados</h2>
                </div>
                 <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {[
                        { name: 'Carlos Gomez', role: 'Dueño de eCommerce', text: '"Lancé una nueva landing para un producto en dos horas. Convirtió un 25% más que la anterior. Increíble."', img: 'https://placehold.co/100x100.png', hint: 'male portrait' },
                        { name: 'Laura Fernandez', role: 'Consultora de Marketing', text: '"Puedo crear páginas para mis clientes a una velocidad récord, permitiéndome gestionar más proyectos y aumentar mis ingresos."', img: 'https://placehold.co/100x100.png', hint: 'female portrait' },
                        { name: 'Javier Rios', role: 'Emprendedor Solitario', text: '"No soy diseñador. Nexhora me da la confianza para crear páginas que se ven profesionales y que realmente funcionan."', img: 'https://placehold.co/100x100.png', hint: 'man smiling' },
                    ].map(testimonial => (
                         <div key={testimonial.name} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                             <div className="flex items-center gap-4 mb-4">
                                <Image src={testimonial.img} alt={testimonial.name} width={100} height={100} className="w-14 h-14 rounded-full object-cover border-2 border-orange-500" data-ai-hint={testimonial.hint} />
                                <div>
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                                </div>
                             </div>
                            <p className="text-gray-300 italic">“{testimonial.text}”</p>
                         </div>
                    ))}
                 </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                 <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Preguntas Frecuentes</h2>
                </div>
                <div className="mt-12 space-y-4">
                     {[
                        { q: '¿Necesito conocimientos técnicos para usar Nexhora?', a: '¡Para nada! Nexhora está diseñado para ser 100% visual. Si sabes usar un procesador de texto, puedes crear páginas espectaculares.' },
                        { q: '¿Puedo usar mi propio dominio?', a: 'Sí, una vez que despliegas tu aplicación en Firebase, puedes conectar fácilmente tu propio dominio desde la consola de Firebase Hosting.' },
                        { q: '¿Las páginas son rápidas y están optimizadas?', a: 'Absolutamente. Construimos sobre Next.js, lo que garantiza que tus páginas sean ultrarrápidas y estén optimizadas para los motores de búsqueda (SEO) desde el principio.' },
                        { q: '¿Hay algún tipo de soporte si me quedo atascado?', a: 'Sí, ofrecemos soporte completo a través de nuestra comunidad y tutoriales detallados. Nunca estarás solo en tu camino al éxito.' },
                    ].map(faq => (
                        <details key={faq.q} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 cursor-pointer group">
                           <summary className="font-semibold flex items-center justify-between">
                                {faq.q}
                                <span className="transform transition-transform duration-300 group-open:rotate-180">▼</span>
                           </summary>
                           <p className="mt-4 text-gray-400">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Tu próxima gran idea está a unos clics de distancia.</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    Deja de esperar. Empieza a construir los activos digitales que trabajarán para ti, 24/7. El riesgo es no intentarlo.
                 </p>
                 <div className="mt-8">
                     <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20">
                        <Link href="/login?tab=register">Empezar a Construir Gratis</Link>
                    </Button>
                 </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Nexhora. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
