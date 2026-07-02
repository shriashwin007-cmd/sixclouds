"use client";
import { Word3D } from "@/app/components/Text3D";

/*
  Editorial section header — big index number, tag, 3D title,
  rule line to the edge, giant outlined watermark word behind.
*/

export default function SectionHeader({
  index,
  tag,
  lines,
  watermark,
  align = "left",
}: {
  index: string;
  tag: string;
  lines: string[];
  watermark: string;
  align?: "left" | "center";
}) {
  return (
    <div style={{ position: "relative", marginBottom: 64 }}>
      {/* giant outlined watermark */}
      <span aria-hidden className="pixel sh-watermark" style={{
        position: "absolute",
        top: "-0.55em",
        [align === "left" ? "right" : "left"]: align === "left" ? "-2%" : "50%",
        transform: align === "center" ? "translateX(-50%)" : "none",
        fontSize: "clamp(4rem, 13vw, 11rem)",
        lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1.5px rgba(255,215,0,0.09)",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}>
        {watermark}
      </span>

      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "flex-end", gap: 22,
        flexDirection: align === "center" ? "column" : "row",
        ...(align === "center" ? { alignItems: "center", textAlign: "center" as const } : {}),
      }}>
        {/* index */}
        <span className="pixel" aria-hidden style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          lineHeight: 0.9,
          color: "transparent",
          WebkitTextStroke: "2px rgba(255,215,0,0.55)",
          flexShrink: 0,
        }}>
          {index}
        </span>

        <div>
          <span className="section-tag" style={{ marginBottom: 8 }}>&gt; {tag}</span>
          <h2 style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: align === "center" ? "center" : "flex-start" }}>
            {lines.map((l) => (
              <Word3D key={l} text={l} size="clamp(1rem, 2.5vw, 1.45rem)" depth={5} />
            ))}
          </h2>
        </div>

        {/* rule line */}
        {align === "left" && (
          <div aria-hidden style={{
            flex: 1, height: 1, marginBottom: 10, minWidth: 40,
            background: "linear-gradient(to right, rgba(255,215,0,0.4), rgba(255,215,0,0.05))",
            position: "relative",
          }}>
            <span style={{ position: "absolute", right: 0, top: -3, width: 7, height: 7, background: "#FFD700" }} />
          </div>
        )}
      </div>
    </div>
  );
}
