"use client";
import { useState, useRef, useCallback } from "react";
import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/app/context/ToastContext";
import type { Item } from "@/app/components/addonsData";

interface Particle { id: number; x: number; y: number; vx: number; vy: number; emoji: string }
const BURST_EMOJIS = ["✨", "⭐", "💥", "🎮", "🔥", "💫"];

function useBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const counter = useRef(0);
  const burst = useCallback((e: React.MouseEvent, icon: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2;
      const speed = 55 + Math.random() * 60;
      return { id: counter.current++, x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, emoji: i % 3 === 0 ? icon : BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)] };
    });
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => setParticles((p) => p.filter((pt) => !newParticles.find((np) => np.id === pt.id))), 700);
  }, []);
  return { particles, burst };
}

export default function AddOnCard({ item, large = false, outOfStock = false }: { item: Item; large?: boolean; outOfStock?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { cart, addToCart, removeItem } = useCart();
  const { show } = useToast();
  const { particles, burst } = useBurst();

  const cartItem = cart.find((c) => c.id === item.id);
  const inCart = !!cartItem;

  function handleAdd() {
    addToCart({ id: item.id, name: item.name, price: item.price, icon: item.icon }, 1);
    show(`${item.name} added! 🛒`);
  }

  function handleRemove() {
    removeItem(item.id);
    show(`${item.name} removed`);
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 4,
        border: `1px solid ${inCart ? "rgba(255,215,0,0.6)" : hovered ? "rgba(255,215,0,0.35)" : "rgba(255,215,0,0.12)"}`,
        background: inCart ? "rgba(255,215,0,0.06)" : "rgba(255,255,255,0.03)",
        overflow: "hidden", display: "flex", flexDirection: "column",
        transition: "transform .25s, border-color .25s, background .25s, box-shadow .25s",
        transform: hovered ? "translateY(-5px)" : "",
        boxShadow: inCart ? "0 0 0 1.5px rgba(255,215,0,0.3), 0 16px 40px rgba(255,215,0,0.1)" : hovered ? "0 16px 40px rgba(255,215,0,0.08)" : "",
        position: "relative",
      }}
    >
      {/* In-cart badge */}
      {inCart && (
        <div style={{
          position: "absolute", top: 10, right: 10, zIndex: 5,
          background: "#FFD700", color: "#050505",
          fontFamily: "'Press Start 2P', monospace", fontWeight: 900, fontSize: "0.55rem",
          borderRadius: 0, padding: "3px 8px",
        }}>
          ×{cartItem!.quantity}
        </div>
      )}

      {/* Image */}
      <div
        onClick={(e) => burst(e, item.icon)}
        style={{
          height: large ? 200 : 160, cursor: "pointer", position: "relative", overflow: "visible",
          background: "rgba(255,215,0,0.03)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}
      >
        {particles.map((p) => (
          <div key={p.id} style={{ position: "absolute", left: p.x, top: p.y, fontSize: "1.1rem", pointerEvents: "none", zIndex: 10 }}>
            <div style={{ animation: "burstFly 0.65s ease-out forwards", ["--vx" as string]: `${p.vx}px`, ["--vy" as string]: `${p.vy}px` }}>{p.emoji}</div>
          </div>
        ))}

        {item.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: large ? 16 : 10, transition: "transform .3s", transform: hovered ? "scale(1.07)" : "scale(1)" }} />
        ) : (
          <span style={{ fontSize: large ? "4rem" : "3rem" }}>{item.icon}</span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: large ? "18px 18px 20px" : "14px 14px 16px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div>
          <h3 className="pixel" style={{ fontSize: large ? "0.65rem" : "0.55rem", marginBottom: 6, lineHeight: 1.6, color: "#F0F0F0" }}>{item.name}</h3>
          <div className="pixel" style={{ fontWeight: 800, color: "#FFD700", fontSize: large ? "0.7rem" : "0.6rem" }}>{item.label}</div>
        </div>
        <p style={{ color: "rgba(240,240,240,0.6)", fontSize: large ? "0.85rem" : "0.78rem", lineHeight: 1.6, flex: 1 }}>{item.desc}</p>

        <div style={{ marginTop: "auto" }}>
          {outOfStock ? (
            <div style={{
              minHeight: 40, borderRadius: 2, border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)", color: "rgba(240,240,240,0.3)",
              fontFamily: "'Press Start 2P', monospace", fontWeight: 800, fontSize: "0.5rem",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              OUT OF STOCK
            </div>
          ) : inCart ? (
            <button onClick={handleRemove} style={{
              width: "100%", minHeight: 40, borderRadius: 2, border: "1px solid rgba(255,45,45,0.4)",
              background: "rgba(255,45,45,0.1)", color: "#ff4d4d",
              fontFamily: "'Press Start 2P', monospace", fontWeight: 800, cursor: "pointer", fontSize: "0.5rem",
              transition: "background .2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
              REMOVE
            </button>
          ) : (
            <button onClick={handleAdd} style={{
              width: "100%", minHeight: 40, borderRadius: 2, border: "none",
              color: "#050505", background: hovered ? "#fff" : "#FFD700",
              fontFamily: "'Press Start 2P', monospace", fontWeight: 800, cursor: "pointer", fontSize: "0.5rem",
              transition: "background .2s", boxShadow: hovered ? "0 0 16px rgba(255,215,0,0.5)" : "none",
            }}>
              + ADD
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes burstFly {
          0% { opacity: 1; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--vx),var(--vy)) scale(0.4); }
        }
      `}</style>
    </article>
  );
}
