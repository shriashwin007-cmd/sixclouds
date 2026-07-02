"use client";
import { useEffect, useRef, useState } from "react";
import { Word3D } from "@/app/components/Text3D";
import { award } from "@/app/components/GameHUD";

/*
  3D ring carousel — 6 photo panels arranged on a cylinder.
  Auto-rotates; drag (or swipe) to spin with momentum; click a panel to open lightbox.
*/

const ITEMS = [
  { label: "Gaming Lounge",      img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542712/gaming_lounge_setup_1_kigpow.png" },
  { label: "Console Setup",      img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542714/gaming_lounge_setup_2_swhsrh.png" },
  { label: "Joker Controller",   img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542716/joker_ps5_controller_jxdrof.png" },
  { label: "Gaming Mural",       img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542712/forza_horizon_6_mural_wouom2.png" },
  { label: "Custom Controllers", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542711/fortnite_and_joker_ps5_controllers_xc7gxl.png" },
  { label: "Wall Art",           img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781542718/red_dead_redemption_mural_dj8ar8.png" },
];

const N = ITEMS.length;

export default function Gallery3D() {
  const ringRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const velocity = useRef(0.12);      // idle auto-spin deg/frame
  const dragging = useRef(false);
  const lastX = useRef(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [radius, setRadius] = useState(430);

  useEffect(() => {
    const setR = () => setRadius(window.innerWidth < 640 ? 240 : window.innerWidth < 1000 ? 330 : 430);
    setR();
    window.addEventListener("resize", setR);
    return () => window.removeEventListener("resize", setR);
  }, []);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (!dragging.current) {
        angle.current += velocity.current;
        // decay drag momentum back to idle spin
        velocity.current += (0.12 - velocity.current) * 0.02;
      }
      const ring = ringRef.current;
      if (ring) ring.style.transform = `translateZ(-${radius}px) rotateY(${angle.current}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [radius]);

  const spinAwarded = useRef(false);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (!spinAwarded.current) {
      spinAwarded.current = true;
      award(20, "🌀 SPIN MASTER");
    }
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    angle.current += dx * 0.35;
    velocity.current = dx * 0.35;
  };
  const onUp = () => { dragging.current = false; };

  return (
    <section id="gallery" style={{ padding: "100px 0 120px", position: "relative", overflow: "hidden" }}>
      <div className="wrap" style={{ textAlign: "center", marginBottom: 20 }}>
        <span className="section-tag">&gt; gallery — drag to spin</span>
        <Word3D text="THE ARENA" size="clamp(1rem, 2.6vw, 1.5rem)" />
        <p style={{ color: "rgba(240,240,240,0.5)", marginTop: 14, fontSize: "0.9rem" }}>
          A glimpse inside SIXCLOUDS · grab it, spin it 🕹️
        </p>
      </div>

      {/* 3D stage */}
      <div
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{
          height: "min(52vw, 420px)",
          minHeight: 300,
          perspective: 1100,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "grab", touchAction: "pan-y",
          userSelect: "none",
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: "relative",
            width: "min(60vw, 380px)",
            height: "min(40vw, 260px)",
            transformStyle: "preserve-3d",
          }}
        >
          {ITEMS.map((item, i) => (
            <figure
              key={item.label}
              onClick={() => { if (Math.abs(velocity.current) < 1.5) setLightbox(i); }}
              style={{
                position: "absolute", inset: 0, margin: 0,
                transform: `rotateY(${(360 / N) * i}deg) translateZ(${radius}px)`,
                border: "2px solid rgba(255,215,0,0.35)",
                background: "#0a0a0a",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 24px rgba(255,215,0,0.08)",
                backfaceVisibility: "hidden",
                cursor: "pointer",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt={item.label} draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
              <figcaption className="mono" style={{
                position: "absolute", left: 0, right: 0, bottom: 0,
                padding: "18px 14px 10px",
                fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#FFD700",
                background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
              }}>
                ★ {item.label}
              </figcaption>
              {/* pixel corners */}
              {[{ top: 0, left: 0 }, { top: 0, right: 0 }, { bottom: 0, left: 0 }, { bottom: 0, right: 0 }].map((p, j) => (
                <span key={j} style={{ position: "absolute", ...p, width: 8, height: 8, background: "#FFD700" }} />
              ))}
            </figure>
          ))}
        </div>
      </div>

      {/* reflection floor */}
      <div aria-hidden style={{
        height: 90, marginTop: -30,
        background: "radial-gradient(ellipse 50% 90% at 50% 0%, rgba(255,215,0,0.10), transparent 70%)",
        maskImage: "linear-gradient(to bottom, black, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        pointerEvents: "none",
      }} />

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 9000,
          background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24, cursor: "zoom-out",
        }}>
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "85vh", animation: "pixelIn 0.25s ease both" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ITEMS[lightbox].img} alt={ITEMS[lightbox].label}
              style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", border: "2px solid rgba(255,215,0,0.4)" }}
              onClick={(e) => e.stopPropagation()} />
            <div className="mono" style={{ textAlign: "center", marginTop: 12, fontSize: "0.7rem", color: "#FFD700", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              ★ {ITEMS[lightbox].label}
            </div>
            <button onClick={() => setLightbox(null)} style={{
              position: "absolute", top: -16, right: -16, width: 36, height: 36,
              background: "#FFD700", border: "none", color: "#050505",
              fontFamily: "'Press Start 2P', monospace", fontSize: "0.9rem",
              cursor: "pointer", display: "grid", placeItems: "center",
            }}>✕</button>
          </div>
        </div>
      )}
    </section>
  );
}
