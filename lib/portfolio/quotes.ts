import { FALLBACK_SOL_PRICE, KNOWN_TOKENS } from "@/lib/portfolio/constants";
import { QuoteMeta } from "@/lib/portfolio/types";

interface QuotesResult {
  solPrice: number;
  tokenPrices: Record<string, number>;
  quoteMeta: QuoteMeta;
}

function wait(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchWithTimeout(url: string, timeoutMs = 3500): Promise<Response> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal, cache: "no-store" });
  } finally {
    clearTimeout(t);
  }
}

export async function fetchLiveQuotes(): Promise<QuotesResult> {
  const ids = ["solana", ...Object.values(KNOWN_TOKENS).map((t) => t.coingeckoId).filter(Boolean)].join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetchWithTimeout(url, 3500 + attempt * 750);
      if (!res.ok) throw new Error(`Quote API returned ${res.status}`);
      const data = await res.json() as Record<string, { usd?: number }>;

      const tokenPrices: Record<string, number> = {};
      for (const [mint, meta] of Object.entries(KNOWN_TOKENS)) {
        const id = meta.coingeckoId;
        tokenPrices[mint] = id && data[id]?.usd ? data[id].usd : meta.fallbackPrice;
      }

      return {
        solPrice: data.solana?.usd ?? FALLBACK_SOL_PRICE,
        tokenPrices,
        quoteMeta: { source: "CoinGecko", fetchedAt: new Date().toISOString(), isFallback: false },
      };
    } catch (e) {
      lastErr = e;
      if (attempt < 2) await wait(250 * 2 ** attempt);
    }
  }

  console.warn("Quote API unavailable, using fallback quotes", lastErr);
  return {
    solPrice: FALLBACK_SOL_PRICE,
    tokenPrices: Object.fromEntries(Object.entries(KNOWN_TOKENS).map(([mint, m]) => [mint, m.fallbackPrice])),
    quoteMeta: { source: "Fallback static quotes", fetchedAt: new Date().toISOString(), isFallback: true },
  };
}
