"use client";

import { formatDistanceToNow } from "@/lib/utils";

interface Transaction {
  signature: string;
  slot: number;
  blockTime: number | null | undefined;
  err: unknown;
  memo: string | null | undefined;
}

interface ActivityFeedProps {
  transactions: Transaction[];
  loading: boolean;
}

// SVG icons per tx type — no emoji
function TxSuccessIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function TxFailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

function TxMemoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function ActivityFeed({ transactions, loading }: ActivityFeedProps) {
  const getLabel = (tx: Transaction) => {
    if (tx.err)  return { label: "Failed Transaction", Icon: TxFailIcon,    color: "var(--color-danger)" };
    if (tx.memo) return { label: "Memo Transaction",   Icon: TxMemoIcon,    color: "hsl(245, 70%, 65%)" };
    return            { label: "Transaction",          Icon: TxSuccessIcon, color: "var(--color-brand)" };
  };

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
          Recent Activity
        </span>
        <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>Last 8 txns</span>
      </div>

      <div>
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              style={{
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div className="skeleton" style={{ width: 32, height: 32, flexShrink: 0 }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div className="skeleton" style={{ height: 11, width: "40%" }} />
                <div className="skeleton" style={{ height: 9, width: "28%" }} />
              </div>
              <div className="skeleton" style={{ height: 9, width: 48 }} />
            </div>
          ))
        ) : transactions.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "var(--color-text-muted)",
              fontSize: "var(--text-sm)",
            }}
          >
            No recent transactions
          </div>
        ) : (
          transactions.map((tx, i) => {
            const { label, Icon, color } = getLabel(tx);
            const timeAgo = tx.blockTime ? formatDistanceToNow(tx.blockTime * 1000) : "Unknown";

            return (
              <div
                key={tx.signature}
                style={{
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderBottom: i < transactions.length - 1 ? "1px solid var(--color-border)" : "none",
                  transition: "background var(--transition-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Icon dot */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `color-mix(in srgb, ${color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
                    color,
                    flexShrink: 0,
                  }}
                >
                  <Icon />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text-primary)" }}>
                    {label}
                  </p>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "var(--text-xs)",
                      fontFamily: "monospace",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tx.signature.slice(0, 22)}...
                  </p>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", marginBottom: "3px" }}>
                    {timeAgo}
                  </p>
                  <a
                    href={`https://solscan.io/tx/${tx.signature}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "3px",
                      color: "var(--color-brand)",
                      fontSize: "var(--text-xs)",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    View <ExternalIcon />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
