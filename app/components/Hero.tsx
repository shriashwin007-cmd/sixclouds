"use client";
import { useEffect, useState } from "react";
import { Word3D } from "@/app/components/Text3D";
import FloatingPixels from "@/app/components/FloatingPixels";
import OpenStatus from "@/app/components/OpenStatus";
import TiltCard from "@/app/components/TiltCard";

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
    const delay = deleting ? 38 : charIdx === current.length ? 2200 : 75;
    const t = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1)); setCharIdx((c) => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(current.slice(0, charIdx - 1)); setCharIdx((c) => c - 1);
      } else {
        setDeleting(false); setIdx((i) => (i + 1) % strings.length);
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
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        padding: "100px 0 60px",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,215,0,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <FloatingPixels />

      {/* HUD corner labels */}
      <div className="hero-hud" style={{ position: "absolute", top: 84, left: 28, pointerEvents: "none" }}>
        <div className="mono" style={{ fontSize: "0.6rem", color: "rgba(57,255,20,0.65)", letterSpacing: "0.2em", lineHeight: 2 }}>
          PLAYER 1<br />
          <span style={{ color: "rgba(255,215,0,0.5)" }}>STATUS: READY</span>
        </div>
      </div>
      <div className="hero-hud" style={{ position: "absolute", top: 84, right: 28, textAlign: "right", pointerEvents: "none" }}>
        <div className="mono" style={{ fontSize: "0.6rem", color: "rgba(255,215,0,0.55)", letterSpacing: "0.2em", lineHeight: 2 }}>
          HI-SCORE 4.9★<br />
          <span style={{ color: "rgba(240,240,240,0.35)" }}>38 REVIEWS</span>
        </div>
      </div>
      <div className="hero-hud" style={{ position: "absolute", bottom: 96, left: 28, pointerEvents: "none" }}>
        <div className="mono" style={{ fontSize: "0.58rem", color: "rgba(240,240,240,0.3)", letterSpacing: "0.2em", lineHeight: 2 }}>
          STAGE: PERAMBUR<br />CHENNAI — 600011
        </div>
      </div>
      <div className="hero-hud" style={{ position: "absolute", bottom: 96, right: 28, textAlign: "right", pointerEvents: "none" }}>
        <div className="mono" style={{ fontSize: "0.58rem", color: "rgba(255,215,0,0.45)", letterSpacing: "0.2em", lineHeight: 2 }}>
          CREDITS: ∞<br />
          <span style={{ color: "rgba(57,255,20,0.55)", animation: "blink 1.2s step-end infinite" }}>INSERT COIN</span>
        </div>
      </div>

      <div className="wrap" style={{ textAlign: "center", position: "relative", zIndex: 1, animation: mounted ? "floatUp 0.8s ease both" : "none" }}>
        {/* Logo */}
        <div style={{ marginBottom: 36, display: "inline-block" }}>
          <div style={{
            width: 120, height: 120, margin: "0 auto 16px",
            background: "#000",
            border: "2px solid rgba(255,215,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "pulse-gold 2.5s ease-in-out infinite",
            position: "relative",
          }}>
            {/* pixel corners */}
            {[{ top: -4, left: -4 }, { top: -4, right: -4 }, { bottom: -4, left: -4 }, { bottom: -4, right: -4 }].map((p, i) => (
              <div key={i} style={{ position: "absolute", ...p, width: 8, height: 8, background: "#FFD700" }} />
            ))}
            <span className="pixel" style={{ fontSize: "3rem", lineHeight: 1, color: "#FFD700" }}>6</span>
          </div>
          <div className="mono" style={{ fontSize: "0.72rem", color: "rgba(240,240,240,0.45)", letterSpacing: "0.3em" }}>GAMING CAFE</div>
        </div>

        <h1 style={{ marginBottom: 24 }}>
          <Word3D text="LEVELUP GAMING" size="clamp(1.4rem, 4.5vw, 3rem)" depth={7} />
        </h1>

        <div className="mono" style={{ fontSize: "clamp(0.8rem, 1.8vw, 1.1rem)", color: "rgba(240,240,240,0.8)", marginBottom: 10, minHeight: "2em", letterSpacing: "0.06em" }}>
          <span>{typed}</span>
          <span style={{ animation: "blink 1s step-end infinite", color: "#FFD700" }}>▌</span>
        </div>

        <p style={{ color: "rgba(240,240,240,0.45)", fontSize: "0.88rem", marginBottom: 18, letterSpacing: "0.04em" }}>
          Pallavan Salai · Kennedy Square · Perambur, Chennai
        </p>

        <div style={{ marginBottom: 40 }}>
          <OpenStatus />
        </div>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#book" className="pixel-btn">Book a Session</a>
          <a href="#features" className="pixel-btn outline">Explore →</a>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 72, maxWidth: 680, marginInline: "auto" }}>
          {STATS.map((s) => (
            <TiltCard key={s.label} max={14}>
              <div className="glass" style={{ padding: "18px 10px", textAlign: "center" }}>
                <div className="pixel" style={{ fontSize: "clamp(0.7rem,1.8vw,0.95rem)", color: "#FFD700", marginBottom: 8 }}>{s.value}</div>
                <div className="mono" style={{ fontSize: "0.58rem", color: "rgba(240,240,240,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span className="mono" style={{ fontSize: "0.58rem", color: "rgba(240,240,240,0.3)", letterSpacing: "0.2em" }}>SCROLL DOWN</span>
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(255,215,0,0.5), transparent)" }} />
      </div>

      <style>{`
        @media (max-width: 560px) { div[style*="repeat(4,1fr)"] { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 760px) { .hero-hud { display: none !important; } }
      `}</style>
    </section>
  );
}
