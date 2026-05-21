"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useMemo, useState } from "react";
import {
  getSolBalance,
  getTokenAccounts,
  getRecentTransactions,
  shortenAddress,
  formatUSD
} from "@/lib/solana";
import { calculateGrindScore, GrindScoreData } from "@/lib/grindScore";
import { WalletButton } from "@/components/wallet/WalletButton";
import { GrindScoreCard } from "@/components/portfolio/GrindScoreCard";
import { TokenList } from "@/components/portfolio/TokenList";
import { NFTGrid } from "@/components/portfolio/NFTGrid";
import { ActivityFeed } from "@/components/portfolio/ActivityFeed";
import { AgentOpsPanel } from "@/components/portfolio/AgentOpsPanel";
import { generateAgentReport, PortfolioAsset } from "@/lib/agentEngine";

const KNOWN_TOKENS: Record<string, { name: string; symbol: string; price: number; color: string }> = {
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": { name: "USD Coin",   symbol: "USDC",  price: 1.0,       color: "#2775CA" },
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": { name: "Tether",     symbol: "USDT",  price: 1.0,       color: "#26A17B" },
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN":  { name: "Jupiter",    symbol: "JUP",   price: 1.82,      color: "#1DC18A" },
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": { name: "Bonk",      symbol: "BONK",  price: 0.000024,  color: "#F7931A" },
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": { name: "dogwifhat", symbol: "WIF",   price: 2.14,      color: "#F4B4C8" },
};

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

  const [solBalance, setSolBalance] = useState<number>(0);
  const [tokens, setTokens] = useState<Array<{ mint: string; amount: number; decimals: number; address: string; name: string; symbol: string; price: number; color: string; usdValue: number }>>([]);
  const [transactions, setTransactions] = useState<Array<{ signature: string; slot: number; blockTime: number | null | undefined; err: unknown; memo: string | null | undefined }>>([]);
  const [grindScore, setGrindScore] = useState<GrindScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const SOL_PRICE = 172.4;

  useEffect(() => {
    if (!connected) { setLoading(false); return; }
    if (!publicKey) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [balance, tokenAccounts, txs] = await Promise.all([
          getSolBalance(publicKey, connection),
          getTokenAccounts(publicKey, connection),
          getRecentTransactions(publicKey, 8, connection),
        ]);
        setSolBalance(balance);
        const enrichedTokens = tokenAccounts
          .map((t) => {
            const meta = KNOWN_TOKENS[t.mint];
            return {
              ...t,
              name: meta?.name || "Unknown Token",
              symbol: meta?.symbol || t.mint.slice(0, 4),
              price: meta?.price || 0,
              color: meta?.color || "#6366f1",
              usdValue: t.amount * (meta?.price || 0),
            };
          })
          .sort((a, b) => b.usdValue - a.usdValue);
        setTokens(enrichedTokens);
        setTransactions(txs);
        const score = calculateGrindScore({
          solBalance: balance,
          tokenCount: tokenAccounts.length,
          txCount: txs.length * 10,
        });
        setGrindScore(score);
      } catch (err) {
        console.error(err);
        setError("Failed to load wallet data. Try again or check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [publicKey, connected, connection]);


  const totalUSD = solBalance * SOL_PRICE + tokens.reduce((s, t) => s + t.usdValue, 0);

  const agentReport = useMemo(() => {
    const allAssets: PortfolioAsset[] = [
      { symbol: "SOL", usdValue: solBalance * SOL_PRICE, allocationPct: 0, volatilityBand: "medium" },
      ...tokens.map((t) => ({
        symbol: t.symbol,
        usdValue: t.usdValue,
        allocationPct: 0,
        volatilityBand: t.symbol === "USDC" || t.symbol === "USDT" ? "low" as const : "high" as const,
      })),
    ];

    const total = allAssets.reduce((sum, a) => sum + a.usdValue, 0);
    const normalized = allAssets.map((a) => ({ ...a, allocationPct: total > 0 ? (a.usdValue / total) * 100 : 0 }));
    return generateAgentReport(normalized, transactions.length);
  }, [solBalance, tokens, transactions.length]);

  const isDisconnected = !connected;

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
    { label: "Total Portfolio Value", value: loading ? null : formatUSD(totalUSD), sub: "Net wallet value", Icon: BriefcaseIcon, highlight: true },
    { label: "SOL Position", value: loading ? null : `${solBalance.toFixed(3)} SOL`, sub: loading ? "" : formatUSD(solBalance * SOL_PRICE), Icon: SolIcon },
    { label: "Tracked Assets", value: loading ? null : tokens.length.toString(), sub: "SPL tokens", Icon: LayersIcon },
    { label: "Grind Score", value: loading ? null : grindScore?.score.toString() || "0", sub: grindScore?.tier || "", Icon: ZapIcon },
  ];

  return (
    <div
      style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
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
                fontFamily: "monospace",
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
            My Dashboard
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}
        className="lg:grid-cols-4"
      >
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="card"
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
              <div className="skeleton" style={{height:28,width:"70%"}} />
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
            {loading ? <div className="skeleton" style={{height:12,width:"45%",marginTop:8}} /> : stat.sub && (
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", marginTop: "3px" }}>
                {stat.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
        className="lg:grid-cols-3"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="lg:col-span-2">
          <TokenList tokens={tokens} solBalance={solBalance} solPrice={SOL_PRICE} loading={loading} />
          <ActivityFeed transactions={transactions} loading={loading} />
          <AgentOpsPanel report={agentReport} loading={loading} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {grindScore && <GrindScoreCard data={grindScore} />}
          <NFTGrid loading={loading} />
        </div>
      </div>
    </div>
  );
}
