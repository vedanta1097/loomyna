export type ProductBadge = "new" | "featured" | "bestseller" | "sold-out";
export type ProductVariantStatus = "in-stock" | "pre-order" | "sold-out";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type ProductVariant = {
  sku: string;
  color: string;
  colorSlug: string;
  colorHex: string;
  size: string;
  status: ProductVariantStatus;
  estimatedShipping?: string;
  estimatedCompletion?: string;
  imagePreviewAvailable?: boolean;
  shopeeUrl?: string;
};

export type ProductAddOn = {
  id: string;
  name: string;
  price: number;
};

export type ProductSizeMeasurement = {
  size: string;
  waist: number;
  thigh: number;
  length: number;
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
  sizeMeasurements?: ProductSizeMeasurement[];
  badges?: ProductBadge[];
  published: boolean;
  featured: boolean;
  imagesByColor: Record<string, ProductImage[]>;
  variants: ProductVariant[];
  addOns?: ProductAddOn[];
  shopeeUrl?: string;
};

export type HeroSlide = {
  id: string;
  desktopImage?: {
    src: string;
    width: number;
    height: number;
  };
  mobileImage: {
    src: string;
    width: number;
    height: number;
  };
  /** Show this campaign image only on screens narrower than 700px. */
  mobileOnly?: boolean;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
};
