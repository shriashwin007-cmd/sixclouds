"use client";

/*
  Atmosphere — the layer that makes the page feel dense and designed:
  - animated film grain over everything
  - CRT vignette
  - fixed vertical side rails with meta text (desktop)
  - HUD corner labels
*/

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E")`;

export default function Atmosphere() {
  return (
    <>
      {/* film grain — above content, very subtle, animated jitter */}
      <div aria-hidden style={{
        position: "fixed", inset: "-60px", zIndex: 5000, pointerEvents: "none",
        backgroundImage: NOISE_SVG,
        opacity: 0.05,
        animation: "grainJitter 0.42s steps(4) infinite",
        mixBlendMode: "overlay",
      }} />

      {/* CRT vignette */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 4999, pointerEvents: "none",
        background: "radial-gradient(ellipse 85% 78% at 50% 45%, transparent 55%, rgba(0,0,0,0.42) 100%)",
      }} />

      {/* left rail */}
      <div aria-hidden className="atm-rail" style={{
        position: "fixed", left: 14, top: 0, bottom: 0, zIndex: 900,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        alignItems: "center", padding: "90px 0 40px", pointerEvents: "none",
      }}>
        <span className="mono" style={{ writingMode: "vertical-rl", fontSize: "0.58rem", letterSpacing: "0.32em", color: "rgba(255,215,0,0.32)" }}>
          LEVELUP GAMING © 2026 — GAMING CAFE
        </span>
        <div style={{ width: 1, flex: 1, margin: "18px 0", background: "linear-gradient(to bottom, rgba(255,215,0,0.25), transparent)" }} />
        <span className="pixel" style={{ fontSize: "0.5rem", color: "rgba(255,215,0,0.4)", writingMode: "vertical-rl" }}>★★★★★</span>
      </div>

      {/* right rail */}
      <div aria-hidden className="atm-rail" style={{
        position: "fixed", right: 14, top: 0, bottom: 0, zIndex: 900,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        alignItems: "center", padding: "90px 0 40px", pointerEvents: "none",
      }}>
        <span className="mono" style={{ writingMode: "vertical-rl", fontSize: "0.58rem", letterSpacing: "0.32em", color: "rgba(240,240,240,0.22)" }}>
          13.1067° N — 80.2206° E · PERAMBUR
        </span>
        <div style={{ width: 1, flex: 1, margin: "18px 0", background: "linear-gradient(to bottom, transparent, rgba(255,215,0,0.25))" }} />
        <span className="mono" style={{ writingMode: "vertical-rl", fontSize: "0.58rem", letterSpacing: "0.3em", color: "rgba(57,255,20,0.4)" }}>
          PLAYER 1 READY
        </span>
      </div>

      <style>{`
        @keyframes grainJitter {
          0% { transform: translate(0,0); } 25% { transform: translate(-24px,14px); }
          50% { transform: translate(18px,-20px); } 75% { transform: translate(-12px,-8px); }
          100% { transform: translate(0,0); }
        }
        @media (max-width: 1240px) { .atm-rail { display: none !important; } }
      `}</style>
    </>
  );
}
