import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { heroSlides, homeSections } from "../src/config/home";
import { products } from "../src/data/products";

const errors: string[] = [];
const ids = new Set<string>();
const slugs = new Set<string>();
const skus = new Set<string>();
const productAssetsDirectory = join(process.cwd(), "public", "assets", "products");

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
  if (!assetExists(product.coverImage.src)) {
    errors.push(`${product.slug}: missing cover ${product.coverImage.src}`);
  }
  if (product.coverImage.view !== "main") {
    errors.push(`${product.slug}: cover image must use the main view`);
  }

  for (const variant of product.variants) {
    if (skus.has(variant.sku)) errors.push(`Duplicate SKU: ${variant.sku}`);
    skus.add(variant.sku);
    if (!product.imagesByColor[variant.colorSlug]) {
      errors.push(`${product.slug}: ${variant.colorSlug} has no image mapping`);
    }
  }

  const addOnIds = new Set<string>();
  for (const addOn of product.addOns ?? []) {
    if (addOnIds.has(addOn.id)) {
      errors.push(`${product.slug}: duplicate add-on id ${addOn.id}`);
    }
    addOnIds.add(addOn.id);
    if (!Number.isInteger(addOn.price) || addOn.price <= 0) {
      errors.push(`${product.slug}: add-on ${addOn.id} price must be a positive integer`);
    }
  }

  for (const [color, images] of Object.entries(product.imagesByColor)) {
    if (images.length === 0) errors.push(`${product.slug}: ${color} has no images`);
    if (images[0]?.view !== "main") {
      errors.push(`${product.slug}: ${color} gallery must start with its main image`);
    }

    const colorVariants = product.variants.filter(
      (variant) => variant.colorSlug === color,
    );
    const previewAvailable = colorVariants.some(
      (variant) => variant.imagePreviewAvailable !== false,
    );
    const colorMainPath = `/assets/products/${product.slug}/${color}/main-v2.webp`;

    if (previewAvailable && images[0]?.src !== colorMainPath) {
      errors.push(`${product.slug}: ${color} preview must start with ${colorMainPath}`);
    }
    if (previewAvailable && !assetExists(colorMainPath)) {
      errors.push(`${product.slug}: ${color} is preview-ready but ${colorMainPath} is missing`);
    }
    if (!previewAvailable && assetExists(colorMainPath)) {
      errors.push(`${product.slug}: ${color} has a preview image but imagePreviewAvailable is false`);
    }

    const expectedViewOrder = ["main", "side", "back", "full"];
    const actualViewOrder = images.map((image) => image.view);
    if (
      actualViewOrder.some(
        (view, index) =>
          expectedViewOrder.indexOf(view) <=
          expectedViewOrder.indexOf(actualViewOrder[index - 1]),
      )
    ) {
      errors.push(`${product.slug}: ${color} gallery views are out of order`);
    }

    for (const image of images) {
      if (!image.alt.trim()) errors.push(`${product.slug}: image is missing alt text`);
      if (!assetExists(image.src)) errors.push(`${product.slug}: missing ${image.src}`);
      if (image.src.includes("main-v1")) {
        errors.push(`${product.slug}: legacy image reference ${image.src}`);
      }
    }
  }
}

const productAssetSlugs = readdirSync(productAssetsDirectory, {
  withFileTypes: true,
})
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

for (const assetSlug of productAssetSlugs) {
  if (!products.some((product) => product.slug === assetSlug)) {
    errors.push(`Product asset folder is missing from the catalog: ${assetSlug}`);
  }
}

for (const product of products) {
  if (!productAssetSlugs.includes(product.slug)) {
    errors.push(`${product.slug}: product asset folder is missing`);
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
