import Image from "next/image";
import Link from "next/link";
import { formatIDR } from "@/lib/format";
import type { Product } from "@/types/product";

const badgeLabels = {
  new: "New",
  featured: "Our pick",
  bestseller: "Loved",
  "sold-out": "Sold out",
};

export function ProductCard({ product }: { product: Product }) {
  const firstVariant = product.variants[0];
  const image = product.imagesByColor[firstVariant.colorSlug][0];
  const colors = Array.from(
    new Map(product.variants.map((variant) => [variant.colorSlug, variant])).values(),
  );

  return (
    <article className="product-card">
      <Link className="product-card-image" href={`/products/${product.slug}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 699px) 50vw, (max-width: 1100px) 33vw, 25vw"
        />
        {product.badges?.[0] ? (
          <span className="product-badge">{badgeLabels[product.badges[0]]}</span>
        ) : null}
        <span className="quick-view">View piece</span>
      </Link>
      <div className="product-card-info">
        <div>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
          <p>{formatIDR(product.price)}</p>
        </div>
        <div className="swatches" aria-label={`Available colors: ${colors.map((color) => color.color).join(", ")}`}>
          {colors.map((color) => (
            <span
              key={color.colorSlug}
              title={color.color}
              style={{ backgroundColor: color.colorHex }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
