"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import { usePortfolioAnalytics } from "@/hooks/portfolio/usePortfolioAnalytics";
import { formatUSD, shortenAddress } from "@/lib/solana";
import { fetchSolanaIntelFeed, SolanaIntelFeed } from "@/lib/ai/solanaIntelService";

type ActionState = "Needs confirmation" | "Queued" | "Completed";

const DEMO_CHAT = [
  { role: "assistant", text: "Hi, I’m Solana Agent. I can help you review your wallet, explain Solana protocols, and surface research watchlists." },
  { role: "user", text: "What should I watch in Solana this week?" },
  { role: "assistant", text: "Educational watchlist: monitor stablecoin liquidity shifts, major NFT mint calendars, validator/staking updates, and new DeFi collateral listings. This is research guidance, not financial advice." },
];

export default function AIPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { solBalance, tokens, transactions, loading } = usePortfolioData(publicKey, connected, connection);
  const { totalUSD } = usePortfolioAnalytics(solBalance, tokens, transactions);

  const [feed, setFeed] = useState<SolanaIntelFeed | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const loadIntel = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSolanaIntelFeed();
      setFeed(data);
    } catch {
      setError("Unable to load AI Agent intelligence feed right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIntel();
  }, [loadIntel]);

  const concentration = useMemo(() => {
    const top = Math.max((solBalance * 155 / Math.max(1, totalUSD)) * 100, ...tokens.map((t) => (t.usdValue / Math.max(1, totalUSD)) * 100), 0);
    return top;
  }, [solBalance, totalUSD, tokens]);

  const recommendations = [
    { title: "Concentration review", detail: concentration > 60 ? "High single-asset concentration detected. Consider diversification research." : "Concentration appears moderate; continue monitoring distribution." , confidence: 84, rationale: "Computed from top holding share in current wallet snapshot."},
    { title: "Activity cadence", detail: transactions.length > 15 ? "High execution cadence. Review transaction intent and fee efficiency." : "Activity is moderate; maintain tagging and notes for major moves.", confidence: 78, rationale: "Based on recent on-chain transaction count." },
    { title: "Stable buffer", detail: tokens.some((t) => ["USDC", "USDT", "PYUSD"].includes(t.symbol)) ? "Stable assets present; keep emergency liquidity policy documented." : "No major stable buffer detected; define liquidity plan for volatility events.", confidence: 73, rationale: "Token composition scan with stablecoin symbol matching." },
  ];

  const actions: { label: string; state: ActionState; note: string }[] = [
    { label: "Prepare rebalance draft", state: "Needs confirmation", note: "Agent can draft allocation scenarios for your review." },
    { label: "Tag suspicious outflow", state: "Queued", note: "Pending manual verification before alert escalation." },
    { label: "Create weekly research brief", state: "Completed", note: "Includes protocol watchlist and ecosystem trend summary." },
  ];

  const watchlist = feed?.items.length
    ? feed.items.slice(0, 4).map((item) => ({ title: item.title, detail: item.summary }))
    : [
        { title: "DePIN on Solana", detail: "Track new hardware-backed network launches and token utility models. (Demo data)" },
        { title: "Liquid staking shifts", detail: "Watch staking derivatives and validator distribution changes. (Demo data)" },
        { title: "NFT infrastructure", detail: "Observe creator tooling, royalty experiments, and compression usage. (Demo data)" },
        { title: "Perps & lending", detail: "Monitor collateral policy changes and risk controls. (Demo data)" },
      ];

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-32 sm:px-6">
        <div className="sf-main-grid">
          <section className="sf-panel xl:col-span-12">
            <p className="sf-kicker">Solfolio AI Agent</p>
            <h1>AI Agent Command Center</h1>
            <p className="sf-sub">Solana-focused assistant for portfolio operations and ecosystem research. Educational workflow support only — not financial advice.</p>
            <p className="mt-3 text-xs text-white/60">Wallet: {connected && publicKey ? shortenAddress(publicKey.toBase58(), 6) : "Not connected"} · Tracked Value: {loading ? "—" : formatUSD(totalUSD)}</p>
          </section>

