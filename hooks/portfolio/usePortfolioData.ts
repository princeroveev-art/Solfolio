"use client";

import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import { fetchPortfolioSnapshot } from "@/lib/portfolio/service";
import { PortfolioSnapshot } from "@/lib/portfolio/types";
import { FALLBACK_SOL_PRICE } from "@/lib/portfolio/constants";

const EMPTY_SNAPSHOT: PortfolioSnapshot = {
  solBalance: 0,
  solPrice: FALLBACK_SOL_PRICE,
  quoteMeta: { source: "Fallback static quotes", fetchedAt: new Date(0).toISOString(), isFallback: true },
  tokens: [],
  transactions: [],
};

export function usePortfolioData(publicKey: PublicKey | null, connected: boolean, connection: Connection) {
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot>(EMPTY_SNAPSHOT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connected) {
      setSnapshot(EMPTY_SNAPSHOT);
      setLoading(false);
      setError(null);
      return;
    }
    if (!publicKey) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const nextSnapshot = await fetchPortfolioSnapshot(publicKey, connection);
        setSnapshot(nextSnapshot);
      } catch (err) {
        console.error(err);
        setError("Unable to sync wallet data right now. Please retry in a moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [publicKey, connected, connection]);

  return { ...snapshot, loading, error };
}
