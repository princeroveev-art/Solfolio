import { AppShell } from "@/components/layout/AppShell";

const intelCards = [
  { title: "Trending Solana Projects", detail: "Jupiter routing ecosystem integrations and DePIN infra names showing sustained social velocity.", label: "Demo signal" },
  { title: "Whale / Wallet Activity", detail: "Clustered accumulation in mid-cap Solana AI and infra tokens seen across tracked public wallets.", label: "Demo signal" },
  { title: "Token Momentum", detail: "Rotation favors high-liquidity governance names while memecoin momentum cools intraday.", label: "Demo signal" },
  { title: "NFT + Protocol Trends", detail: "Compressed NFT tooling and creator utility layers are gaining protocol partnership mentions.", label: "Demo signal" },
  { title: "New Launches", detail: "Watch launch calendars for staking derivatives, AI co-pilots, and payments infrastructure products.", label: "Demo signal" },
  { title: "AI Summary", detail: "Market posture: constructive-but-selective. Favor liquid setups, monitor funding, and track validator news.", label: "AI summary" },
];

export default function IntelPage() {
  return (
    <AppShell>
      <div className="sf-main-grid">
        <section className="sf-panel xl:col-span-12">
          <p className="sf-kicker">Solfolio Intel</p>
          <h1>Solana Ecosystem Intelligence Surface</h1>
          <p className="sf-sub">Research cards for trends, wallets, token momentum, NFTs, protocol shifts, and upcoming launches. Clearly marked static demo data where live feeds are unavailable.</p>
        </section>
        {intelCards.map((card) => (
          <article key={card.title} className="sf-panel xl:col-span-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <span className="trend-badge">{card.label}</span>
            </div>
            <p className="text-sm text-white/75 mt-3">{card.detail}</p>
            <p className="text-xs text-white/50 mt-4">Static demo data for UX preview. Integrate live sources for production deployment.</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
