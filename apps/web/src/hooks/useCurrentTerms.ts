import { useCallback, useEffect, useState } from 'react';

import { API_ENDPOINTS } from '@/constants/api';
import { fetchApi } from '@/lib/api-client';
import { isApiError } from '@/types/api';
import type { PublicTermsView } from '@/types/subscription';

interface UseCurrentTermsResult {
  terms: PublicTermsView | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook for loading the active public Terms & Conditions version.
 *
 * Mirrors the plain `fetchApi` pattern used elsewhere in the subscription flow
 * (e.g. PlanSelector.fetchPlans) — no React Query. The error is surfaced as a
 * string so the consumer can render an inline block + Retry, matching the
 * backend's fail-closed behavior (no active version => checkout blocked).
 */
export function useCurrentTerms(): UseCurrentTermsResult {
  const [terms, setTerms] = useState<PublicTermsView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTerms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchApi<PublicTermsView>(
        API_ENDPOINTS.SUBSCRIPTION.CURRENT_TERMS,
        { method: 'GET', skipErrorToast: true },
      );
      setTerms(result ?? null);
    } catch (err) {
      console.error('Failed to load Terms & Conditions:', err);
      setTerms(null);
      setError(
        isApiError(err)
          ? err.message
          : 'Unable to load Terms & Conditions. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTerms();
  }, [fetchTerms]);

  return { terms, loading, error, refetch: fetchTerms };
}
