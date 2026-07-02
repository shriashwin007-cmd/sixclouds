// Server-side pricing — never trust client-sent prices
export const SESSION_PRICES: Record<string, number> = {
  "1 Hour":               100,
  "2 Hours":              180,
  "3 Hours":              250,
  "Full Evening (3PM-11PM)": 599,
};

export const ADDON_PRICES: Record<string, number> = {
  // Beverages
  bev01: 40,  // Water
  bev02: 60,  // Pepsi
  bev03: 60,  // Sprite
  bev04: 80,  // Maaza
  bev05: 80,  // Frooti
  bev06: 90,  // Mountain Dew
  bev07: 150, // Red Bull
  // Snacks
  sn01: 20, sn02: 20, sn03: 20, sn04: 20, sn05: 20,
  sn06: 30, sn07: 30, sn08: 30, sn09: 30, sn10: 30,
};

export function computeTotal(session: string, addons: { id: string; qty: number }[]): number {
  const sessionPrice = SESSION_PRICES[session] ?? 0;
  const addonsTotal = addons.reduce((sum, a) => sum + (ADDON_PRICES[a.id] ?? 0) * a.qty, 0);
  return sessionPrice + addonsTotal;
}
