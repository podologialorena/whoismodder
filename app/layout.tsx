import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSTMODEL — Algorithmic MNQ Trading",
  description: "Live track record of an institutional sweep-based MNQ futures trading bot. Walk-forward validated PF 3.24x.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} antialiased`}>
      <body className="min-h-screen bg-[#0a0a0a] text-[#ededed]">{children}</body>
    </html>
  );
}
