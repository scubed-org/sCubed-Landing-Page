import { Track } from '@react-input/mask';

import { COUNTRY_ID } from '@/constants/countries';

/**
 * Formats Tax ID input to XX-XXXXXXX format
 */
export const formatTaxId = (value: string): string => {
  // Remove all non-digits
  const digitsOnly = value.replace(/\D/g, '');

  // Limit to 9 digits maximum
  const limited = digitsOnly.substring(0, 9);

  // Add hyphen after 2 digits
  if (limited.length > 2) {
    return `${limited.substring(0, 2)}-${limited.substring(2)}`;
  }

  return limited;
};

/**
 * Formats NPI input to remove non-digits and limit to 10 digits
 */
export const formatNPI = (value: string): string => {
  // Remove all non-digits and limit to 10 digits
  return value.replace(/\D/g, '').substring(0, 10);
};

/**
 * Phone number input tracking for InputMask
 */
export const phoneTrack: Track = ({
  inputType,
  value,
  data,
  selectionStart,
  selectionEnd,
}) => {
  if (inputType === 'insert' && !/^\D*1/.test(data) && selectionStart <= 1) {
    return `1${data}`;
  }
  if (
    inputType !== 'insert' &&
    selectionStart <= 1 &&
    selectionEnd < value.length
  ) {
    if (selectionEnd > 2) return '1';
    if (selectionEnd === 2) return false;
  }
  return data;
};

/**
 * Formats ZIP code input to XXXXX or XXXXX-XXXX format
 */
export const formatZipCode = (value: string): string => {
  // Remove all non-digits
  const digitsOnly = value.replace(/\D/g, '');
  
  // Limit to 9 digits maximum (5 for zip, 4 for extension)
  const limited = digitsOnly.substring(0, 9);
  
  // Add hyphen after 5 digits if there are more digits
  if (limited.length > 5) {
    return `${limited.substring(0, 5)}-${limited.substring(5)}`;
  }
  
  return limited;
};

/**
 * Format a Canadian postal code as "A1A 1A1".
 * Keeps letters and digits only so the space is re-inserted as the user types.
 */
export const formatCanadianPostalCode = (value: string): string => {
  const alphanumeric = value
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .substring(0, 6);

  if (alphanumeric.length > 3) {
    return `${alphanumeric.substring(0, 3)} ${alphanumeric.substring(3)}`;
  }

  return alphanumeric;
};

/**
 * Format a postal code for the selected country.
 * US ZIP codes stay digit-only; Canadian codes keep their letters.
 */
export const formatPostalCode = (
  value: string,
  countryId: number,
): string =>
  countryId === COUNTRY_ID.CA
    ? formatCanadianPostalCode(value)
    : formatZipCode(value);
