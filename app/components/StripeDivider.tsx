/*
  Hazard-stripe divider with scrolling label — physical arcade cabinet feel.
*/
export default function StripeDivider({ label = "LEVELUP GAMING ARCADE" }: { label?: string }) {
  const words = Array(10).fill(label);
  return (
    <div aria-hidden style={{ position: "relative", overflow: "hidden" }}>
      {/* stripes */}
      <div style={{
        height: 14,
        background: "repeating-linear-gradient(-45deg, #FFD700 0 16px, #0a0a0a 16px 32px)",
        opacity: 0.85,
      }} />
      {/* scrolling meta strip */}
      <div style={{ background: "#050505", borderBottom: "1px solid rgba(255,215,0,0.18)", padding: "7px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "stripeScroll 22s linear infinite" }}>
          {[...words, ...words].map((w, i) => (
            <span key={i} className="mono" style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,215,0,0.4)", padding: "0 26px" }}>
              {w} <span style={{ color: "rgba(57,255,20,0.45)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes stripeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
