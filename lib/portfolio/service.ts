import { Connection, PublicKey } from "@solana/web3.js";
import { getRecentTransactions, getSolBalance, getTokenAccounts } from "@/lib/solana";
import { KNOWN_TOKENS } from "@/lib/portfolio/constants";
import { EnrichedToken, PortfolioSnapshot } from "@/lib/portfolio/types";
import { fetchLiveQuotes } from "@/lib/portfolio/quotes";

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

async function withRetry<T>(task: () => Promise<T>, label: string, retries = 2): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await task();
    } catch (err) {
      lastErr = err;
      if (attempt < retries) await sleep(300 * 2 ** attempt);
    }
  }
  throw new Error(`${label} failed after retries: ${lastErr instanceof Error ? lastErr.message : "Unknown error"}`);
}

export async function fetchPortfolioSnapshot(publicKey: PublicKey, connection: Connection): Promise<PortfolioSnapshot> {
  const [{ solPrice, tokenPrices, quoteMeta }, solBalance, tokenAccounts, transactions] = await Promise.all([
    fetchLiveQuotes(),
    withRetry(() => getSolBalance(publicKey, connection), "SOL balance"),
    withRetry(() => getTokenAccounts(publicKey, connection), "Token accounts"),
    withRetry(() => getRecentTransactions(publicKey, 8, connection), "Recent transactions"),
  ]);

  const tokens: EnrichedToken[] = tokenAccounts
    .map((t) => {
      const meta = KNOWN_TOKENS[t.mint];
      const price = tokenPrices[t.mint] ?? 0;
      return {
        ...t,
        name: meta?.name || "Unknown Token",
        symbol: meta?.symbol || t.mint.slice(0, 4),
        price,
        color: meta?.color || "#6366f1",
        usdValue: t.amount * price,
      };
    })
    .sort((a, b) => b.usdValue - a.usdValue);

  return { solBalance, solPrice, quoteMeta, tokens, transactions };
}
