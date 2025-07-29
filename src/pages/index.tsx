import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AdVerseAI - AI-Powered Advertising Campaigns</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-background font-sans">
        <div className="text-center p-8">
          <h1 className="text-6xl font-bold text-primary font-serif">
            AdVerseAI
          </h1>
          <p className="mt-4 text-2xl text-muted-foreground">
            AI-Powered Advertising Campaigns
          </p>
        </div>
      </main>
    </>
  );
}
