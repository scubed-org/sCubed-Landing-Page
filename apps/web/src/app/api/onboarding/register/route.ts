import { NextRequest } from 'next/server';

import { API_ENDPOINTS } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/messages';
import { errorResponse, proxyOnboardingRequest } from '@/lib/onboarding-auth';

export async function PUT(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return errorResponse(ERROR_MESSAGES.INVALID_REQUEST_BODY, 400);
  }

  return proxyOnboardingRequest({
    request,
    endpoint: API_ENDPOINTS.SUBSCRIPTION.REGISTER,
    method: 'PUT',
    body,
    // A completed free signup is done; a paid one keeps the token so the user can go back from payment.
    shouldClearCookie: (data) =>
      body.draft_mode !== true && data?.payment_required === false,
  });
}
