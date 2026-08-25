import type { Product } from "@/types/product";
import type { Locale } from "@/i18n/config";

type ProductSeed = {
  slug: string;
  skuPrefix?: string;
  name: string;
  price: number;
  category: "Tops" | "Bottoms" | "Accessories";
  image: { src?: string; width: number; height: number; blurDataURL: string };
  colors: {
    name: string;
    slug: string;
    hex: string;
    imageViews?: Array<"main" | "side" | "back" | "full">;
    status?: "in-stock" | "pre-order" | "sold-out";
    estimatedShipping?: string;
    imagePreviewAvailable?: boolean;
    variants?: {
      size: string;
      status?: "in-stock" | "pre-order" | "sold-out";
      estimatedShipping?: string;
      estimatedCompletion?: string;
    }[];
  }[];
  blurb: string;
  material?: string;
  badge?: "new" | "featured" | "bestseller";
  sizeGuide?: string[];
  sizeMeasurements?: Product["sizeMeasurements"];
  addOns?: { id: string; name: string; price: number }[];
  shopeeUrl?: string;
};

const seeds: ProductSeed[] = [
  {
    slug: "halter-neck",
    name: "Halter Neck Two Tone",
    price: 120000,
    category: "Tops",
    image: {
      src: "/assets/products/halter-neck/main-v2.webp",
      width: 1500,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JY2VuVp4b8brAAP7sqa712fbgdYefUwRQyfFzamaFthPyjeZbpJF8tJLvH0MwKt+dgAAA",
    },
    colors: [
      {
        name: "Butter Blue",
        slug: "butter-blue",
        hex: "linear-gradient(135deg, #FFEDA8 0 50%, #AFCFDE 50% 100%)",
        imageViews: ["main", "side", "back", "full"],
      },
      {
        name: "Blue Butter",
        slug: "blue-butter",
        hex: "linear-gradient(135deg, #AFCFDE 0 50%, #FFEDA8 50% 100%)",
        imageViews: ["main", "side", "back", "full"],
      },
      {
        name: "Butter Pink",
        slug: "butter-pink",
        hex: "linear-gradient(135deg, #FFEDA8 0 50%, #F4B6C2 50% 100%)",
        imageViews: ["main", "side", "back", "full"],
      },
      {
        name: "Pink Blue",
        slug: "pink-blue",
        hex: "linear-gradient(135deg, #F4B6C2 0 50%, #AFCFDE 50% 100%)",
        imageViews: ["main", "side", "back", "full"],
      },
      {
        name: "Pink Butter",
        slug: "pink-butter",
        hex: "linear-gradient(135deg, #F4B6C2 0 50%, #FFEDA8 50% 100%)",
        imageViews: ["main", "side", "back", "full"],
      },
    ],
    blurb:
      "A sweet halter silhouette for stretches, seaside walks, and everything after.",
    badge: "featured",
    addOns: [{ id: "cup-bra", name: "Cup Bra", price: 22000 }],
    shopeeUrl: "https://id.shp.ee/EzNeMraG",
  },
  {
    slug: "linen-pants",
    name: "Linen Pants",
    price: 120000,
    category: "Bottoms",
    image: {
      src: "/assets/products/linen-pants/main-v2.webp",
      width: 1500,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAABwAwCdASoQABQAPu1orU6ppiSiMAgBMB2JZQCdMoAE7hbx9AAA/urCehZdw+DyPlpB06PcL84KsQp+7atkewNhnPzCzUYz7TiXNOmAAAA=",
    },
    colors: [
      {
        name: "Butter",
        slug: "butter",
        hex: "#FFEDA8",
        imageViews: ["main"],
        variants: linenPantsVariants(true),
      },
      {
        name: "Blue",
        slug: "blue",
        hex: "#AFCFDE",
        imageViews: ["main"],
        variants: linenPantsVariants(true),
      },
      {
        name: "Pink",
        slug: "pink",
        hex: "#E9AAB7",
        imageViews: ["main"],
        variants: linenPantsVariants(true),
      },
      {
        name: "Black",
        slug: "black",
        hex: "#171717",
        imagePreviewAvailable: false,
        variants: linenPantsVariants(false),
      },
      {
        name: "Broken White",
        slug: "broken-white",
        hex: "#EEEBE3",
        imagePreviewAvailable: false,
        variants: linenPantsVariants(false),
      },
    ],
    blurb:
      "An easy, airy shape that brings a little sunshine to everyday dressing.",
    material: "Made from 100% cotton with a linen look. Soft and breathable.",
    badge: "new",
    sizeMeasurements: [
      { size: "S-M", waist: 100, thigh: 60, length: 105 },
      { size: "L-XL", waist: 100, thigh: 70, length: 105 },
    ],
    shopeeUrl: "https://id.shp.ee/wDwqggxp",
  },
  {
    slug: "rib-halter-neck",
    name: "Rib Halter Neck",
    price: 120000,
    category: "Tops",
    image: {
      width: 1600,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAACQAwCdASoQABQAPu1iqk2ppaQiMAgBMB2JZ12AVpATjtLkEiagAP7sGhGA/u8mINtYeS0w3FyFkujTpBvIgwolEqisxUhdbX2Y9WELrvf2YAAA",
    },
    colors: [
      {
        name: "White",
        slug: "white",
        hex: "#FFFFFF",
        imageViews: ["main", "side", "back"],
      },
      {
        name: "Black",
        slug: "black",
        hex: "#171717",
        status: "pre-order",
        estimatedShipping: "2026-08-24",
        imagePreviewAvailable: false,
      },
    ],
    blurb:
      "A clean ribbed halter made for pairing, layering, and moving freely.",
    badge: "new",
    addOns: [{ id: "cup-bra", name: "Cup Bra", price: 22000 }],
    shopeeUrl: "https://id.shp.ee/Y1bqzbUf",
  },
  {
    slug: "loomy-crop-top",
    name: "Loomy Crop Top",
    price: 100000,
    category: "Tops",
    image: {
      src: "/assets/products/loomy-crop-top/main-v2.webp",
      width: 1600,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAACwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JZQC7ACHusNDWv6kEAAD+trjm9SPT6nN8MLi9g3x32mhjZ1j1q28ogxFkiVR0xkQOk1eU5w0VmLkwu9JavWc14NbjzuytUP24hAAA",
    },
    colors: [
      {
        name: "Black",
        slug: "black",
        hex: "#171717",
        imagePreviewAvailable: false,
      },
      { name: "Beige", slug: "beige", hex: "#D8C7AF", imageViews: ["main"] },
      { name: "White", slug: "white", hex: "#FFFFFF", imageViews: ["main"] },
    ],
    blurb:
      "A playful everyday crop with a soft feel and endlessly easy styling.",
  },
  {
    slug: "loomy-inner-top",
    name: "Loomy Inner Top",
    price: 100000,
    category: "Tops",
    image: {
      src: "/assets/products/loomy-inner-top/main-v2.webp",
      width: 1600,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAwBACdASoQABQAPu1iqU2ppaOiMAgBMB2JZQCdMoFWAAS6oKZVVQL01AAA/t7fhXKBmtVkyiSX4nX0dNNc5pS5PU1l3zTPnIRBAv0EISK94iEbrsKZPNpgQDV2ovRgtkuL63Dl6AiJBDoCWCkorwAA",
    },
    colors: [
      { name: "Black", slug: "black", hex: "#171717", imageViews: ["main"] },
      { name: "Beige", slug: "beige", hex: "#D8C7AF", imageViews: ["main"] },
      { name: "White", slug: "white", hex: "#FFFFFF", imageViews: ["main"] },
    ],
    blurb:
      "A comfortable little layer designed to sit smoothly under your favorite look.",
  },
  {
    slug: "halter-neck-basic",
    skuPrefix: "HALTERB",
    name: "Halter Neck Basic",
    price: 100000,
    category: "Tops",
    image: {
      width: 1500,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JY2VuVp4b8brAAP7sqa712fbgdYefUwRQyfFzamaFthPyjeZbpJF8tJLvH0MwKt+dgAAA",
    },
    colors: [
      {
        name: "Brown",
        slug: "brown",
        hex: "#795548",
        imageViews: ["main", "side", "back", "full"],
      },
      {
        name: "Winter White",
        slug: "winter-white",
        hex: "#F4F0E8",
        status: "pre-order",
        imagePreviewAvailable: false,
      },
    ],
    blurb:
      "A clean everyday halter with an easy fit for movement, layering, and sunny plans.",
    badge: "new",
    addOns: [{ id: "cup-bra", name: "Cup Bra", price: 22000 }],
    shopeeUrl: "https://id.shp.ee/4cNiaNe6",
  },
  {
    slug: "bandana",
    name: "Bandana",
    price: 30000,
    category: "Accessories",
    image: {
      width: 1500,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JY2VuVp4b8brAAP7sqa712fbgdYefUwRQyfFzamaFthPyjeZbpJF8tJLvH0MwKt+dgAAA",
    },
    colors: [
      { name: "White", slug: "white", hex: "#FFFFFF", imageViews: ["main"] },
      {
        name: "Brown Cream",
        slug: "brown-cream",
        hex: "linear-gradient(135deg, #795548 0 50%, #F2E3C6 50% 100%)",
        imageViews: ["main"],
      },
      {
        name: "Brown Pink",
        slug: "brown-pink",
        hex: "linear-gradient(135deg, #795548 0 50%, #F4B6C2 50% 100%)",
        imageViews: ["main"],
      },
      { name: "Brown", slug: "brown", hex: "#795548", imageViews: ["main"] },
    ],
    blurb:
      "A playful finishing touch for tying up your hair or adding a cheerful accent to your look.",
    badge: "new",
    shopeeUrl: "https://id.shp.ee/W2ZqDDwX",
  },
  {
    slug: "bandana-rajut",
    name: "Bandana Rajut",
    price: 50000,
    category: "Accessories",
    image: {
      src: "/assets/products/bandana-rajut/main-v2.webp",
      width: 1500,
      height: 2000,
      blurDataURL:
        "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JY2VuVp4b8brAAP7sqa712fbgdYefUwRQyfFzamaFthPyjeZbpJF8tJLvH0MwKt+dgAAA",
    },
    colors: [
      { name: "Pink", slug: "pink", hex: "#F4B6C2", imageViews: ["main"] },
      {
        name: "Yellow Blue",
        slug: "yellow-blue",
        hex: "linear-gradient(135deg, #FFEDA8 0 50%, #AFCFDE 50% 100%)",
        imageViews: ["main"],
      },
    ],
    blurb:
      "A soft knitted bandana that brings a handmade pop of color to everyday outfits.",
    badge: "new",
  },
];

