"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { buildWhatsAppUrl, type DeliveryDestination } from "@/lib/checkout";
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
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDestination, setDeliveryDestination] = useState<DeliveryDestination>();
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
  const selectedColorVariant = colors.find((color) => color.colorSlug === selectedColor);
  const selectedVariant = product.variants.find(
    (variant) =>
      variant.colorSlug === selectedColor &&
      variant.size === selectedSize &&
      variant.status !== "sold-out",
  );
  const selectedColorName = selectedColorVariant?.color;
  const isPreOrder = selectedVariant?.status === "pre-order";
  const estimatedShipping = selectedVariant?.estimatedShipping
    ? formatOrderDate(selectedVariant.estimatedShipping, locale)
    : undefined;
  const estimatedCompletion = selectedVariant?.estimatedCompletion
    ? formatOrderDate(selectedVariant.estimatedCompletion, locale)
    : undefined;
  const selectedAddOns = (product.addOns ?? []).filter((addOn) =>
    selectedAddOnIds.includes(addOn.id),
  );
  const unitPrice =
    product.price + selectedAddOns.reduce((total, addOn) => total + addOn.price, 0);
  const canCheckout = Boolean(selectedVariant);
  const canOrderWhatsApp = canCheckout && Boolean(deliveryDestination);
  const shopeeUrl = selectedVariant?.shopeeUrl ?? product.shopeeUrl;
  const deliveryOptions: Array<{
    value: DeliveryDestination;
    label: string;
    description: string;
  }> = [
    {
      value: "bali",
      label: labels.deliveryBali,
      description: labels.deliveryBaliDescription,
    },
    {
      value: "indonesia",
      label: labels.deliveryIndonesia,
      description: labels.deliveryIndonesiaDescription,
    },
    {
      value: "international",
      label: labels.deliveryInternational,
      description: labels.deliveryInternationalDescription,
    },
  ];
  const selectedDelivery = deliveryOptions.find(
    (option) => option.value === deliveryDestination,
  );

  const whatsappUrl = canOrderWhatsApp
    ? buildWhatsAppUrl({
        productName: product.name,
        color: selectedColorName!,
        size: selectedSize!,
        quantity,
        formattedPrice: formatIDR(unitPrice * quantity),
        addOns: selectedAddOns.map((addOn) => ({
          name: addOn.name,
          formattedUnitPrice: formatIDR(addOn.price),
        })),
        productUrl: `${siteConfig.url}/products/${product.slug}`,
        orderType: selectedVariant!.status,
        estimatedShipping,
        estimatedCompletion,
        deliveryDestination: deliveryDestination!,
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
        variant.colorSlug === selectedColor &&
        variant.size === size &&
        variant.status !== "sold-out",
    );
  }

  function toggleAddOn(addOnId: string) {
    setSelectedAddOnIds((current) =>
      current.includes(addOnId)
        ? current.filter((id) => id !== addOnId)
        : [...current, addOnId],
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
                <span className="color-swatch" style={{ background: color.colorHex }} />
                {color.color}
                {product.variants
                  .filter((variant) => variant.colorSlug === color.colorSlug)
                  .every((variant) => variant.status === "pre-order") ? (
                  <span className="variant-status">{labels.preOrder}</span>
                ) : null}
              </button>
            ))}
          </div>
        </fieldset>

        {isPreOrder ? (
          <div className="preorder-notice" role="status">
            <strong>{labels.preOrder}</strong>
            <p>
              {labels.preOrderNotice}
              {selectedColorVariant?.imagePreviewAvailable === false
                ? ` ${labels.preOrderPreviewNotice}`
                : ""}
              {estimatedShipping ? (
                <>
                  {` ${labels.estimatedShipping}: `}
                  <time dateTime={selectedVariant?.estimatedShipping}>{estimatedShipping}</time>.
                </>
              ) : null}
              {estimatedCompletion ? (
                <>
                  {` ${labels.estimatedCompletion}: `}
                  <time dateTime={selectedVariant?.estimatedCompletion}>{estimatedCompletion}</time>.
                </>
              ) : null}
            </p>
          </div>
        ) : null}

        <fieldset className="option-group">
          <legend>
            {labels.size} <span>{selectedSize ?? (selectedColor ? labels.chooseSize : labels.chooseColorFirst)}</span>
          </legend>
          <div className="size-options">
            {sizes.map((size) => {
              const available = Boolean(selectedColor && sizeIsAvailable(size));
              const sizeVariant = product.variants.find(
                (variant) =>
                  variant.colorSlug === selectedColor && variant.size === size,
              );
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
                  {sizeVariant?.status === "pre-order" ? (
                    <span className="variant-status">{labels.preOrder}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </fieldset>

        {product.addOns?.length ? (
          <fieldset className="option-group add-on-group">
            <legend>
              {labels.addOns} <span>{labels.optional}</span>
            </legend>
            <div className="add-on-options">
              {product.addOns.map((addOn) => (
                <label key={addOn.id}>
                  <input
                    type="checkbox"
                    checked={selectedAddOnIds.includes(addOn.id)}
                    onChange={() => toggleAddOn(addOn.id)}
                  />
                  <span>{addOn.name}</span>
                  <span className="add-on-price">
                    +{formatIDR(addOn.price)} {labels.each}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

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

        <fieldset className="option-group delivery-group">
          <legend>
            {labels.deliveryDestination}{" "}
            <span>{selectedDelivery?.label ?? labels.required}</span>
          </legend>
          <div className="delivery-options">
            {deliveryOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="delivery-destination"
                  value={option.value}
                  checked={deliveryDestination === option.value}
                  onChange={() => setDeliveryDestination(option.value)}
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
              </label>
            ))}
          </div>
          <p className="delivery-note">{labels.deliveryNote}</p>
        </fieldset>

        <p className="selection-summary" aria-live="polite">
          {canOrderWhatsApp
            ? `${selectedColorName} · ${selectedSize} · ${quantity} ${quantity === 1 ? labels.piece : labels.pieces}${selectedAddOns.length ? ` · + ${selectedAddOns.map((addOn) => addOn.name).join(", ")}` : ""}${isPreOrder ? ` · ${labels.preOrder}` : ""} · ${selectedDelivery?.label} · ${formatIDR(unitPrice * quantity)}`
            : canCheckout
              ? labels.selectDeliveryDestination
            : labels.selectOptions}
        </p>

        <div className="checkout-actions">
          {whatsappUrl ? (
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> {isPreOrder ? labels.preOrderWhatsApp : labels.orderWhatsApp}
            </a>
          ) : (
            <button className="button button-primary" type="button" disabled>
              <WhatsAppIcon /> {isPreOrder ? labels.preOrderWhatsApp : labels.orderWhatsApp}
            </button>
          )}
          {shopeeUrl && canCheckout && !isPreOrder ? (
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
          <details open>
            <summary>{labels.sizeFit}</summary>
            {product.sizeGuide?.map((line) => <p key={line}>{line}</p>)}
            {product.sizeMeasurements?.length ? (
              <div className="size-table-wrap">
                <table className="size-table">
                  <thead>
                    <tr>
                      <th scope="col">{labels.measurementSize}</th>
                      <th scope="col">{labels.measurementWaist}</th>
                      <th scope="col">{labels.measurementThigh}</th>
                      <th scope="col">{labels.measurementLength}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizeMeasurements.map((measurement) => (
                      <tr key={measurement.size}>
                        <th scope="row">{measurement.size}</th>
                        <td>{measurement.waist}</td>
                        <td>{measurement.thigh}</td>
                        <td>{measurement.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </details>
          <details open>
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

function formatOrderDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M8.5 9.2c.7 2.1 2.2 3.6 4.3 4.3" />
    </svg>
  );
}
