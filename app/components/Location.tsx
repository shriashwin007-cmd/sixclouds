"use client";
export default function Location() {
  return (
    <section style={{ padding: "80px 0 0", background: "rgba(8,8,8,0.78)" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-tag">&gt; find us</span>
          <h2 className="pixel" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#FFD700", lineHeight: 1.6 }}>
            WHERE WE&apos;RE AT
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          {/* Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              { icon: "📍", title: "Address", text: "Pallavan Salai, Kennedy Square\nPerambur, Chennai\nTamil Nadu – 600011" },
              { icon: "🕒", title: "Hours", text: "Monday – Sunday\n3:00 PM – 11:00 PM" },
              { icon: "⭐", title: "Rating", text: "4.9 / 5.0\n38 Reviews on Google Maps" },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div className="pixel" style={{ fontSize: "0.6rem", color: "#FFD700", marginBottom: 10 }}>{item.title}</div>
                  <div className="mono" style={{ color: "rgba(240,240,240,0.7)", fontSize: "0.82rem", lineHeight: 1.8, whiteSpace: "pre-line" }}>{item.text}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 8 }}>
              <a
                href="https://maps.google.com/?q=SIXCLOUDS+Gaming+Cafe+Perambur+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn"
                style={{ fontSize: "0.5rem" }}
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Map embed placeholder */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,215,0,0.15)",
            aspectRatio: "4/3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            position: "relative",
          }}>
            <span style={{ fontSize: "3rem" }}>📍</span>
            <span className="mono" style={{ fontSize: "0.7rem", color: "rgba(240,240,240,0.4)", textAlign: "center", letterSpacing: "0.1em" }}>
              KENNEDY SQUARE<br />PERAMBUR, CHENNAI
            </span>
            <a
              href="https://maps.google.com/?q=SIXCLOUDS+Gaming+Cafe+Perambur+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn outline"
              style={{ fontSize: "0.5rem", marginTop: 8 }}
            >
              View on Maps
            </a>

            {/* Corner pixels */}
            {[
              { top: 0, left: 0 }, { top: 0, right: 0 },
              { bottom: 0, left: 0 }, { bottom: 0, right: 0 },
            ].map((pos, i) => (
              <div key={i} style={{ position: "absolute", ...pos, width: 6, height: 6, background: "rgba(255,215,0,0.4)" }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div.wrap > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
