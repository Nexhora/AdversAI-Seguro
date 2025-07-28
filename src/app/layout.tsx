import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdVerseAI - Base Funcional",
  description: "Proyecto listo para reconstruir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
