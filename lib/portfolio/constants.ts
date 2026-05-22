export const FALLBACK_SOL_PRICE = 172.4;

export const KNOWN_TOKENS: Record<string, { name: string; symbol: string; fallbackPrice: number; color: string; coingeckoId?: string }> = {
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": { name: "USD Coin", symbol: "USDC", fallbackPrice: 1.0, color: "#2775CA", coingeckoId: "usd-coin" },
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": { name: "Tether", symbol: "USDT", fallbackPrice: 1.0, color: "#26A17B", coingeckoId: "tether" },
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": { name: "Jupiter", symbol: "JUP", fallbackPrice: 1.82, color: "#1DC18A", coingeckoId: "jupiter-exchange-solana" },
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": { name: "Bonk", symbol: "BONK", fallbackPrice: 0.000024, color: "#F7931A", coingeckoId: "bonk" },
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm": { name: "dogwifhat", symbol: "WIF", fallbackPrice: 2.14, color: "#F4B4C8", coingeckoId: "dogwifcoin" },
};
