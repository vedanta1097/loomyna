import type { Product } from "@/types/product";

type ProductSeed = {
  slug: string;
  name: string;
  price: number;
  category: "Tops" | "Bottoms";
  image: { width: number; height: number };
  colors: { name: string; slug: string; hex: string }[];
  blurb: string;
  badge?: "new" | "featured" | "bestseller";
};

const seeds: ProductSeed[] = [
  {
    slug: "halter-neck",
    name: "Halter Neck",
    price: 120000,
    category: "Tops",
    image: { width: 1846, height: 2307 },
    colors: [{ name: "Butter Yellow", slug: "butter-yellow", hex: "#FFEDA8" }],
    blurb: "A sweet halter silhouette for stretches, seaside walks, and everything after.",
    badge: "featured",
  },
  {
    slug: "linen-pants",
    name: "Linen Pants",
    price: 120000,
    category: "Bottoms",
    image: { width: 2279, height: 2849 },
    colors: [{ name: "Butter Yellow", slug: "butter-yellow", hex: "#FFEDA8" }],
    blurb: "An easy, airy shape that brings a little sunshine to everyday dressing.",
    badge: "new",
  },
  {
    slug: "rib-halter-neck",
    name: "Rib Halter Neck",
    price: 120000,
    category: "Tops",
    image: { width: 3164, height: 3955 },
    colors: [{ name: "White", slug: "white", hex: "#FFFFFF" }],
    blurb: "A clean ribbed halter made for pairing, layering, and moving freely.",
  },
  {
    slug: "loomy-crop-top",
    name: "Loomy Crop Top",
    price: 80000,
    category: "Tops",
    image: { width: 2419, height: 3024 },
    colors: [
      { name: "Black", slug: "black", hex: "#171717" },
      { name: "Beige", slug: "beige", hex: "#D8C7AF" },
      { name: "White", slug: "white", hex: "#FFFFFF" },
    ],
    blurb: "A playful everyday crop with a soft feel and endlessly easy styling.",
    badge: "bestseller",
  },
  {
    slug: "loomy-inner-top",
    name: "Loomy Inner Top",
    price: 80000,
    category: "Tops",
    image: { width: 2413, height: 3017 },
    colors: [
      { name: "Black", slug: "black", hex: "#171717" },
      { name: "Beige", slug: "beige", hex: "#D8C7AF" },
      { name: "White", slug: "white", hex: "#FFFFFF" },
    ],
    blurb: "A comfortable little layer designed to sit smoothly under your favorite look.",
  },
];

export const products: Product[] = seeds.map((seed) => ({
  id: seed.slug,
  slug: seed.slug,
  name: seed.name,
  price: seed.price,
  currency: "IDR",
  shortDescription: seed.blurb,
  description: seed.blurb,
  category: seed.category,
  material: "Ask our team on WhatsApp for the latest fabric details.",
  careInstructions: [
    "Wash gently with similar colors.",
    "Air dry in the shade to help preserve color and shape.",
  ],
  sizeGuide: ["All size — contact us for current garment measurements."],
  badges: seed.badge ? [seed.badge] : undefined,
  published: true,
  featured: true,
  imagesByColor: Object.fromEntries(
    seed.colors.map((color) => [
      color.slug,
      [
        {
          src: `/assets/products/${seed.slug}/main.jpeg`,
          alt: `${seed.name} in ${color.name}, product view`,
          width: seed.image.width,
          height: seed.image.height,
        },
      ],
    ]),
  ),
  variants: seed.colors.map((color, index) => ({
    sku: `LOO-${seed.slug.replaceAll("-", "").slice(0, 8).toUpperCase()}-${index + 1}-OS`,
    color: color.name,
    colorSlug: color.slug,
    colorHex: color.hex,
    size: "All Size",
    available: true,
  })),
}));

export const publishedProducts = products.filter((product) => product.published);

export function getProductBySlug(slug: string) {
  return publishedProducts.find((product) => product.slug === slug);
}
