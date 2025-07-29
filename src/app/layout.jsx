import "./globals.css";

export const metadata = {
  title: "AdVerseAI",
  description: "AI-Powered Advertising Campaigns",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
