import type { HeroSlide } from "@/types/product";

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-banner",
    desktopImage: {
      src: "/assets/banners/desktop/hero-banner-v1.webp",
      width: 1920,
      height: 1014,
    },
    mobileImage: {
      src: "/assets/banners/mobile/hero-banner-v1.webp",
      width: 1440,
      height: 2280,
    },
    imageAlt:
      "Two women by the sea wearing soft blue and butter yellow Loomyna tops",
  },
  {
    id: "new-collection-mobile",
    mobileOnly: true,
    mobileImage: {
      src: "/assets/banners/mobile/hero-banner-2.webp",
      width: 1440,
      height: 1920,
    },
    imageAlt:
      "Loomyna's new collection displayed on a mannequin and clothing rack",
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
    ],
  },
] as const;
