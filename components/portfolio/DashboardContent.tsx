"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { shortenAddress, formatUSD } from "@/lib/solana";
import { WalletButton } from "@/components/wallet/WalletButton";
import { GrindScoreCard } from "@/components/portfolio/GrindScoreCard";
import { TokenList } from "@/components/portfolio/TokenList";
import { NFTGrid } from "@/components/portfolio/NFTGrid";
import { ActivityFeed } from "@/components/portfolio/ActivityFeed";
import { AIInsightsPanel } from "@/components/portfolio/AIInsightsPanel";
import { usePortfolioData } from "@/hooks/portfolio/usePortfolioData";
import { usePortfolioAnalytics } from "@/hooks/portfolio/usePortfolioAnalytics";
import { SOL_PRICE } from "@/lib/portfolio/constants";
import { useEffect, useState } from "react";

function Bullet({ tone = "brand" }: { tone?: "brand" | "warm" }) {
  return <span className={`sf-bullet ${tone === "warm" ? "sf-bullet-warm" : ""}`} />;
}

export function DashboardContent() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const { solBalance, tokens, transactions, loading, error } = usePortfolioData(publicKey, connected, connection);
  const { totalUSD, grindScore } = usePortfolioAnalytics(solBalance, tokens, transactions);
  const [animatedTotal, setAnimatedTotal] = useState(0);

  useEffect(() => {
    if (!connected || loading) return;
    const target = Math.max(0, totalUSD);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setAnimatedTotal(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [connected, loading, totalUSD]);

  if (!connected) {
    return <div className="sf-empty"><h2>Connect wallet to open Solfolio cockpit</h2><WalletButton variant="primary" /></div>;
  }

  return (
    <div className="sf-main-grid">
      <section className="sf-panel sf-hero">
        <div>
          <p className="sf-kicker"><Bullet /> Live Portfolio Command</p>
          <h1>Solfolio Web3 Intelligence Dashboard</h1>
          <p className="sf-sub">Track tokens, activity, and AI-driven risk posture with a premium Solana-first operator cockpit.</p>
        </div>
        <div className="sf-hero-metrics">
          <div><span>Total Value</span><strong>{loading ? "—" : formatUSD(animatedTotal)}</strong></div>
          <div><span>AI Confidence</span><strong>{loading ? "—" : `${Math.min(98, 52 + tokens.length * 3)}%`}</strong></div>
          <div><span>Wallet</span><strong>{publicKey ? shortenAddress(publicKey.toBase58(), 6) : "—"}</strong></div>
        </div>
      </section>

      <section className="sf-panel">
        <p className="sf-kicker"><Bullet tone="warm" /> Market Sentiment</p>
        <div className="sf-sentiment-row">
          <div><span>Risk Index</span><strong>{loading ? "—" : `${Math.max(12, 100 - (grindScore?.score || 0))}/100`}</strong></div>
          <div><span>Wallet Activity</span><strong>{loading ? "—" : transactions.length}</strong></div>
          <div><span>Signal</span><strong>{loading ? "—" : (tokens.length > 8 ? "Bullish" : "Neutral")}</strong></div>
        </div>
      </section>

      {error && <section className="sf-panel sf-error">{error}</section>}

      <section className="sf-panel xl:col-span-8"><TokenList tokens={tokens} solBalance={solBalance} solPrice={SOL_PRICE} loading={loading} /></section>
      <section className="sf-panel xl:col-span-4"><NFTGrid loading={loading} /></section>

      <section className="sf-panel xl:col-span-8"><ActivityFeed transactions={transactions} loading={loading} /></section>
      <section className="sf-panel xl:col-span-4 sf-actions">
        <p className="sf-kicker"><Bullet /> Wallet & Asset Actions</p>
        <div className="sf-action-list">
          <button type="button" className="sf-action-btn">Rebalance Portfolio</button>
          <button type="button" className="sf-action-btn">Set Risk Alerts</button>
          <button type="button" className="sf-action-btn">Export Tax Snapshot</button>
        </div>
        {grindScore && <GrindScoreCard data={grindScore} />}
      </section>

      <section className="sf-panel xl:col-span-12">
        <p className="sf-kicker"><Bullet /> AI Insights</p>
        <AIInsightsPanel loading={loading} totalUSD={totalUSD} solBalance={solBalance} tokens={tokens} transactions={transactions} />
      </section>
    </div>
  );
}
