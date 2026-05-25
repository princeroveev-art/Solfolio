"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/wallet", label: "Wallet" },
  { href: "/ai", label: "AI Agent" },
  { href: "/intel", label: "Intel" },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="dashboard-sidebar glass">
      <div className="sidebar-brand">
        <div className="sidebar-brand-frame">
          <Image src="/solfolio.png" alt="Solfolio" width={196} height={54} priority className="sidebar-brand-logo" />
          <p className="sidebar-brand-tag">Intelligence Terminal</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link key={link.href} href={link.href} className="sidebar-link" data-active={isActive} onClick={onNavigate}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-foot card">
        <p>System status</p>
        <strong>Nominal</strong>
        <span>Cross-surface navigation synchronized</span>
      </div>
    </aside>
  );
}
