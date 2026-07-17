"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Add-Ons", href: "#add-ons" },
  { label: "Book", href: "#book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      transition: "background 0.3s, border-color 0.3s",
      background: scrolled ? "rgba(5,5,5,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,215,0,0.15)" : "1px solid transparent",
    }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="#home" style={{ textDecoration: "none" }}>
          <span className="pixel" style={{ fontSize: "0.75rem", color: "#FFD700", letterSpacing: "0.04em" }}>LEVELUP GAMING</span>
        </a>

        <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" style={{ textDecoration: "none", color: "rgba(240,240,240,0.75)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.78rem", letterSpacing: "0.08em", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD700")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,240,240,0.75)")}
            >
              {l.label}
            </a>
          ))}
          <button onClick={openCart} aria-label="Cart" style={{
            position: "relative", width: 40, height: 40,
            border: "1px solid rgba(255,215,0,0.25)", background: "rgba(255,215,0,0.06)",
            color: "#F0F0F0", fontSize: "1.1rem", cursor: "pointer", display: "grid", placeItems: "center",
          }}>
            🛒
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 999, background: "#FFD700", color: "#050505", fontSize: "0.55rem", fontFamily: "'Press Start 2P', monospace", fontWeight: 800, display: "grid", placeItems: "center", padding: "0 3px" }}>{totalItems}</span>
            )}
          </button>
          <a href="#book" className="pixel-btn" style={{ fontSize: "0.48rem", padding: "10px 18px" }}>Book Now</a>
        </nav>

        <button onClick={() => setOpen(!open)} className="mobile-menu-btn" style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#FFD700", fontSize: "1.4rem" }} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div style={{ background: "rgba(5,5,5,0.98)", borderTop: "1px solid rgba(255,215,0,0.12)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ textDecoration: "none", color: "rgba(240,240,240,0.85)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.82rem", letterSpacing: "0.1em" }}>
              &gt; {l.label}
            </a>
          ))}
          <a href="#book" className="pixel-btn" style={{ fontSize: "0.48rem", textAlign: "center" }} onClick={() => setOpen(false)}>Book Now</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
