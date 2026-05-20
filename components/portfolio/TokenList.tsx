"use client";

import { formatUSD, formatNumber } from "@/lib/solana";

interface Token {
  symbol: string;
  name: string;
  amount: number;
  price: number;
  usdValue: number;
  color: string;
  mint: string;
}

interface TokenListProps {
  tokens: Token[];
  solBalance: number;
  solPrice: number;
  loading: boolean;
}

export function TokenList({ tokens, solBalance, solPrice, loading }: TokenListProps) {
  const allTokens = [
    {
      symbol: "SOL",
      name: "Solana",
      amount: solBalance,
      price: solPrice,
      usdValue: solBalance * solPrice,
      color: "#9945FF",
      mint: "native",
    },
    ...tokens,
  ];

  const total = allTokens.reduce((s, t) => s + t.usdValue, 0);

  return (
    <div className="card" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "var(--text-sm)",
            color: "var(--color-text-primary)",
          }}
        >
          Token Holdings
        </span>
        <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>
          {allTokens.length} assets
        </span>
      </div>

      <div>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div className="skeleton" style={{ width: 38, height: 38, borderRadius: "var(--radius-full)", flexShrink: 0 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "7px" }}>
                <div className="skeleton" style={{ height: 11, width: "35%" }} />
                <div className="skeleton" style={{ height: 9, width: "55%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "7px", alignItems: "flex-end" }}>
                <div className="skeleton" style={{ height: 11, width: 56 }} />
                <div className="skeleton" style={{ height: 9, width: 40 }} />
              </div>
            </div>
          ))
        ) : allTokens.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "var(--color-text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            No tokens found in this wallet
          </div>
        ) : (
          allTokens.map((token, i) => {
            const pct = total > 0 ? (token.usdValue / total) * 100 : 0;
            return (
              <div
                key={token.mint}
                style={{
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  borderBottom: i < allTokens.length - 1 ? "1px solid var(--color-border)" : "none",
                  transition: "background var(--transition-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Token icon */}
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "var(--radius-full)",
                    background: token.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--text-xs)",
                    fontWeight: 700,
                    color: "#fff",
                    flexShrink: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {token.symbol.slice(0, 2)}
                </div>

                {/* Name + allocation bar */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                    <span
                      style={{
                        fontSize: "var(--text-sm)",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {token.symbol}
                    </span>
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-xs)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {token.name}
                    </span>
                  </div>
                  {/* Allocation bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        flex: 1,
                        height: "3px",
                        background: "var(--color-overlay)",
                        borderRadius: "var(--radius-full)",
                        maxWidth: "96px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: token.color,
                          borderRadius: "var(--radius-full)",
                          transition: "width 500ms ease",
                        }}
                      />
                    </div>
                    <span style={{ color: "var(--color-text-muted)", fontSize: 10 }}>
                      {pct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Balance + USD value */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text-primary)" }}>
                    {token.usdValue > 0 ? formatUSD(token.usdValue) : "—"}
                  </p>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", marginTop: "2px" }}>
                    {formatNumber(token.amount)} {token.symbol}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
