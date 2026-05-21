import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

export const connection = RPC_URL ? new Connection(RPC_URL, "confirmed") : null;

function requireConnection(activeConnection?: Connection): Connection {
  if (activeConnection) return activeConnection;
  if (!connection) throw new Error("Missing NEXT_PUBLIC_RPC_URL. Please define it in your environment.");
  return connection;
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown RPC error";
}

export async function getSolBalance(publicKey: PublicKey, activeConnection?: Connection): Promise<number> {
  try {
    const conn = requireConnection(activeConnection);
    const balance = await conn.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    throw new Error(`Failed to fetch SOL balance: ${toErrorMessage(error)}`);
  }
}

export async function getTokenAccounts(publicKey: PublicKey, activeConnection?: Connection) {
  try {
    const conn = requireConnection(activeConnection);
    const tokenAccounts = await conn.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    });

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
  } catch (error) {
    throw new Error(`Failed to fetch token accounts: ${toErrorMessage(error)}`);
  }
}

export async function getRecentTransactions(publicKey: PublicKey, limit = 10, activeConnection?: Connection) {
  try {
    const conn = requireConnection(activeConnection);
    const signatures = await conn.getSignaturesForAddress(publicKey, { limit });

    return signatures.map((sig) => ({
      signature: sig.signature,
      slot: sig.slot,
      blockTime: sig.blockTime,
      err: sig.err,
      memo: sig.memo,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch recent transactions: ${toErrorMessage(error)}`);
  }
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
