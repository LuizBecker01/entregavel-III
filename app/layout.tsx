import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarify",
  icons: {
    icon: "/images/rei.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased h-screen flex flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
