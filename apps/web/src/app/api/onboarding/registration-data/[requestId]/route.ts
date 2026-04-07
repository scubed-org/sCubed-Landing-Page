import { NextRequest } from 'next/server';

import { API_ENDPOINTS } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/messages';
import { errorResponse, proxyOnboardingRequest } from '@/lib/onboarding-auth';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ requestId: string }> },
) {
  const { requestId } = await context.params;

  // The ID is placed in the backend URL, so only a plain number may pass.
  if (!/^\d+$/.test(requestId)) {
    return errorResponse(ERROR_MESSAGES.INVALID_ONBOARDING_REQUEST, 422);
  }

  // The backend requires the verified email alongside the request ID (SCM-5827).
  const backendSearchParams = new URLSearchParams();
  const email = request.nextUrl.searchParams.get('email');

  if (email) {
    backendSearchParams.set('email', email);
  }

  return proxyOnboardingRequest({
    request,
    endpoint: `${API_ENDPOINTS.SUBSCRIPTION.REGISTRATION_DATA}/${requestId}`,
    method: 'GET',
    searchParams: backendSearchParams,
  });
}
