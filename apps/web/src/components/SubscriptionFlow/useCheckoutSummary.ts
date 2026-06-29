import { useCallback, useEffect, useRef, useState } from 'react';

import { API_ENDPOINTS } from '@/constants/api';
import { fetchApi } from '@/lib/api-client';
import type {
  CheckoutSummary,
  CheckoutSummaryRequest,
} from '@/types/subscription';

interface UseCheckoutSummaryParams {
  planId: number | null;
  billingCycle: 'monthly' | 'yearly';
  staffCount: number;
  addOns: number[];
  /** Skip fetching until the cart data is ready. */
  enabled?: boolean;
}

interface UseCheckoutSummaryResult {
  summary: CheckoutSummary | null;
  loading: boolean;
  error: boolean;
}

const DEBOUNCE_MS = 400;

/**
 * Fetches the backend checkout summary for the current cart selection.
 * Debounced so rapid staff-count / add-on toggles don't spam the API, and
 * drops stale responses so the latest selection always wins.
 */
export function useCheckoutSummary({
  planId,
  billingCycle,
  staffCount,
  addOns,
  enabled = true,
}: UseCheckoutSummaryParams): UseCheckoutSummaryResult {
  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const requestIdRef = useRef(0);

  // Stable key for add-ons so the effect only re-runs on real changes.
  const addOnsKey = [...addOns].sort((a, b) => a - b).join(',');

  const run = useCallback(async () => {
    if (!enabled || !planId || staffCount < 1) {
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(false);

    const body: CheckoutSummaryRequest = {
      plan_id: planId,
      billing_cycle: billingCycle,
      staff_count: staffCount,
      add_ons: addOns,
    };

    try {
      const result = await fetchApi<CheckoutSummary>(
        API_ENDPOINTS.SUBSCRIPTION.CHECKOUT_SUMMARY,
        {
          method: 'POST',
          body: body as unknown as Record<string, unknown>,
          // Errors are surfaced inline via the `error` flag and the cart's
          // fallback total — no global toast for a background pricing call.
          skipErrorToast: true,
        },
      );

      // Drop stale responses.
      if (requestId === requestIdRef.current) {
        setSummary(result);
        setLoading(false);
      }
    } catch {
      if (requestId === requestIdRef.current) {
        setError(true);
        setLoading(false);
      }
    }
  }, [enabled, planId, billingCycle, staffCount, addOns]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(run, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
    // addOnsKey captures add-on changes; `run` captures the rest.
  }, [run, addOnsKey]);

  return { summary, loading, error };
}
