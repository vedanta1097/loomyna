export type ProductBadge = "new" | "featured" | "bestseller" | "sold-out";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductVariant = {
  sku: string;
  color: string;
  colorSlug: string;
  colorHex: string;
  size: string;
  available: boolean;
  shopeeUrl?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: "IDR";
  shortDescription: string;
  description: string;
  category: string;
  material?: string;
  careInstructions?: string[];
  sizeGuide?: string[];
  badges?: ProductBadge[];
  published: boolean;
  featured: boolean;
  imagesByColor: Record<string, ProductImage[]>;
  variants: ProductVariant[];
  shopeeUrl?: string;
};

export type HeroSlide = {
  id: string;
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
};
