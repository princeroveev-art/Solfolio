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

// Stat card icons
function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
function SolIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
function ZapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-border-strong)" strokeWidth="1.2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function DashboardContent() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const { solBalance, tokens, transactions, loading, error } = usePortfolioData(publicKey, connected, connection);
  const { totalUSD, grindScore } = usePortfolioAnalytics(solBalance, tokens, transactions);

  const isDisconnected = !connected;

  const [animatedTotal, setAnimatedTotal] = useState(0);
  useEffect(() => {
    if (isDisconnected || loading) return;
    const target = Math.max(0, totalUSD);
    const start = performance.now();
    const duration = 850;
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setAnimatedTotal(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDisconnected, loading, totalUSD]);

  if (isDisconnected) {
    return (
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          gap: "32px",
        }}
      >
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <ShieldIcon />
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "var(--text-2xl)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
            }}
          >
            Connect Your Wallet
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "380px", fontSize: "var(--text-base)", lineHeight: 1.6 }}>
            Connect your Solana wallet to view your full portfolio, NFTs, and AI-powered grind score.
          </p>
        </div>
        <WalletButton variant="primary" />
      </div>
    );
  }

  const statCards = [
    { label: "Portfolio Value", value: loading ? null : formatUSD(totalUSD), sub: "Net wallet value", Icon: BriefcaseIcon, highlight: true },
    { label: "AI Confidence", value: loading ? null : `${Math.min(98, 52 + tokens.length * 3)}%`, sub: "Signal certainty", Icon: SolIcon },
    { label: "Risk Score", value: loading ? null : `${Math.max(12, 100 - (grindScore?.score || 0))}/100`, sub: "Lower is safer", Icon: AlertIcon },
    { label: "Wallet Activity", value: loading ? null : transactions.length.toString(), sub: "Recent transactions", Icon: LayersIcon },
  ];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-5 sm:gap-6">
      {/* Page header */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "var(--radius-full)",
                background: "var(--color-brand)",
                boxShadow: "0 0 8px rgba(20,184,166,0.7)",
              }}
            />
            <span
              style={{
                color: "var(--color-text-muted)",
                fontSize: "var(--text-xs)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {publicKey ? shortenAddress(publicKey.toBase58(), 6) : ""}
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "var(--text-xl)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Intelligence Dashboard
          </h1>
        </div>

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--color-brand)",
              fontSize: "var(--text-sm)",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                border: "2px solid var(--color-brand)",
                borderTopColor: "transparent",
                borderRadius: "var(--radius-full)",
                animation: "spin 0.8s linear infinite",
              }}
            />
            Syncing on-chain data...
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            background: "color-mix(in srgb, var(--color-danger) 8%, transparent)",
            border: "1px solid color-mix(in srgb, var(--color-danger) 25%, transparent)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-danger)",
            fontSize: "var(--text-sm)",
          }}
        >
          <AlertIcon />
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="card-glow p-6"
            style={{
              padding: "20px",
              borderColor: stat.highlight ? "var(--color-border-brand)" : "var(--color-border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", fontWeight: 500 }}>
                {stat.label}
              </span>
              <div
                style={{
                  color: stat.highlight ? "var(--color-brand)" : "var(--color-text-muted)",
                  opacity: 0.7,
                }}
              >
                <stat.Icon />
              </div>
            </div>
            {loading ? (
              <div className="skeleton animate-pulse" style={{height:28,width:"70%"}} />
            ) : (
              <p
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "var(--text-xl)",
                  fontWeight: 800,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value ?? ""}
              </p>
            )}
            {loading ? <div className="skeleton animate-pulse" style={{height:12,width:"45%",marginTop:8}} /> : stat.sub && (
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", marginTop: "3px" }}>
                {stat.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="card-glow p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>Portfolio Performance</p>
            <p className="metric-value" style={{ color: "var(--color-text-primary)", fontSize: "var(--text-lg)", fontWeight: 700 }}>
              {loading ? "—" : formatUSD(animatedTotal)}
            </p>
          </div>
          <div className="flex items-center gap-2" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-xs)" }}>
            <span className="live-dot" /> Live sync
          </div>
        </div>
        <div style={{ height: 76, display: "flex", alignItems: "flex-end", gap: 5 }}>
          {[24, 36, 28, 42, 38, 51, 46, 58, 55, 63, 60, 66].map((h, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 6, height: `${h}px`, background: "linear-gradient(180deg, rgba(139,92,246,0.85), rgba(59,130,246,0.45))", opacity: i > 9 ? 1 : 0.72, transition: "opacity .25s ease" }} />
          ))}
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="xl:col-span-7">
          <div>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Top Holdings</p>
            <TokenList tokens={tokens} solBalance={solBalance} solPrice={SOL_PRICE} loading={loading} />
          </div>
          <div>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Wallet Activity</p>
            <ActivityFeed transactions={transactions} loading={loading} />
          </div>
          <div>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>AI Generated Report</p>
            <AIInsightsPanel
            loading={loading}
            totalUSD={totalUSD}
            solBalance={solBalance}
            tokens={tokens}
            transactions={transactions}
          />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="xl:col-span-5">
          {grindScore && <GrindScoreCard data={grindScore} />}
          <NFTGrid loading={loading} />
        </div>
      </div>
    </div>
  );
}
