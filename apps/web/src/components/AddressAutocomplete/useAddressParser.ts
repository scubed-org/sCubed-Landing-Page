'use client';

import { useCallback } from 'react';

import type { AddressComponent, AddressComponents } from './types';

/**
 * Hook to parse Google Places address_components into structured address data
 */
export function useAddressParser() {
  /**
   * Parse address_components from Google Places API into structured data
   */
  const parseAddressComponents = useCallback(
    (
      components: AddressComponent[],
      formattedAddress: string
    ): AddressComponents => {
      const result: AddressComponents = {
        streetAddress: '',
        city: '',
        state: '',
        stateCode: '',
        zipCode: '',
        country: '',
        countryCode: '',
        formattedAddress,
      };

      let streetNumber = '';
      let streetName = '';
      let subpremise = '';

      for (const component of components) {
        const types = component.types;

        // Street number
        if (types.includes('street_number')) {
          streetNumber = component.long_name;
        }

        // Street name (route)
        if (types.includes('route')) {
          streetName = component.long_name;
        }

        // Subpremise (apartment, suite, unit) - appended to street address
        if (types.includes('subpremise')) {
          subpremise = component.long_name;
        }
        // Floor number (less common but can exist) - appended to street address
        if (types.includes('floor') && !subpremise) {
          subpremise = `Floor ${component.long_name}`;
        }

        // City - try locality first, then sublocality
        if (types.includes('locality')) {
          result.city = component.long_name;
        }
        // Fallback to sublocality for places like Brooklyn, NYC
        if (types.includes('sublocality_level_1') && !result.city) {
          result.city = component.long_name;
        }
        // Another fallback for some areas
        if (types.includes('neighborhood') && !result.city) {
          result.city = component.long_name;
        }

        // State
        if (types.includes('administrative_area_level_1')) {
          result.state = component.long_name; // e.g., "California"
          result.stateCode = component.short_name; // e.g., "CA"
        }

        // ZIP code
        if (types.includes('postal_code')) {
          result.zipCode = component.long_name;
        }

        // Country
        if (types.includes('country')) {
          result.country = component.long_name; // e.g., "Canada"
          result.countryCode = component.short_name; // e.g., "CA"
        }
      }

      // Combine street number, name, and subpremise into a single street address
      const streetAddress = [streetNumber, streetName]
        .filter(Boolean)
        .join(' ');

      // Append subpremise (suite, unit, apt, floor) to street address
      const fullStreetAddress = subpremise
        ? `${streetAddress}, ${subpremise}`
        : streetAddress;

      result.streetAddress = fullStreetAddress || formattedAddress;

      return result;
    },
    []
  );

  return { parseAddressComponents };
}
