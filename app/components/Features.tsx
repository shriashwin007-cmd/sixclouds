"use client";
import { useState } from "react";
import { Reveal3D } from "@/app/components/Text3D";
import SectionHeader from "@/app/components/SectionHeader";

const FEATURES = [
  { title: "PRIVATE ROOMS", desc: "Book an entire room just for your squad. No interruptions, no strangers — pure focus with your crew.", tag: "EXCLUSIVE" },
  { title: "HIGH-END SETUPS", desc: "Top-tier rigs, ultra-low-latency displays, premium controllers. Every seat is built to perform.", tag: "PREMIUM" },
  { title: "FAST INTERNET", desc: "Blazing fiber with low ping for seamless online multiplayer. No lag. No excuses.", tag: "FIBER" },
  { title: "TOURNAMENTS", desc: "In-house tournaments with prizes. Earn respect, become a LEVELUP GAMING legend.", tag: "COMING SOON" },
  { title: "FOOD & DRINKS", desc: "Snacks and energy drinks at the counter. Keep the energy up through long sessions.", tag: "IN-HOUSE" },
  { title: "LATE SESSIONS", desc: "Open till 11 PM every day. The evening marathon slots belong to you.", tag: "OPEN DAILY" },
];

const PHOTOS = [
  "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542712/gaming_lounge_setup_1_kigpow.png",
  "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542714/gaming_lounge_setup_2_swhsrh.png",
  "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542716/joker_ps5_controller_jxdrof.png",
  "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542712/forza_horizon_6_mural_wouom2.png",
  "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542711/fortnite_and_joker_ps5_controllers_xc7gxl.png",
  "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542718/red_dead_redemption_mural_dj8ar8.png",
];

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" style={{ padding: "110px 0", background: "rgba(8,8,8,0.62)" }}>
      <div className="wrap">
        <SectionHeader index="02" tag="why levelup-gaming" lines={["BUILT FOR", "REAL GAMERS"]} watermark="LOADOUT" />

        <div className="feat-cols" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 48, alignItems: "start" }}>
          {/* numbered editorial rows */}
          <div>
            {FEATURES.map((f, i) => (
              <Reveal3D key={f.title} delay={i * 0.05}>
                <div
                  onMouseEnter={() => setActive(i)}
                  style={{
                    display: "flex", gap: 20, alignItems: "baseline",
                    padding: "22px 14px 22px 6px",
                    borderBottom: "1px solid rgba(255,215,0,0.12)",
                    borderLeft: active === i ? "3px solid #FFD700" : "3px solid transparent",
                    background: active === i ? "linear-gradient(90deg, rgba(255,215,0,0.07), transparent 70%)" : "transparent",
                    transition: "background 0.25s, border-color 0.25s, padding-left 0.25s",
                    paddingLeft: active === i ? 16 : 6,
                    cursor: "default",
                  }}
                >
                  <span className="pixel" style={{
                    fontSize: "1rem", flexShrink: 0,
                    color: active === i ? "#FFD700" : "transparent",
                    WebkitTextStroke: active === i ? "0" : "1.5px rgba(255,215,0,0.35)",
                    transition: "color 0.25s",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                      <span className="pixel" style={{ fontSize: "0.62rem", color: active === i ? "#fff" : "rgba(240,240,240,0.85)", lineHeight: 1.6 }}>
                        {f.title}
                      </span>
                      <span className="mono" style={{
                        fontSize: "0.55rem", color: "#39FF14", letterSpacing: "0.14em",
                        padding: "2px 8px", border: "1px solid rgba(57,255,20,0.3)",
                      }}>
                        {f.tag}
                      </span>
                    </div>
                    <p style={{
                      color: "rgba(240,240,240,0.55)", fontSize: "0.9rem", lineHeight: 1.65,
                      maxHeight: active === i ? 80 : 0, overflow: "hidden",
                      opacity: active === i ? 1 : 0,
                      transition: "max-height 0.35s ease, opacity 0.3s ease",
                    }}>
                      {f.desc}
                    </p>
                  </div>
                  <span aria-hidden style={{
                    color: "#FFD700", fontSize: "1rem", flexShrink: 0,
                    transform: active === i ? "translateX(0)" : "translateX(-8px)",
                    opacity: active === i ? 1 : 0.25,
                    transition: "transform 0.25s, opacity 0.25s",
                  }}>▶</span>
                </div>
              </Reveal3D>
            ))}
          </div>

          {/* sticky duotone photo that follows the active row */}
          <Reveal3D from="right" delay={0.1}>
            <div className="feat-photo" style={{ position: "sticky", top: 110 }}>
              <div style={{
                position: "relative", overflow: "hidden",
                border: "2px solid rgba(255,215,0,0.3)",
                aspectRatio: "4/3", background: "#0a0a0a",
              }}>
                {PHOTOS.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "scale(1)" : "scale(1.07)",
                    transition: "opacity 0.45s ease, transform 0.6s ease",
                    filter: "saturate(0.75) contrast(1.08)",
                  }} />
                ))}
                {/* gold duotone + scanlines */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,215,0,0.14), rgba(5,5,5,0.35))", mixBlendMode: "hard-light", pointerEvents: "none" }} />
                <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,0.14) 3px 4px)", pointerEvents: "none" }} />
                {/* caption strip */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
                  <span className="mono" style={{ fontSize: "0.6rem", color: "#FFD700", letterSpacing: "0.18em" }}>FIG.{String(active + 1).padStart(2, "0")} — {FEATURES[active].title}</span>
                  <span className="mono" style={{ fontSize: "0.6rem", color: "rgba(57,255,20,0.6)" }}>▮▮▮▯</span>
                </div>
                {[{ top: -5, left: -5 }, { top: -5, right: -5 }, { bottom: -5, left: -5 }, { bottom: -5, right: -5 }].map((p, j) => (
                  <span key={j} style={{ position: "absolute", ...p, width: 10, height: 10, background: "#FFD700" }} />
                ))}
              </div>
              <p className="mono" style={{ marginTop: 12, fontSize: "0.6rem", color: "rgba(240,240,240,0.35)", letterSpacing: "0.14em" }}>
                // HOVER THE LIST TO SWITCH FEED
              </p>
            </div>
          </Reveal3D>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .feat-cols { grid-template-columns: 1fr !important; }
          .feat-photo { position: static !important; }
        }
      `}</style>
    </section>
  );
}
