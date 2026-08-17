export const siteConfig = {
  name: "Loomyna",
  description:
    "Cheerful, easy-to-wear pieces for yoga, slow mornings, and sun-filled days.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loomyna.com",
  whatsappNumber: "6287777784634",
  whatsappDisplay: "+62 877-7778-4634",
  announcement: "A little sunshine, made to move with you ☀",
} as const;

export const navigation = [
  { label: "Shop all", href: "/#shop" },
  { label: "Tops", href: "/#tops" },
  { label: "Bottoms", href: "/#bottoms" },
  { label: "Our mood", href: "/#our-mood" },
] as const;
