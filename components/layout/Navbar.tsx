"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "@/components/wallet/WalletButton";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="mx-4 mt-4 rounded-2xl px-6 py-3.5 flex items-center justify-between glass"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: "none" }}>
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              background: "var(--color-brand)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "0 0 16px rgba(20,184,166,0.35)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L13 5.5V10.5L8 14L3 10.5V5.5L8 2Z" fill="hsl(230, 40%, 6%)" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "var(--text-md)",
              letterSpacing: "-0.01em",
              color: "var(--color-text-primary)",
            }}
          >
            Sol<span style={{ color: "var(--color-brand)" }}>folio</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                textDecoration: "none",
                color: pathname === link.href ? "hsl(173, 70%, 58%)" : "var(--color-text-secondary)",
                background: pathname === link.href ? "var(--color-brand-light)" : "transparent",
                border: `1px solid ${pathname === link.href ? "var(--color-border-brand)" : "transparent"}`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Wallet + mobile menu */}
        <div className="flex items-center gap-3">
          <WalletButton />
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              padding: "8px",
              borderRadius: "var(--radius-sm)",
              background: "var(--color-overlay)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mx-4 mt-2 p-3 glass"
          style={{ borderRadius: "var(--radius-lg)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                textDecoration: "none",
                color: pathname === link.href ? "hsl(173, 70%, 58%)" : "var(--color-text-secondary)",
                background: pathname === link.href ? "var(--color-brand-light)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
