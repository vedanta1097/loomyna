"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { buildWhatsAppUrl, type DeliveryDestination } from "@/lib/checkout";
import { formatIDR } from "@/lib/format";
import type { Product } from "@/types/product";
import { ColorPicker } from "./ColorPicker";

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
  const [orderMode, setOrderMode] = useState<"standard" | "custom">("standard");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryDestination, setDeliveryDestination] = useState<DeliveryDestination>();
  const [activeImage, setActiveImage] = useState(0);
  const touchStartX = useRef<number | undefined>(undefined);

  const colors = useMemo(
    () =>
      Array.from(
        new Map(product.variants.map((variant) => [variant.colorSlug, variant])).values(),
      ),
    [product.variants],
  );

  const sizes = Array.from(new Set(product.variants.map((variant) => variant.size)));
  const customMode = orderMode === "custom" && Boolean(product.customOrder);
  const images = selectedColor && !customMode
    ? product.imagesByColor[selectedColor]
    : [product.coverImage];
  const selectedColorVariant = colors.find((color) => color.colorSlug === selectedColor);
  const selectedVariant = product.variants.find(
    (variant) =>
      variant.colorSlug === selectedColor &&
      variant.size === selectedSize &&
      variant.status !== "sold-out",
  );
  const selectedColorName = selectedColorVariant?.color;
  const chartColors = product.customOrder?.colors.map((color) => ({
    value: color.name,
    label: color.name,
    hex: color.hex,
  })) ?? [];
  const sideAColor = product.customOrder?.colors.find((color) => color.name === sideA);
  const previewUnavailable = selectedColorVariant?.imagePreviewAvailable === false;
  const isPreOrder = customMode || selectedVariant?.status === "pre-order";
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
    (customMode ? product.customOrder!.price : product.price) +
    selectedAddOns.reduce((total, addOn) => total + addOn.price, 0);
  const canCheckout = customMode
    ? Boolean(selectedSize && sideA)
    : Boolean(selectedVariant);
  const canOrderWhatsApp = canCheckout && Boolean(deliveryDestination);
  const shopeeUrl = selectedVariant?.shopeeUrl ?? product.shopeeUrl;
  const reversibleSides = customMode
    ? (sideA ? { sideA, sideB: sideB || sideA } : undefined)
    : selectedVariant?.reversibleSides;
  const selectionName = reversibleSides
    ? `${labels.sideA}: ${reversibleSides.sideA} · ${labels.sideB}: ${reversibleSides.sideB}`
    : selectedColorName;
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
        color: customMode ? sideA : selectedColorName!,
        size: selectedSize!,
        quantity,
        formattedPrice: formatIDR(unitPrice * quantity),
        addOns: selectedAddOns.map((addOn) => ({
          name: addOn.name,
          formattedUnitPrice: formatIDR(addOn.price),
        })),
        productUrl: `${siteConfig.url}/products/${product.slug}`,
        orderType: customMode ? "pre-order" : selectedVariant!.status,
        customMade: customMode,
        reversibleSides,
        productionLeadTimeDays: isPreOrder ? product.preOrderLeadTimeDays : undefined,
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

  function chooseMode(mode: "standard" | "custom") {
    setOrderMode(mode);
    setSelectedColor(undefined);
    setSelectedSize(undefined);
    setActiveImage(0);
  }

  function showPreviousImage() {
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  }

  function showNextImage() {
    setActiveImage((current) => (current + 1) % images.length);
  }

  function handleGalleryKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (images.length < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPreviousImage();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNextImage();
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    touchStartX.current = undefined;
    if (images.length < 2 || startX === undefined) return;

    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined || Math.abs(startX - endX) < 45) return;
    if (startX > endX) showNextImage();
    else showPreviousImage();
  }

  function sizeIsAvailable(size: string) {
    if (customMode) return sizes.includes(size);
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
        <div
          className="gallery-main"
          tabIndex={images.length > 1 ? 0 : undefined}
          onKeyDown={handleGalleryKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[activeImage].src}
            alt={images[activeImage].alt}
            fill
            unoptimized={images[activeImage].src.endsWith(".jpg")}
            loading="eager"
            placeholder={images[activeImage].blurDataURL ? "blur" : "empty"}
            blurDataURL={images[activeImage].blurDataURL}
            sizes="(max-width: 899px) 100vw, 58vw"
          />
          {images.length > 1 ? (
            <div className="gallery-arrows">
              <button
                type="button"
                aria-label={labels.previousImage}
                onClick={showPreviousImage}
              >
                ←
              </button>
              <button
                type="button"
                aria-label={labels.nextImage}
                onClick={showNextImage}
              >
                →
              </button>
            </div>
          ) : null}
          {images.length > 1 ? (
            <span className="gallery-position" aria-live="polite">
              {activeImage + 1} / {images.length}
            </span>
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
                  unoptimized={image.src.endsWith(".jpg")}
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
        <p className="product-price">{formatIDR(unitPrice)}</p>
        <p className="product-description">{product.description}</p>

        {product.customOrder ? (
          <fieldset className="option-group">
            <legend>{labels.orderStyle}</legend>
            <div className="size-options">
              <button
                type="button"
                className={!customMode ? "selected" : ""}
                aria-pressed={!customMode}
                onClick={() => chooseMode("standard")}
              >
                {labels.readyColorways} · {formatIDR(product.price)}
              </button>
              <button
                type="button"
                className={customMode ? "selected" : ""}
                aria-pressed={customMode}
                onClick={() => chooseMode("custom")}
              >
                {labels.customMade} · {formatIDR(product.customOrder.price)}
              </button>
            </div>
            <p className="reversible-note">{labels.reversibleNote}</p>
          </fieldset>
        ) : null}

        {!customMode ? (
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
        ) : null}

        {customMode && product.customOrder ? (
          <fieldset className="option-group custom-colors">
            <legend>{labels.customColors}</legend>
            <p className="reversible-note">{labels.customColorsNote}</p>
            <details className="color-chart-details" open>
              <summary>{labels.viewColorChart}</summary>
              <div className="color-chart-scroll">
                <Image
                  src={product.customOrder.colorChart.src}
                  alt={labels.colorChartAlt}
                  width={product.customOrder.colorChart.width}
                  height={product.customOrder.colorChart.height}
                  unoptimized
                />
              </div>
              <a href={product.customOrder.colorChart.src} target="_blank" rel="noreferrer">
                {labels.openFullColorChart}
              </a>
            </details>
            <ColorPicker
              id="bikini-side-a"
              label={labels.sideA}
              placeholder={labels.chooseChartColor}
              value={sideA}
              onChange={setSideA}
              options={chartColors}
            />
            <ColorPicker
              id="bikini-side-b"
              label={labels.sideB}
              placeholder={labels.chooseChartColor}
              value={sideB}
              onChange={setSideB}
              options={[
                { value: "", label: labels.sameAsSideA, hex: sideAColor?.hex ?? "#ffffff" },
                ...chartColors,
              ]}
              disabled={!sideA}
            />
          </fieldset>
        ) : null}

        {isPreOrder || previewUnavailable ? (
          <div className="preorder-notice" role="status">
            <strong>{isPreOrder ? labels.preOrder : selectedColorName}</strong>
            <p>
              {isPreOrder
                ? product.preOrderLeadTimeDays === 7
                  ? labels.oneWeekProduction
                  : labels.preOrderNotice
                : null}
              {previewUnavailable
                ? `${isPreOrder ? " " : ""}${labels.preOrderPreviewNotice}`
                : null}
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
            {labels.size} <span>{selectedSize ?? (customMode || selectedColor ? labels.chooseSize : labels.chooseColorFirst)}</span>
          </legend>
          <div className="size-options">
            {sizes.map((size) => {
              const available = Boolean((customMode || selectedColor) && sizeIsAvailable(size));
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
                  {(customMode || sizeVariant?.status === "pre-order") ? (
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
            ? `${customMode ? `${labels.customMade} · ` : ""}${selectionName} · ${selectedSize} · ${quantity} ${quantity === 1 ? labels.piece : labels.pieces}${selectedAddOns.length ? ` · + ${selectedAddOns.map((addOn) => addOn.name).join(", ")}` : ""}${isPreOrder ? ` · ${labels.preOrder}` : ""} · ${selectedDelivery?.label} · ${formatIDR(unitPrice * quantity)}`
            : canCheckout
              ? labels.selectDeliveryDestination
              : customMode
                ? labels.selectCustomOptions
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
          {!product.webOnly ? shopeeUrl && canCheckout && !isPreOrder ? (
            <a className="button button-secondary" href={shopeeUrl} target="_blank" rel="noreferrer">
              {labels.buyShopee}
            </a>
          ) : (
            <button className="button button-secondary" type="button" disabled>
              {shopeeUrl ? labels.buyShopee : labels.shopeeSoon}
            </button>
          ) : null}
        </div>
        <p className="checkout-note">
          {product.webOnly ? `${labels.webOnlyNotice} ` : ""}{labels.checkoutNote}
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
