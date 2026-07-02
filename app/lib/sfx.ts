"use client";

/*
  8-bit synth SFX — all sounds generated with WebAudio oscillators,
  zero audio files. Respects a persisted mute flag.
*/

let ctx: AudioContext | null = null;
let muted = true;

if (typeof window !== "undefined") {
  muted = localStorage.getItem("sc-muted") !== "0"; // default muted until user enables
}

export function isMuted() { return muted; }
export function setMuted(m: boolean) {
  muted = m;
  try { localStorage.setItem("sc-muted", m ? "1" : "0"); } catch {}
}

function ac(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch { return null; }
}

function tone(freq: number, dur = 0.08, type: OscillatorType = "square", vol = 0.04, slideTo = 0) {
  if (muted || typeof window === "undefined") return;
  const c = ac();
  if (!c) return;
  try {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, c.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), c.currentTime + dur);
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start();
    o.stop(c.currentTime + dur + 0.03);
  } catch {}
}

export const sfx = {
  hover: () => tone(880, 0.025, "square", 0.012),
  click: () => { tone(330, 0.05, "square", 0.045); tone(660, 0.04, "square", 0.025); },
  coin:  () => { tone(988, 0.07, "square", 0.05); setTimeout(() => tone(1319, 0.16, "square", 0.05), 70); },
  xp:    () => { tone(523, 0.06, "square", 0.04); setTimeout(() => tone(659, 0.06, "square", 0.04), 60); setTimeout(() => tone(784, 0.1, "square", 0.04), 120); },
  smash: () => tone(700, 0.06, "square", 0.05, 300),
  bomb:  () => tone(140, 0.28, "sawtooth", 0.06, 50),
  start: () => [262, 330, 392, 523].forEach((f, i) => setTimeout(() => tone(f, 0.09, "square", 0.045), i * 90)),
  over:  () => [392, 330, 262, 196].forEach((f, i) => setTimeout(() => tone(f, 0.12, "square", 0.045), i * 110)),
};
