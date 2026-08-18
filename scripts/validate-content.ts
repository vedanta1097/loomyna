import { existsSync } from "node:fs";
import { join } from "node:path";
import { heroSlides, homeSections } from "../src/config/home";
import { products } from "../src/data/products";

const errors: string[] = [];
const ids = new Set<string>();
const slugs = new Set<string>();
const skus = new Set<string>();

function assetExists(publicPath: string) {
  return existsSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")));
}

for (const product of products) {
  if (ids.has(product.id)) errors.push(`Duplicate product id: ${product.id}`);
  if (slugs.has(product.slug)) errors.push(`Duplicate product slug: ${product.slug}`);
  ids.add(product.id);
  slugs.add(product.slug);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug)) {
    errors.push(`Invalid URL slug: ${product.slug}`);
  }
  if (!Number.isInteger(product.price) || product.price <= 0) {
    errors.push(`${product.slug}: price must be a positive integer`);
  }
  if (product.variants.length === 0) errors.push(`${product.slug}: has no variants`);

  for (const variant of product.variants) {
    if (skus.has(variant.sku)) errors.push(`Duplicate SKU: ${variant.sku}`);
    skus.add(variant.sku);
    if (!product.imagesByColor[variant.colorSlug]) {
      errors.push(`${product.slug}: ${variant.colorSlug} has no image mapping`);
    }
  }

  for (const [color, images] of Object.entries(product.imagesByColor)) {
    if (images.length === 0) errors.push(`${product.slug}: ${color} has no images`);
    for (const image of images) {
      if (!image.alt.trim()) errors.push(`${product.slug}: image is missing alt text`);
      if (!assetExists(image.src)) errors.push(`${product.slug}: missing ${image.src}`);
    }
  }
}

for (const slide of heroSlides) {
  if (!slide.mobileOnly && !slide.desktopImage) {
    errors.push(`${slide.id}: desktop image is required unless the slide is mobile-only`);
  }
  if (slide.desktopImage && !assetExists(slide.desktopImage.src)) {
    errors.push(`Missing ${slide.desktopImage.src}`);
  }
  if (!assetExists(slide.mobileImage.src)) errors.push(`Missing ${slide.mobileImage.src}`);
}

for (const section of homeSections) {
  for (const slug of section.productSlugs) {
    if (!products.some((product) => product.slug === slug && product.published)) {
      errors.push(`Homepage section ${section.id} references missing product ${slug}`);
    }
  }
}

if (errors.length) {
  console.error(`Content validation failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Content validated: ${products.length} products, ${skus.size} variants, ${heroSlides.length} hero slide.`);
