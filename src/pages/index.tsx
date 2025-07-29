import Head from 'next/head';
import '../app/globals.css';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>AdVerseAI</title>
      </Head>
      <main className="text-center">
        <h1 className="text-5xl font-bold text-blue-600">
          Hola Mundo
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          El servidor Next.js está funcionando correctamente.
        </p>
      </main>
    </div>
  );
}
