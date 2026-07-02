"use client";
import { useEffect } from "react";
import { sfx } from "@/app/lib/sfx";

/*
  Global micro-interactions:
  - pixel spark burst at every tap/click (desktop + mobile)
  - magnetic pull on .pixel-btn (desktop pointer only)
  - synth click sound on interactive elements
  - haptic tick on mobile taps of buttons/links
*/

export default function ClickFX() {
  /* tap sparks + sounds + haptics */
  useEffect(() => {
    const layer = document.createElement("div");
    layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9500;overflow:hidden";
    document.body.appendChild(layer);

    const COLORS = ["#FFD700", "#39FF14", "#FFFFFF", "#FFA500"];

    const burst = (x: number, y: number, big: boolean) => {
      const n = big ? 10 : 6;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        const size = 3 + Math.random() * (big ? 5 : 3);
        const ang = (i / n) * Math.PI * 2 + Math.random() * 0.6;
        const dist = 18 + Math.random() * (big ? 46 : 28);
        s.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${COLORS[i % COLORS.length]};box-shadow:0 0 6px ${COLORS[i % COLORS.length]};`;
        s.animate(
          [
            { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
            { transform: `translate(${Math.cos(ang) * dist - 50 / size}px, ${Math.sin(ang) * dist}px) scale(0.2) rotate(${Math.random() * 180}deg)`, opacity: 0 },
          ],
          { duration: 380 + Math.random() * 220, easing: "cubic-bezier(0.2,0.8,0.3,1)" }
        ).onfinish = () => s.remove();
        layer.appendChild(s);
      }
    };

    const onDown = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest("a, button, [role=button], input, select, textarea");
      burst(e.clientX, e.clientY, !!interactive);
      if (interactive) {
        sfx.click();
        if (navigator.vibrate) navigator.vibrate(8);
      }
    };
    window.addEventListener("pointerdown", onDown, { passive: true });

    return () => { window.removeEventListener("pointerdown", onDown); layer.remove(); };
  }, []);

  /* magnetic buttons — fine pointers only */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const seen = new WeakSet<HTMLElement>();

    const attach = (el: HTMLElement) => {
      if (seen.has(el)) return;
      seen.add(el);
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = `${dx * 0.18}px ${dy * 0.22}px`;
      };
      const onLeave = () => {
        el.style.transition = "translate 0.45s cubic-bezier(0.2,2.2,0.4,1)";
        el.style.translate = "0px 0px";
        setTimeout(() => (el.style.transition = ""), 450);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    };

    const onOver = (e: PointerEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>(".pixel-btn");
      if (btn) { attach(btn); sfx.hover(); }
    };
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => window.removeEventListener("pointerover", onOver);
  }, []);

  return null;
}
