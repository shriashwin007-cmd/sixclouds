"use client";
import { useRef, ReactNode } from "react";

/*
  3D tilt-physics wrapper with moving glare. Works with mouse;
  on touch it gives a press-squish instead.
*/
export default function TiltCard({ children, max = 10, style }: { children: ReactNode; max?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(700px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale(1.02)`;
    const glare = glareRef.current;
    if (glare) {
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,215,0,0.16), transparent 55%)`;
    }
  };

  const reset = () => {
    const el = ref.current;
    if (el) {
      el.style.transition = "transform 0.5s cubic-bezier(0.2,1.8,0.4,1)";
      el.style.transform = "";
      setTimeout(() => { if (el) el.style.transition = ""; }, 500);
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  const press = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    const el = ref.current;
    if (el) el.style.transform = "scale(0.965)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerDown={press}
      onPointerUp={reset}
      onPointerCancel={reset}
      style={{ willChange: "transform", position: "relative", ...style }}
    >
      {children}
      <div ref={glareRef} aria-hidden style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.3s", pointerEvents: "none" }} />
    </div>
  );
}
