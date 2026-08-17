import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publishedProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    ...publishedProducts.map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
