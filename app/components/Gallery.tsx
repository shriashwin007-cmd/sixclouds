"use client";
import { useState } from "react";

/* Placeholder gallery items — client can replace with real Cloudinary URLs */
const ITEMS = [
  { label: "Gaming Setup", emoji: "🖥️" },
  { label: "Private Room", emoji: "🔒" },
  { label: "Squad Night", emoji: "👾" },
  { label: "Console Setup", emoji: "🎮" },
  { label: "Night Session", emoji: "🌙" },
  { label: "Tournament", emoji: "🏆" },
];

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="gallery" className="grid-bg" style={{ padding: "100px 0" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-tag">&gt; gallery</span>
          <h2 className="pixel" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#FFD700", lineHeight: 1.6 }}>
            THE ARENA
          </h2>
          <p style={{ color: "rgba(240,240,240,0.5)", marginTop: 12, fontSize: "0.9rem" }}>
            A glimpse inside SIXCLOUDS
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                aspectRatio: i === 0 || i === 5 ? "2/1.2" : "1/1",
                gridColumn: i === 0 || i === 5 ? "span 2" : "span 1",
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${hovered === i ? "rgba(255,215,0,0.5)" : "rgba(255,215,0,0.1)"}`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 12, cursor: "pointer",
                transition: "all 0.25s",
                transform: hovered === i ? "scale(1.02)" : "none",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <span style={{ fontSize: "3.5rem", transition: "transform 0.3s", transform: hovered === i ? "scale(1.15)" : "scale(1)" }}>
                {item.emoji}
              </span>
              <span className="mono" style={{ fontSize: "0.7rem", color: "rgba(240,240,240,0.6)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {item.label}
              </span>

              {hovered === i && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "radial-gradient(circle at center, rgba(255,215,0,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
              )}

              {/* Pixel corner */}
              <div style={{
                position: "absolute", top: 0, left: 0, width: 6, height: 6, background: "#FFD700", opacity: hovered === i ? 1 : 0.3, transition: "opacity 0.25s",
              }} />
              <div style={{
                position: "absolute", top: 0, right: 0, width: 6, height: 6, background: "#FFD700", opacity: hovered === i ? 1 : 0.3, transition: "opacity 0.25s",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, width: 6, height: 6, background: "#FFD700", opacity: hovered === i ? 1 : 0.3, transition: "opacity 0.25s",
              }} />
              <div style={{
                position: "absolute", bottom: 0, right: 0, width: 6, height: 6, background: "#FFD700", opacity: hovered === i ? 1 : 0.3, transition: "opacity 0.25s",
              }} />
            </div>
          ))}
        </div>

        <p className="mono" style={{ textAlign: "center", marginTop: 24, fontSize: "0.65rem", color: "rgba(240,240,240,0.3)", letterSpacing: "0.1em" }}>
          // PHOTOS COMING SOON — FOLLOW US FOR UPDATES
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #gallery .wrap > div:nth-child(2) { grid-template-columns: 1fr !important; }
          #gallery .wrap > div:nth-child(2) > div { grid-column: span 1 !important; aspect-ratio: 4/3 !important; }
        }
      `}</style>
    </section>
  );
}
