"use client";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

const SESSIONS = ["1 Hour – ₹100", "2 Hours – ₹180", "3 Hours – ₹250", "Full Evening (3PM–11PM) – ₹599"];
const ROOM_TYPES = ["Any Available", "Private Room (Group of 4)"];

type Field = { name: string; phone: string; date: string; session: string; room: string; players: string; note: string };
const INIT: Field = { name: "", phone: "", date: "", session: "", room: "", players: "", note: "" };

export default function Booking() {
  const [form, setForm] = useState<Field>(INIT);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { cart } = useCart();

  function set(k: keyof Field, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.session) return;
    setSending(true);

    const addons = cart.map((c) => ({ id: c.id, qty: c.quantity }));

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, addons }),
      });
    } catch { /* continue to WhatsApp even if API fails */ }

    const cartSummary = cart.length > 0
      ? `\nAdd-ons: ${cart.map((c) => `${c.name} ×${c.quantity}`).join(", ")}`
      : "";

    const msg = encodeURIComponent(
      `*New Booking — SIXCLOUDS Gaming Cafe*\n\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nSession: ${form.session}\n` +
      `Room: ${form.room || "Any available"}\nPlayers: ${form.players || "Not specified"}${cartSummary}\n` +
      `Note: ${form.note || "None"}\n\n_via sixclouds website_`
    );

    const WA = "919XXXXXXXXXX";
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
    setSending(false);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.2)",
    color: "#F0F0F0", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.85rem", outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem",
    color: "#39FF14", letterSpacing: "0.12em", textTransform: "uppercase",
    marginBottom: 8, display: "block",
  };

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "rgba(255,215,0,0.6)");
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "rgba(255,215,0,0.2)");

  if (sent) {
    return (
      <section id="book" style={{ padding: "100px 0", background: "#080808" }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 520, margin: "0 auto" }}>
          <div className="pixel" style={{ fontSize: "2.5rem", color: "#39FF14", marginBottom: 24 }}>✓</div>
          <h3 className="pixel" style={{ fontSize: "0.75rem", color: "#FFD700", lineHeight: 2, marginBottom: 16 }}>BOOKING REQUEST SENT!</h3>
          <p className="mono" style={{ color: "rgba(240,240,240,0.6)", fontSize: "0.85rem", lineHeight: 1.8 }}>
            WhatsApp opened with your details.<br />We&apos;ll confirm your slot shortly. Game on! 🎮
          </p>
          <button onClick={() => { setForm(INIT); setSent(false); }} className="pixel-btn" style={{ marginTop: 32, fontSize: "0.5rem" }}>
            Book Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="book" style={{ padding: "100px 0", background: "#080808" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-tag">&gt; book a session</span>
          <h2 className="pixel" style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#FFD700", lineHeight: 1.6 }}>
            RESERVE<br />YOUR SLOT
          </h2>
          <p style={{ color: "rgba(240,240,240,0.5)", marginTop: 12, fontSize: "0.9rem" }}>
            Open daily · 3 PM – 11 PM · Kennedy Square, Perambur
          </p>
        </div>

        {cart.length > 0 && (
          <div style={{ maxWidth: 640, margin: "0 auto 24px", background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.25)", padding: "14px 18px" }}>
            <span className="mono" style={{ color: "#FFD700", fontSize: "0.75rem" }}>
              🛒 {cart.length} add-on{cart.length > 1 ? "s" : ""} in cart — will be included in your booking
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input style={inputStyle} placeholder="Player name" value={form.name} onChange={(e) => set("name", e.target.value)} required onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input style={inputStyle} placeholder="+91 XXXXX XXXXX" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required onFocus={focus} onBlur={blur} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <label style={labelStyle}>Date *</label>
              <input style={inputStyle} type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => set("date", e.target.value)} required onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={labelStyle}>Session *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.session} onChange={(e) => set("session", e.target.value)} required onFocus={focus} onBlur={blur}>
                <option value="" style={{ background: "#111" }}>Choose session</option>
                {SESSIONS.map((s) => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <label style={labelStyle}>Room Type</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.room} onChange={(e) => set("room", e.target.value)} onFocus={focus} onBlur={blur}>
                <option value="" style={{ background: "#111" }}>Any available</option>
                {ROOM_TYPES.map((r) => <option key={r} value={r} style={{ background: "#111" }}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>No. of Players</label>
              <input style={inputStyle} placeholder="e.g. 2" type="number" min="1" max="10" value={form.players} onChange={(e) => set("players", e.target.value)} onFocus={focus} onBlur={blur} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Additional Note</label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 90 }} placeholder="Game preferences, special requests..." value={form.note} onChange={(e) => set("note", e.target.value)} onFocus={focus} onBlur={blur} />
          </div>
          <button type="submit" disabled={sending} className="pixel-btn" style={{ alignSelf: "center", fontSize: "0.52rem", padding: "16px 40px", opacity: sending ? 0.7 : 1 }}>
            {sending ? "SENDING..." : "Send via WhatsApp →"}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 560px) { #book form > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; } }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1) sepia(1) saturate(3) hue-rotate(10deg); }
      `}</style>
    </section>
  );
}
