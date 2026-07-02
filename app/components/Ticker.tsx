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
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">
            ★ {item}
          </span>
        ))}
      </div>
    </div>
  );
}
