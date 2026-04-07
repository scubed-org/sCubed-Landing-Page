import 'server-only';

import { NextRequest, NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/messages';

export const ONBOARDING_ACCESS_TOKEN_COOKIE = 'onboarding_access_token';
export const ONBOARDING_TOKEN_MAX_AGE = 1800;

// Only the onboarding proxy routes need the token, so the browser never sends it anywhere else.
const ONBOARDING_COOKIE_PATH = '/api/onboarding';
// A slow or hung backend should fail the step, not leave the signup spinner running forever.
const BACKEND_TIMEOUT_MS = 15000;
const USER_AGENT_MAX_LENGTH = 500;

function getBackendBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL;

  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_ADMIN_APP_API_URL is not configured.');
  }

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

function isSecureCookie(): boolean {
  return process.env.NODE_ENV !== 'development';
}

export function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json(
    { message, errors: [{ message }], status_code: status },
    { status },
  );
}

export function getOnboardingCookieValue(request: NextRequest): string | null {
  return request.cookies.get(ONBOARDING_ACCESS_TOKEN_COOKIE)?.value ?? null;
}

function setCookie(
  response: NextResponse,
  value: string,
  maxAge: number,
): void {
  response.cookies.set({
    name: ONBOARDING_ACCESS_TOKEN_COOKIE,
    value,
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: 'lax',
    maxAge,
    path: ONBOARDING_COOKIE_PATH,
  });
}

export function clearOnboardingCookie(response: NextResponse): void {
  setCookie(response, '', 0);
}

export function setOnboardingCookie(
  response: NextResponse,
  token: string,
  expiresIn = ONBOARDING_TOKEN_MAX_AGE,
): void {
  setCookie(response, token, expiresIn);
}

function buildBackendUrl(
  endpoint: string,
  searchParams?: URLSearchParams,
): string {
  const normalizedEndpoint = endpoint.startsWith('/')
    ? endpoint
    : `/${endpoint}`;
  const url = new URL(`${getBackendBaseUrl()}${normalizedEndpoint}`);

  if (searchParams) {
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

// The backend records the user agent with the T&C acceptance on register, so pass the browser's on.
function buildBackendHeaders(request: NextRequest, hasBody: boolean): Headers {
  const headers = new Headers();
  const userAgent = request.headers.get('user-agent');

  if (hasBody) {
    headers.set('Content-Type', 'application/json');
  }

  if (userAgent) {
    headers.set('User-Agent', userAgent.slice(0, USER_AGENT_MAX_LENGTH));
  }

  return headers;
}

// Returns null when the backend could not be reached in time.
async function fetchBackend(
  url: string,
  init: RequestInit,
): Promise<Response | null> {
  try {
    return await fetch(url, {
      ...init,
      cache: 'no-store',
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
  } catch (error) {
    console.error('Onboarding backend request failed:', (error as Error).name);
    return null;
  }
}

export async function proxyOnboardingRequest({
  request,
  endpoint,
  method = request.method,
  body,
  searchParams,
  shouldClearCookie,
}: {
  request: NextRequest;
  endpoint: string;
  method?: string;
  body?: unknown;
  searchParams?: URLSearchParams;
  // Decides from a successful response's `data` whether the signup no longer needs the token.
  shouldClearCookie?: (data: Record<string, unknown> | null) => boolean;
}): Promise<NextResponse> {
  const token = getOnboardingCookieValue(request);

  if (!token) {
    const response = errorResponse(
      ERROR_MESSAGES.ONBOARDING_SESSION_EXPIRED,
      401,
    );
    clearOnboardingCookie(response);
    return response;
  }

  const headers = buildBackendHeaders(request, body !== undefined);
  headers.set('Authorization', `Bearer ${token}`);

  const backendResponse = await fetchBackend(
    buildBackendUrl(endpoint, searchParams),
    {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
  );

  if (!backendResponse) {
    return errorResponse(ERROR_MESSAGES.ONBOARDING_SERVICE_UNAVAILABLE, 502);
  }

  const contentType =
    backendResponse.headers.get('content-type') ?? 'application/json';
  const responseText = await backendResponse.text();
  const response = new NextResponse(responseText || null, {
    status: backendResponse.status,
    headers: { 'content-type': contentType },
  });

  if (
    backendResponse.status === 401 ||
    (backendResponse.ok && shouldClearCookie?.(parseData(responseText)))
  ) {
    clearOnboardingCookie(response);
  }

  return response;
}

function parseData(responseText: string): Record<string, unknown> | null {
  try {
    const payload = JSON.parse(responseText) as { data?: unknown };
    return typeof payload.data === 'object' && payload.data !== null
      ? (payload.data as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export async function confirmOtpAndCreateSession(
  request: NextRequest,
  requestBody: unknown,
): Promise<NextResponse> {
  const backendResponse = await fetchBackend(
    buildBackendUrl(API_ENDPOINTS.SUBSCRIPTION.VERIFY_EMAIL_CONFIRM),
    {
      method: 'POST',
      headers: buildBackendHeaders(request, true),
      body: JSON.stringify(requestBody),
    },
  );

  if (!backendResponse) {
    return errorResponse(ERROR_MESSAGES.ONBOARDING_SERVICE_UNAVAILABLE, 502);
  }

  const contentType = backendResponse.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    const response = new NextResponse(await backendResponse.text(), {
      status: backendResponse.status,
      headers: { 'content-type': contentType || 'text/plain' },
    });

    if (backendResponse.status === 401) {
      clearOnboardingCookie(response);
    }

    return response;
  }

  const payload = (await backendResponse.json()) as Record<string, unknown>;
  const payloadData =
    typeof payload.data === 'object' && payload.data !== null
      ? (payload.data as Record<string, unknown>)
      : null;

  if (!backendResponse.ok) {
    const response = NextResponse.json(payload, {
      status: backendResponse.status,
    });

    if (backendResponse.status === 401) {
      clearOnboardingCookie(response);
    }

    return response;
  }

  const accessToken =
    (typeof payload.access_token === 'string' && payload.access_token) ||
    (payloadData && typeof payloadData.access_token === 'string'
      ? payloadData.access_token
      : null);

  const expiresIn =
    (typeof payload.expires_in === 'number' && payload.expires_in) ||
    (payloadData && typeof payloadData.expires_in === 'number'
      ? payloadData.expires_in
      : ONBOARDING_TOKEN_MAX_AGE);

  // The token stays server-side in the httpOnly cookie; the browser never sees it.
  const sanitizedPayload = { ...payload };
  delete sanitizedPayload.access_token;
  delete sanitizedPayload.token_type;
  delete sanitizedPayload.expires_in;

  if (payloadData) {
    const sanitizedData = { ...payloadData };
    delete sanitizedData.access_token;
    delete sanitizedData.token_type;
    delete sanitizedData.expires_in;
    sanitizedPayload.data = sanitizedData;
  }

  const response = NextResponse.json(sanitizedPayload, {
    status: backendResponse.status,
  });

  if (accessToken) {
    setOnboardingCookie(response, accessToken, expiresIn);
  }

  return response;
}
