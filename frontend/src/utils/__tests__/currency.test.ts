import { describe, it, expect } from 'vitest';
import { formatPrice, getLocaleForCurrency } from '../currency';

describe('currency utilities', () => {
  describe('getLocaleForCurrency', () => {
    it('should return correct locale for USD', () => {
      expect(getLocaleForCurrency('USD')).toBe('en-US');
    });

    it('should return correct locale for INR', () => {
      expect(getLocaleForCurrency('INR')).toBe('en-IN');
    });

    it('should return correct locale for EUR', () => {
      expect(getLocaleForCurrency('EUR')).toBe('de-DE');
    });

    it('should return correct locale for GBP', () => {
      expect(getLocaleForCurrency('GBP')).toBe('en-GB');
    });

    it('should return en-US for unknown currency', () => {
      expect(getLocaleForCurrency('UNKNOWN')).toBe('en-US');
    });
  });

  describe('formatPrice', () => {
    it('should format USD correctly', () => {
      const formatted = formatPrice(1000, 'USD');
      // Use a regex because of potential non-breaking spaces or different symbol placements
      expect(formatted).toMatch(/\$1,000\.00/);
    });

    it('should format INR correctly', () => {
      const formatted = formatPrice(1000, 'INR');
      // Indian format: ₹1,000.00
      expect(formatted).toMatch(/₹1,000\.00/);
    });

    it('should format EUR correctly', () => {
      const formatted = formatPrice(1000, 'EUR');
      // German format: 1.000,00 € (Wait, Intl.NumberFormat might differ based on environment)
      // We just check if it contains the symbol and the value
      expect(formatted).toContain('€');
      expect(formatted).toMatch(/1.000,00/);
    });
  });
});
