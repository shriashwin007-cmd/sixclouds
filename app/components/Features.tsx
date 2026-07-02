"use client";
import { useState } from "react";

const FEATURES = [
  {
    icon: "🔒",
    title: "PRIVATE ROOMS",
    desc: "Book an entire room just for your squad. No interruptions, no strangers — pure gaming focus with your crew.",
    tag: "EXCLUSIVE",
  },
  {
    icon: "🎮",
    title: "HIGH-END SETUPS",
    desc: "Top-tier gaming rigs, ultra-low latency displays, and premium peripherals. Every seat is built to perform.",
    tag: "PREMIUM",
  },
  {
    icon: "⚡",
    title: "FAST INTERNET",
    desc: "Blazing fast fiber connection with low ping for seamless online multiplayer. No lag. No excuses.",
    tag: "FIBER",
  },
  {
    icon: "🏆",
    title: "TOURNAMENTS",
    desc: "Compete in regular in-house tournaments. Win prizes, earn respect, become a legend at SIXCLOUDS.",
    tag: "COMING SOON",
  },
  {
    icon: "🍕",
    title: "FOOD & DRINKS",
    desc: "Snacks, energy drinks, and refreshments available at the cafe. Keep your energy up through long sessions.",
    tag: "IN-HOUSE",
  },
  {
    icon: "🕒",
    title: "LATE NIGHT ACCESS",
    desc: "Open till 11 PM every day. Stay for the evening marathon sessions — the night belongs to you.",
    tag: "OPEN DAILY",
  },
];

export default function Features() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="features" style={{ padding: "100px 0", background: "#080808" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-tag">&gt; why sixclouds</span>
          <h2 className="pixel" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#FFD700", lineHeight: 1.6 }}>
            BUILT FOR<br />REAL GAMERS
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? "rgba(255,215,0,0.06)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${hovered === i ? "rgba(255,215,0,0.4)" : "rgba(255,215,0,0.1)"}`,
                padding: "28px 24px",
                transition: "all 0.25s",
                transform: hovered === i ? "translateY(-6px)" : "none",
                boxShadow: hovered === i ? "0 12px 40px rgba(255,215,0,0.1)" : "none",
                cursor: "default",
                position: "relative",
              }}
            >
              {/* Corner accent */}
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 0, height: 0,
                borderStyle: "solid",
                borderWidth: "0 24px 24px 0",
                borderColor: `transparent ${hovered === i ? "rgba(255,215,0,0.5)" : "rgba(255,215,0,0.15)"} transparent transparent`,
                transition: "border-color 0.25s",
              }} />

              <div style={{ fontSize: "2rem", marginBottom: 16 }}>{f.icon}</div>
              <div className="pixel" style={{ fontSize: "0.6rem", color: "#FFD700", marginBottom: 12, lineHeight: 1.6 }}>{f.title}</div>
              <p style={{ color: "rgba(240,240,240,0.65)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 16 }}>{f.desc}</p>
              <span className="mono" style={{
                fontSize: "0.6rem", color: "#39FF14", letterSpacing: "0.12em",
                padding: "3px 10px", border: "1px solid rgba(57,255,20,0.3)",
              }}>
                {f.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { #features .wrap > div:last-child { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { #features .wrap > div:last-child { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
