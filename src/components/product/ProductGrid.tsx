import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  labels,
  products,
}: {
  labels: Dictionary["productCard"];
  products: Product[];
}) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} labels={labels} product={product} />
      ))}
    </div>
  );
}
