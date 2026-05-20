"use client";

import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

interface WalletButtonProps {
  className?: string;
  variant?: "primary" | "ghost";
}

export function WalletButton({ className = "", variant = "primary" }: WalletButtonProps) {
  const { setVisible } = useWalletModal();
  const { connected, publicKey, disconnect, connecting } = useWallet();

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  if (connecting) {
    return (
      <button
        className={`btn-${variant} opacity-70 cursor-wait ${className}`}
        disabled
      >
        <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
        Connecting...
      </button>
    );
  }

  if (connected && shortAddress) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-brand-500/20 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          <span className="text-brand-300 font-mono text-xs">{shortAddress}</span>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-3 py-2.5 rounded-xl glass glass-hover text-white/40 hover:text-red-400 text-sm transition-all"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setVisible(true)}
      className={`btn-${variant} ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
      Connect Wallet
    </button>
  );
}
