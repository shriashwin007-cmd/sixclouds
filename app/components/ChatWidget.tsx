"use client";
import { useState } from "react";

const WA_NUMBER = "919XXXXXXXXXX"; // Replace with SIXCLOUDS number

const FAQS = [
  { q: "What are your hours?", a: "We're open daily from 3 PM to 11 PM. Come anytime!" },
  { q: "Do you have private rooms?", a: "Yes! We have private rooms perfect for groups of 4. Book in advance to secure your slot." },
  { q: "How do I book a session?", a: "Use the booking form on this website or WhatsApp us directly. We'll confirm your slot quickly." },
  { q: "Where are you located?", a: "We're at Pallavan Salai, Kennedy Square, Perambur, Chennai – 600011." },
  { q: "What's the price per hour?", a: "Pricing varies by session. Message us on WhatsApp and we'll give you the best deal!" },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I want to book a session at SIXCLOUDS Gaming Cafe.")}`;

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => { setOpen(!open); setSelected(null); }}
        aria-label="Chat with us"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 500,
          width: 56, height: 56,
          background: "#FFD700",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.5rem",
          boxShadow: "0 4px 24px rgba(255,215,0,0.5)",
          clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
          transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 92, right: 24, zIndex: 499,
          width: "min(320px, calc(100vw - 32px))",
          background: "#0a0a0a", border: "1px solid rgba(255,215,0,0.2)",
          overflow: "hidden",
          animation: "floatUp 0.25s ease",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
        }}>
          {/* Header */}
          <div style={{ background: "#FFD700", padding: "14px 18px" }}>
            <div className="pixel" style={{ fontSize: "0.55rem", color: "#050505", marginBottom: 4 }}>SIXCLOUDS SUPPORT</div>
            <div className="mono" style={{ fontSize: "0.7rem", color: "#333" }}>Ask us anything! 🎮</div>
          </div>

          {/* FAQs */}
          <div style={{ padding: 16, maxHeight: 300, overflowY: "auto" }}>
            {selected !== null ? (
              <div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "#FFD700", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", marginBottom: 12 }}>← Back</button>
                <div style={{ background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.15)", padding: "14px 16px" }}>
                  <p className="pixel" style={{ fontSize: "0.5rem", color: "#FFD700", lineHeight: 1.7, marginBottom: 10 }}>{FAQS[selected].q}</p>
                  <p className="mono" style={{ color: "rgba(240,240,240,0.8)", fontSize: "0.78rem", lineHeight: 1.7 }}>{FAQS[selected].a}</p>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <p className="mono" style={{ fontSize: "0.65rem", color: "rgba(240,240,240,0.5)", marginBottom: 4 }}>Common questions:</p>
                {FAQS.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    style={{
                      textAlign: "left", background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,215,0,0.12)", padding: "10px 14px",
                      color: "rgba(240,240,240,0.8)", cursor: "pointer",
                      fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,215,0,0.4)"; e.currentTarget.style.background = "rgba(255,215,0,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,215,0,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  >
                    &gt; {faq.q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,215,0,0.1)" }}>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="pixel-btn" style={{ display: "block", textAlign: "center", fontSize: "0.5rem", padding: "12px" }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
