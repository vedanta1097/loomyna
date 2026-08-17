import { siteConfig } from "@/config/site";

type WhatsAppOrder = {
  productName: string;
  color: string;
  size: string;
  quantity: number;
  formattedPrice: string;
  productUrl: string;
};

export function buildWhatsAppUrl(order: WhatsAppOrder) {
  const message = [
    "Hi Loomyna, I would like to order:",
    "",
    `Product: ${order.productName}`,
    `Color: ${order.color}`,
    `Size: ${order.size}`,
    `Quantity: ${order.quantity}`,
    `Price: ${order.formattedPrice}`,
    `Product: ${order.productUrl}`,
  ].join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
