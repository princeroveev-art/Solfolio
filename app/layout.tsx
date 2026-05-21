import type { Metadata } from "next";
import "./globals.css";
import { WalletProviders } from "@/components/wallet/WalletProviders";

export const metadata: Metadata = {
  title: "Solfolio — Institutional-Grade Solana Portfolio Intelligence",
  description:
    "Professional Solana portfolio intelligence platform with AI-powered risk ops, token analytics, NFT tracking, and on-chain activity monitoring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <WalletProviders>{children}</WalletProviders>
      </body>
    </html>
  );
}
