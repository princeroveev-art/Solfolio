import { AppShell } from "@/components/layout/AppShell";

const portfolioModules = [
  ["Allocation View", "Asset distribution, concentration tracking, and liquidity posture at a glance."],
  ["Performance Lens", "Day/week/month changes, realized versus unrealized signals, and volatility bands."],
  ["Risk Controls", "Exposure guardrails, anomaly tags, and tactical rebalance triggers."],
  ["Protocol Exposure", "Track DeFi, staking, NFT, infra, and AI-linked Solana ecosystem buckets."],
];

export default function PortfolioPage() {
  return (
    <AppShell>
      <div className="sf-main-grid">
        <section className="sf-panel xl:col-span-12">
          <p className="sf-kicker">Portfolio</p>
          <h1>Portfolio Intelligence Workspace</h1>
          <p className="sf-sub">Dedicated portfolio surface aligned to the same Solfolio shell and operator navigation system.</p>
        </section>
        {portfolioModules.map(([title, detail]) => (
          <section key={title} className="sf-panel xl:col-span-6">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-white/75 mt-3">{detail}</p>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
