import { NextRequest, NextResponse } from 'next/server';

import {
  clearOnboardingCookie,
  getOnboardingCookieValue,
} from '@/lib/onboarding-auth';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    authenticated: Boolean(getOnboardingCookieValue(request)),
  });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  clearOnboardingCookie(response);
  return response;
}
