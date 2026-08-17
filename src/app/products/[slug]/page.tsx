import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { siteConfig } from "@/config/site";
import { getProductBySlug, publishedProducts } from "@/data/products";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const image = product.imagesByColor[product.variants[0].colorSlug][0];

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const image = product.imagesByColor[product.variants[0].colorSlug][0];
  const related = publishedProducts.filter(
    (candidate) => candidate.slug !== product.slug && candidate.category === product.category,
  ).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${siteConfig.url}${image.src}`,
    description: product.shortDescription,
    sku: product.variants[0].sku,
    brand: { "@type": "Brand", name: "Loomyna" },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <nav className="breadcrumbs shell" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span>
        <Link href="/#shop">Shop</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <ProductDetail product={product} />
      {related.length ? (
        <section className="related shell">
          <p className="eyebrow">You may also like</p>
          <h2>Keep the good mood going</h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
