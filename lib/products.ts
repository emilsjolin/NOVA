export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  accentFrom: string;
  accentTo: string;
  specs: { protein: string; calories: string; sugar: string };
}

export const PRODUCTS: Product[] = [
  {
    slug: "white-peach",
    name: "White Peach",
    tagline: "Soft. Sweet. Clean.",
    description:
      "A delicate white peach flavor with a smooth, clean finish. 20g of protein with zero sugar — crafted for those who refuse to compromise on taste.",
    price: 39,
    accentFrom: "from-amber-800",
    accentTo: "to-orange-950",
    specs: { protein: "20g", calories: "70", sugar: "0g" },
  },
  {
    slug: "cactus-lime",
    name: "Cactus / Lime",
    tagline: "Sharp. Fresh. Alive.",
    description:
      "Prickly pear cactus meets zesty lime in a refreshing blend that cuts through the ordinary. Bold flavor, clean energy, zero sugar.",
    price: 39,
    accentFrom: "from-emerald-800",
    accentTo: "to-teal-950",
    specs: { protein: "20g", calories: "70", sugar: "0g" },
  },
  {
    slug: "berry-oolong",
    name: "Berry Oolong",
    tagline: "Deep. Complex. Refined.",
    description:
      "Dark berries layered over smooth oolong tea — a rich, nuanced profile for those who demand depth. 20g protein, zero sugar, full sophistication.",
    price: 39,
    accentFrom: "from-rose-800",
    accentTo: "to-pink-950",
    specs: { protein: "20g", calories: "70", sugar: "0g" },
  },
];
