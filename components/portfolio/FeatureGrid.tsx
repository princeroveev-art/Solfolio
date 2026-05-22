"use client";

// Lucide-style inline SVG icons — no emoji anywhere
function CoinsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

const features = [
  {
    Icon: CoinsIcon,
    title: "Token Portfolio",
    description: "Real-time token balances, USD values, and P&L tracking across all your Solana holdings.",
    tag: "Live",
    tagType: "brand",
  },
  {
    Icon: ImageIcon,
    title: "NFT Gallery",
    description: "Visualize your NFT collection with rarity rankings, floor prices, and estimated value.",
    tag: "Live",
    tagType: "brand",
  },
  {
    Icon: BrainIcon,
    title: "AI Summarizer",
    description: "Our AI reads your on-chain activity and tells you your story — DeFi moves, degen plays, diamond hands.",
    tag: "AI",
    tagType: "accent",
  },
  {
    Icon: ZapIcon,
    title: "Grind Score",
    description: "A reputation metric built from your on-chain behavior — trading volume, holding time, protocol diversity.",
    tag: "AI",
    tagType: "accent",
  },
  {
    Icon: ActivityIcon,
    title: "Activity Feed",
    description: "Parsed transaction history showing swaps, staking, mints, and key wallet events.",
    tag: "Live",
    tagType: "brand",
  },
  {
    Icon: TrendIcon,
    title: "Portfolio Insights",
    description: "AI-powered recommendations based on your current holdings and market conditions.",
    tag: "Soon",
    tagType: "muted",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <span className="tag" style={{ marginBottom: "16px", display: "inline-flex" }}>
            What Solfolio does
          </span>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2rem, 4vw, 2.6rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginTop: "12px",
              marginBottom: "12px",
            }}
          >
            Everything about your{" "}
            <span className="gradient-text">on-chain life</span>
          </h2>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "520px", margin: "0 auto", fontSize: "1.05rem", lineHeight: 1.7 }}>
            One platform. Full picture. AI that actually understands Solana.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12">
          {features.map((f) => {
            const tagClass = f.tagType === "brand" ? "pill pill-live" : f.tagType === "accent" ? "pill pill-ai" : "pill pill-soon";
            return (
              <div
                key={f.title}
                className="card p-7"
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  cursor: "default",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  {/* Icon container — clearly distinct surface */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--radius-sm)",
                      background: "linear-gradient(150deg, rgba(139,92,246,0.16), rgba(59,130,246,0.12))",
                      border: "1px solid rgba(139,92,246,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-brand)",
                      flexShrink: 0,
                    }}
                  >
                    <f.Icon />
                  </div>
                  <span className={tagClass}>{f.tag}</span>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "8px", lineHeight: 1.65 }}>
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function StatsBar() {
  const stats = [
    { label: "Active Users", value: "12,840" },
    { label: "Wallets Analyzed", value: "89,200" },
    { label: "NFTs Tracked", value: "890K+" },
    { label: "AI Analyses Run", value: "45K+" },
  ];

  return (
    <section style={{ padding: "54px 0", background: "rgba(15,17,38,0.48)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div
              style={{
                padding: "18px 8px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.03em",
                  marginBottom: "4px",
                }}
              >
                <span className="stat-number">{stat.value}</span>
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </p>
            </div>
            {i < stats.length - 1 && <span style={{ width: "1px", height: "40px", background: "var(--border)" }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
