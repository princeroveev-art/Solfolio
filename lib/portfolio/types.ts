import { GrindScoreData } from "@/lib/grindScore";
import { AgentReport } from "@/lib/agentEngine";

export interface QuoteMeta {
  source: string;
  fetchedAt: string;
  isFallback: boolean;
}

export interface TokenAccount {
  mint: string;
  amount: number;
  decimals: number;
  address: string;
}

export interface EnrichedToken extends TokenAccount {
  name: string;
  symbol: string;
  price: number;
  color: string;
  usdValue: number;
}

export interface PortfolioTransaction {
  signature: string;
  slot: number;
  blockTime: number | null | undefined;
  err: unknown;
  memo: string | null | undefined;
}

export interface PortfolioSnapshot {
  solBalance: number;
  solPrice: number;
  quoteMeta: QuoteMeta;
  tokens: EnrichedToken[];
  transactions: PortfolioTransaction[];
}

export interface PortfolioAnalytics {
  totalUSD: number;
  grindScore: GrindScoreData | null;
  agentReport: AgentReport;
}
