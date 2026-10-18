/**
 * Format price according to currency and locale
 */

export interface PriceFormatOptions {
  currency: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

const DEFAULT_OPTIONS: PriceFormatOptions = {
  currency: 'IDR',
  locale: 'id-ID',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

/**
 * Format a numeric price to a localized currency string
 * @param price - Price in smallest currency unit (e.g., 350000 for IDR 350.000)
 * @param options - Formatting options
 * @returns Formatted price string (e.g., "Rp 350.000")
 */
export function formatPrice(
  price: number,
  options: Partial<PriceFormatOptions> = {}
): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Intl.NumberFormat(opts.locale, {
    style: 'currency',
    currency: opts.currency,
    minimumFractionDigits: opts.minimumFractionDigits,
    maximumFractionDigits: opts.maximumFractionDigits,
  }).format(price);
}

/**
 * Format price with custom currency symbol
 * @param price - Price in smallest currency unit
 * @param currency - Currency code (e.g., 'IDR', 'USD')
 * @param locale - Locale for formatting (e.g., 'id-ID', 'en-US')
 * @returns Formatted price string
 */
export function formatPriceCustom(
  price: number,
  currency: string,
  locale: string = 'id-ID'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'IDR' ? 0 : 2,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  }).format(price);
}

/**
 * Parse a formatted price string back to number
 * @param formattedPrice - Formatted price string (e.g., "Rp 350.000")
 * @returns Price as number or null if invalid
 */
export function parsePrice(formattedPrice: string): number | null {
  // Remove currency symbols, spaces, and separators
  const numericString = formattedPrice.replace(/[^\d.,-]/g, '').replace(/\./g, '').replace(',', '.');
  const parsed = Number(numericString);
  return isNaN(parsed) ? null : parsed;
}