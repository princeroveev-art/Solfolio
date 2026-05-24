"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AppShell } from "@/components/layout/AppShell";

export default function WalletPage() {
  const { publicKey, connected, disconnect } = useWallet();
  const { connection } = useConnection();
  const address = publicKey?.toBase58() || "Not connected";
  return (
    <AppShell>
      <div className="sf-main-grid">
        <section className="sf-panel xl:col-span-8"><h1>Wallet Control Center</h1><p className="sf-sub">Operate your connected Solana wallet with fast command actions and visibility.</p></section>
        <section className="sf-panel xl:col-span-4"><p className="sf-kicker">Connection</p><p className="mono break-all">{address}</p><p className="mt-3 text-sm text-white/70">Endpoint: {connection.rpcEndpoint}</p></section>
        <section className="sf-panel xl:col-span-6"><div className="sf-action-list"><button className="sf-action-btn" onClick={() => navigator.clipboard.writeText(address)} disabled={!connected}>Copy Address</button><a className="sf-action-btn" href={connected ? `https://solscan.io/account/${address}` : "#"} target="_blank">Open Solscan</a><button className="sf-action-btn" onClick={() => disconnect()} disabled={!connected}>Disconnect Wallet</button></div></section>
        <section className="sf-panel xl:col-span-6"><p className="sf-kicker">Operational Notes</p><ul className="space-y-2 text-sm text-white/75"><li>• Verify wallet addresses before transfers.</li><li>• Monitor RPC endpoint quality for execution reliability.</li><li>• Use dashboard risk signal before rebalancing decisions.</li></ul></section>
      </div>
    </AppShell>
  );
}
