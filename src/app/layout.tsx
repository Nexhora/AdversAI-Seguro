import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdVerseAI",
  description: "Reconstrucción Exitosa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