function linenPantsVariants(includeReadySizes: boolean) {
  return [
    ...(includeReadySizes
      ? [{ size: "S-M", status: "in-stock" as const }]
      : []),
    {
      size: "L-XL",
      status: "pre-order" as const,
      estimatedCompletion: "2026-08-31",
    },
  ];
}

const indonesianProducts: Record<
  string,
  {
    name: string;
    blurb: string;
    colors: Record<string, string>;
    addOns?: Record<string, string>;
  }
> = {
  "halter-neck": {
    name: "Atasan Halter",
    blurb:
      "Siluet halter manis untuk peregangan, jalan di tepi pantai, dan segala aktivitas setelahnya.",
    colors: {
      "butter-blue": "Kuning Biru",
      "blue-butter": "Biru Kuning",
      "butter-pink": "Kuning Merah Muda",
      "pink-blue": "Merah Muda Biru",
      "pink-butter": "Merah Muda Kuning",
    },
    addOns: { "cup-bra": "Cup Bra" },
  },
  "linen-pants": {
    name: "Celana Linen",
    blurb:
      "Potongan ringan dan nyaman yang membawa sedikit keceriaan ke gaya sehari-hari.",
    colors: {
      butter: "Kuning Mentega",
      blue: "Biru",
      pink: "Merah Muda",
      black: "Hitam",
      "broken-white": "Broken White",
    },
  },
  "rib-halter-neck": {
    name: "Atasan Halter Rib",
    blurb:
      "Atasan halter rib yang simpel untuk dipadukan, dilapis, dan bergerak dengan bebas.",
    colors: { white: "Putih", black: "Hitam" },
    addOns: { "cup-bra": "Cup Bra" },
  },
  "loomy-crop-top": {
    name: "Loomy Crop Top",
    blurb:
      "Crop top ceria sehari-hari dengan bahan lembut dan mudah dipadukan untuk berbagai gaya.",
    colors: { black: "Hitam", beige: "Beige", white: "Putih" },
  },
  "loomy-inner-top": {
    name: "Loomy Inner Top",
    blurb:
      "Lapisan kecil yang nyaman dan dirancang agar terasa halus di balik tampilan favoritmu.",
    colors: { black: "Hitam", beige: "Beige", white: "Putih" },
  },
  "halter-neck-basic": {
    name: "Atasan Halter Basic",
    blurb:
      "Atasan halter simpel dengan potongan nyaman untuk bergerak, layering, dan menemani hari cerahmu.",
    colors: { brown: "Cokelat", "winter-white": "Winter White" },
    addOns: { "cup-bra": "Cup Bra" },
  },
  bandana: {
    name: "Bandana",
    blurb:
      "Sentuhan ceria untuk mengikat rambut atau menambahkan aksen manis pada penampilanmu.",
    colors: {
      white: "Putih",
      "brown-cream": "Cokelat Krem",
      "brown-pink": "Cokelat Merah Muda",
      brown: "Cokelat",
    },
  },
  "bandana-rajut": {
    name: "Bandana Rajut",
    blurb:
      "Bandana rajut lembut dengan sentuhan buatan tangan dan warna ceria untuk gaya sehari-hari.",
    colors: { pink: "Merah Muda", "yellow-blue": "Kuning Biru" },
  },
};

