"use client";
import { useState } from "react";
import { Reveal3D } from "@/app/components/Text3D";
import SectionHeader from "@/app/components/SectionHeader";
import TiltCard from "@/app/components/TiltCard";

const REVIEWS = [
  { name: "Arun K.", stars: 5, text: "Best gaming cafe in Perambur by far! Private rooms are a game changer. Came with my squad for 3 hours and we didn't even realize the time.", time: "2 weeks ago" },
  { name: "Priya S.", stars: 5, text: "Super clean setup, great environment. The private room was perfect for our group. Staff is friendly and helpful. Will definitely come back!", time: "1 month ago" },
  { name: "Vikram R.", stars: 5, text: "Loved the vibe here. Fast internet, smooth gameplay, no lag. This place is exactly what Perambur needed. 10/10 experience.", time: "3 weeks ago" },
  { name: "Rohith M.", stars: 5, text: "Me and my friends come here every weekend now. Incredible gaming setups and very affordable. LevelUp Gaming is the real deal.", time: "1 week ago" },
];

export default function Reviews() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ padding: "110px 0", background: "rgba(6,6,6,0.6)" }}>
      <div className="wrap">
        <SectionHeader index="06" tag="player reviews" lines={["WHAT PLAYERS", "SAY"]} watermark="FAME" />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: -36, marginBottom: 40 }}>
          <span className="pixel" style={{ fontSize: "1.2rem", color: "#FFD700" }}>4.9</span>
          <span style={{ color: "#FFD700", fontSize: "1.2rem" }}>★★★★★</span>
          <span className="mono" style={{ color: "rgba(240,240,240,0.5)", fontSize: "0.75rem" }}>38 reviews on Google</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {REVIEWS.map((r, i) => (
            <Reveal3D key={i} delay={i * 0.1} from={i % 2 === 0 ? "left" : "right"}>
            <TiltCard max={7} style={{ height: "100%" }}>
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                height: "100%",
                background: hovered === i ? "rgba(255,215,0,0.05)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${hovered === i ? "rgba(255,215,0,0.3)" : "rgba(255,215,0,0.1)"}`,
                padding: "28px 24px",
                transition: "all 0.25s",
                transform: hovered === i ? "translateY(-4px)" : "none",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, alignItems: "flex-start" }}>
                <div>
                  <div className="mono" style={{ fontSize: "0.85rem", color: "#FFD700", fontWeight: 700 }}>{r.name}</div>
                  <div className="mono" style={{ fontSize: "0.6rem", color: "rgba(240,240,240,0.4)", marginTop: 4 }}>{r.time}</div>
                </div>
                <span style={{ color: "#FFD700", fontSize: "0.9rem" }}>{"★".repeat(r.stars)}</span>
              </div>
              <p style={{ color: "rgba(240,240,240,0.72)", fontSize: "0.92rem", lineHeight: 1.75 }}>&quot;{r.text}&quot;</p>
            </div>
            </TiltCard>
            </Reveal3D>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
