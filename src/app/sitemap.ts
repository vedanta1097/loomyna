import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publishedProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteConfig.url}/about-us`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/tops`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/bottoms`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/shipping-returns`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...publishedProducts.map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
