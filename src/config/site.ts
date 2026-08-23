export const siteConfig = {
  name: "Loomyna",
  description:
    "Cheerful, easy-to-wear pieces for yoga, slow mornings, and sun-filled days.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://loomyna.id",
  email: "loomyna.co@gmail.com",
  whatsappNumber: "6285196321545",
  whatsappDisplay: "+62 851-9632-1545",
  announcement: "A little sunshine, made to move with you ☀",
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/loomyna.co" },
    { label: "TikTok", href: "https://www.tiktok.com/@loomyna.co" },
    { label: "Threads", href: "https://www.threads.net/@loomyna.co" },
    { label: "Shopee", href: "https://id.shp.ee/qr4YtuSw" },
  ],
} as const;

export const navigation = [
  { label: "Shop all", href: "/#shop" },
  { label: "Tops", href: "/tops" },
  { label: "Bottoms", href: "/bottoms" },
  { label: "About us", href: "/about-us" },
] as const;
