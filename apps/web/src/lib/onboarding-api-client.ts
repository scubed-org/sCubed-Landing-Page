'use client';

import { ERROR_MESSAGES } from '@/constants/messages';
import { fetchApi } from '@/lib/api-client';
import { showWarningToast } from '@/lib/errors';
import { clearSession } from '@/lib/subscriptionSessionManager';
import { isApiError, type FetchApiOptions } from '@/types/api';

export const ONBOARDING_SESSION_EXPIRED_EVENT =
  'subscription:onboarding-session-expired';

const SESSION_EXPIRY_DEDUPE_WINDOW_MS = 1500;

let lastSessionExpiryMessage = '';
let lastSessionExpiryAt = 0;

function getOnboardingProxyPath(path: string): string {
  return `/api/onboarding/${path.replace(/^\/+/, '')}`;
}

export async function clearOnboardingAccessToken(): Promise<void> {
  await fetch('/api/onboarding/session', {
    method: 'DELETE',
    cache: 'no-store',
  }).catch(() => undefined);
}

export async function getOnboardingSessionState(): Promise<{
  authenticated: boolean;
}> {
  try {
    const response = await fetch('/api/onboarding/session', {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return { authenticated: false };
    }

    return (await response.json()) as { authenticated: boolean };
  } catch {
    return { authenticated: false };
  }
}

export async function fetchOnboardingApi<T = unknown>(
  path: string,
  options: FetchApiOptions = {},
): Promise<T> {
  try {
    return await fetchApi<T>(getOnboardingProxyPath(path), {
      ...options,
      baseUrl: '',
      skipErrorStatuses: [...(options.skipErrorStatuses ?? []), 401],
    });
  } catch (error) {
    if (isApiError(error) && error.statusCode === 401) {
      const expiryMessage =
        error.message || ERROR_MESSAGES.ONBOARDING_SESSION_EXPIRED;
      const now = Date.now();
      const isDuplicateExpiryEvent =
        lastSessionExpiryMessage === expiryMessage &&
        now - lastSessionExpiryAt < SESSION_EXPIRY_DEDUPE_WINDOW_MS;

      lastSessionExpiryMessage = expiryMessage;
      lastSessionExpiryAt = now;

      clearSession();
      void clearOnboardingAccessToken();

      if (!isDuplicateExpiryEvent && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(ONBOARDING_SESSION_EXPIRED_EVENT));
      }

      if (!isDuplicateExpiryEvent) {
        showWarningToast(expiryMessage);
      }
    }

    throw error;
  }
}
