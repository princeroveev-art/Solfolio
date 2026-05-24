"use client";
import { useConnection } from "@solana/wallet-adapter-react";
import { AppShell } from "@/components/layout/AppShell";

export default function SettingsPage() {
  const { connection } = useConnection();
  return (
    <AppShell>
        <div className="sf-main-grid">
          <section className="sf-panel xl:col-span-12"><h1>Settings & Preferences</h1><p className="sf-sub">Tune Solfolio as an AI Agent operations platform for your daily workflow.</p></section>
          <section className="sf-panel xl:col-span-4"><p className="sf-kicker">Alerting Mode</p><p className="text-sm text-white/75">Agent briefings every 4h · Risk pings enabled</p></section>
          <section className="sf-panel xl:col-span-4"><p className="sf-kicker">Workspace Density</p><p className="text-sm text-white/75">Premium Comfortable (recommended for cockpit monitoring)</p></section>
          <section className="sf-panel xl:col-span-4"><p className="sf-kicker">RPC Endpoint</p><p className="text-sm break-all text-white/75">{connection.rpcEndpoint}</p></section>
          <section className="sf-panel xl:col-span-6"><p className="sf-kicker">Automation Rules</p><ul className="space-y-2 text-sm text-white/75"><li>• Trigger rebalance recommendation when concentration exceeds threshold.</li><li>• Flag unusual wallet outflows as high-priority events.</li><li>• Daily AI Agent summary delivered to dashboard panel.</li></ul></section>
          <section className="sf-panel xl:col-span-6"><p className="sf-kicker">Profile & Security</p><ul className="space-y-2 text-sm text-white/75"><li>• Session guard: Active</li><li>• Explorer links open in protected external tab</li><li>• Data visibility mode: portfolio owner only</li></ul></section>
        </div>
    </AppShell>
  );
}
