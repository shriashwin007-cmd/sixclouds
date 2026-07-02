"use client";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book", href: "#book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        {/* Logo */}
        <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span className="pixel" style={{ fontSize: "0.75rem", color: "#FFD700", letterSpacing: "0.04em" }}>
            6CLOUDS
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              style={{
                textDecoration: "none", color: "rgba(240,240,240,0.75)",
                fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem",
                letterSpacing: "0.08em", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD700")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,240,240,0.75)")}
            >
              {l.label}
            </a>
          ))}
          <a href="#book" className="pixel-btn" style={{ fontSize: "0.5rem", padding: "10px 20px" }}>
            Book Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{
            display: "none", background: "none", border: "none",
            cursor: "pointer", color: "#FFD700", fontSize: "1.4rem",
          }}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          background: "rgba(5,5,5,0.98)", borderTop: "1px solid rgba(255,215,0,0.15)",
          padding: "24px 20px", display: "flex", flexDirection: "column", gap: 20,
        }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: "none", color: "rgba(240,240,240,0.85)",
                fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem",
                letterSpacing: "0.1em",
              }}
            >
              &gt; {l.label}
            </a>
          ))}
          <a href="#book" className="pixel-btn" style={{ fontSize: "0.5rem", textAlign: "center" }} onClick={() => setOpen(false)}>
            Book Now
          </a>
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
