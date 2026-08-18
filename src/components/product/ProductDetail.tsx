"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { buildWhatsAppUrl } from "@/lib/checkout";
import { formatIDR } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductDetail({
  labels,
  locale,
  product,
}: {
  labels: Dictionary["productDetail"];
  locale: Locale;
  product: Product;
}) {
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const colors = useMemo(
    () =>
      Array.from(
        new Map(product.variants.map((variant) => [variant.colorSlug, variant])).values(),
      ),
    [product.variants],
  );

  const sizes = Array.from(new Set(product.variants.map((variant) => variant.size)));
  const galleryColor = selectedColor ?? colors[0].colorSlug;
  const images = product.imagesByColor[galleryColor];
  const selectedVariant = product.variants.find(
    (variant) =>
      variant.colorSlug === selectedColor && variant.size === selectedSize && variant.available,
  );
  const selectedColorName = colors.find((color) => color.colorSlug === selectedColor)?.color;
  const canCheckout = Boolean(selectedVariant);
  const shopeeUrl = selectedVariant?.shopeeUrl ?? product.shopeeUrl;

  const whatsappUrl = canCheckout
    ? buildWhatsAppUrl({
        productName: product.name,
        color: selectedColorName!,
        size: selectedSize!,
        quantity,
        formattedPrice: formatIDR(product.price * quantity),
        productUrl: `${siteConfig.url}/products/${product.slug}`,
      }, locale)
    : undefined;

  function chooseColor(colorSlug: string) {
    setSelectedColor(colorSlug);
    setSelectedSize(undefined);
    setActiveImage(0);
  }

  function sizeIsAvailable(size: string) {
    return product.variants.some(
      (variant) =>
        variant.colorSlug === selectedColor && variant.size === size && variant.available,
    );
  }

  return (
    <div className="product-detail shell">
      <div className="gallery" aria-label={`${product.name} ${labels.images}`}>
        <div className="gallery-main">
          <Image
            src={images[activeImage].src}
            alt={images[activeImage].alt}
            fill
            preload
            placeholder={images[activeImage].blurDataURL ? "blur" : "empty"}
            blurDataURL={images[activeImage].blurDataURL}
            sizes="(max-width: 899px) 100vw, 58vw"
          />
          {images.length > 1 ? (
            <div className="gallery-arrows">
              <button
                type="button"
                aria-label={labels.previousImage}
                onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)}
              >
                ←
              </button>
              <button
                type="button"
                aria-label={labels.nextImage}
                onClick={() => setActiveImage((activeImage + 1) % images.length)}
              >
                →
              </button>
            </div>
          ) : null}
        </div>
        {images.length > 1 ? (
          <div className="gallery-thumbnails">
            {images.map((image, index) => (
              <button
                type="button"
                key={image.src}
                className={activeImage === index ? "active" : ""}
                aria-label={`${labels.viewImage} ${index + 1}`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  placeholder={image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={image.blurDataURL}
                  sizes="88px"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="product-panel">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-price">{formatIDR(product.price)}</p>
        <p className="product-description">{product.description}</p>

        <fieldset className="option-group">
          <legend>
            {labels.color} <span>{selectedColorName ?? labels.chooseColor}</span>
          </legend>
          <div className="color-options">
            {colors.map((color) => (
              <button
                type="button"
                key={color.colorSlug}
                className={selectedColor === color.colorSlug ? "selected" : ""}
                aria-pressed={selectedColor === color.colorSlug}
                onClick={() => chooseColor(color.colorSlug)}
              >
                <span style={{ background: color.colorHex }} />
                {color.color}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="option-group">
          <legend>
            {labels.size} <span>{selectedSize ?? (selectedColor ? labels.chooseSize : labels.chooseColorFirst)}</span>
          </legend>
          <div className="size-options">
            {sizes.map((size) => {
              const available = Boolean(selectedColor && sizeIsAvailable(size));
              return (
                <button
                  type="button"
                  key={size}
                  className={selectedSize === size ? "selected" : ""}
                  disabled={!available}
                  aria-pressed={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="quantity-row">
          <span>{labels.quantity}</span>
          <div className="quantity-control">
            <button
              type="button"
              aria-label={labels.decreaseQuantity}
              disabled={quantity === 1}
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            >
              −
            </button>
            <output aria-live="polite">{quantity}</output>
            <button
              type="button"
              aria-label={labels.increaseQuantity}
              onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            >
              +
            </button>
          </div>
        </div>

        <p className="selection-summary" aria-live="polite">
          {canCheckout
            ? `${selectedColorName} · ${selectedSize} · ${quantity} ${quantity === 1 ? labels.piece : labels.pieces}`
            : labels.selectOptions}
        </p>

        <div className="checkout-actions">
          {whatsappUrl ? (
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> {labels.orderWhatsApp}
            </a>
          ) : (
            <button className="button button-primary" type="button" disabled>
              <WhatsAppIcon /> {labels.orderWhatsApp}
            </button>
          )}
          {shopeeUrl && canCheckout ? (
            <a className="button button-secondary" href={shopeeUrl} target="_blank" rel="noreferrer">
              {labels.buyShopee}
            </a>
          ) : (
            <button className="button button-secondary" type="button" disabled>
              {shopeeUrl ? labels.buyShopee : labels.shopeeSoon}
            </button>
          )}
        </div>
        <p className="checkout-note">
          {labels.checkoutNote}
        </p>

        <div className="product-notes">
          <details open>
            <summary>{labels.details}</summary>
            <p>{product.material}</p>
          </details>
          <details>
            <summary>{labels.sizeFit}</summary>
            {product.sizeGuide?.map((line) => <p key={line}>{line}</p>)}
          </details>
          <details>
            <summary>{labels.care}</summary>
            <ul>
              {product.careInstructions?.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M8.5 9.2c.7 2.1 2.2 3.6 4.3 4.3" />
    </svg>
  );
}
