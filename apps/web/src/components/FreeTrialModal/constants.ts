import { COUNTRY_ID } from '@/constants/countries';

// Field mapping from API field names to form field names
export const API_TO_FORM_FIELD_MAP: Record<string, string> = {
  'clinic_name': 'clinicName',
  'tax_id': 'taxId',
  'npi': 'npi',
  'address_line_1': 'addressLine1',
  'country': 'country',
  'country_id': 'country',
  'state': 'state',
  'state_id': 'state',
  'city': 'city',
  'city_id': 'city',
  'zip_code': 'zipCode',
  'full_name': 'fullName',
  'contact_name': 'fullName',
  'email': 'email',
  'contact_email': 'email',
  'phone_number': 'phoneNumber',
  'contact_phone': 'phoneNumber',
};

// Required fields for form validation
export const REQUIRED_FIELDS = [
  'clinicName',
  'taxId',
  'npi',
  'addressLine1',
  'country',
  'state',
  'city',
  'zipCode',
  'fullName',
  'email',
  'phoneNumber',
] as const;

// Error message keyword to field mapping
export const ERROR_KEYWORD_TO_FIELD: Array<{ keywords: string[]; field: string }> = [
  { keywords: ['zip code', 'postal code'], field: 'zipCode' },
  { keywords: ['email'], field: 'email' },
  { keywords: ['phone'], field: 'phoneNumber' },
  { keywords: ['tax id'], field: 'taxId' },
  { keywords: ['npi'], field: 'npi' },
  { keywords: ['clinic name'], field: 'clinicName' },
  { keywords: ['country'], field: 'country' },
  { keywords: ['state'], field: 'state' },
  { keywords: ['city'], field: 'city' },
  { keywords: ['address'], field: 'addressLine1' },
  { keywords: ['full name', 'name'], field: 'fullName' },
];

// Postal code input rules per country (see COUNTRY_ID in @/constants/countries)
export const POSTAL_CODE_RULES: Record<
  number,
  { pattern: RegExp; label: string; placeholder: string; maxLength: number }
> = {
  [COUNTRY_ID.US]: {
    pattern: /^\d{5}(-\d{4})?$/,
    label: 'Zip',
    placeholder: 'XXXXX or XXXXX-XXXX',
    maxLength: 10,
  },
  [COUNTRY_ID.CA]: {
    pattern: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    label: 'Postal Code',
    placeholder: 'A1A 1A1',
    maxLength: 7,
  },
};
