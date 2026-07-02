"use client";
import { useRef, useState, useEffect } from "react";

/*
  Playful 3D per-letter text.
  - Each letter is extruded with stacked text-shadows (pixel 3D depth)
  - Letters bounce with staggered wave on mount / in-view
  - Hovering a letter makes it pop + spin
  - Whole word tilts in 3D following the mouse
*/

export function Word3D({
  text,
  size = "clamp(1.4rem, 4.5vw, 3rem)",
  color = "#FFD700",
  depth = 6,
  wave = true,
}: {
  text: string;
  size?: string;
  color?: string;
  depth?: number;
  wave?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // build extruded shadow stack
  const shadows: string[] = [];
  for (let i = 1; i <= depth; i++) {
    shadows.push(`${i}px ${i}px 0 rgba(120,90,0,${0.9 - i * 0.1})`);
  }
  shadows.push(`${depth + 2}px ${depth + 4}px 18px rgba(0,0,0,0.6)`);

  return (
    <span
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ x: -py * 18, y: px * 22 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className="pixel"
      style={{
        display: "inline-block",
        fontSize: size,
        color,
        perspective: 600,
        transformStyle: "preserve-3d",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease-out",
        cursor: "default",
        lineHeight: 1.3,
      }}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="w3d-letter"
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            textShadow: shadows.join(","),
            animation: inView && wave
              ? `w3dPop 0.7s cubic-bezier(0.34, 1.6, 0.64, 1) ${i * 0.055}s both, w3dFloat 3.2s ease-in-out ${1 + i * 0.12}s infinite`
              : "none",
            transition: "transform 0.18s cubic-bezier(0.34, 1.8, 0.64, 1), color 0.18s",
          }}
          onPointerEnter={(e) => {
            const el = e.currentTarget;
            el.style.transform = `translateY(-14px) rotate(${(Math.random() - 0.5) * 24}deg) scale(1.25)`;
            el.style.color = "#fff";
          }}
          onPointerLeave={(e) => {
            const el = e.currentTarget;
            el.style.transform = "";
            el.style.color = "";
          }}
        >
          {ch}
        </span>
      ))}

      <style>{`
        @keyframes w3dPop {
          0%   { opacity: 0; transform: translateY(60px) rotateX(-90deg) scale(0.4); }
          60%  { opacity: 1; transform: translateY(-8px) rotateX(12deg) scale(1.08); }
          100% { opacity: 1; transform: translateY(0) rotateX(0) scale(1); }
        }
        @keyframes w3dFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
      `}</style>
    </span>
  );
}

/* Scroll-reveal wrapper: children flip up in 3D when scrolled into view */
export function Reveal3D({
  children,
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    from === "bottom" ? "translateY(70px) rotateX(-18deg)" :
    from === "left"   ? "translateX(-90px) rotateY(20deg)" :
                        "translateX(90px) rotateY(-20deg)";

  return (
    <div
      ref={ref}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
        transform: inView ? "none" : hidden,
        opacity: inView ? 1 : 0,
        transition: `transform 0.9s cubic-bezier(0.22, 1.2, 0.36, 1) ${delay}s, opacity 0.7s ease ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
