export default function Ticker() {
  const items = [
    "SIXCLOUDS GAMING CAFE",
    "PRIVATE ROOMS FOR GROUPS",
    "PERAMBUR · CHENNAI",
    "OPEN 3PM TO 11PM DAILY",
    "4.9 STAR RATED",
    "GAME ABOVE THE REST",
    "BOOK YOUR SESSION TODAY",
  ];
  const doubled = [...items, ...items];

  return (
    <div style={{ perspective: 700, overflow: "hidden", padding: "18px 0" }}>
      <div className="ticker-wrap" style={{
        transform: "rotateX(14deg) rotateZ(-1.2deg) scale(1.02)",
        boxShadow: "0 18px 50px rgba(255,215,0,0.22)",
      }}>
        <div className="ticker-inner">
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
