import "./globals.css";
import { Poppins, PT_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

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


export const metadata = {
  title: "Nexhora | AdversAI",
  description: "Tu copiloto inteligente para campañas de publicidad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
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
