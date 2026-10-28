import { NextRequest, NextResponse } from 'next/server';

import { ERROR_MESSAGES } from '@/constants/messages';

// The firewall in front of the admin API answers blocked content with a non-JSON 403.
export function isFirewallBlock(
  status: number,
  contentType: string | null | undefined,
): boolean {
  return status === 403 && !contentType?.includes('application/json');
}

export function blockedContentResponse(): NextResponse {
  return NextResponse.json(
    { errors: [{ message: ERROR_MESSAGES.BLOCKED_CONTENT }], status_code: 422 },
    { status: 422 },
  );
}

export function invalidBodyResponse(): NextResponse {
  return NextResponse.json(
    {
      errors: [{ message: ERROR_MESSAGES.INVALID_REQUEST_BODY }],
      status_code: 400,
    },
    { status: 400 },
  );
}

// Resolves null for an empty or malformed body so routes answer 400 instead of 500.
export async function readJsonBody<T>(request: NextRequest): Promise<T | null> {
  try {
    const body: unknown = await request.json();
    return body && typeof body === 'object' ? (body as T) : null;
  } catch {
    return null;
  }
}
