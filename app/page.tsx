import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";

const features = [
  { title: "Operator Cockpit", desc: "Mission-control dashboard for exposure, on-chain behavior, and AI operations." },
  { title: "AI Agent Command", desc: "Get AI summarized research signals and portfolio operator recommendations." },
  { title: "Wallet Control", desc: "Operational actions for connected wallets with clear status and utility tools." },
  { title: "Solana Intel", desc: "Track trending projects, whale activity, token momentum, and launch signals." },
];

export default function HomePage() {
  return (
    <AppShell>
      <section className="relative z-10 mx-auto max-w-7xl px-2 pb-20 pt-4 sm:px-4">
        <div className="landing-hero">
          <p className="text-xs tracking-[0.28em] uppercase text-violet-200/80">Solfolio · Unified Dashboard System</p>
          <h1 className="text-4xl sm:text-6xl font-bold mt-4 leading-tight">One stable premium command center for Solana operators.</h1>
          <p className="mt-5 max-w-3xl text-sm sm:text-base text-white/75 leading-7">
            Home is now part of the same shell as Dashboard, Portfolio, Wallet, AI Agent, and Intel so your navigation stays fixed and predictable.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/dashboard" className="btn-primary">Open Dashboard</Link>
            <Link href="/intel" className="btn-ghost">Open Intel Surface</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-9">
          {features.map((f) => (
            <article key={f.title} className="card p-6">
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="text-sm mt-3 text-white/70 leading-6">{f.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
