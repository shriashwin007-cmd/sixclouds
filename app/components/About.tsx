"use client";

export default function About() {
  return (
    <section id="about" className="grid-bg" style={{ padding: "100px 0" }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left */}
          <div>
            <span className="section-tag">&gt; about us</span>
            <h2 className="pixel" style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "#FFD700", lineHeight: 1.6, marginBottom: 24 }}>
              GAME ABOVE<br />THE REST.
            </h2>
            <p style={{ color: "rgba(240,240,240,0.7)", lineHeight: 1.8, marginBottom: 20, fontSize: "1.05rem" }}>
              SIXCLOUDS is Perambur&apos;s premier gaming cafe — built for gamers who demand the best.
              Whether you&apos;re grinding ranked, hosting a squad session, or just chilling after college,
              we&apos;ve got you covered.
            </p>
            <p style={{ color: "rgba(240,240,240,0.7)", lineHeight: 1.8, marginBottom: 32, fontSize: "1.05rem" }}>
              Private rooms, high-performance setups, and a vibe that hits different.
              This isn&apos;t just a cafe — it&apos;s your arena.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#book" className="pixel-btn">Play Now</a>
              <a href="#features" className="pixel-btn outline">See Features</a>
            </div>
          </div>

          {/* Right — pixel art card */}
          <div style={{ position: "relative" }}>
            <div style={{
              background: "#0a0a0a",
              border: "2px solid rgba(255,215,0,0.3)",
              padding: "40px 32px",
              position: "relative",
            }}>
              {/* Corner pixels */}
              {[
                { top: -3, left: -3 }, { top: -3, right: -3 },
                { bottom: -3, left: -3 }, { bottom: -3, right: -3 },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: "absolute", ...pos,
                  width: 8, height: 8, background: "#FFD700",
                }} />
              ))}

              <div className="pixel" style={{ fontSize: "3rem", textAlign: "center", marginBottom: 24, color: "#FFD700" }}>6</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "🎮", text: "Premium gaming setups" },
                  { icon: "🔒", text: "Private rooms for 4" },
                  { icon: "⭐", text: "4.9 star rated on Google" },
                  { icon: "🕒", text: "Open 3 PM – 11 PM daily" },
                  { icon: "📍", text: "Kennedy Square, Perambur" },
                ].map((item) => (
                  <div key={item.text} className="mono" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.8rem", color: "rgba(240,240,240,0.75)" }}>
                    <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative glow */}
            <div style={{
              position: "absolute", inset: -20, zIndex: -1,
              background: "radial-gradient(circle at center, rgba(255,215,0,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .wrap > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
