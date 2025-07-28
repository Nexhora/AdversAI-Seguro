import type { Metadata } from "next";
import { Poppins, PT_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontBody = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const fontHeadline = PT_Sans({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AdVerseAI",
  description: "Reclama el control de tu privacidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
