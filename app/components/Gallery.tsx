"use client";
import { useState } from "react";

const ITEMS = [
  {
    label: "Gaming Lounge",
    img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542712/gaming_lounge_setup_1_kigpow.png",
    wide: true,
  },
  {
    label: "Console Setup",
    img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542714/gaming_lounge_setup_2_swhsrh.png",
    wide: false,
  },
  {
    label: "Joker Controller",
    img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542716/joker_ps5_controller_jxdrof.png",
    wide: false,
  },
  {
    label: "Gaming Mural",
    img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542712/forza_horizon_6_mural_wouom2.png",
    wide: false,
  },
  {
    label: "Custom Controllers",
    img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542711/fortnite_and_joker_ps5_controllers_xc7gxl.png",
    wide: false,
  },
  {
    label: "Wall Art",
    img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542718/red_dead_redemption_mural_dj8ar8.png",
    wide: true,
  },
];

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

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

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {ITEMS.map((item, i) => (
            <div
              key={item.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setLightbox(i)}
              style={{
                gridColumn: item.wide ? "span 2" : "span 1",
                aspectRatio: item.wide ? "16/9" : "1/1",
                position: "relative", overflow: "hidden",
                border: `1px solid ${hovered === i ? "rgba(255,215,0,0.6)" : "rgba(255,215,0,0.12)"}`,
                cursor: "pointer",
                transition: "border-color 0.25s, transform 0.25s",
                transform: hovered === i ? "scale(1.015)" : "scale(1)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.label}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.4s",
                  transform: hovered === i ? "scale(1.06)" : "scale(1)",
                  display: "block",
                }}
              />

              {/* Overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: hovered === i ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)",
                transition: "background 0.25s",
                display: "flex", alignItems: "flex-end",
              }}>
                <span className="mono" style={{
                  padding: "10px 14px",
                  fontSize: "0.68rem", color: "rgba(240,240,240,0.9)",
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  opacity: hovered === i ? 1 : 0, transition: "opacity 0.25s",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  width: "100%",
                }}>
                  {item.label}
                </span>
              </div>

              {/* Pixel corners */}
              {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((pos, j) => (
                <div key={j} style={{
                  position: "absolute", ...pos, width: 8, height: 8,
                  background: "#FFD700",
                  opacity: hovered === i ? 1 : 0.3, transition: "opacity 0.25s",
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 24, cursor: "zoom-out",
          }}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ITEMS[lightbox].img}
              alt={ITEMS[lightbox].label}
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", border: "1px solid rgba(255,215,0,0.3)" }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mono" style={{ textAlign: "center", marginTop: 12, fontSize: "0.7rem", color: "rgba(240,240,240,0.5)", letterSpacing: "0.1em" }}>
              {ITEMS[lightbox].label}
            </div>
            <button onClick={() => setLightbox(null)} style={{
              position: "absolute", top: -16, right: -16,
              width: 36, height: 36, background: "#FFD700", border: "none",
              color: "#050505", fontSize: "1rem", cursor: "pointer",
              fontFamily: "'Press Start 2P', monospace", display: "grid", placeItems: "center",
            }}>✕</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-grid > div { grid-column: span 1 !important; aspect-ratio: 4/3 !important; }
        }
      `}</style>
    </section>
  );
}
