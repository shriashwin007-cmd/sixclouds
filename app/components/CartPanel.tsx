"use client";
import { useCart } from "@/app/context/CartContext";

export default function CartPanel() {
  const { cart, totalItems, totalPrice, updateQty, removeItem, clearCart, isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div onClick={closeCart} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, backdropFilter: "blur(4px)" }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
        width: "min(400px, 100vw)",
        background: "#0a0a0a",
        borderLeft: "1px solid rgba(255,215,0,0.2)",
        display: "flex", flexDirection: "column",
        animation: "floatUp 0.25s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,215,0,0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="pixel" style={{ fontSize: "0.65rem", color: "#FFD700" }}>
            🛒 CART ({totalItems})
          </span>
          <button onClick={closeCart} style={{ background: "none", border: "none", color: "rgba(240,240,240,0.6)", fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 60 }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎮</div>
              <p className="pixel" style={{ fontSize: "0.55rem", color: "rgba(240,240,240,0.4)", lineHeight: 1.8 }}>CART IS EMPTY</p>
            </div>
          ) : cart.map((item) => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.1)",
              padding: "12px 14px",
            }}>
              <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{item.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="pixel" style={{ fontSize: "0.5rem", color: "#F0F0F0", lineHeight: 1.6, marginBottom: 4 }}>{item.name}</div>
                <div className="mono" style={{ fontSize: "0.72rem", color: "#FFD700" }}>₹{item.price * item.quantity}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ width: 28, height: 28, background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", color: "#FFD700", cursor: "pointer", fontSize: "1rem", display: "grid", placeItems: "center" }}>−</button>
                <span className="mono" style={{ width: 22, textAlign: "center", color: "#F0F0F0", fontSize: "0.85rem" }}>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)} style={{ width: 28, height: 28, background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.25)", color: "#FFD700", cursor: "pointer", fontSize: "1rem", display: "grid", placeItems: "center" }}>+</button>
                <button onClick={() => removeItem(item.id)} style={{ width: 28, height: 28, background: "rgba(255,45,45,0.1)", border: "1px solid rgba(255,45,45,0.25)", color: "#ff4d4d", cursor: "pointer", fontSize: "0.7rem", display: "grid", placeItems: "center" }}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "20px", borderTop: "1px solid rgba(255,215,0,0.12)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span className="mono" style={{ color: "rgba(240,240,240,0.6)", fontSize: "0.85rem" }}>Add-ons total</span>
              <span className="pixel" style={{ color: "#FFD700", fontSize: "0.7rem" }}>₹{totalPrice}</span>
            </div>
            <p className="mono" style={{ fontSize: "0.68rem", color: "rgba(240,240,240,0.4)", marginBottom: 16, lineHeight: 1.6 }}>
              Add-ons are paid at the counter. Session fee collected separately.
            </p>
            <button onClick={clearCart} style={{
              width: "100%", padding: "12px", background: "none",
              border: "1px solid rgba(255,45,45,0.3)", color: "rgba(240,240,240,0.5)",
              fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem",
              cursor: "pointer",
            }}>
              CLEAR CART
            </button>
          </div>
        )}
      </div>
    </>
  );
}
