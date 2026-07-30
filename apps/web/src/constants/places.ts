/**
 * Google Places API Type Constants
 * Single source of truth for place type configurations
 */

/** Countries supported by address/state autocomplete via Google Places. */
export const SUPPORTED_ADDRESS_REGION_CODES = ['us', 'ca'] as const;

/** Default types for full address autocomplete (subscribe flow) */
export const ADDRESS_PLACE_TYPES = [
  'street_address',
  'route',
  'locality',
  'sublocality',
  'neighborhood',
] as const;

/** State-only types for state selection (get started flow) */
export const STATE_PLACE_TYPES = [
  'administrative_area_level_1',
] as const;
