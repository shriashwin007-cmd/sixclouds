"use client";
import { useRef } from "react";

export default function Ticker() {
  const innerRef = useRef<HTMLDivElement>(null);
  const items = [
    "LEVELUP GAMING CAFE",
    "PRIVATE ROOMS FOR GROUPS",
    "PERAMBUR · CHENNAI",
    "OPEN 3PM TO 11PM DAILY",
    "4.9 STAR RATED",
    "GAME ABOVE THE REST",
    "BOOK YOUR SESSION TODAY",
  ];
  const doubled = [...items, ...items];

  /* hold to fast-forward, hover to pause */
  const setSpeed = (dur: string) => {
    if (innerRef.current) innerRef.current.style.animationDuration = dur;
  };
  const setPaused = (paused: boolean) => {
    if (innerRef.current) innerRef.current.style.animationPlayState = paused ? "paused" : "running";
  };

  return (
    <div style={{ perspective: 700, overflow: "hidden", padding: "18px 0" }}>
      <div
        className="ticker-wrap"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setSpeed("18s"); }}
        onPointerDown={() => { setPaused(false); setSpeed("4s"); }}
        onPointerUp={() => setSpeed("18s")}
        onPointerCancel={() => setSpeed("18s")}
        style={{
          transform: "rotateX(14deg) rotateZ(-1.2deg) scale(1.02)",
          boxShadow: "0 18px 50px rgba(255,215,0,0.22)",
          cursor: "grab", touchAction: "pan-y",
        }}
      >
        <div ref={innerRef} className="ticker-inner">
          {doubled.map((item, i) => (
            <span key={i} className="ticker-item">
              ★ {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
