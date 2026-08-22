export const siteConfig = {
  name: "Loomyna",
  description:
    "Cheerful, easy-to-wear pieces for yoga, slow mornings, and sun-filled days.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loomyna.id",
  email: "loomyna.co@gmail.com",
  whatsappNumber: "6287777784634",
  whatsappDisplay: "+62 877-7778-4634",
  announcement: "A little sunshine, made to move with you ☀",
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/loomyna.co" },
    { label: "TikTok", href: "https://www.tiktok.com/@loomyna.co" },
    { label: "Threads", href: "https://www.threads.net/@loomyna.co" },
  ],
} as const;

export const navigation = [
  { label: "Shop all", href: "/#shop" },
  { label: "Tops", href: "/tops" },
  { label: "Bottoms", href: "/bottoms" },
  { label: "About us", href: "/about-us" },
] as const;
