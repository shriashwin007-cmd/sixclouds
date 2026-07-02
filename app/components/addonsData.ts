export type Item = {
  id: string; name: string; price: number; icon: string;
  label: string; desc: string; img?: string;
};

export const BEVERAGES: Item[] = [
  { id: "bev01", name: "Water", price: 40, icon: "💧", label: "₹40", desc: "Ice-cold mineral water. Stay hydrated, stay sharp.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/water_bottle_yvt0nf.png" },
  { id: "bev02", name: "Pepsi", price: 60, icon: "🥤", label: "₹60", desc: "Ice-cold Pepsi can. The classic gamer fuel.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780802282/pepsi_n5fcil.png" },
  { id: "bev03", name: "Sprite", price: 60, icon: "🫧", label: "₹60", desc: "Refreshing lemon-lime Sprite. Clean taste, zero crash.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/sprite_lyabij.png" },
  { id: "bev04", name: "Maaza Mango", price: 80, icon: "🥭", label: "₹80", desc: "Real mango pulp goodness. A desi classic.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/maaza_mango_wjktqw.png" },
  { id: "bev05", name: "Frooti", price: 80, icon: "🍊", label: "₹80", desc: "Everyone's favorite mango drink. Fresh N Juicy!", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/frooti_kywwmf.png" },
  { id: "bev06", name: "Mountain Dew", price: 90, icon: "⚡", label: "₹90", desc: "Citrus charge for long gaming sessions. Do the Dew.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780802282/mountain_dew_y0xqzj.png" },
  { id: "bev07", name: "Red Bull", price: 150, icon: "🐂", label: "₹150", desc: "Red Bull Energy Drink — wings for your game.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781809303/redbull_vj6ucz.png" },
];

export const SNACKS: Item[] = [
  { id: "sn01", name: "Lays Classic", price: 20, icon: "🥔", label: "₹20", desc: "Crispy salted chips. The OG gaming snack.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/lays_classic_ekmpwd.png" },
  { id: "sn02", name: "Lays Magic Masala", price: 20, icon: "🌶️", label: "₹20", desc: "Spicy tangy magic. The most-loved Lays flavour.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/lays_magic_masala_vjsidg.png" },
  { id: "sn03", name: "Lays American Style", price: 20, icon: "🧂", label: "₹20", desc: "American cream & onion flavour. Smooth and addictive.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/lays_americano_xyaqzo.png" },
  { id: "sn04", name: "Doritos Nacho", price: 30, icon: "🌮", label: "₹30", desc: "Triangular crunch loaded with nacho cheese.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/dorito_nacho_n0mqph.png" },
  { id: "sn05", name: "Doritos Spicy", price: 30, icon: "🔥", label: "₹30", desc: "Spicy jalapeño doritos — heat seekers only.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1780791929/dorito_spicy_lcvwm5.png" },
  { id: "sn06", name: "Cheetos Flamin Hot", price: 30, icon: "🌋", label: "₹30", desc: "Dangerously hot cheese puffs. Can you handle it?", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781813916/cheetos-flamin-hot_wewrqv.png" },
  { id: "sn07", name: "Cheetos Puff", price: 30, icon: "🧡", label: "₹30", desc: "Light, airy cheese puffs that melt in your mouth.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781813916/cheetos-puffs_jqfr3q.png" },
  { id: "sn08", name: "Cheetos Masala Balls", price: 30, icon: "🟠", label: "₹30", desc: "Round, crunchy, masala-coated Cheetos bites.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781813916/cheetos-masala-balls_y6fhbe.png" },
  { id: "sn09", name: "Kurkure Green Chutney", price: 30, icon: "💚", label: "₹30", desc: "Crispy corn puffs with tangy green chutney flavour.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781813916/kurkure-green-chutney_kqalrn.png" },
  { id: "sn10", name: "Cheetos Cheez Puf", price: 30, icon: "🟡", label: "₹30", desc: "Classic cheese-flavoured Cheetos. Every gamer's pick.", img: "https://res.cloudinary.com/dxvui0xkz/image/upload/v1781813916/cheetos-cheez-puf_wnxfrg.png" },
];

export type CategoryKey = "beverages" | "snacks";

export const CATEGORIES: Record<CategoryKey, { title: string; icon: string; blurb: string; items: Item[] }> = {
  beverages: {
    title: "Beverages",
    icon: "🥤",
    blurb: "Fuel up with cold drinks and energy boosters. Pick your poison.",
    items: BEVERAGES,
  },
  snacks: {
    title: "Snacks",
    icon: "🍟",
    blurb: "Crunchy, spicy, cheesy — the best gaming snacks in the game.",
    items: SNACKS,
  },
};
