"use client";
import { useEffect, useRef, useState } from "react";
import { award } from "@/app/components/GameHUD";
import { sfx } from "@/app/lib/sfx";

/*
  Parallax floating pixel emojis — drift on their own and shift
  with mouse movement at different depths. Fills hero empty space.
*/

const SPRITES = [
  { emoji: "🎮", left: "8%",  top: "22%", size: "1.8rem", depth: 24, dur: 5.2 },
  { emoji: "👾", left: "86%", top: "18%", size: "1.5rem", depth: 40, dur: 4.1 },
  { emoji: "⭐", left: "13%", top: "68%", size: "1.2rem", depth: 55, dur: 6.0 },
  { emoji: "🕹️", left: "88%", top: "62%", size: "1.6rem", depth: 30, dur: 4.8 },
  { emoji: "☁️", left: "22%", top: "10%", size: "1.4rem", depth: 65, dur: 7.5 },
  { emoji: "☁️", left: "72%", top: "8%",  size: "1.1rem", depth: 80, dur: 8.2 },
  { emoji: "🏆", left: "5%",  top: "44%", size: "1.3rem", depth: 46, dur: 5.6 },
  { emoji: "💾", left: "93%", top: "40%", size: "1.1rem", depth: 70, dur: 6.6 },
];

export default function FloatingPixels() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [popped, setPopped] = useState<Set<number>>(new Set());

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      wrap.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const d = parseFloat(el.dataset.depth || "30");
        el.style.translate = `${-cx * d}px ${-cy * d}px`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {SPRITES.map((s, i) => popped.has(i) ? null : (
        <span
          key={i}
          data-depth={s.depth}
          onPointerDown={() => {
            setPopped((p) => new Set(p).add(i));
            sfx.smash();
            award(2, "✨ PIXEL POP");
            setTimeout(() => setPopped((p) => { const n = new Set(p); n.delete(i); return n; }), 9000);
          }}
          role="button"
          aria-label="pop pixel"
          style={{
            position: "absolute", left: s.left, top: s.top,
            fontSize: s.size, opacity: 0.55,
            filter: "drop-shadow(0 0 8px rgba(255,215,0,0.35)) saturate(0.9)",
            willChange: "translate",
            pointerEvents: "auto", cursor: "pointer",
          }}
        >
          <span style={{ display: "inline-block", animation: `fpDrift ${s.dur}s ease-in-out ${i * 0.6}s infinite` }}>
            {s.emoji}
          </span>
        </span>
      ))}
      <style>{`
        @keyframes fpDrift {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50%      { transform: translateY(-16px) rotate(6deg); }
        }
      `}</style>
    </div>
  );
}