const imageViewLabels = {
  main: "main",
  side: "side",
  back: "back",
  full: "full-length",
} as const;

export const products: Product[] = seeds.map((seed) => {
  const firstReadyColor = seed.colors.find((color) =>
    color.imageViews?.includes("main"),
  );
  const coverSrc =
    seed.image.src ??
    (firstReadyColor
      ? `/assets/products/${seed.slug}/${firstReadyColor.slug}/main-v2.webp`
      : undefined);

  if (!coverSrc) {
    throw new Error(
      `${seed.slug}: no product cover or color preview is available`,
    );
  }

  const coverImage: Product["coverImage"] = {
    src: coverSrc,
    alt: `${seed.name}, product view`,
    width: seed.image.src ? seed.image.width : 1500,
    height: seed.image.src ? seed.image.height : 2000,
    view: "main",
    blurDataURL: seed.image.blurDataURL,
  };

  return {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    price: seed.price,
    currency: "IDR",
    shortDescription: seed.blurb,
    description: seed.blurb,
    category: seed.category,
    material:
      seed.material ??
      "Ask our team on WhatsApp for the latest fabric details.",
    careInstructions: [
      "Wash gently with similar colors.",
      "Air dry in the shade to help preserve color and shape.",
    ],
    sizeGuide:
      seed.sizeGuide ??
      (seed.sizeMeasurements
        ? undefined
        : ["All size — contact us for current garment measurements."]),
    sizeMeasurements: seed.sizeMeasurements,
    badges: seed.badge ? [seed.badge] : undefined,
    published: true,
    featured: true,
    coverImage,
    imagesByColor: Object.fromEntries(
      seed.colors.map((color) => [
        color.slug,
        color.imageViews?.length
          ? color.imageViews.map((view) => ({
              src: `/assets/products/${seed.slug}/${color.slug}/${view}-v2.webp`,
              alt: `${seed.name} in ${color.name}, ${imageViewLabels[view]} view`,
              width: 1500,
              height: 2000,
              view,
            }))
          : [
              {
                ...coverImage,
                alt:
                  color.imagePreviewAvailable === false
                    ? `${seed.name} product view; ${color.name} preview is not available yet`
                    : `${seed.name} in ${color.name}, product view`,
              },
            ],
      ]),
    ),
    variants: seed.colors.flatMap((color, colorIndex) =>
      (
        color.variants ?? [
          {
            size: "All Size",
            status: color.status ?? "in-stock",
            estimatedShipping: color.estimatedShipping,
          },
        ]
      ).map((variant, sizeIndex) => ({
        sku: `LOO-${seed.skuPrefix ?? seed.slug.replaceAll("-", "").slice(0, 8).toUpperCase()}-${colorIndex + 1}-${variant.size.replaceAll(" ", "").toUpperCase()}-${sizeIndex + 1}`,
        color: color.name,
        colorSlug: color.slug,
        colorHex: color.hex,
        size: variant.size,
        status: variant.status ?? "in-stock",
        estimatedShipping: variant.estimatedShipping,
        estimatedCompletion: variant.estimatedCompletion,
        imagePreviewAvailable: color.imagePreviewAvailable ?? true,
      })),
    ),
    addOns: seed.addOns,
    shopeeUrl: seed.shopeeUrl,
  };
});

