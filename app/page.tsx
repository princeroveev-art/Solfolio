import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { FeatureGrid, StatsBar } from "@/components/portfolio/FeatureGrid";

export default function HomePage() {
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatedBackground />
      <Navbar />

      <div style={{ position: "relative", zIndex: 10 }}>
        <HeroSection />
        <StatsBar />
        <FeatureGrid />

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid var(--color-border)",
            padding: "40px 0",
            marginTop: "80px",
          }}
        >
          <div
            className="max-w-7xl mx-auto px-6"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--color-brand)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z" fill="hsl(230, 40%, 6%)" />
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-primary)",
                }}
              >
                Sol<span style={{ color: "var(--color-brand)" }}>folio</span>
              </span>
            </div>

            <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>
              Built on Solana · Powered by AI · Open Source
            </p>

            <div style={{ display: "flex", gap: "20px" }}>
              <a href="https://github.com" style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", textDecoration: "none" }}>GitHub</a>
              <a href="https://twitter.com" style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", textDecoration: "none" }}>Twitter</a>
              <a href="https://discord.com" style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)", textDecoration: "none" }}>Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}