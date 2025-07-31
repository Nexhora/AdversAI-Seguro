import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AdVerseAI",
  description: "AI-Powered Advertising Campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
