"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/*
  SIXCLOUDS arcade gamification layer.
  - XP score persisted in localStorage, level system (NOOB → LEGEND)
  - XP bar under navbar doubles as scroll progress glow
  - Floating pixel coins spawn randomly — click to collect
  - Achievement toasts for milestones, section exploration, secrets
  - Anywhere in the app: window.dispatchEvent(new CustomEvent("sc-award",
      { detail: { xp: 25, reason: "SPIN MASTER" } }))
*/

export function award(xp: number, reason: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sc-award", { detail: { xp, reason } }));
}

const LEVELS = [
  { at: 0,    name: "NOOB"   },
  { at: 100,  name: "ROOKIE" },
  { at: 250,  name: "PRO"    },
  { at: 500,  name: "ELITE"  },
  { at: 1000, name: "LEGEND" },
];

const SECTION_XP: Record<string, number> = {
  about: 10, features: 10, "add-ons": 15, arcade: 15, gallery: 15, book: 25,
};

type Toast = { id: number; text: string; xp: number };
type Coin = { id: number; x: number; y: number };

export default function GameHUD() {
  const [xp, setXp] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [scrollP, setScrollP] = useState(0);
  const [bump, setBump] = useState(false);
  const counter = useRef(0);
  const xpRef = useRef(0);
  const seen = useRef<Set<string>>(new Set());
  const logoClicks = useRef(0);

  const pushToast = useCallback((text: string, amount: number) => {
    const id = ++counter.current;
    setToasts((t) => [...t.slice(-3), { id, text, xp: amount }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const gain = useCallback((amount: number, reason: string) => {
    xpRef.current += amount;
    setXp(xpRef.current);
    localStorage.setItem("sc-xp", String(xpRef.current));
    pushToast(reason, amount);
    setBump(true);
    setTimeout(() => setBump(false), 350);
  }, [pushToast]);

  /* load saved XP + listen for awards */
  useEffect(() => {
    xpRef.current = parseInt(localStorage.getItem("sc-xp") ?? "0", 10) || 0;
    setXp(xpRef.current);
    try { seen.current = new Set(JSON.parse(localStorage.getItem("sc-seen") ?? "[]")); } catch {}

    const onAward = (e: Event) => {
      const { xp: amount, reason } = (e as CustomEvent).detail;
      gain(amount, reason);
    };
    window.addEventListener("sc-award", onAward);
    return () => window.removeEventListener("sc-award", onAward);
  }, [gain]);

  /* scroll progress + section exploration XP */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollP(Math.min(1, window.scrollY / Math.max(1, max)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = en.target.id;
        if (seen.current.has(id)) return;
        seen.current.add(id);
        localStorage.setItem("sc-seen", JSON.stringify([...seen.current]));
        gain(SECTION_XP[id] ?? 10, `AREA FOUND: ${id.toUpperCase()}`);
      });
    }, { threshold: 0.35 });
    Object.keys(SECTION_XP).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, [gain]);

  /* floating pixel coins */
  useEffect(() => {
    const spawn = () => {
      if (document.hidden) return;
      const id = ++counter.current;
      setCoins((c) => c.length >= 2 ? c : [...c, {
        id,
        x: 8 + Math.random() * 80,
        y: 18 + Math.random() * 60,
      }]);
      setTimeout(() => setCoins((c) => c.filter((k) => k.id !== id)), 6000);
    };
    const iv = setInterval(spawn, 8000);
    const t = setTimeout(spawn, 3500);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, []);

  /* secret: click the navbar logo 6 times */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a[href='#home']");
      if (!target) return;
      logoClicks.current++;
      if (logoClicks.current === 6 && !seen.current.has("secret6")) {
        seen.current.add("secret6");
        localStorage.setItem("sc-seen", JSON.stringify([...seen.current]));
        gain(100, "🔓 SECRET: SIX CLICKS!");
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [gain]);

  const level = [...LEVELS].reverse().find((l) => xp >= l.at) ?? LEVELS[0];
  const next = LEVELS.find((l) => l.at > xp);
  const levelP = next ? (xp - level.at) / (next.at - level.at) : 1;

  return (
    <>
      {/* XP / scroll bar under navbar */}
      <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 999, height: 3, background: "rgba(255,215,0,0.08)", pointerEvents: "none" }}>
        <div style={{
          width: `${scrollP * 100}%`, height: "100%",
          background: "linear-gradient(90deg, #FFD700, #39FF14)",
          boxShadow: "0 0 12px rgba(255,215,0,0.6)",
          transition: "width 0.1s linear",
        }} />
      </div>

      {/* Score chip — bottom left */}
      <div style={{
        position: "fixed", bottom: 24, left: 24, zIndex: 500,
        background: "rgba(5,5,5,0.92)", border: "2px solid rgba(255,215,0,0.5)",
        padding: "10px 14px", display: "flex", flexDirection: "column", gap: 6,
        transform: bump ? "scale(1.12) rotate(-2deg)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34, 1.8, 0.64, 1)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
        clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: "1rem" }}>🕹️</span>
          <span className="pixel" style={{ fontSize: "0.6rem", color: "#FFD700" }}>{xp} XP</span>
          <span className="pixel" style={{ fontSize: "0.45rem", color: "#39FF14", border: "1px solid rgba(57,255,20,0.4)", padding: "3px 6px" }}>{level.name}</span>
        </div>
        <div style={{ width: "100%", height: 4, background: "rgba(255,215,0,0.12)" }}>
          <div style={{ width: `${levelP * 100}%`, height: "100%", background: "#FFD700", transition: "width 0.4s ease" }} />
        </div>
        {next && (
          <span className="mono" style={{ fontSize: "0.52rem", color: "rgba(240,240,240,0.4)" }}>
            {next.at - xp} XP to {next.name}
          </span>
        )}
      </div>

      {/* Floating coins */}
      {coins.map((c) => (
        <button
          key={c.id}
          onClick={() => {
            setCoins((k) => k.filter((x) => x.id !== c.id));
            gain(15, "💰 COIN GET!");
          }}
          aria-label="Collect coin"
          style={{
            position: "fixed", left: `${c.x}vw`, top: `${c.y}vh`, zIndex: 490,
            width: 44, height: 44, border: "none", background: "none",
            cursor: "pointer", fontSize: "1.8rem", padding: 0,
            animation: "coinBob 1.2s ease-in-out infinite, coinIn 0.4s cubic-bezier(0.34,1.8,0.64,1) both",
            filter: "drop-shadow(0 0 10px rgba(255,215,0,0.8))",
          }}
        >
          🪙
        </button>
      ))}

      {/* XP toasts — above score chip */}
      <div style={{ position: "fixed", bottom: 118, left: 24, zIndex: 500, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
        {toasts.map((t) => (
          <div key={t.id} className="pixel" style={{
            background: "rgba(5,5,5,0.95)", border: "1px solid rgba(57,255,20,0.5)",
            color: "#39FF14", fontSize: "0.5rem", padding: "9px 14px", lineHeight: 1.6,
            animation: "xpToast 2.6s ease both",
            boxShadow: "0 4px 20px rgba(57,255,20,0.15)",
          }}>
            +{t.xp} XP · {t.text}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes coinBob { 0%,100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-10px) rotate(6deg); } }
        @keyframes coinIn { 0% { opacity: 0; transform: scale(0); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes xpToast {
          0%   { opacity: 0; transform: translateX(-30px) scale(0.8); }
          12%  { opacity: 1; transform: translateX(0) scale(1.05); }
          18%  { transform: translateX(0) scale(1); }
          80%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-14px); }
        }
        @media (max-width: 640px) {
          /* keep HUD compact on mobile */
        }
      `}</style>
    </>
  );
}
