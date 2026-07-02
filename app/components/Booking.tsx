"use client";
import { useState } from "react";

const SESSIONS = ["1 Hour", "2 Hours", "3 Hours", "Full Evening (3PM–11PM)"];
const ROOM_TYPES = ["Any Available", "Private Room (Group of 4)"];

type Field = { name: string; phone: string; date: string; session: string; room: string; players: string; note: string };
const INIT: Field = { name: "", phone: "", date: "", session: "", room: "", players: "", note: "" };

export default function Booking() {
  const [form, setForm] = useState<Field>(INIT);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function set(k: keyof Field, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.session) return;
    setSending(true);

    const msg = encodeURIComponent(
      `*New Booking — SIXCLOUDS Gaming Cafe*\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Date: ${form.date}\n` +
      `Session: ${form.session}\n` +
      `Room: ${form.room || "Any available"}\n` +
      `Players: ${form.players || "Not specified"}\n` +
      `Note: ${form.note || "None"}\n\n` +
      `_Booked via sixclouds website_`
    );

    // Replace with actual WhatsApp number once provided
    const WA_NUMBER = "919XXXXXXXXXX";
    setTimeout(() => {
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
      setSent(true);
      setSending(false);
    }, 400);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,215,0,0.2)",
    color: "#F0F0F0",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.85rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "0.65rem",
    color: "#39FF14",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 8,
    display: "block",
  };

  if (sent) {
    return (
      <section id="book" style={{ padding: "100px 0", background: "#080808" }}>
        <div className="wrap" style={{ textAlign: "center", maxWidth: 500, margin: "0 auto" }}>
          <div className="pixel" style={{ fontSize: "2rem", color: "#39FF14", marginBottom: 24 }}>✓</div>
          <h3 className="pixel" style={{ fontSize: "0.9rem", color: "#FFD700", lineHeight: 1.8, marginBottom: 16 }}>
            BOOKING REQUEST SENT!
          </h3>
          <p className="mono" style={{ color: "rgba(240,240,240,0.6)", fontSize: "0.85rem", lineHeight: 1.8 }}>
            We&apos;ve opened WhatsApp with your booking details.<br />
            We&apos;ll confirm your slot shortly. Game on! 🎮
          </p>
          <button
            onClick={() => { setForm(INIT); setSent(false); }}
            className="pixel-btn"
            style={{ marginTop: 32, fontSize: "0.55rem" }}
          >
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

        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <label style={labelStyle}>Your Name *</label>
              <input style={inputStyle} placeholder="Player name" value={form.name} onChange={(e) => set("name", e.target.value)} required
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input style={inputStyle} placeholder="+91 XXXXX XXXXX" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.2)")}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <label style={labelStyle}>Date *</label>
              <input style={inputStyle} type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required
                min={new Date().toISOString().split("T")[0]}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.2)")}
              />
            </div>
            <div>
              <label style={labelStyle}>Session *</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.session} onChange={(e) => set("session", e.target.value)} required
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.2)")}
              >
                <option value="" style={{ background: "#111" }}>Choose session</option>
                {SESSIONS.map((s) => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <label style={labelStyle}>Room Type</label>
              <select style={{ ...inputStyle, cursor: "pointer" }} value={form.room} onChange={(e) => set("room", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.2)")}
              >
                <option value="" style={{ background: "#111" }}>Any available</option>
                {ROOM_TYPES.map((r) => <option key={r} value={r} style={{ background: "#111" }}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>No. of Players</label>
              <input style={inputStyle} placeholder="e.g. 2" type="number" min="1" max="10" value={form.players} onChange={(e) => set("players", e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.6)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.2)")}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Additional Note</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: 90 }}
              placeholder="Any special requests or game preferences..."
              value={form.note}
              onChange={(e) => set("note", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,215,0,0.2)")}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="pixel-btn"
            style={{ alignSelf: "center", fontSize: "0.55rem", padding: "16px 36px", opacity: sending ? 0.7 : 1 }}
          >
            {sending ? "SENDING..." : "Send via WhatsApp →"}
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 560px) {
          #book form > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1) sepia(1) saturate(3) hue-rotate(10deg); }
        select option { background: #111; color: #F0F0F0; }
      `}</style>
    </section>
  );
}
