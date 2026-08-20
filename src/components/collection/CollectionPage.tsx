import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/types/product";

type CollectionCopy = {
  title: string;
  description: string;
};

export function CollectionPage({
  copy,
  dictionary,
  products,
}: {
  copy: CollectionCopy;
  dictionary: Dictionary;
  products: Product[];
}) {
  return (
    <>
      <nav className="breadcrumbs shell" aria-label={dictionary.productPage.breadcrumbLabel}>
        <Link href="/">{dictionary.productPage.home}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{copy.title}</span>
      </nav>
      <section className="collection-page shell">
        <header className="page-heading">
          <p className="eyebrow">{dictionary.collections.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </header>
        <ProductGrid labels={dictionary.productCard} products={products} />
      </section>
    </>
  );
}
