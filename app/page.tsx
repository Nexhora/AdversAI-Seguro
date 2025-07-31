"use client";

import { BrainCircuit, Zap, BookOpen, MousePointerClick } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';


export default function HomePage() {
  return (
    <div className="w-full bg-background text-foreground font-sans">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
             <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                    Crea Campañas Publicitarias con IA en minutos
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                    Genera anuncios, conceptos creativos, y más. Sin necesidad de experiencia técnica. Empieza a construir tu futuro hoy.
                </p>
                
                <div className="mt-10 max-w-xl mx-auto">
                     <form className="flex flex-col sm:flex-row gap-4">
                        <Input type="text" placeholder="Tu nombre" />
                        <Input type="email" placeholder="Tu email" />
                         <Button type="submit">
                           Probar Gratis
                        </Button>
                    </form>
                </div>
            </div>
        </section>

        {/* Beneficios Section */}
        <section id="beneficios" className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 border border-primary/30 rounded-lg">
                            <Zap className="w-6 h-6 text-primary"/>
                        </div>
                        <h3 className="text-xl font-bold font-display">Velocidad Exponencial</h3>
                        <p className="mt-2 text-muted-foreground">Genera campañas y páginas completas en una fracción del tiempo que te llevaría manualmente.</p>
                    </div>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 border border-primary/30 rounded-lg">
                            <BookOpen className="w-6 h-6 text-primary"/>
                        </div>
                        <h3 className="text-xl font-bold font-display">Creatividad Ilimitada</h3>
                        <p className="mt-2 text-muted-foreground">Supera el bloqueo creativo con ideas de anuncios y copys que convierten, generados por IA.</p>
                    </div>
                    <div className="text-center">
                         <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 border border-primary/30 rounded-lg">
                           <MousePointerClick className="w-6 h-6 text-primary"/>
                        </div>
                        <h3 className="text-xl font-bold font-display">Resultados Medibles</h3>
                        <p className="mt-2 text-muted-foreground">No solo crees, también predice el rendimiento y optimiza tus estrategias con datos.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Herramientas Section */}
        <section id="herramientas" className="py-20 md:py-32">
             <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-display">Un Ecosistema de Herramientas a tu Disposición</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Desde la idea hasta el cliente, AdVerseAI te acompaña en cada paso con herramientas diseñadas para una sola cosa: hacerte crecer.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {[
                        { title: 'Generador de Anuncios', img: 'https://placehold.co/400x500/111827/F0C20A?text=Ad+Gen' },
                        { title: 'Generador de Landing Pages', img: 'https://placehold.co/400x500/111827/F0C20A?text=Landing+AI' },
                        { title: 'Laboratorio IA', img: 'https://placehold.co/400x500/111827/F0C20A?text=Builder' },
                        { title: 'Creador de Mockups', img: 'https://placehold.co/400x500/111827/F0C20A?text=Mockups' },
                        { title: 'Creador de eBooks', img: 'https://placehold.co/400x500/111827/F0C20A?text=eBooks' },
                    ].map(tool => (
                        <div key={tool.title} className="group relative rounded-lg overflow-hidden border border-white/10 transition-all hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                            <img src={tool.img} alt={tool.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint="3d render abstract shapes"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 text-lg font-bold">{tool.title}</h3>
                        </div>
                    ))}
                </div>
             </div>
        </section>

        {/* Prueba Social Section */}
        <section className="py-20 bg-background/50">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold font-display">No confíes en nuestra palabra, confía en sus resultados</h2>
                </div>
                 <div className="mt-16 grid md:grid-cols-3 gap-8">
                    {[
                        { name: 'Carlos Gomez', role: 'Dueño de eCommerce', text: '"Desde que uso AdVerseAI, mi CPA ha bajado un 40%. La capacidad de testear ángulos tan rápido no tiene precio."', img: 'https://placehold.co/100x100/1a202c/ffffff?text=CG' },
                        { name: 'Laura Fernandez', role: 'Consultora de Marketing', text: '"Puedo entregar a mis clientes estrategias completas, con anuncios y landings, en días en lugar de semanas. Ha cambiado mi negocio por completo."', img: 'https://placehold.co/100x100/1a202c/ffffff?text=LF' },
                        { name: 'Javier Rios', role: 'Emprendedor Solitario', text: '"No soy diseñador ni copywriter. AdVerseAI es mi equipo de marketing completo. Finalmente puedo competir con los grandes."', img: 'https://placehold.co/100x100/1a202c/ffffff?text=JR' },
                    ].map(testimonial => (
                         <div key={testimonial.name} className="bg-card p-6 rounded-lg border border-border">
                             <div className="flex items-center gap-4 mb-4">
                                <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary" data-ai-hint="portrait professional" />
                                <div>
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </div>
                             </div>
                            <p className="text-card-foreground italic">“{testimonial.text}”</p>
                         </div>
                    ))}
                 </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                 <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-display">Preguntas Frecuentes</h2>
                </div>
                <div className="mt-12 space-y-4">
                     {[
                        { q: '¿Necesito conocimientos técnicos para usar AdVerseAI?', a: '¡Para nada! AdVerseAI está diseñado para ser intuitivo. Si sabes escribir un email, puedes crear activos de marketing de alta calidad. La IA se encarga del trabajo pesado.' },
                        { q: '¿Las páginas y anuncios son personalizables?', a: 'Sí. La IA te da un punto de partida increíble, pero tienes control total en nuestro "Laboratorio IA" para ajustar cada detalle, desde textos y colores hasta la disposición de los elementos.' },
                        { q: '¿Qué tan buenos son los textos que genera la IA?', a: 'Nuestra IA está entrenada con modelos de copywriting de respuesta directa probados. No solo escribe bien, escribe para vender y convertir.' },
                        { q: '¿Hay algún tipo de soporte si me quedo atascado?', a: 'Sí, ofrecemos soporte completo a través de nuestra comunidad y tutoriales detallados. Nunca estarás solo en tu camino al éxito.' },
                    ].map(faq => (
                        <details key={faq.q} className="bg-card p-4 rounded-lg border border-border cursor-pointer group">
                           <summary className="font-semibold flex items-center justify-between">
                                {faq.q}
                                <span className="transform transition-transform duration-300 group-open:rotate-180">▼</span>
                           </summary>
                           <p className="mt-4 text-muted-foreground">{faq.a}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">Tu próximo gran anuncio está a unos clics de distancia.</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Deja de adivinar. Empieza a construir activos que trabajen para ti, 24/7. El riesgo es no intentarlo.
                 </p>
                 <div className="mt-8">
                     <Button>
                        Probar Gratis y Empezar a Construir
                    </Button>
                 </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/10">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AdVerseAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
