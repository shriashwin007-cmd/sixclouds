"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import SectionHeader from "@/app/components/SectionHeader";
import { award } from "@/app/components/GameHUD";
import { sfx } from "@/app/lib/sfx";

/*
  SNACK SMASH — 20-second whack-a-target arcade mini game.
  Targets pop in a 4x3 grid: snacks/controllers = +10, gold star = +30, bomb = -15.
  Best score saved locally; final score / 2 awarded as site XP.
*/

const GOOD = ["🎮", "👾", "🍟", "🥤", "🕹️"];
const CELLS = 12;
const ROUND = 20;

type Target = { emoji: string; kind: "good" | "star" | "bomb" } | null;

export default function MiniGame() {
  const [grid, setGrid] = useState<Target[]>(Array(CELLS).fill(null));
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(ROUND);
  const [playing, setPlaying] = useState(false);
  const [best, setBest] = useState(0);
  const [over, setOver] = useState(false);
  const [pop, setPop] = useState<{ id: number; cell: number; text: string; color: string }[]>([]);
  const scoreRef = useRef(0);
  const popId = useRef(0);

  useEffect(() => {
    setBest(parseInt(localStorage.getItem("sc-best") ?? "0", 10) || 0);
  }, []);

  const start = useCallback(() => {
    scoreRef.current = 0;
    setScore(0);
    setTime(ROUND);
    setOver(false);
    setPlaying(true);
    setGrid(Array(CELLS).fill(null));
    sfx.start();
  }, []);

  /* game loop */
  useEffect(() => {
    if (!playing) return;

    const spawn = setInterval(() => {
      setGrid((g) => {
        const empty = g.map((v, i) => (v === null ? i : -1)).filter((i) => i >= 0);
        if (empty.length === 0) return g;
        const cell = empty[Math.floor(Math.random() * empty.length)];
        const roll = Math.random();
        const target: Target =
          roll < 0.68 ? { emoji: GOOD[Math.floor(Math.random() * GOOD.length)], kind: "good" } :
          roll < 0.84 ? { emoji: "⭐", kind: "star" } :
                        { emoji: "💣", kind: "bomb" };
        const next = [...g];
        next[cell] = target;
        setTimeout(() => {
          setGrid((g2) => {
            const n2 = [...g2];
            if (n2[cell] === target) n2[cell] = null;
            return n2;
          });
        }, 950);
        return next;
      });
    }, 480);

    const tick = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setPlaying(false);
          setOver(true);
          setGrid(Array(CELLS).fill(null));
          sfx.over();
          const final = scoreRef.current;
          setBest((b) => {
            const nb = Math.max(b, final);
            localStorage.setItem("sc-best", String(nb));
            return nb;
          });
          if (final > 0) award(Math.round(final / 2), "🎯 SNACK SMASH BONUS");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => { clearInterval(spawn); clearInterval(tick); };
  }, [playing]);

  const smash = (cell: number) => {
    if (!playing) return;
    const target = grid[cell];
    if (!target) return;
    const delta = target.kind === "good" ? 10 : target.kind === "star" ? 30 : -15;
    if (target.kind === "bomb") sfx.bomb();
    else if (target.kind === "star") sfx.coin();
    else sfx.smash();
    scoreRef.current = Math.max(0, scoreRef.current + delta);
    setScore(scoreRef.current);
    setGrid((g) => { const n = [...g]; n[cell] = null; return n; });

    const id = ++popId.current;
    setPop((p) => [...p, { id, cell, text: delta > 0 ? `+${delta}` : `${delta}`, color: delta > 0 ? "#39FF14" : "#ff4d4d" }]);
    setTimeout(() => setPop((p) => p.filter((x) => x.id !== id)), 600);

    if (navigator.vibrate) navigator.vibrate(delta > 0 ? 18 : 60);
  };

  return (
    <section id="arcade" style={{ padding: "110px 0", background: "rgba(4,4,4,0.7)", position: "relative", overflow: "hidden" }}>
      <div className="wrap">
        <SectionHeader index="04" tag="insert coin — free play" lines={["SNACK SMASH"]} watermark="ARCADE" />
      </div>
      <div className="wrap" style={{ textAlign: "center" }}>
        <p style={{ color: "rgba(240,240,240,0.5)", marginBottom: 28, fontSize: "0.9rem", marginTop: -24 }}>
          Smash the snacks &amp; controllers · ⭐ = +30 · avoid the 💣 · 20 seconds
        </p>

        {/* Scoreboard */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { label: "SCORE", value: score, color: "#FFD700" },
            { label: "TIME", value: `${time}s`, color: time <= 5 && playing ? "#ff4d4d" : "#39FF14" },
            { label: "BEST", value: best, color: "#F0F0F0" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.2)",
              padding: "10px 20px", minWidth: 92,
              animation: s.label === "TIME" && time <= 5 && playing ? "urgentPulse 0.5s ease infinite" : "none",
            }}>
              <div className="mono" style={{ fontSize: "0.55rem", color: "rgba(240,240,240,0.4)", letterSpacing: "0.14em", marginBottom: 4 }}>{s.label}</div>
              <div className="pixel" style={{ fontSize: "0.85rem", color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Game grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10,
          maxWidth: 480, margin: "0 auto 28px",
          padding: 14,
          background: "rgba(255,255,255,0.03)",
          border: "2px solid rgba(255,215,0,0.25)",
          position: "relative",
        }}>
          {/* pixel corners */}
          {[{ top: -5, left: -5 }, { top: -5, right: -5 }, { bottom: -5, left: -5 }, { bottom: -5, right: -5 }].map((p, i) => (
            <span key={i} style={{ position: "absolute", ...p, width: 10, height: 10, background: "#FFD700" }} />
          ))}

          {grid.map((target, i) => (
            <button
              key={i}
              onPointerDown={() => smash(i)}
              aria-label={`cell ${i}`}
              style={{
                aspectRatio: "1/1",
                background: target ? "rgba(255,215,0,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${target ? "rgba(255,215,0,0.45)" : "rgba(255,215,0,0.1)"}`,
                fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
                cursor: playing ? "crosshair" : "default",
                display: "grid", placeItems: "center",
                transition: "background 0.15s, border-color 0.15s",
                position: "relative",
                touchAction: "manipulation",
                userSelect: "none",
                padding: 0,
              }}
            >
              {target && (
                <span style={{ animation: "targetPop 0.95s cubic-bezier(0.34,1.6,0.64,1) both", display: "block", pointerEvents: "none" }}>
                  {target.emoji}
                </span>
              )}
              {pop.filter((p) => p.cell === i).map((p) => (
                <span key={p.id} className="pixel" style={{
                  position: "absolute", top: 4, left: "50%",
                  fontSize: "0.6rem", color: p.color,
                  animation: "scoreFly 0.6s ease-out both",
                  pointerEvents: "none", whiteSpace: "nowrap",
                }}>
                  {p.text}
                </span>
              ))}
            </button>
          ))}

          {/* Overlay: start / game over */}
          {!playing && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 5,
              background: "rgba(5,5,5,0.82)", backdropFilter: "blur(3px)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18,
            }}>
              {over ? (
                <>
                  <div className="pixel" style={{ fontSize: "0.8rem", color: "#FFD700", animation: "pixelIn 0.4s ease both" }}>
                    {score >= best && score > 0 ? "🏆 NEW BEST!" : "GAME OVER"}
                  </div>
                  <div className="pixel" style={{ fontSize: "1.3rem", color: "#39FF14" }}>{score}</div>
                  <div className="mono" style={{ fontSize: "0.65rem", color: "rgba(240,240,240,0.5)" }}>+{Math.round(score / 2)} XP added to your account</div>
                  <button onClick={start} className="pixel-btn" style={{ fontSize: "0.5rem" }}>PLAY AGAIN</button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "2.4rem", animation: "coinBob 1.4s ease-in-out infinite" }}>🕹️</div>
                  <button onClick={start} className="pixel-btn" style={{ fontSize: "0.55rem", animation: "insertCoin 1.2s step-end infinite" }}>
                    ▶ PRESS START
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <p className="mono" style={{ fontSize: "0.62rem", color: "rgba(240,240,240,0.3)", letterSpacing: "0.1em" }}>
          // BEAT THE HIGH SCORE AT THE CAFE FOR A FREE SNACK — ASK THE COUNTER
        </p>
      </div>

      <style>{`
        @keyframes targetPop {
          0%   { transform: scale(0) rotate(-30deg); }
          60%  { transform: scale(1.2) rotate(8deg); }
          100% { transform: scale(1) rotate(0); }
        }
        @keyframes scoreFly {
          0%   { opacity: 1; transform: translate(-50%, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -26px) scale(1.3); }
        }
        @keyframes urgentPulse {
          0%, 100% { border-color: rgba(255,77,77,0.7); }
          50%      { border-color: rgba(255,215,0,0.2); }
        }
        @keyframes insertCoin {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}
