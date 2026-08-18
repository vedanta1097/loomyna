import type { Product } from "@/types/product";
import type { Locale } from "@/i18n/config";

type ProductSeed = {
  slug: string;
  name: string;
  price: number;
  category: "Tops" | "Bottoms";
  image: { width: number; height: number; blurDataURL: string };
  colors: {
    name: string;
    slug: string;
    hex: string;
    image?: { src: string; width: number; height: number };
  }[];
  blurb: string;
  badge?: "new" | "featured" | "bestseller";
};

const seeds: ProductSeed[] = [
  {
    slug: "halter-neck",
    name: "Halter Neck",
    price: 120000,
    category: "Tops",
    image: {
      width: 1600,
      height: 2000,
      blurDataURL: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JY2VuVp4b8brAAP7sqa712fbgdYefUwRQyfFzamaFthPyjeZbpJF8tJLvH0MwKt+dgAAA",
    },
    colors: [
      {
        name: "Butter Blue",
        slug: "butter-blue",
        hex: "linear-gradient(135deg, #FFEDA8 0 50%, #AFCFDE 50% 100%)",
        image: {
          src: "/assets/products/halter-neck/butter-blue/main-v1.webp",
          width: 1600,
          height: 2133,
        },
      },
      {
        name: "Butter Pink",
        slug: "butter-pink",
        hex: "linear-gradient(135deg, #FFEDA8 0 50%, #F4B6C2 50% 100%)",
        image: {
          src: "/assets/products/halter-neck/butter-pink/main-v1.webp",
          width: 1600,
          height: 2000,
        },
      },
      {
        name: "Pink Blue",
        slug: "pink-blue",
        hex: "linear-gradient(135deg, #F4B6C2 0 50%, #AFCFDE 50% 100%)",
        image: {
          src: "/assets/products/halter-neck/pink-blue/main-v1.webp",
          width: 1600,
          height: 2000,
        },
      },
      {
        name: "Pink Butter",
        slug: "pink-butter",
        hex: "linear-gradient(135deg, #F4B6C2 0 50%, #FFEDA8 50% 100%)",
        image: {
          src: "/assets/products/halter-neck/pink-butter/main-v1.webp",
          width: 1600,
          height: 2000,
        },
      },
    ],
    blurb: "A sweet halter silhouette for stretches, seaside walks, and everything after.",
    badge: "featured",
  },
  {
    slug: "linen-pants",
    name: "Linen Pants",
    price: 120000,
    category: "Bottoms",
    image: {
      width: 1600,
      height: 2000,
      blurDataURL: "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAABwAwCdASoQABQAPu1orU6ppiSiMAgBMB2JZQCdMoAE7hbx9AAA/urCehZdw+DyPlpB06PcL84KsQp+7atkewNhnPzCzUYz7TiXNOmAAAA=",
    },
    colors: [
      {
        name: "Butter",
        slug: "butter",
        hex: "#FFEDA8",
        image: {
          src: "/assets/products/linen-pants/butter/main-v1.webp",
          width: 1600,
          height: 2000,
        },
      },
      {
        name: "Blue",
        slug: "blue",
        hex: "#AFCFDE",
        image: {
          src: "/assets/products/linen-pants/blue/main-v1.webp",
          width: 1600,
          height: 2000,
        },
      },
      {
        name: "Pink",
        slug: "pink",
        hex: "#E9AAB7",
        image: {
          src: "/assets/products/linen-pants/pink/main-v1.webp",
          width: 803,
          height: 1004,
        },
      },
    ],
    blurb: "An easy, airy shape that brings a little sunshine to everyday dressing.",
    badge: "new",
  },
  {
    slug: "rib-halter-neck",
    name: "Rib Halter Neck",
    price: 120000,
    category: "Tops",
    image: {
      width: 1600,
      height: 2000,
      blurDataURL: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoQABQAPu1iqk2ppaQiMAgBMB2JZ12AVpATjtLkEiagAP7sGhGA/u8mINtYeS0w3FyFkujTpBvIgwolEqisxUhdbX2Y9WELrvf2YAAA",
    },
    colors: [{ name: "White", slug: "white", hex: "#FFFFFF" }],
    blurb: "A clean ribbed halter made for pairing, layering, and moving freely.",
  },
  {
    slug: "loomy-crop-top",
    name: "Loomy Crop Top",
    price: 80000,
    category: "Tops",
    image: {
      width: 1600,
      height: 2000,
      blurDataURL: "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JZQC7ACHusNDWv6kEAAD+trjm9SPT6nN8MLi9g3x32mhjZ1j1q28ogxFkiVR0xkQOk1eU5w0VmLkwu9JavWc14NbjzuytUP24hAAA",
    },
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
    image: {
      width: 1600,
      height: 2000,
      blurDataURL: "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAwBACdASoQABQAPu1iqU2ppaOiMAgBMB2JZQCdMoFWAAS6oKZVVQL01AAA/t7fhXKBmtVkyiSX4nX0dNNc5pS5PU1l3zTPnIRBAv0EISK94iEbrsKZPNpgQDV2ovRgtkuL63Dl6AiJBDoCWCkorwAA",
    },
    colors: [
      { name: "Black", slug: "black", hex: "#171717" },
      { name: "Beige", slug: "beige", hex: "#D8C7AF" },
      { name: "White", slug: "white", hex: "#FFFFFF" },
    ],
    blurb: "A comfortable little layer designed to sit smoothly under your favorite look.",
  },
];

