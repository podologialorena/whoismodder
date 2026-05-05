import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mod Menu MNQ v1 / SaaS landing en desarrollo",
  description: "Mod Menu MNQ v1 / SaaS landing en desarrollo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${mono.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0a] text-[#ededed]">{children}</body>
    </html>
  );
}
