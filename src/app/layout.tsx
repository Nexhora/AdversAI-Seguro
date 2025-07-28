import type { Metadata } from "next";
import { Poppins, PT_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
});

export const metadata: Metadata = {
  title: "AdVerseAI",
  description: "Plataforma de IA para la creación y optimización de campañas publicitarias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          poppins.variable, 
          ptSans.variable
        )}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
