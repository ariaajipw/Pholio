/**
 * WhatsApp message formatter
 * Creates properly encoded WhatsApp URLs with pre-filled messages
 */

/**
 * WhatsApp message configuration
 */
export interface WhatsAppMessageConfig {
  /** Phone number in international format (e.g., '6281234567890') */
  phoneNumber: string;
  /** Base message text */
  message: string;
  /** Optional product context to append */
  productContext?: {
    name: string;
    price?: string;
    url?: string;
  };
}

/**
 * Build WhatsApp URL with encoded message
 * @param config - WhatsApp message configuration
 * @returns Complete WhatsApp URL
 */
export function buildWhatsAppUrl(config: WhatsAppMessageConfig): string {
  const { phoneNumber, message, productContext } = config;

  let fullMessage = message;

  if (productContext) {
    const parts = [
      productContext.name,
      productContext.price ? `Harga: ${productContext.price}` : null,
      productContext.url ? `Link: ${productContext.url}` : null,
    ].filter(Boolean);

    if (parts.length > 0) {
      fullMessage += '\n\n' + parts.join('\n');
    }
  }

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(fullMessage.trim());

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Build WhatsApp URL for general inquiry
 * @param phoneNumber - Phone number in international format
 * @param message - Message text
 * @returns WhatsApp URL
 */
export function buildWhatsAppInquiryUrl(phoneNumber: string, message: string): string {
  return buildWhatsAppUrl({ phoneNumber, message });
}

/**
 * Build WhatsApp URL for product inquiry
 * @param phoneNumber - Phone number in international format
 * @param productName - Product name
 * @param price - Optional formatted price
 * @param productUrl - Optional product page URL
 * @returns WhatsApp URL
 */
export function buildWhatsAppProductUrl(
  phoneNumber: string,
  productName: string,
  price?: string,
  productUrl?: string
): string {
  const baseMessage = `Halo, saya tertarik dengan produk:`;
  return buildWhatsAppUrl({
    phoneNumber,
    message: baseMessage,
    productContext: {
      name: productName,
      price,
      url: productUrl,
    },
  });
}

/**
 * Default WhatsApp message templates
 */
export const WHATSAPP_TEMPLATES = {
  general: 'Halo, saya ingin bertanya tentang portofolio dan layanan Anda.',
  productInquiry: (productName: string) => `Halo, saya tertarik dengan "${productName}". Bisa dibantu informasinya?`,
  customOrder: 'Halo, saya ingin memesan foto dengan spesifikasi khusus. Bisa diskusikan lebih lanjut?',
};