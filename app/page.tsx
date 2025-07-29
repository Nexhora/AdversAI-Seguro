"use client";

import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, BookOpen, MousePointerClick } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="w-full bg-gray-900 text-white font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="size-8" />
            <span className="text-xl font-bold font-headline">AdVerseAI</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
             <Link href="#beneficios" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Beneficios</Link>
             <Link href="#herramientas" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Herramientas</Link>
             <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Login</Link>
          </nav>
          <Button asChild className="hidden md:block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600">
            <Link href="/login">Probar Gratis</Link>
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
                    Construí activos de marketing con IA en minutos
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                    Crea anuncios, landing pages, y más. Sin necesidad de experiencia técnica. Empieza a construir tu futuro hoy.
                </p>
                
                <div className="mt-10 max-w-xl mx-auto">
                     <form className="flex flex-col sm:flex-row gap-4">
                        <Input type="text" placeholder="Tu nombre" className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-orange-500" />
                        <Input type="email" placeholder="Tu email" className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:ring-orange-500" />
                         <Button type="submit" size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600">
                           Probar Gratis
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
                        <p className="mt-2 text-gray-400">Genera campañas y páginas completas en una fracción del tiempo que te llevaría manualmente.</p>
                    </div>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-orange-900/50 border border-orange-500/30 rounded-lg">
                            <BookOpen className="w-6 h-6 text-orange-400"/>
                        </div>
                        <h3 className="text-xl font-bold font-headline">Creatividad Ilimitada</h3>
                        <p className="mt-2 text-gray-400">Supera el bloqueo creativo con ideas de anuncios y copys que convierten, generados por IA.</p>
                    </div>
                    <div className="text-center">
                         <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-orange-900/50 border border-orange-500/30 rounded-lg">
                           <MousePointerClick className="w-6 h-6 text-orange-400"/>
                        </div>
                        <h3 className="text-xl font-bold font-headline">Resultados Medibles</h3>
                        <p className="mt-2 text-gray-400">No solo crees, también predice el rendimiento y optimiza tus estrategias con datos.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Herramientas Section */}
        <section id="herramientas" className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Un Ecosistema de Herramientas a tu Disposición</h2>
                    <p className="mt-4 text-lg text-gray-400">Desde la idea hasta el cliente, AdVerseAI te acompaña en cada paso con herramientas diseñadas para una sola cosa: hacerte crecer.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {[
                        { title: 'Generador de Anuncios', img: 'https://placehold.co/400x500.png', hint: '3d render abstract' },
                        { title: 'Generador de Landing Pages', img: 'https://placehold.co/400x500.png', hint: '3d render shapes' },
                        { title: 'Laboratorio IA', img: 'https://placehold.co/400x500.png', hint: 'abstract shapes' },
                        { title: 'Creador de Mockups', img: 'https://placehold.co/400x500.png', hint: 'mockup creator' },
                        { title: 'Creador de eBooks', img: 'https://placehold.co/400x500.png', hint: 'ebook creator' },
                    ].map(tool => (
                        <div key={tool.title} className="group relative rounded-lg overflow-hidden border border-white/10 transition-all hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10">
                            <img src={tool.img} alt={tool.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={tool.hint}/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 text-lg font-bold">{tool.title}</h3>
                        </div>
                    ))}
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
                        { name: 'Carlos Gomez', role: 'Dueño de eCommerce', text: 'Desde que uso AdVerseAI, mi CPA ha bajado un 40%. La capacidad de testear ángulos tan rápido no tiene precio.', img: 'https://placehold.co/100x100.png', hint: 'portrait professional' },
                        { name: 'Laura Fernandez', role: 'Consultora de Marketing', text: 'Puedo entregar a mis clientes estrategias completas, con anuncios y landings, en días en lugar de semanas. Ha cambiado mi negocio por completo.', img: 'https://placehold.co/100x100.png', hint: 'professional portrait' },
                        { name: 'Javier Rios', role: 'Emprendedor Solitario', text: 'No soy diseñador ni copywriter. AdVerseAI es mi equipo de marketing completo. Finalmente puedo competir con los grandes.', img: 'https://placehold.co/100x100.png', hint: 'portrait man' },
                    ].map(testimonial => (
                         <div key={testimonial.name} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                             <div className="flex items-center gap-4 mb-4">
                                <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-orange-500" data-ai-hint={testimonial.hint} />
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
                        { q: '¿Necesito conocimientos técnicos para usar AdVerseAI?', a: '¡Para nada! AdVerseAI está diseñado para ser intuitivo. Si sabes escribir un email, puedes crear activos de marketing de alta calidad. La IA se encarga del trabajo pesado.' },
                        { q: '¿Las páginas y anuncios son personalizables?', a: 'Sí. La IA te da un punto de partida increíble, pero tienes control total en nuestro "Laboratorio IA" para ajustar cada detalle, desde textos y colores hasta la disposición de los elementos.' },
                        { q: '¿Qué tan buenos son los textos que genera la IA?', a: 'Nuestra IA está entrenada con modelos de copywriting de respuesta directa probados (AIDA, PAS). No solo escribe bien, escribe para vender y convertir.' },
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
                 <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Tu éxito está a unos clics de distancia.</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    Deja de cambiar tiempo por dinero. Empieza a construir activos que trabajen para ti, 24/7. El riesgo es no intentarlo.
                 </p>
                 <div className="mt-8">
                     <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/20">
                        <Link href="/login">Probar Gratis y Empezar a Construir</Link>
                    </Button>
                 </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} AdVerseAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
