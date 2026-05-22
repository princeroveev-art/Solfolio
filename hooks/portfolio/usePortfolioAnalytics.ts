"use client";

import { useMemo } from "react";
import { computePortfolioAnalytics } from "@/lib/portfolio/analytics";
import { EnrichedToken, PortfolioTransaction, QuoteMeta } from "@/lib/portfolio/types";

export function usePortfolioAnalytics(
  solBalance: number,
  solPrice: number,
  quoteMeta: QuoteMeta,
  tokens: EnrichedToken[],
  transactions: PortfolioTransaction[]
) {
  return useMemo(
    () => computePortfolioAnalytics({ solBalance, solPrice, quoteMeta, tokens, transactions }),
    [solBalance, solPrice, quoteMeta, tokens, transactions]
  );
}
