import { generateAgentReport, PortfolioAsset } from "@/lib/agentEngine";
import { calculateGrindScore } from "@/lib/grindScore";
import { PortfolioAnalytics, PortfolioSnapshot } from "@/lib/portfolio/types";

export function computePortfolioAnalytics(snapshot: PortfolioSnapshot): PortfolioAnalytics {
  const { solBalance, solPrice, tokens, transactions } = snapshot;
  const totalUSD = solBalance * solPrice + tokens.reduce((s, t) => s + t.usdValue, 0);

  const grindScore = calculateGrindScore({
    solBalance,
    tokenCount: tokens.length,
    txCount: transactions.length * 10,
  });

  const allAssets: PortfolioAsset[] = [
    { symbol: "SOL", usdValue: solBalance * solPrice, allocationPct: 0, volatilityBand: "medium" },
    ...tokens.map((t) => ({
      symbol: t.symbol,
      usdValue: t.usdValue,
      allocationPct: 0,
      volatilityBand: t.symbol === "USDC" || t.symbol === "USDT" ? ("low" as const) : ("high" as const),
    })),
  ];

  const total = allAssets.reduce((sum, a) => sum + a.usdValue, 0);
  const normalized = allAssets.map((a) => ({ ...a, allocationPct: total > 0 ? (a.usdValue / total) * 100 : 0 }));
  const agentReport = generateAgentReport(normalized, transactions.length);

  return { totalUSD, grindScore, agentReport };
}
