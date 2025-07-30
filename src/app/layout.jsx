import "./globals.css";

export const metadata = {
  title: "AdVerseAI",
  description: "Base Segura",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}