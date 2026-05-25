"use client";

import { ComponentType, ReactNode, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

require("@solana/wallet-adapter-react-ui/styles.css");

export function WalletProviders({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

    if (!rpcUrl) {
      throw new Error("Missing NEXT_PUBLIC_RPC_URL");
    }

    return rpcUrl;
  }, []);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  const SafeConnectionProvider = ConnectionProvider as unknown as ComponentType<{ endpoint: string; children?: ReactNode }>;
  const SafeWalletProvider = WalletProvider as unknown as ComponentType<{ wallets: typeof wallets; autoConnect?: boolean; children?: ReactNode }>;
  const SafeWalletModalProvider = WalletModalProvider as unknown as ComponentType<{ children?: ReactNode }>;

  return (
    <SafeConnectionProvider endpoint={endpoint}>
      <SafeWalletProvider wallets={wallets} autoConnect>
        <SafeWalletModalProvider>{children}</SafeWalletModalProvider>
      </SafeWalletProvider>
    </SafeConnectionProvider>
  );
}