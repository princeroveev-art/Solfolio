"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function Navbar() {
  const pathname = usePathname();
  const { connected, publicKey, disconnect } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between glass border-b" style={{ borderColor: "var(--color-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
            <Image
              src="/solfoliologo.png"
              alt="Solfolio Logo"
              width={180}
              height={50}
              priority
              style={{
                width: "180px",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 0 8px rgba(124,58,237,0.4))",
              }}
            />
          </Link>

          {connected && publicKey && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "var(--color-brand-light)", border: "1px solid var(--color-border-brand)" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-brand)", display: "inline-block", boxShadow: "0 0 6px rgba(20,184,166,0.7)" }} />
              <span style={{ fontSize: "var(--text-xs)", fontFamily: "monospace", color: "var(--color-brand)" }}>
                {shortenAddress(publicKey.toBase58())}
              </span>
              <button className="btn-primary" onClick={disconnect} style={{ fontSize: "var(--text-xs)", color: "var(--text-primary)", padding: "6px 12px", marginLeft: "4px" }}>✕</button>
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ padding: "6px 14px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-sm)", fontWeight: 500, textDecoration: "none", color: pathname === link.href ? "var(--text-primary)" : "var(--text-muted)", background: pathname === link.href ? "var(--color-brand-light)" : "transparent", border: `1px solid ${pathname === link.href ? "var(--color-border-brand)" : "transparent"}` }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ padding: "8px", borderRadius: "var(--radius-sm)", background: "var(--color-overlay)", border: "1px solid var(--color-border)", color: "var(--color-text-secondary)", cursor: "pointer" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {menuOpen ? (<><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>) : (<><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></>)}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="mx-4 mt-2 p-3 glass" style={{ borderRadius: "var(--radius-lg)" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 14px", borderRadius: "var(--radius-sm)", fontSize: "var(--text-sm)", fontWeight: 500, textDecoration: "none", color: pathname === link.href ? "var(--text-primary)" : "var(--text-muted)", background: pathname === link.href ? "var(--color-brand-light)" : "transparent" }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
