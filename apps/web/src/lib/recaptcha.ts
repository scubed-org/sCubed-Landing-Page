/**
 * Server-side reCAPTCHA v3 check for the newsletter route, the one form the admin API does not
 * verify. Contact and onboarding tokens are forwarded to the admin API instead; a token is
 * single-use, so they must not be verified here too. Never log the token or the secret.
 */

import 'server-only';

import { NextResponse } from 'next/server';

import { API_ENDPOINTS } from '@/constants/api';
import { ERROR_MESSAGES } from '@/constants/messages';
import type { RecaptchaAction } from '@/constants/recaptcha';

interface SiteVerifyResponse {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

const V3_MIN_SCORE = 0.5;
const VERIFY_TIMEOUT_MS = 5000;
const DISABLE_ALLOWED_ENVS = ['dev', 'local'];

/** DISABLE_RECAPTCHA=true skips verification only on dev/local builds; anywhere else it is ignored. */
export function isRecaptchaDisabled(): boolean {
  if (process.env.DISABLE_RECAPTCHA !== 'true') return false;
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
  return appEnv
    ? DISABLE_ALLOWED_ENVS.includes(appEnv)
    : process.env.NODE_ENV === 'development';
}

// Hostnames are restricted per key in the reCAPTCHA admin console.
async function verifyRecaptchaV3(
  token: string,
  action: RecaptchaAction,
): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY_V3;
  if (!secretKey) {
    console.error('reCAPTCHA v3 secret key is not set');
    return false;
  }

  try {
    const response = await fetch(API_ENDPOINTS.EXTERNAL.RECAPTCHA_VERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }).toString(),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });
    if (!response.ok) return false;

    const data: SiteVerifyResponse = await response.json();
    // v3 returns success for bots too; score and action carry the signal
    return (
      data.success === true &&
      typeof data.score === 'number' &&
      data.score >= V3_MIN_SCORE &&
      data.action === action
    );
  } catch {
    console.error('reCAPTCHA verification request failed');
    return false;
  }
}

/** Returns a 422 response when the token is missing or invalid, otherwise null. */
export async function requireRecaptchaV3(
  token: unknown,
  action: RecaptchaAction,
): Promise<NextResponse | null> {
  if (isRecaptchaDisabled()) return null;

  const message =
    typeof token !== 'string' || token === ''
      ? ERROR_MESSAGES.RECAPTCHA_REQUIRED
      : (await verifyRecaptchaV3(token, action))
        ? null
        : ERROR_MESSAGES.RECAPTCHA_FAILED;

  if (!message) return null;

  return NextResponse.json(
    { errors: [{ field: 'recaptcha', message }], status_code: 422 },
    { status: 422 },
  );
}
