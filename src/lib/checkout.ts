import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { ProductVariantStatus } from "@/types/product";

type WhatsAppOrder = {
  productName: string;
  color: string;
  size: string;
  quantity: number;
  formattedPrice: string;
  addOns?: { name: string; formattedUnitPrice: string }[];
  productUrl: string;
  orderType: ProductVariantStatus;
  customMade?: boolean;
  reversibleSides?: { sideA: string; sideB: string };
  productionLeadTimeDays?: number;
  estimatedShipping?: string;
  estimatedCompletion?: string;
  deliveryDestination: DeliveryDestination;
};

export type DeliveryDestination = "bali" | "indonesia" | "international";

export function buildWhatsAppUrl(order: WhatsAppOrder, locale: Locale = "en") {
  const delivery = getDeliveryDetails(order.deliveryDestination, locale);
  const message = locale === "id"
    ? [
        "Halo Loomyna, saya ingin memesan:",
        "",
        `Produk: ${order.productName}`,
        ...(order.reversibleSides
          ? [
              `Sisi A: ${order.reversibleSides.sideA}`,
              `Sisi B: ${order.reversibleSides.sideB}`,
            ]
          : [`Warna: ${order.color}`]),
        ...(order.customMade ? ["Jenis: Custom made"] : []),
        `Ukuran: ${order.size}`,
        `Jumlah: ${order.quantity}`,
        `Tujuan pengiriman: ${delivery.destination}`,
        `Metode pengiriman: ${delivery.method}`,
        "Biaya pengiriman: Akan dikonfirmasi",
        ...(order.addOns?.length
          ? [
              `Add-on: ${order.addOns.map((addOn) => `${addOn.name} (+${addOn.formattedUnitPrice}/produk)`).join(", ")}`,
            ]
          : []),
        `Total: ${order.formattedPrice}`,
        ...(order.orderType === "pre-order"
          ? [
              "Jenis pesanan: Pre-order",
              ...(order.estimatedShipping
                ? [`Estimasi pengiriman: ${order.estimatedShipping}`]
                : []),
              ...(order.estimatedCompletion
                ? [`Estimasi selesai produksi: ${order.estimatedCompletion}`]
                : []),
              ...(order.productionLeadTimeDays === 7
                ? ["Perkiraan produksi: sekitar 1 minggu setelah pesanan dikonfirmasi; waktu pengiriman tambahan."]
                : []),
            ]
          : []),
        `Tautan produk: ${order.productUrl}`,
      ]
    : [
        "Hi Loomyna, I would like to order:",
        "",
        `Product: ${order.productName}`,
        ...(order.reversibleSides
          ? [
              `Side A: ${order.reversibleSides.sideA}`,
              `Side B: ${order.reversibleSides.sideB}`,
            ]
          : [`Color: ${order.color}`]),
        ...(order.customMade ? ["Type: Custom made"] : []),
        `Size: ${order.size}`,
        `Quantity: ${order.quantity}`,
        `Delivery destination: ${delivery.destination}`,
        `Delivery method: ${delivery.method}`,
        "Shipping cost: To be confirmed",
        ...(order.addOns?.length
          ? [
              `Add-on: ${order.addOns.map((addOn) => `${addOn.name} (+${addOn.formattedUnitPrice}/item)`).join(", ")}`,
            ]
          : []),
        `Total: ${order.formattedPrice}`,
        ...(order.orderType === "pre-order"
          ? [
              "Order type: Pre-order",
              ...(order.estimatedShipping
                ? [`Estimated shipping: ${order.estimatedShipping}`]
                : []),
              ...(order.estimatedCompletion
                ? [`Estimated production completion: ${order.estimatedCompletion}`]
                : []),
              ...(order.productionLeadTimeDays === 7
                ? ["Production estimate: about 1 week after order confirmation; delivery takes additional time."]
                : []),
            ]
          : []),
        `Product link: ${order.productUrl}`,
      ];

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message.join("\n"))}`;
}

function getDeliveryDetails(destination: DeliveryDestination, locale: Locale) {
  const details = {
    en: {
      bali: { destination: "Bali", method: "Gojek, Grab, or similar local courier" },
      indonesia: {
        destination: "Elsewhere in Indonesia",
        method: "JNE or another domestic courier",
      },
      international: {
        destination: "Outside Indonesia",
        method: "International shipping (availability to be confirmed)",
      },
    },
    id: {
      bali: { destination: "Bali", method: "Gojek, Grab, atau kurir lokal serupa" },
      indonesia: {
        destination: "Luar Bali, masih di Indonesia",
        method: "JNE atau ekspedisi domestik lainnya",
      },
      international: {
        destination: "Luar Indonesia",
        method: "Pengiriman internasional (ketersediaan akan dikonfirmasi)",
      },
    },
  } as const;

  return details[locale][destination];
}
