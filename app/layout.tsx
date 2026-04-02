import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "V5.1 — Algorithmic MNQ Trading",
  description: "Live track record of V5.1: dual-engine MNQ futures trading system. Walk-forward validated, 73% win rate, all months green.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0a] text-[#ededed]">{children}</body>
    </html>
  );
}
