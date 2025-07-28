import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdVerseAI - Reconstruyendo",
  description: "Base funcional para la reconstrucción.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