codex/redesign-entire-app-for-premium-ui
          <section className="sf-panel xl:col-span-7">
            <p className="sf-kicker">Solana Intelligence Assistant (Demo UX)</p>
            <div className="space-y-3">
              {DEMO_CHAT.map((m, i) => <div key={i} className="rounded-xl border border-white/10 p-3 text-sm" style={{ background: m.role === "assistant" ? "rgba(56,189,248,.09)" : "rgba(139,92,246,.1)" }}>{m.text}</div>)}
            </div>
            <div className="mt-4 flex gap-2">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask about Solana tokens, NFTs, staking, wallets, or protocols..." className="flex-1 rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm" />
              <button className="btn-primary" type="button">Send</button>
            </div>
            <p className="mt-2 text-xs text-white/50">Input is currently local UI preview while backend agent wiring is in progress.</p>
          </section>

          <section className="sf-panel xl:col-span-5">
            <p className="sf-kicker">Portfolio Operator</p>
            <div className="space-y-3 text-sm text-white/80">
              <p>Portfolio health: <strong>{loading ? "Analyzing" : concentration > 60 ? "Concentrated" : concentration > 40 ? "Balanced" : "Diversified"}</strong></p>
              <p>Token positions: <strong>{tokens.length}</strong> · Recent activity: <strong>{transactions.length}</strong></p>
              <p>Confidence label: <strong>{loading ? "—" : "0.82"}</strong></p>
              <p className="text-white/60">Rationale: health score is estimated from holding concentration, stable-buffer presence, and activity cadence.</p>
            </div>
          </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-32 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-black/40 p-8 shadow-[0_30px_120px_rgba(8,8,20,0.45)] backdrop-blur-xl sm:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/90">Solfolio AI Agent</p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: "var(--font-syne)" }}>
            AI Agent Command Center
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 sm:text-base" style={{ color: "var(--color-text-secondary)" }}>
            Monitor Solana market news, ecosystem momentum, NFT activity, DeFi/token trends, and protocol risk alerts in one premium intelligence surface.
          </p>
          <p className="mt-3 text-xs text-white/50">Status: {feed ? formatUpdatedAt(feed) : "Initializing"}</p>
        </div>
 premium-dashboard-redesign

          <section className="sf-panel xl:col-span-6">
            <p className="sf-kicker">Action Queue</p>
            <div className="space-y-3 mt-2">
              {actions.map((a) => <div key={a.label} className="rounded-xl border border-white/10 p-3"><p className="font-semibold">{a.label}</p><p className="text-xs text-cyan-200 mt-1">{a.state}</p><p className="text-sm text-white/65 mt-2">{a.note}</p></div>)}
            </div>
          </section>

          <section className="sf-panel xl:col-span-6">
            <p className="sf-kicker">Research Recommendations</p>
            <div className="space-y-3 mt-2">
              {recommendations.map((r) => <div key={r.title} className="rounded-xl border border-white/10 p-3"><p className="font-semibold">{r.title}</p><p className="text-sm text-white/75 mt-1">{r.detail}</p><p className="text-xs text-white/55 mt-2">Confidence {r.confidence}% · Rationale: {r.rationale}</p></div>)}
            </div>
          </section>

          <section className="sf-panel xl:col-span-12">
            <div className="flex items-center justify-between gap-2"><p className="sf-kicker">What to Watch in Solana</p><p className="text-xs text-white/50">{feed?.items.length ? "Live feed" : "Demo watchlist"}</p></div>
            {error && <p className="text-sm text-red-300 mb-3">{error}</p>}
            {isLoading ? <div className="h-24 rounded-xl border border-white/10 bg-white/5 animate-pulse" /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-2">{watchlist.map((w) => <article key={w.title} className="rounded-xl border border-white/10 p-4 bg-black/20"><h3 className="font-semibold">{w.title}</h3><p className="text-sm text-white/70 mt-2">{w.detail}</p></article>)}</div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
