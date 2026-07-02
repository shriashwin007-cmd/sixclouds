"use client";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import CartPanel from "@/app/components/CartPanel";
import AddOnCard from "@/app/components/AddOnCard";
import { CATEGORIES, type CategoryKey } from "@/app/components/addonsData";
import { useMenuOverrides } from "@/app/lib/useMenuOverrides";

export default function MenuView({ category }: { category: CategoryKey }) {
  const cat = CATEGORIES[category];
  const { totalItems, openCart } = useCart();
  const other: CategoryKey = category === "beverages" ? "snacks" : "beverages";
  const { isHidden, isOOS } = useMenuOverrides();

  return (
    <main style={{ minHeight: "100svh", position: "relative", zIndex: 1, background: "#050505" }}>
      {/* Top bar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(5,5,5,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,215,0,0.12)",
      }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 64, gap: 12 }}>
          <Link href="/#add-ons" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "rgba(240,240,240,0.7)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem" }}>
            ← Back
          </Link>
          <div className="pixel" style={{ fontWeight: 900, fontSize: "0.65rem", letterSpacing: "0.06em", color: "#FFD700" }}>
            {cat.icon} {cat.title}
          </div>
          <button onClick={openCart} aria-label="Cart" style={{
            position: "relative", width: 44, height: 44,
            border: "1px solid rgba(255,215,0,0.2)", background: "rgba(255,215,0,0.05)",
            color: "#F0F0F0", fontSize: "1.2rem", cursor: "pointer", display: "grid", placeItems: "center",
          }}>
            🛒
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, minWidth: 20, height: 20, borderRadius: 999, background: "#FFD700", color: "#050505", fontSize: "0.65rem", fontWeight: 800, display: "grid", placeItems: "center", padding: "0 4px", fontFamily: "'Press Start 2P', monospace" }}>{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      {/* Content */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="wrap">
          <div style={{ marginBottom: 28 }}>
            <h1 className="pixel" style={{ fontSize: "clamp(1rem,3vw,1.6rem)", lineHeight: 1.5, color: "#FFD700" }}>
              {cat.icon} {cat.title}
            </h1>
            <p style={{ color: "rgba(240,240,240,0.55)", marginTop: 10, lineHeight: 1.6 }}>{cat.blurb}</p>
          </div>

          <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {cat.items.filter((item) => !isHidden(item.id)).map((item) => (
              <AddOnCard key={item.id} item={item} large outOfStock={isOOS(item.id)} />
            ))}
          </div>

          <div style={{ marginTop: 36, textAlign: "center" }}>
            <Link href={`/menu/${other}`} className="pixel-btn outline" style={{ fontSize: "0.5rem" }}>
              {CATEGORIES[other].icon} Browse {CATEGORIES[other].title} →
            </Link>
          </div>
        </div>
      </section>

      <CartPanel />

      <style>{`
        @media (max-width: 900px) { .menu-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .menu-grid { grid-template-columns: repeat(2,1fr) !important; gap: 10px !important; } }
      `}</style>
    </main>
  );
}
