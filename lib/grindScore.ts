// Grind Score = a reputation/engagement metric computed from on-chain behavior.
// Think of it as your "on-chain credit score" for the Solana ecosystem.

export interface GrindScoreData {
  score: number;          // 0-100
  tier: string;           // "Degen" | "Builder" | "Diamond" | "OG" | "Whale"
  color: string;
  breakdown: {
    label: string;
    score: number;
    weight: number;
    description: string;
  }[];
  badges: string[];
}

export function calculateGrindScore(params: {
  solBalance: number;
  tokenCount: number;
  txCount: number;
  walletAgeMonths?: number;
}): GrindScoreData {
  const { solBalance, tokenCount, txCount, walletAgeMonths = 6 } = params;

  // Weighted scoring components
  const balanceScore = Math.min(30, (solBalance / 100) * 30);
  const diversityScore = Math.min(25, (tokenCount / 10) * 25);
  const activityScore = Math.min(25, (txCount / 100) * 25);
  const ageScore = Math.min(20, (walletAgeMonths / 24) * 20);

  const total = Math.round(balanceScore + diversityScore + activityScore + ageScore);

  const tier =
    total >= 90 ? "OG Legend" :
    total >= 75 ? "Diamond Hands" :
    total >= 55 ? "Solana Builder" :
    total >= 35 ? "Active Degen" :
    "Solana Newbie";

  const color =
    total >= 90 ? "#f59e0b" :
    total >= 75 ? "#06b6d4" :
    total >= 55 ? "#14b8a6" :
    total >= 35 ? "#d946ef" :
    "#6366f1";

  const badges: string[] = [];
  if (solBalance > 10) badges.push("💎 Diamond Hands");
  if (tokenCount > 5) badges.push("🌊 DeFi Diver");
  if (txCount > 50) badges.push("⚡ Active Trader");
  if (walletAgeMonths > 12) badges.push("🏛️ Solana OG");
  if (solBalance > 100) badges.push("🐋 Whale Alert");

  return {
    score: total,
    tier,
    color,
    breakdown: [
      {
        label: "Portfolio Value",
        score: Math.round(balanceScore),
        weight: 30,
        description: "SOL balance & asset value",
      },
      {
        label: "Token Diversity",
        score: Math.round(diversityScore),
        weight: 25,
        description: "Breadth of token holdings",
      },
      {
        label: "On-chain Activity",
        score: Math.round(activityScore),
        weight: 25,
        description: "Transaction frequency",
      },
      {
        label: "Wallet Age",
        score: Math.round(ageScore),
        weight: 20,
        description: "Time in the ecosystem",
      },
    ],
    badges,
  };
}
