import type { HeroSlide } from "@/types/product";

export const heroSlides: HeroSlide[] = [
  {
    id: "summer-edit",
    desktopImage: "/assets/banners/desktop/summer-edit.jpg",
    mobileImage: "/assets/banners/mobile/summer-edit.jpg",
    imageAlt:
      "Two women by the sea wearing soft blue and butter yellow Loomyna tops",
    ctaLabel: "Shop the edit",
    ctaHref: "#shop",
  },
];

export const homeSections = [
  {
    id: "shop",
    eyebrow: "Freshly picked",
    title: "Meet your sunny-day uniform",
    description:
      "Soft colors, sweet silhouettes, and easy pieces to stretch, stroll, and live in.",
    productSlugs: [
      "halter-neck",
      "linen-pants",
      "rib-halter-neck",
      "loomy-crop-top",
      "loomy-inner-top",
    ],
  },
] as const;
