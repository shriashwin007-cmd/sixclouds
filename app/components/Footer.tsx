"use client";
export default function Footer() {
  return (
    <footer style={{
      background: "rgba(3,3,3,0.88)",
      borderTop: "1px solid rgba(255,215,0,0.1)",
      padding: "48px 0 32px",
      marginTop: 80,
    }}>
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div className="pixel" style={{ fontSize: "0.9rem", color: "#FFD700", marginBottom: 16 }}>SIXCLOUDS</div>
            <p style={{ color: "rgba(240,240,240,0.5)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 280 }}>
              Perambur&apos;s premier gaming cafe. Private rooms, high-end setups, and a vibe that levels you up.
            </p>
            <div className="mono" style={{ color: "rgba(240,240,240,0.35)", fontSize: "0.65rem", marginTop: 16, letterSpacing: "0.1em" }}>
              OPEN 3PM – 11PM · DAILY
            </div>
          </div>

          {/* Navigate */}
          <div>
            <div className="mono" style={{ fontSize: "0.65rem", color: "#39FF14", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Navigate</div>
            {["#home", "#about", "#features", "#gallery", "#book"].map((href) => (
              <a
                key={href}
                href={href}
                style={{
                  display: "block", color: "rgba(240,240,240,0.55)", textDecoration: "none",
                  fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem",
                  marginBottom: 10, transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FFD700")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,240,240,0.55)")}
              >
                &gt; {href.replace("#", "").charAt(0).toUpperCase() + href.replace("#", "").slice(1)}
              </a>
            ))}
          </div>

          {/* Location */}
          <div>
            <div className="mono" style={{ fontSize: "0.65rem", color: "#39FF14", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>Location</div>
            <div className="mono" style={{ color: "rgba(240,240,240,0.55)", fontSize: "0.75rem", lineHeight: 1.9 }}>
              Pallavan Salai<br />
              Kennedy Square<br />
              Perambur, Chennai<br />
              Tamil Nadu – 600011
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,215,0,0.08)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <span className="mono" style={{ fontSize: "0.65rem", color: "rgba(240,240,240,0.3)", letterSpacing: "0.05em" }}>
            © 2025 SIXCLOUDS Gaming Cafe. All rights reserved.
          </span>
          <span className="mono" style={{ fontSize: "0.6rem", color: "rgba(255,215,0,0.3)" }}>
            GAME ABOVE THE REST ★
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer .wrap > div:first-child { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  );
}
