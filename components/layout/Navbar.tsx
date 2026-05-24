"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/wallet/WalletButton";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Portfolio" },
  { href: "/wallet", label: "Wallet" },
  { href: "/ai", label: "AI Agent" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4">
      <div className="glass border rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Image src="/solfoliologo.png" alt="Solfolio" width={110} height={30} priority />
          <p className="text-xs tracking-[0.2em] uppercase text-white/65 hidden md:block">Solfolio Command</p>
        </div>
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="top-nav-link" data-active={pathname === link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <WalletButton variant="ghost" />
      </div>
    </header>
  );
}
