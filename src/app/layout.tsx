import type { Metadata } from "next";
import { Poppins, PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontBody = PT_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
});

const fontHeadline = Poppins({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AdVerseAI",
  description: "Inteligencia Artificial para tus campañas de publicidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={cn(
          "min-h-screen font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
