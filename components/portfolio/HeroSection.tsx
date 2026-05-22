"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { WalletButton } from "@/components/wallet/WalletButton";
import { useEffect, useState } from "react";

const TYPED_WORDS = ["Identity.", "Portfolio.", "Reputation.", "Legacy."];

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ZapIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CpuIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function LinkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function TrendUpIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function HeroSection() {
  const { connected } = useWallet();
  const router = useRouter();
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  // REMOVED: auto-redirect when connected

  useEffect(() => {
    const word = TYPED_WORDS[wordIdx];
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setWordIdx((i) => (i + 1) % TYPED_WORDS.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIdx]);

  return (
    <section className="hero-bg relative min-h-screen flex items-center pt-24 pb-16 z-[1]" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-16%", left: "50%", transform: "translateX(-50%)", width: "900px", height: "620px", background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 68%)", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div className="space-y-7 animate-fade-up">
            <div className="flex items-center gap-2">
              <span className="tag"><ZapIcon />Live on Solana</span>
              <span className="tag-accent"><CpuIcon />AI-Powered</span>
            </div>

            <h1 style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.8rem, 7vw, 4.4rem)", fontWeight: 800, lineHeight: 1.03, letterSpacing: "-0.03em", color: "var(--color-text-primary)", textAlign: "left" }}>
              Your On-Chain <br />
              <span className="gradient-text">
                {displayed}
                <span style={{ display: "inline-block", width: "2px", height: "0.85em", background: "var(--color-brand)", marginLeft: "2px", verticalAlign: "middle", animation: "pulse 1s ease-in-out infinite" }} />
              </span>
            </h1>

            <p style={{ color: "var(--color-text-secondary)", fontSize: "1.08rem", lineHeight: 1.72, maxWidth: "560px", marginTop: "8px", textAlign: "left" }}>
              Connect your Solana wallet and instantly see your token holdings, NFTs, DeFi positions, and AI-powered reputation score — all in one sleek dashboard.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-7">
              {connected ? (
                <button className="btn-primary" onClick={() => router.push("/dashboard")}>
                  Go to Dashboard →
                </button>
              ) : (
                <WalletButton variant="primary" />
              )}
              <button className="btn-ghost" style={{ background: "rgba(255,255,255,0.02)" }}><PlayIcon />Live Product Tour</button>
            </div>

            <div className="flex items-center gap-6 mt-4">
              {[
                { label: "Wallets Tracked", value: "12K+" },
                { label: "NFTs Indexed", value: "890K+" },
                { label: "AI Analyses", value: "45K+" },
              ].map((stat) => (
                <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <p style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "var(--text-lg)", color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>{stat.value}</p>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="relative">
              <div style={{ position: "absolute", inset: "-24px", background: "radial-gradient(ellipse, rgba(96,165,250,0.12) 0%, transparent 70%)", pointerEvents: "none", borderRadius: "var(--radius-2xl)" }} />
              <div className="card" style={{ position: "relative", padding: "22px", borderRadius: "var(--radius-2xl)", background: "linear-gradient(165deg, rgba(13,16,40,0.92), rgba(10,12,30,0.94))", border: "1px solid rgba(125,117,255,0.35)", boxShadow: "var(--shadow-lg)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-full)", background: "linear-gradient(135deg, var(--color-brand), hsl(210, 80%, 60%))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: "var(--text-sm)", color: "hsl(230, 40%, 6%)" }}>GM</div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--text-primary)" }}>gm.sol</p>
                      <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", fontFamily: "monospace" }}>8xK3...f9Qm</p>
                    </div>
                  </div>
                  <span className="tag">Grind: 94</span>
                </div>

                <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))", border: "1px solid rgba(139,92,246,0.34)", borderRadius: "var(--radius-md)", padding: "20px", textAlign: "center", marginBottom: "16px" }}>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", marginBottom: "4px" }}>Total Portfolio Value</p>
                  <p style={{ fontFamily: "var(--font-syne)", fontSize: "var(--text-3xl)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em" }}>$24,830</p>
                  <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", color: "var(--color-success)", fontSize: "var(--text-sm)", marginTop: "4px" }}>
                    <TrendUpIcon />+12.4% this week
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {[
                    { symbol: "SOL", name: "Solana", amount: "84.2", value: "$14,500", change: "+8.2%", pos: true, color: "#9945FF" },
                    { symbol: "JUP", name: "Jupiter", amount: "2,840", value: "$5,100", change: "+4.1%", pos: true, color: "#1DC18A" },
                    { symbol: "BONK", name: "Bonk", amount: "42M", value: "$3,200", change: "-2.3%", pos: false, color: "#F7931A" },
                  ].map((token) => (
                    <div key={token.symbol} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", transition: "all var(--transition-fast)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(126, 152, 255, 0.3)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.01)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "var(--radius-full)", background: token.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--text-xs)", fontWeight: 700, color: "#fff" }}>{token.symbol[0]}</div>
                        <div>
                          <p style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>{token.symbol}</p>
                          <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{token.amount}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "var(--text-sm)", fontWeight: 600 }}>{token.value}</p>
                        <p style={{ fontSize: "var(--text-xs)", color: token.pos ? "var(--color-success)" : "var(--color-danger)" }}>{token.change}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", paddingTop: "12px", marginTop: "10px", borderTop: "1px solid var(--color-border)" }}>
                  {["Claynosaurz", "Mad Lads", "Tensor"].map((name, i) => (
                    <div key={name} style={{ borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)", background: "linear-gradient(140deg, rgba(139,92,246,0.14), rgba(59,130,246,0.08))", padding: "8px 6px" }}>
                      <div style={{ height: "24px", borderRadius: "7px", background: i % 2 === 0 ? "rgba(139,92,246,0.35)" : "rgba(59,130,246,0.35)", marginBottom: "6px" }} />
                      <p style={{ fontSize: "10px", color: "var(--color-text-secondary)", textAlign: "center" }}>{name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-float" style={{ position: "absolute", top: "-14px", right: "-14px", background: "var(--color-surface)", border: "1px solid hsl(290, 50%, 28%)", borderRadius: "var(--radius-md)", padding: "7px 12px", fontSize: "var(--text-xs)", fontWeight: 600, color: "hsl(290, 70%, 72%)", display: "flex", alignItems: "center", gap: "5px", boxShadow: "var(--shadow-sm)" }}>
                <CpuIcon />AI analysis ready
              </div>
              <div style={{ position: "absolute", bottom: "-14px", left: "-14px", background: "var(--color-surface)", border: "1px solid var(--color-border-brand)", borderRadius: "var(--radius-md)", padding: "7px 12px", fontSize: "var(--text-xs)", fontWeight: 600, color: "hsl(173, 70%, 58%)", display: "flex", alignItems: "center", gap: "5px", boxShadow: "var(--shadow-sm)" }}>
                <LinkIcon />Live on-chain data
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
