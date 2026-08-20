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
  estimatedShipping?: string;
  estimatedCompletion?: string;
};

export function buildWhatsAppUrl(order: WhatsAppOrder, locale: Locale = "en") {
  const message = locale === "id"
    ? [
        "Halo Loomyna, saya ingin memesan:",
        "",
        `Produk: ${order.productName}`,
        `Warna: ${order.color}`,
        `Ukuran: ${order.size}`,
        `Jumlah: ${order.quantity}`,
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
            ]
          : []),
        `Tautan produk: ${order.productUrl}`,
      ]
    : [
        "Hi Loomyna, I would like to order:",
        "",
        `Product: ${order.productName}`,
        `Color: ${order.color}`,
        `Size: ${order.size}`,
        `Quantity: ${order.quantity}`,
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
            ]
          : []),
        `Product link: ${order.productUrl}`,
      ];

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message.join("\n"))}`;
}
