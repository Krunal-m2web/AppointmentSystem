import 'react-phone-number-input/style.css';
import PhoneInputFromLib, { isValidPhoneNumber, Country } from 'react-phone-number-input';
import { forwardRef } from 'react';
import { cn } from './utils';
// If 'cn' is not available, I will use template literals in the implementation below or check for it.
// Based on package.json, 'clsx' and 'tailwind-merge' are present, so 'cn' usually exists.
// I'll assume strict checks and provide a fallback if util is missing in next steps, but for now standard implementation.

import styles from './PhoneInput.module.css'; // We might need some custom CSS to override library defaults to match Tailwind

// Map timezones to country codes
const timezoneToCountry: Record<string, Country> = {
  // Americas
  // Americas
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Mexico_City': 'MX',
  'America/Sao_Paulo': 'BR',
  'America/Buenos_Aires': 'AR',
  'America/Bogota': 'CO',
  'America/Lima': 'PE',
  'America/Santiago': 'CL',
  // Europe
  'Europe/London': 'GB',
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Rome': 'IT',
  'Europe/Madrid': 'ES',
  'Europe/Amsterdam': 'NL',
  'Europe/Brussels': 'BE',
  'Europe/Zurich': 'CH',
  'Europe/Vienna': 'AT',
  'Europe/Stockholm': 'SE',
  'Europe/Oslo': 'NO',
  'Europe/Copenhagen': 'DK',
  'Europe/Helsinki': 'FI',
  'Europe/Warsaw': 'PL',
  'Europe/Prague': 'CZ',
  'Europe/Budapest': 'HU',
  'Europe/Athens': 'GR',
  'Europe/Istanbul': 'TR',
  'Europe/Moscow': 'RU',
  'Europe/Dublin': 'IE',
  'Europe/Lisbon': 'PT',
  'Europe/Luxembourg': 'LU',
  'Europe/Monaco': 'MC',
  'Europe/Reykjavik': 'IS',
  'Europe/Sofia': 'BG',
  'Europe/Tallinn': 'EE',
  'Europe/Vilnius': 'LT',
  'Europe/Riga': 'LV',
  // Asia
  'Asia/Kolkata': 'IN',
  'Asia/Calcutta': 'IN',
  'Asia/Mumbai': 'IN',
  'Asia/Dubai': 'AE',
  'Asia/Singapore': 'SG',
  'Asia/Hong_Kong': 'HK',
  'Asia/Tokyo': 'JP',
  'Asia/Seoul': 'KR',
  'Asia/Shanghai': 'CN',
  'Asia/Beijing': 'CN',
  'Asia/Bangkok': 'TH',
  'Asia/Jakarta': 'ID',
  'Asia/Manila': 'PH',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Karachi': 'PK',
  'Asia/Dhaka': 'BD',
  'Asia/Colombo': 'LK',
  'Asia/Riyadh': 'SA',
  'Asia/Tel_Aviv': 'IL',
  'Asia/Jerusalem': 'IL',
  'Asia/Baku': 'AZ',
  'Asia/Beirut': 'LB',
  'Asia/Ho_Chi_Minh': 'VN',
  'Asia/Kathmandu': 'NP',
  'Asia/Kuwait': 'KW',
  'Asia/Muscat': 'OM',
  'Asia/Qatar': 'QA',
  'Asia/Tashkent': 'UZ',
  'Asia/Yerevan': 'AM',
  // Oceania
  'Australia/Sydney': 'AU',
  'Australia/Melbourne': 'AU',
  'Australia/Brisbane': 'AU',
  'Australia/Perth': 'AU',
  'Australia/Adelaide': 'AU',
  'Australia/Darwin': 'AU',
  'Australia/Hobart': 'AU',
  'Pacific/Auckland': 'NZ',
  'Pacific/Fiji': 'FJ',
  // Africa
  'Africa/Cairo': 'EG',
  'Africa/Johannesburg': 'ZA',
  'Africa/Lagos': 'NG',
  'Africa/Nairobi': 'KE',
  'Africa/Casablanca': 'MA',
  'Africa/Accra': 'GH',
  'Africa/Addis_Ababa': 'ET',
  'Africa/Algiers': 'DZ',
  'Africa/Dar_es_Salaam': 'TZ',
  'Africa/Kampala': 'UG',
  'Africa/Luanda': 'AO',
  'Africa/Maputo': 'MZ',
  'Africa/Tunis': 'TN',
  'UTC': 'US',
  'GMT': 'GB',
};

