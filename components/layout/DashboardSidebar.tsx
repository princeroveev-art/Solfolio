"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/wallet/WalletButton";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard", label: "Wallet" },
  { href: "/dashboard", label: "AI Insights" },
  { href: "/dashboard", label: "Settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar glass">
      <div className="sidebar-brand">
        <Image src="/solfoliologo.png" alt="Solfolio" width={152} height={42} priority />
        <p className="sidebar-subtitle">AI Solana Intelligence</p>
      </div>

      <nav className="sidebar-nav">
        {links.map((link, idx) => (
          <Link key={`${link.label}-${idx}`} href={link.href} className="sidebar-link" data-active={pathname === link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-wallet">
        <p className="sidebar-kicker">Secure Wallet Session</p>
        <WalletButton variant="ghost" />
      </div>
    </aside>
  );
}
