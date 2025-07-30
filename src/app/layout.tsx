import "./globals.css";
import { Poppins, PT_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-poppins'
});
const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-pt-sans'
});


export const metadata: Metadata = {
  title: "AdversAI",
  description: "Resetting the project foundation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={cn(
        "min-h-screen bg-background text-foreground font-sans antialiased",
        poppins.variable,
        ptSans.variable
      )}>
        {children}
      </body>
    </html>
  );
}