export function getCountryFromTimezone(timezone?: string): Country {
  if (!timezone) return 'US';
  return timezoneToCountry[timezone] || 'US';
}

function getDialCodeFromCountry(country: Country): string {
  const dialCodes: Record<string, string> = {
    'US': '+1', 'CA': '+1', 'GB': '+44', 'AU': '+61', 'IN': '+91',
    'DE': '+49', 'FR': '+33', 'IT': '+39', 'ES': '+34', 'NL': '+31',
    'BR': '+55', 'MX': '+52', 'JP': '+81', 'CN': '+86', 'KR': '+82',
    'SG': '+65', 'AE': '+971', 'SA': '+966', 'ZA': '+27', 'NZ': '+64',
  };
  return dialCodes[country] || '+1';
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  prefixIcon?: React.ReactNode;
  timezone?: string;
  defaultCountry?: Country;
  onCountryChange?: (country: Country) => void;
}

const PhoneInput = forwardRef<HTMLDivElement, PhoneInputProps>(
  ({ value, onChange, className, error, placeholder = "Enter phone number", disabled, id, prefixIcon, timezone, defaultCountry: propDefaultCountry, onCountryChange }, ref) => {
    const tzCountry = getCountryFromTimezone(timezone);
    const defaultCountry = propDefaultCountry || tzCountry;
    const dialCode = getDialCodeFromCountry(defaultCountry);
    
    // Normalize value: if it doesn't start with '+', prepend the dial code based on timezone
    const normalizedValue = value && value.length > 0 && !value.startsWith('+') 
      ? `${dialCode}${value}` 
      : value;

    return (
      <div className={className} ref={ref}>
        <div className={`relative ${error ? 'phone-input-error' : ''}`}>
          {prefixIcon && (
            <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none z-20">
              {prefixIcon}
            </div>
          )}
          <PhoneInputFromLib
            id={id}
            international
            defaultCountry={defaultCountry}
            value={normalizedValue}
            onChange={(val) => onChange(val as string || '')}
            onCountryChange={onCountryChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`flex h-12 w-full rounded-xl border bg-gray-50 ${prefixIcon ? 'pl-10' : 'px-3'} py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 transition-all duration-200 ${
              error
                ? 'border-rose-500 focus-within:ring-rose-200 focus-within:border-rose-500 shadow-[0_0_0_1px_rgba(244,63,94,0.1)]'
                : 'border-slate-200 focus-within:border-indigo-500 focus-within:ring-indigo-100'
            }`}
            numberInputProps={{
              className: "flex-1 bg-transparent outline-none border-none ml-2 text-slate-900 placeholder:text-slate-400 h-full w-full",
            }}
          />
        </div>
        {error && error.trim() && (
            <p className="text-red-500 text-sm mt-1" role="alert">
            {error}
            </p>
        )}
        <style>{`
          .PhoneInput {
            display: flex;
            align-items: center;
          }
          .PhoneInputCountry {
            display: flex;
            align-items: center;
            margin-right: 0.5rem;
          }
          .PhoneInputCountrySelect {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
            opacity: 0;
            cursor: pointer;
          }
          .PhoneInputCountryIcon {
            width: 1.5rem;
            height: 1rem;
            box-shadow: 0 0 1px rgba(0,0,0,0.5);
            background-color: #fff;
          }
          .PhoneInputCountryIcon--border {
             box-shadow: 0 0 0 1px #b0b0b0, 0 1px 2px rgba(0,0,0,0.1);
          }
          .PhoneInputInput {
            flex: 1;
            min-width: 0;
            background: transparent;
            border: none;
            outline: none;
            font-size: inherit;
            color: inherit;
          }
          
          /* Custom styles to match the design */
           .PhoneInputCountry:hover .PhoneInputCountryIcon {
             opacity: 0.8;
           }
        `}</style>
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { isValidPhoneNumber };
export default PhoneInput;
