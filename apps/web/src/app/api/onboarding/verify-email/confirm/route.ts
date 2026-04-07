import { NextRequest } from 'next/server';

import { ERROR_MESSAGES } from '@/constants/messages';
import {
  confirmOtpAndCreateSession,
  errorResponse,
} from '@/lib/onboarding-auth';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return errorResponse(ERROR_MESSAGES.INVALID_REQUEST_BODY, 400);
  }

  return confirmOtpAndCreateSession(request, body);
}
