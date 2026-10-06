/**
 * Country Constants
 * Single source of truth for the countries the onboarding APIs accept.
 */

/**
 * Country primary keys as stored by the backend.
 * The API expects the id — not the name and not the ISO code.
 */
export const COUNTRY_ID = {
  US: 1,
  CA: 2,
} as const;

export type CountryId = (typeof COUNTRY_ID)[keyof typeof COUNTRY_ID];

/** Used whenever a country has not been resolved yet. */
export const DEFAULT_COUNTRY_ID: CountryId = COUNTRY_ID.US;

/**
 * Map a two-letter ISO country code (as returned by Google Places `short_name`)
 * to the id the API expects. Falls back to the default for anything unsupported.
 */
export function getCountryIdFromCode(code: string | undefined): CountryId {
  if (!code) return DEFAULT_COUNTRY_ID;
  return COUNTRY_ID[code.toUpperCase() as keyof typeof COUNTRY_ID] ?? DEFAULT_COUNTRY_ID;
}

/** Selectable countries, in the order they should appear in a picker. */
export const COUNTRY_OPTIONS: ReadonlyArray<{ id: CountryId; name: string }> = [
  { id: COUNTRY_ID.US, name: 'United States' },
  { id: COUNTRY_ID.CA, name: 'Canada' },
];

/** Display name for a country id, for read-only fields. */
export function getCountryName(id: number | string | undefined): string {
  const numericId = Number(id);
  return COUNTRY_OPTIONS.find((country) => country.id === numericId)?.name ?? '';
}
