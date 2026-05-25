"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

type AppShellProps = { children: React.ReactNode };
type Network = "Mainnet" | "Devnet";

const notifications = [
  { title: "Wallet activity", detail: "2 outgoing token transfers confirmed.", time: "2m" },
  { title: "Portfolio alert", detail: "SOL allocation moved above your 35% threshold.", time: "11m" },
  { title: "Price movement", detail: "BONK is up 4.2% in the past hour.", time: "27m" },
  { title: "Security signal", detail: "One newly-approved token account needs review.", time: "1h" },
];

const statusCards = [
  { label: "Solana", value: "Operational", tone: "text-emerald-300" },
  { label: "RPC", value: "Healthy • 138ms", tone: "text-sky-300" },
  { label: "SOL", value: "$173.42", tone: "text-violet-200" },
  { label: "Sentiment", value: "Risk-On", tone: "text-amber-200" },
];

const shortAddress = (address?: string | null) => (address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "No wallet");

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [network, setNetwork] = useState<Network>("Mainnet");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsOn, setAnimationsOn] = useState(true);

  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const walletAddress = publicKey?.toBase58();
  const walletLabel = shortAddress(walletAddress);
  const walletSummary = useMemo(
    () =>
      connected
        ? { tvl: "$42,931.85", pnl: "+6.38% (24h)", recent: ["Swapped 3.1 SOL → JUP", "Received 0.12 SOL staking reward"] }
        : { tvl: "$0.00", pnl: "Connect to load", recent: ["No recent activity yet.", "Use Connect Wallet to start tracking."] },
    [connected],
  );


  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowSettings(false);
        setShowWalletMenu(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <main className="sf-shell">
      <div className="sf-bg-glow" />
      <div className="sf-sidebar-desktop">
        <DashboardSidebar />
      </div>

      <div className="sf-content-wrap">
        <header className="sf-topbar glass relative overflow-visible min-h-[110px] px-4 py-3 sm:px-5 sm:py-4 border-white/20 shadow-[0_20px_80px_rgba(76,29,149,0.35)]">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_10%_5%,rgba(139,92,246,0.22),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(56,189,248,0.18),transparent_28%)]" />

          <div className="relative flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button className="sf-menu-btn" type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation">☰</button>
                <div className="rounded-2xl border border-violet-300/30 bg-gradient-to-br from-violet-500/20 via-slate-900/70 to-sky-500/10 px-4 py-2.5 shadow-[0_10px_30px_rgba(139,92,246,0.25)]">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-violet-200">Solfolio</p>
                  <h1 className="text-base sm:text-lg font-semibold tracking-tight text-white">Intelligence Trading Terminal</h1>
                </div>
              </div>

              <div className="flex items-center gap-2 relative shrink-0">
                <button className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_12px_28px_rgba(139,92,246,0.48)] hover:brightness-110">✦ Ask AI</button>
                <select value={network} onChange={(e) => setNetwork(e.target.value as Network)} className="rounded-xl border border-white/20 bg-slate-900/80 px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-violet-400"><option>Mainnet</option><option>Devnet</option></select>
                <button onClick={() => { setShowNotifications((v) => !v); setShowSettings(false); setShowWalletMenu(false); }} className="rounded-xl border border-white/20 bg-white/[0.05] px-3 py-2.5 text-sm hover:bg-white/[0.12]" aria-label="Notifications">🔔</button>
                <button onClick={() => { setShowSettings((v) => !v); setShowNotifications(false); setShowWalletMenu(false); }} className="rounded-xl border border-white/20 bg-white/[0.05] px-3 py-2.5 text-sm hover:bg-white/[0.12]" aria-label="Settings">⚙</button>

                <div className="relative">
                  <button onClick={() => (connected ? setShowWalletMenu((v) => !v) : setVisible(true))} className="rounded-xl border border-violet-300/40 bg-gradient-to-r from-violet-500/20 to-indigo-500/15 px-3.5 py-2.5 text-xs font-semibold text-violet-100 hover:from-violet-500/30 hover:to-indigo-500/25">{walletLabel}</button>
                  {showWalletMenu && (
                    <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/15 bg-slate-950/95 p-3 shadow-2xl shadow-black/50 z-50">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Wallet intelligence</p>
                      <p className="font-mono text-sm mt-1 text-slate-100">{walletAddress ?? "Not connected"}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg border border-violet-300/15 bg-violet-500/[0.08] p-2"><p className="text-slate-400">Portfolio</p><p className="text-slate-100 font-semibold">{walletSummary.tvl}</p></div>
                        <div className="rounded-lg border border-emerald-300/15 bg-emerald-500/[0.08] p-2"><p className="text-slate-400">24h PnL</p><p className="text-emerald-300 font-semibold">{walletSummary.pnl}</p></div>
                      </div>
                      <div className="mt-3 space-y-1 text-xs text-slate-300">{walletSummary.recent.map((item) => <p key={item} className="rounded-md bg-white/[0.03] border border-white/5 px-2 py-1.5">{item}</p>)}</div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => walletAddress && navigator.clipboard.writeText(walletAddress)} className="flex-1 rounded-lg border border-white/15 bg-white/[0.04] px-2 py-1.5 text-xs hover:bg-white/[0.08]" disabled={!walletAddress}>Copy wallet</button>
                        <button onClick={() => (connected ? disconnect() : setVisible(true))} className="flex-1 rounded-lg border border-rose-400/30 bg-rose-500/10 px-2 py-1.5 text-xs text-rose-200 hover:bg-rose-500/20">{connected ? "Disconnect" : "Connect"}</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] gap-3 items-center">
              <label className="w-full group relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-200 text-sm">⌕</span>
                <input type="text" placeholder="Search wallets, tokens, NFT collections, tx hashes" className="w-full rounded-2xl border border-violet-300/30 bg-gradient-to-r from-slate-900/90 to-violet-950/40 pl-10 pr-24 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:border-violet-300 focus:ring-2 focus:ring-violet-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_22px_rgba(15,23,42,0.45)]" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-300 border border-white/20 bg-white/5 rounded px-1.5 py-0.5">⌘K</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {statusCards.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/20 bg-gradient-to-b from-white/[0.12] to-white/[0.03] px-3 py-2.5 min-w-[120px] shadow-[0_8px_20px_rgba(2,6,23,0.35)]">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-300">{item.label}</p>
                    <p className={`text-sm font-semibold ${item.tone}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {(showNotifications || showSettings || showWalletMenu) && <button aria-label="Close topbar panels" onClick={() => { setShowNotifications(false); setShowSettings(false); setShowWalletMenu(false); }} className="fixed inset-0 z-40 cursor-default" />}
          {showNotifications && <div className="absolute right-40 top-16 w-80 rounded-2xl border border-white/15 bg-slate-950/95 p-3 shadow-2xl shadow-black/60 z-50"><div className="flex items-center justify-between mb-2"><p className="text-xs uppercase tracking-[0.2em] text-slate-400">Notifications</p><span className="text-[11px] text-slate-500">Live queue</span></div><div className="space-y-2 max-h-72 overflow-auto">{notifications.map((notice) => <div key={notice.title + notice.time} className="rounded-lg border border-white/10 bg-white/[0.03] p-2"><div className="flex justify-between text-xs"><p className="font-medium text-slate-100">{notice.title}</p><span className="text-slate-500">{notice.time}</span></div><p className="text-xs text-slate-400 mt-1">{notice.detail}</p></div>)}</div></div>}
          {showSettings && <div className="absolute right-24 top-16 w-80 rounded-2xl border border-white/15 bg-slate-950/95 p-3 shadow-2xl shadow-black/60 text-xs z-50"><p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Settings</p><div className="space-y-2"><div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2"><span>Theme mode</span><span className="text-slate-400">Dark</span></div><button onClick={() => setCompactMode((v) => !v)} className="w-full flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2"><span>Compact mode</span><span>{compactMode ? "On" : "Off"}</span></button><button onClick={() => setAnimationsOn((v) => !v)} className="w-full flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2"><span>Animations</span><span>{animationsOn ? "On" : "Off"}</span></button><div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2"><span>RPC status</span><span className="text-emerald-300">Healthy</span></div><div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2"><span>Refresh interval</span><span className="text-slate-400">15s</span></div><div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] p-2"><span>Build</span><span className="text-slate-400">v0.1.0-prod</span></div></div></div>}
        </header>

        <section>{children}</section>
      </div>

      {mobileOpen && (
        <div className="sf-drawer-wrap" role="dialog" aria-modal="true">
          <button className="sf-drawer-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
          <div className="sf-drawer-panel"><DashboardSidebar onNavigate={() => setMobileOpen(false)} /></div>
        </div>
      )}
    </main>
  );
}
