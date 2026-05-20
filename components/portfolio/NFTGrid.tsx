"use client";

const MOCK_NFTS = [
  { id: 1, name: "Claynosaurz #2841", collection: "Claynosaurz", rarity: "Rare",     color: "hsl(0, 65%, 60%)" },
  { id: 2, name: "Mad Lads #4401",    collection: "Mad Lads",    rarity: "Uncommon", color: "hsl(173, 65%, 45%)" },
  { id: 3, name: "Tensorian #991",    collection: "Tensorians",  rarity: "Epic",     color: "hsl(245, 65%, 62%)" },
  { id: 4, name: "SMB #3302",         collection: "SMB Gen2",    rarity: "Common",   color: "hsl(210, 55%, 55%)" },
];

const rarityColor: Record<string, string> = {
  Common:   "var(--color-text-muted)",
  Uncommon: "var(--color-brand)",
  Rare:     "hsl(210, 80%, 65%)",
  Epic:     "hsl(290, 70%, 68%)",
};

// SVG placeholder art per NFT — geometric, no emoji
function NFTArt({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect width="80" height="80" fill={`color-mix(in srgb, ${color} 10%, transparent)`} />
      <circle cx="40" cy="34" r="16" fill={`color-mix(in srgb, ${color} 30%, transparent)`} stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M24 58 Q40 46 56 58" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
    </svg>
  );
}

interface NFTGridProps {
  loading: boolean;
}

export function NFTGrid({ loading }: NFTGridProps) {
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "var(--text-sm)",
              color: "var(--color-text-primary)",
            }}
          >
            NFT Collection
          </span>
        </div>
        <span className="tag-muted">Mock data</span>
      </div>

      <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="skeleton"
                style={{ aspectRatio: "1", borderRadius: "var(--radius-md)" }}
              />
            ))
          : MOCK_NFTS.map((nft) => (
              <div
                key={nft.id}
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  background: "var(--color-overlay)",
                  border: "1px solid var(--color-border)",
                  cursor: "pointer",
                  transition: "border-color var(--transition-base), box-shadow var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border-strong)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Art area */}
                <div style={{ aspectRatio: "1" }}>
                  <NFTArt color={nft.color} />
                </div>

                {/* Info */}
                <div style={{ padding: "8px 10px" }}>
                  <p
                    style={{
                      fontSize: "var(--text-xs)",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {nft.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "3px" }}>
                    <p
                      style={{
                        fontSize: 10,
                        color: "var(--color-text-muted)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "60%",
                      }}
                    >
                      {nft.collection}
                    </p>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: rarityColor[nft.rarity] || "var(--color-text-muted)",
                      }}
                    >
                      {nft.rarity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--color-border)",
          textAlign: "center",
        }}
      >
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>
          Live NFT data via Helius API coming soon
        </p>
      </div>
    </div>
  );
}
