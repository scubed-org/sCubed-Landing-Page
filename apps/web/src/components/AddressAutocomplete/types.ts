/**
 * Address Autocomplete Types
 * Type definitions for Google Places API integration
 */

/**
 * Parsed address components from Google Places API
 */
export interface AddressComponents {
  /** Full street address (street number + street name, including suite/unit if available) */
  streetAddress: string;
  /** City name */
  city: string;
  /** Full state name (e.g., "California") */
  state: string;
  /** State abbreviation (e.g., "CA") */
  stateCode: string;
  /** ZIP code */
  zipCode: string;
  /** Country name (e.g., "Canada") */
  country: string;
  /** Country abbreviation (e.g., "CA") */
  countryCode: string;
  /** Full formatted address from Google */
  formattedAddress: string;
}

/**
 * Place prediction result from Google Places Autocomplete API
 */
export interface PlaceResult {
  /** Google Place ID */
  placeId: string;
  /** Full description of the place */
  description: string;
  /** Main text (primary address part) */
  mainText: string;
  /** Secondary text (city, state, country) */
  secondaryText: string;
}

/**
 * Address component from Google Places API
 */
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Geometry location from Google Places API
 */
export interface PlaceGeometry {
  location?: {
    lat: () => number;
    lng: () => number;
  };
}

/**
 * Place Details Result from Google Places API
 * Contains address components, formatted address, and optional timezone
 */
export interface PlaceDetailsResult {
  /** Address components array */
  address_components?: AddressComponent[];
  /** Full formatted address */
  formatted_address?: string;
  /** Geometry with location coordinates */
  geometry?: PlaceGeometry;
  /** IANA timezone ID from Places API (New) v1 (e.g., "America/New_York") */
  timeZoneId?: string;
}

/**
 * Props for the AddressAutocomplete component
 */
export interface AddressAutocompleteProps {
  /** Callback when user selects an address */
  onAddressSelect: (
    address: AddressComponents,
    coordinates?: { lat: number; lng: number },
    avoidTrigger?: boolean
  ) => void;
  /** Callback when timezone is resolved (IANA timezone ID) */
  onTimezoneResolved?: (timezone: string) => void;
  /** Fired when a search returns no predictions, so the parent can offer manual entry */
  onNoResults?: (noResults: boolean) => void;
  /** Fired on every keystroke, for parents that need the raw typed text */
  onInputChange?: (value: string) => void;
  /** Initial/current value for the input */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Size variant: 'default' (56px) or 'compact' (42px) */
  size?: 'default' | 'compact';
  /** Custom className */
  className?: string;
  /** Google Places includedPrimaryTypes override (e.g., STATE_PLACE_TYPES for state-only results) */
  types?: string[];
  /** Skip the place details API call — use prediction text directly (useful for state-only selection) */
  skipPlaceDetails?: boolean;
  /** Label for the input field */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Custom message when no results are found */
  emptyMessage?: string;
}

/**
 * Return type for the useGooglePlaces hook
 */
export interface UseGooglePlacesReturn {
  /** List of place predictions */
  predictions: PlaceResult[];
  /** Loading state for predictions */
  loading: boolean;
  /** Error message if any */
  error: string | null;
  /** Search for places with given input */
  searchPlaces: (input: string) => void;
  /** Get place details by place ID */
  getPlaceDetails: (
    placeId: string
  ) => Promise<PlaceDetailsResult | null>;
  /** Clear predictions list */
  clearPredictions: () => void;
  /** Whether Google Places API is loaded */
  isLoaded: boolean;
}

/**
 * Google Maps window extension
 */
declare global {
  interface Window {
    initGooglePlaces?: () => void;
  }
}
