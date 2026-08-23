import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";
import { siteConfig } from "@/config/site";
import { getProductBySlug, getPublishedProducts, publishedProducts } from "@/data/products";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug, await getLocale());
  if (!product) return {};
  const image = product.coverImage;

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
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const localizedProducts = getPublishedProducts(locale);
  const product = getProductBySlug(slug, locale);
  if (!product) notFound();

  const image = product.coverImage;
  const related = localizedProducts.filter(
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
      <nav className="breadcrumbs shell" aria-label={dictionary.productPage.breadcrumbLabel}>
        <Link href="/">{dictionary.productPage.home}</Link><span aria-hidden="true">/</span>
        <Link href="/#shop">{dictionary.productPage.shop}</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>
      <ProductDetail labels={dictionary.productDetail} locale={locale} product={product} />
      {related.length ? (
        <section className="related shell">
          <p className="eyebrow">{dictionary.productPage.relatedEyebrow}</p>
          <h2>{dictionary.productPage.relatedTitle}</h2>
          <ProductGrid labels={dictionary.productCard} products={related} />
        </section>
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
