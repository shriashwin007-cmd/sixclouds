"use client";
import Link from "next/link";
import SectionHeader from "@/app/components/SectionHeader";

export default function AddOns() {
  return (
    <section id="add-ons" style={{ padding: "110px 0", background: "rgba(6,6,6,0.6)" }}>
      <div className="wrap">
        <SectionHeader index="03" tag="level up your session" lines={["ADD-ONS &", "SNACKS"]} watermark="SUPPLY" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 680, margin: "0 auto" }}>
          {[
            {
              href: "/menu/beverages",
              icon: "🥤",
              title: "BEVERAGES",
              items: "Water · Pepsi · Red Bull · Mountain Dew · and more",
              color: "#FFD700",
            },
            {
              href: "/menu/snacks",
              icon: "🍟",
              title: "SNACKS",
              items: "Lays · Doritos · Cheetos · Kurkure · and more",
              color: "#39FF14",
            },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              style={{
                textDecoration: "none",
                display: "flex", flexDirection: "column",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(${cat.color === "#FFD700" ? "255,215,0" : "57,255,20"},0.2)`,
                padding: "36px 28px",
                transition: "all 0.25s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.background = `rgba(${cat.color === "#FFD700" ? "255,215,0" : "57,255,20"},0.06)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <span style={{ fontSize: "2.8rem", marginBottom: 16 }}>{cat.icon}</span>
              <div className="pixel" style={{ fontSize: "0.65rem", color: cat.color, marginBottom: 12, lineHeight: 1.6 }}>{cat.title}</div>
              <p className="mono" style={{ color: "rgba(240,240,240,0.5)", fontSize: "0.75rem", lineHeight: 1.7, flex: 1 }}>{cat.items}</p>
              <span className="pixel" style={{ marginTop: 20, fontSize: "0.5rem", color: cat.color }}>Browse all →</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 520px) { #add-ons .wrap > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
