"use client";

import { useState } from "react";
import Image from "next/image";
import { WalletButton } from "@/components/wallet/WalletButton";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="sf-shell">
      <div className="sf-bg-glow" />

      <div className="sf-sidebar-desktop">
        <DashboardSidebar />
      </div>

      <div className="sf-content-wrap">
        <header className="sf-topbar glass">
          <button className="sf-menu-btn" type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            ☰
          </button>
          <div className="flex items-center gap-3">
codex/fix-navigation-and-app-consistency
            <Image src="/solfoliologo.png" alt="Solfolio mark" width={36} height={36} className="rounded-md" priority />
            <div className="leading-tight">
              <p className="text-white font-bold text-base">Solfolio</p>
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/60 hidden sm:block">Operator network stable</p>
            </div>
            <Image src="/solfoliologo.png" alt="Solfolio" width={110} height={30} />
            <p className="text-xs uppercase tracking-[0.15em] text-white/65 hidden sm:block">Operator network stable</p>
 main
          </div>
          <WalletButton variant="ghost" />
        </header>

        <section>{children}</section>
      </div>

      {mobileOpen && (
        <div className="sf-drawer-wrap" role="dialog" aria-modal="true">
          <button className="sf-drawer-backdrop" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
          <div className="sf-drawer-panel">
            <DashboardSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
