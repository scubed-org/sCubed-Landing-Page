import { useEffect, useState } from 'react';

import { fetchApi } from '@/lib/api-client';
import type { State } from '@/types/location';

interface StatesResponse {
  rows: State[];
}

interface UseStatesReturn {
  states: State[];
  loading: boolean;
}

/**
 * Loads the states/provinces for a country.
 *
 * Used by the manual address fallback, for when Google Places returns no match
 * and the user has to pick a state instead of having one parsed for them.
 * The API defaults to US states when country_id is omitted, so the id is always sent.
 */
export function useStates(countryId: number | undefined): UseStatesReturn {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryId) {
      setStates([]);
      return;
    }

    let active = true;
    setLoading(true);

    fetchApi<StatesResponse>(`states?country_id=${countryId}`, {
      method: 'GET',
      skipErrorToast: true,
    })
      .then((result) => {
        if (active) setStates(result?.rows ?? []);
      })
      .catch(() => {
        // Silent: the address autocomplete remains the primary path.
        if (active) setStates([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [countryId]);

  return { states, loading };
}