export const publishedProducts = products.filter(
  (product) => product.published,
);

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
      category:
        product.category === "Tops"
          ? "Atasan"
          : product.category === "Bottoms"
            ? "Bawahan"
            : "Aksesori",
      material:
        "Tanyakan detail bahan terbaru kepada tim kami melalui WhatsApp.",
      careInstructions: [
        "Cuci lembut bersama warna serupa.",
        "Keringkan dengan udara di tempat teduh untuk membantu menjaga warna dan bentuk.",
      ],
      sizeGuide: ["Semua ukuran — hubungi kami untuk ukuran pakaian terbaru."],
      ...(product.slug === "linen-pants"
        ? {
            material:
              "Terbuat dari 100% katun dengan tampilan linen. Lembut dan sejuk.",
            sizeGuide: undefined,
          }
        : {}),
      variants: product.variants.map((variant) => ({
        ...variant,
        color: translation.colors[variant.colorSlug] ?? variant.color,
        size: variant.size === "All Size" ? "Semua Ukuran" : variant.size,
      })),
      addOns: product.addOns?.map((addOn) => ({
        ...addOn,
        name: translation.addOns?.[addOn.id] ?? addOn.name,
      })),
      coverImage: {
        ...product.coverImage,
        alt: `${translation.name}, tampilan produk`,
      },
      imagesByColor: Object.fromEntries(
        Object.entries(product.imagesByColor).map(([colorSlug, images]) => [
          colorSlug,
          images.map((image) => ({
            ...image,
            alt:
              product.variants.find(
                (variant) => variant.colorSlug === colorSlug,
              )?.imagePreviewAvailable === false
                ? `Tampilan produk ${translation.name}; pratinjau warna ${translation.colors[colorSlug] ?? colorSlug} belum tersedia`
                : `${translation.name} warna ${translation.colors[colorSlug] ?? colorSlug}, tampilan ${image.view}`,
          })),
        ]),
      ),
    } satisfies Product;
  });
}

export function getProductBySlug(slug: string, locale: Locale = "en") {
  return getPublishedProducts(locale).find((product) => product.slug === slug);
}
