"use client";
import { useEffect, useState } from "react";

/* Live open/closed chip — computes IST (Asia/Kolkata), 3PM–11PM daily. */
export default function OpenStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const iv = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(iv);
  }, []);

  if (!now) return null;

  const hourIST = parseInt(
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(now),
    10
  );
  const open = hourIST >= 15 && hourIST < 23;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      border: `1px solid ${open ? "rgba(57,255,20,0.45)" : "rgba(255,77,77,0.45)"}`,
      background: open ? "rgba(57,255,20,0.07)" : "rgba(255,77,77,0.07)",
      padding: "6px 14px",
    }}>
      <span style={{
        width: 8, height: 8, borderRadius: "50%",
        background: open ? "#39FF14" : "#ff4d4d",
        boxShadow: `0 0 8px ${open ? "#39FF14" : "#ff4d4d"}`,
        animation: "statusPulse 1.6s ease infinite",
      }} />
      <span className="mono" style={{ fontSize: "0.62rem", letterSpacing: "0.16em", color: open ? "#39FF14" : "#ff4d4d" }}>
        {open ? "OPEN NOW — TILL 11 PM" : "CLOSED — OPENS 3 PM"}
      </span>
      <style>{`@keyframes statusPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </span>
  );
}
