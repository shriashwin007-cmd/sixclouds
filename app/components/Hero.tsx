"use client";
import { useEffect, useState } from "react";

const TYPED_STRINGS = [
  "GAME ABOVE THE REST.",
  "PRIVATE ROOMS. EPIC SETUPS.",
  "PERAMBUR'S BEST GAMING CAFE.",
];

function useTyped(strings: string[]) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    const delay = deleting ? 40 : charIdx === current.length ? 2000 : 80;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      } else {
        setDeleting(false);
        setIdx((i) => (i + 1) % strings.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, charIdx, idx, strings]);

  return text;
}

const STATS = [
  { value: "4.9★", label: "Google Rating" },
  { value: "3PM", label: "Opens Daily" },
  { value: "11PM", label: "Closes Daily" },
  { value: "PVT", label: "Private Rooms" },
];

export default function Hero() {
  const typed = useTyped(TYPED_STRINGS);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="home"
      className="grid-bg"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "100px 0 60px",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,215,0,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1, animation: mounted ? "floatUp 0.8s ease both" : "none" }}>
        {/* Logo badge */}
        <div style={{ marginBottom: 32, display: "inline-block" }}>
          <div style={{
            width: 110, height: 110, margin: "0 auto 16px",
            background: "#000",
            border: "2px solid rgba(255,215,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "pulse-gold 2.5s ease-in-out infinite",
          }}>
            <span className="pixel" style={{ fontSize: "2.8rem", lineHeight: 1 }}>6</span>
          </div>
          <span className="mono" style={{ fontSize: "0.75rem", color: "rgba(240,240,240,0.5)", letterSpacing: "0.3em" }}>
            GAMING CAFE
          </span>
        </div>

        {/* Main heading */}
        <h1 className="pixel" style={{
          fontSize: "clamp(1.3rem, 4vw, 2.8rem)",
          lineHeight: 1.4,
          marginBottom: 28,
          color: "#FFD700",
          textShadow: "0 0 40px rgba(255,215,0,0.4)",
        }}>
          SIXCLOUDS
        </h1>

        {/* Typed */}
        <div className="mono" style={{ fontSize: "clamp(0.85rem, 2vw, 1.15rem)", color: "rgba(240,240,240,0.85)", marginBottom: 12, minHeight: "2em", letterSpacing: "0.05em" }}>
          <span>{typed}</span>
          <span style={{ animation: "blink 1s step-end infinite", color: "#FFD700" }}>▌</span>
        </div>

        <p style={{ color: "rgba(240,240,240,0.5)", fontSize: "0.95rem", marginBottom: 40, letterSpacing: "0.03em" }}>
          Pallavan Salai, Kennedy Square, Perambur, Chennai – 600011
        </p>

        {/* CTA */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#book" className="pixel-btn">Book a Session</a>
          <a href="#features" className="pixel-btn outline">Explore →</a>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16,
          marginTop: 72, maxWidth: 700, marginInline: "auto",
        }}>
          {STATS.map((s) => (
            <div key={s.label} className="glass" style={{ padding: "20px 12px", textAlign: "center", borderRadius: 4 }}>
              <div className="pixel" style={{ fontSize: "clamp(0.8rem,2vw,1.1rem)", color: "#FFD700", marginBottom: 8 }}>{s.value}</div>
              <div className="mono" style={{ fontSize: "0.62rem", color: "rgba(240,240,240,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}>
        <span className="mono" style={{ fontSize: "0.6rem", color: "rgba(240,240,240,0.35)", letterSpacing: "0.2em" }}>SCROLL DOWN</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,215,0,0.5), transparent)" }} />
      </div>

      <style>{`
        @media (max-width: 560px) {
          div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
