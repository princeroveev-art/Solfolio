import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";
import { WalletProviders } from "@/components/wallet/WalletProviders";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solfolio — Your On-Chain Identity",
  description:
    "AI-powered Web3 identity and portfolio platform for Solana. Track tokens, NFTs, and your on-chain grind score.",
  keywords: ["Solana", "Web3", "NFT", "DeFi", "portfolio", "blockchain"],
  openGraph: {
    title: "Solfolio",
    description: "Your AI-powered Solana identity",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={syne.variable}>
      <body style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <WalletProviders>{children}</WalletProviders>
      </body>
    </html>
  );
}
