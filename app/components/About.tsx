"use client";
import { Reveal3D } from "@/app/components/Text3D";
import SectionHeader from "@/app/components/SectionHeader";

const CHECKS = [
  "Premium gaming setups",
  "Private rooms for squads of 4",
  "4.9★ rated on Google — 38 reviews",
  "Open 3 PM – 11 PM, all week",
  "Kennedy Square, Perambur",
];

export default function About() {
  return (
    <section id="about" style={{ padding: "110px 0", position: "relative" }}>
      <div className="wrap">
        <SectionHeader index="01" tag="about us" lines={["GAME ABOVE", "THE REST."]} watermark="ORIGIN" />

        <div className="about-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 56, alignItems: "center" }}>
          {/* copy */}
          <Reveal3D from="left">
            <div>
              <p style={{ color: "rgba(240,240,240,0.72)", lineHeight: 1.85, marginBottom: 18, fontSize: "1.05rem" }}>
                SIXCLOUDS is Perambur&apos;s premier gaming cafe — built for gamers who demand
                the best. Grinding ranked, hosting a squad night, or decompressing after
                college: this is your arena.
              </p>
              <p style={{ color: "rgba(240,240,240,0.55)", lineHeight: 1.85, marginBottom: 28, fontSize: "0.98rem" }}>
                Private rooms, high-performance setups, and a vibe that hits different.
              </p>

              {/* checklist as terminal readout */}
              <div style={{
                border: "1px solid rgba(57,255,20,0.25)", background: "rgba(57,255,20,0.03)",
                padding: "18px 20px", marginBottom: 32,
              }}>
                <div className="mono" style={{ fontSize: "0.6rem", color: "rgba(57,255,20,0.5)", letterSpacing: "0.2em", marginBottom: 12 }}>
                  $ sixclouds --status
                </div>
                {CHECKS.map((c, i) => (
                  <div key={c} className="mono" style={{ fontSize: "0.78rem", color: "rgba(240,240,240,0.75)", lineHeight: 2, display: "flex", gap: 10 }}>
                    <span style={{ color: "#39FF14" }}>[OK]</span> {c}
                    {i === CHECKS.length - 1 && <span style={{ color: "#39FF14", animation: "blink 1s step-end infinite" }}>▌</span>}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#book" className="pixel-btn">Play Now</a>
                <a href="#features" className="pixel-btn outline">See Features</a>
              </div>
            </div>
          </Reveal3D>

          {/* stacked polaroid photos */}
          <Reveal3D from="right" delay={0.12}>
            <div style={{ position: "relative", minHeight: 380 }}>
              {[
                { src: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542712/gaming_lounge_setup_1_kigpow.png", cap: "THE LOUNGE", rot: -3.5, top: 0, left: "4%", w: "72%", z: 1 },
                { src: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542716/joker_ps5_controller_jxdrof.png", cap: "YOUR WEAPON", rot: 2.5, top: "38%", left: "34%", w: "60%", z: 2 },
              ].map((ph) => (
                <figure key={ph.cap} className="about-photo" style={{
                  position: "absolute", top: ph.top, left: ph.left, width: ph.w, margin: 0,
                  transform: `rotate(${ph.rot}deg)`,
                  background: "#0d0d0d",
                  border: "2px solid rgba(255,215,0,0.35)",
                  padding: 8, paddingBottom: 0,
                  boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
                  zIndex: ph.z,
                  transition: "transform 0.35s cubic-bezier(0.34,1.5,0.64,1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(0deg) scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = `rotate(${ph.rot}deg)`)}
                >
                  <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ph.src} alt={ph.cap} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "saturate(0.8) contrast(1.05)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent 0 3px, rgba(0,0,0,0.12) 3px 4px)" }} />
                  </div>
                  <figcaption className="pixel" style={{ fontSize: "0.5rem", color: "#FFD700", padding: "10px 4px", display: "flex", justifyContent: "space-between" }}>
                    <span>★ {ph.cap}</span>
                    <span className="mono" style={{ color: "rgba(240,240,240,0.35)" }}>PERAMBUR</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal3D>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-cols { grid-template-columns: 1fr !important; }
          .about-cols > div:last-child > div { min-height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
