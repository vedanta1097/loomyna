import type { HeroSlide } from "@/types/product";

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-banner",
    desktopImage: {
      src: "/assets/banners/desktop/hero-banner-desktop-v2.jpg",
      width: 1137,
      height: 600,
    },
    mobileImage: {
      src: "/assets/banners/mobile/hero-banner-mobile-v2.jpg",
      width: 568,
      height: 900,
    },
    imageAlt:
      "Two women by the sea wearing soft blue and butter yellow Loomyna tops",
  },
];

export const homeSections = [
  {
    id: "shop",
    eyebrow: "Freshly picked",
    title: "Meet your sunny-day staples",
    description:
      "Soft colors, sweet silhouettes, and easy pieces to stretch, stroll, and live in.",
    productSlugs: [
      "halter-neck",
      "linen-pants",
      "rib-halter-neck",
      "loomy-crop-top",
      "loomy-inner-top",
      "halter-neck-basic",
      "bandana",
      "bandana-rajut",
    ],
  },
] as const;
