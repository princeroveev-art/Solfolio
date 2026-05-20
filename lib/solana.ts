import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com";

export const connection = new Connection(RPC_URL, "confirmed");

export async function getSolBalance(publicKey: PublicKey): Promise<number> {
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
}

export async function getTokenAccounts(publicKey: PublicKey) {
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    publicKey,
    { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
  );

  return tokenAccounts.value
    .map((account) => {
      const info = account.account.data.parsed.info;
      return {
        mint: info.mint as string,
        amount: Number(info.tokenAmount.uiAmount || 0),
        decimals: info.tokenAmount.decimals as number,
        address: account.pubkey.toBase58(),
      };
    })
    .filter((t) => t.amount > 0);
}

export async function getRecentTransactions(publicKey: PublicKey, limit = 10) {
  const signatures = await connection.getSignaturesForAddress(publicKey, {
    limit,
  });

  return signatures.map((sig) => ({
    signature: sig.signature,
    slot: sig.slot,
    blockTime: sig.blockTime,
    err: sig.err,
    memo: sig.memo,
  }));
}

// Mock token price lookup - in production, use Jupiter or Birdeye API
export async function getMockTokenPrices(): Promise<Record<string, number>> {
  return {
    SOL: 172.4,
    USDC: 1.0,
    USDT: 1.0,
    JUP: 1.82,
    BONK: 0.000024,
    WIF: 2.14,
    PYTH: 0.38,
    JTO: 2.95,
    ORCA: 3.12,
    RAY: 2.87,
  };
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
}
