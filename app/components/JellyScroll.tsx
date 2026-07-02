"use client";
import { useEffect, useRef, ReactNode } from "react";

/*
  Jelly scroll — content subtly skews/stretches with scroll velocity,
  springing back when scrolling stops. Playful, physical feel.
*/
export default function JellyScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let vel = 0;
    let raf = 0;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const maxSkew = coarse ? 0.8 : 1.4;
    const mult = coarse ? 0.012 : 0.018;

    const loop = () => {
      const y = window.scrollY;
      const delta = y - last;
      last = y;
      vel += (delta - vel) * 0.1;

      const el = ref.current;
      if (el) {
        const skew = Math.max(-maxSkew, Math.min(maxSkew, vel * mult));
        const stretch = 1 + Math.min(0.008, Math.abs(vel) * 0.00006);
        el.style.transform = `skewY(${skew}deg) scaleY(${stretch})`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} style={{ willChange: "transform", transformOrigin: "50% 50%" }}>
      {children}
    </div>
  );
}