const indonesianProducts: Record<
  string,
  { name: string; blurb: string; colors: Record<string, string> }
> = {
  "halter-neck": {
    name: "Atasan Halter",
    blurb: "Siluet halter manis untuk peregangan, jalan di tepi pantai, dan segala aktivitas setelahnya.",
    colors: {
      "butter-blue": "Kuning Biru",
      "butter-pink": "Kuning Merah Muda",
      "pink-blue": "Merah Muda Biru",
      "pink-butter": "Merah Muda Kuning",
    },
  },
  "linen-pants": {
    name: "Celana Linen",
    blurb: "Potongan ringan dan nyaman yang membawa sedikit keceriaan ke gaya sehari-hari.",
    colors: { butter: "Kuning Mentega", blue: "Biru", pink: "Merah Muda" },
  },
  "rib-halter-neck": {
    name: "Atasan Halter Rib",
    blurb: "Atasan halter rib yang simpel untuk dipadukan, dilapis, dan bergerak dengan bebas.",
    colors: { white: "Putih" },
  },
  "loomy-crop-top": {
    name: "Loomy Crop Top",
    blurb: "Crop top ceria sehari-hari dengan bahan lembut dan mudah dipadukan untuk berbagai gaya.",
    colors: { black: "Hitam", beige: "Beige", white: "Putih" },
  },
  "loomy-inner-top": {
    name: "Loomy Inner Top",
    blurb: "Lapisan kecil yang nyaman dan dirancang agar terasa halus di balik tampilan favoritmu.",
    colors: { black: "Hitam", beige: "Beige", white: "Putih" },
  },
};

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
          src: color.image?.src ?? `/assets/products/${seed.slug}/main-v1.webp`,
          alt: `${seed.name} in ${color.name}, product view`,
          width: color.image?.width ?? seed.image.width,
          height: color.image?.height ?? seed.image.height,
          blurDataURL: color.image ? undefined : seed.image.blurDataURL,
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

export function getPublishedProducts(locale: Locale = "en") {
  if (locale === "en") return publishedProducts;

  return publishedProducts.map((product) => {
    const translation = indonesianProducts[product.slug];
    if (!translation) return product;

    return {
      ...product,
      name: translation.name,
      shortDescription: translation.blurb,
      description: translation.blurb,
      category: product.category === "Tops" ? "Atasan" : "Bawahan",
      material: "Tanyakan detail bahan terbaru kepada tim kami melalui WhatsApp.",
      careInstructions: [
        "Cuci lembut bersama warna serupa.",
        "Keringkan dengan udara di tempat teduh untuk membantu menjaga warna dan bentuk.",
      ],
      sizeGuide: ["Semua ukuran — hubungi kami untuk ukuran pakaian terbaru."],
      variants: product.variants.map((variant) => ({
        ...variant,
        color: translation.colors[variant.colorSlug] ?? variant.color,
        size: variant.size === "All Size" ? "Semua Ukuran" : variant.size,
      })),
      imagesByColor: Object.fromEntries(
        Object.entries(product.imagesByColor).map(([colorSlug, images]) => [
          colorSlug,
          images.map((image) => ({
            ...image,
            alt: `${translation.name} warna ${translation.colors[colorSlug] ?? colorSlug}, tampilan produk`,
          })),
        ]),
      ),
    } satisfies Product;
  });
}

export function getProductBySlug(slug: string, locale: Locale = "en") {
  return getPublishedProducts(locale).find((product) => product.slug === slug);
}
