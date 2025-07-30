import { Inter, Lexend } from "next/font/google";
import "./globals.css";

const fontBody = Inter({ 
  subsets: ["latin"],
  variable: '--font-body',
});

const fontHeadline = Lexend({ 
  subsets: ["latin"],
  variable: '--font-headline',
});

export const metadata = {
  title: "AdVerseAI",
  description: "AI-Powered Advertising Campaigns",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontBody.variable} ${fontHeadline.variable}`}>
        {children}
      </body>
    </html>
  );
}

    