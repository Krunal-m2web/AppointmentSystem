// Currency utilities and data

import { Currency } from '../types/types';

export const CURRENCIES: Currency[] = [
  // Major Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China' },
  
  // Americas
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', country: 'Mexico' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', country: 'Argentina' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', country: 'Chile' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', country: 'Colombia' },
  
  // Europe
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', country: 'Switzerland' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', country: 'Sweden' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', country: 'Norway' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', country: 'Denmark' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', country: 'Poland' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', country: 'Czech Republic' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', country: 'Hungary' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', country: 'Romania' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', country: 'Bulgaria' },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', country: 'Croatia' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', country: 'Russia' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', country: 'Turkey' },
  
  // Asia-Pacific
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', country: 'New Zealand' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', country: 'Singapore' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', country: 'Hong Kong' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', country: 'South Korea' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', country: 'Taiwan' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', country: 'Thailand' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', country: 'Malaysia' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', country: 'Indonesia' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', country: 'Philippines' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', country: 'Vietnam' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', country: 'Pakistan' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', country: 'Bangladesh' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', country: 'Sri Lanka' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: 'Rs', country: 'Nepal' },
  
  // Middle East & Africa
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', country: 'United Arab Emirates' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', country: 'Saudi Arabia' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', country: 'Qatar' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', country: 'Kuwait' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب', country: 'Bahrain' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', country: 'Oman' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', country: 'Israel' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', country: 'Egypt' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', country: 'Kenya' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', country: 'Ghana' },
  
  // Others
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', country: 'Iceland' },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', country: 'Ukraine' },
];

/**
 * Search currencies by name, code, or country
 */
export function searchCurrencies(query: string): Currency[] {
  if (!query.trim()) {
    return CURRENCIES;
  }
  
  const lowerQuery = query.toLowerCase();
  
  return CURRENCIES.filter(
    (currency) =>
      currency.name.toLowerCase().includes(lowerQuery) ||
      currency.code.toLowerCase().includes(lowerQuery) ||
      currency.country.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get currency by code
 */
export function getCurrencyByCode(code: string): Currency | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

/**
 * Get currency symbol by code
 */
export function getCurrencySymbol(code: string): string {
  const currency = getCurrencyByCode(code);
  return currency?.symbol || '$';
}

/**
 * Format price with currency
 */
export function formatPrice(amount: number, currencyCode: string): string {
  const currency = getCurrencyByCode(currencyCode);
  if (!currency) {
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
  
  return `${currency.symbol}${amount.toFixed(2)} ${currency.code}`;
}

/**
 * Format price with currency (symbol only)
 */
export function formatPriceShort(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${amount.toFixed(2)}`;
}
