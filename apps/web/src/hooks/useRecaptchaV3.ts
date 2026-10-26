'use client';

import { useCallback, useEffect } from 'react';

import type { RecaptchaAction } from '@/constants/recaptcha';

interface Grecaptcha {
  ready: (callback: () => void) => void;
  render: (
    container: HTMLElement,
    params: {
      sitekey: string;
      size: 'invisible';
      badge?: 'bottomleft' | 'bottomright' | 'inline';
    },
  ) => number;
  execute: (widgetId: number, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

// Same explicit-render mode react-google-recaptcha uses, so the page only ever holds one api.js
const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit';
const LOAD_TIMEOUT_MS = 10000;
const POLL_INTERVAL_MS = 100;

let grecaptchaPromise: Promise<Grecaptcha> | null = null;
let widgetId: number | null = null;

function loadGrecaptcha(): Promise<Grecaptcha> {
  if (grecaptchaPromise) return grecaptchaPromise;

  grecaptchaPromise = new Promise<Grecaptcha>((resolve, reject) => {
    if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    const startedAt = Date.now();
    const poll = () => {
      const grecaptcha = window.grecaptcha;
      if (grecaptcha?.ready) {
        grecaptcha.ready(() => resolve(grecaptcha));
      } else if (Date.now() - startedAt > LOAD_TIMEOUT_MS) {
        reject(new Error('reCAPTCHA did not load'));
      } else {
        setTimeout(poll, POLL_INTERVAL_MS);
      }
    };
    poll();
  }).catch((error: unknown) => {
    grecaptchaPromise = null;
    throw error;
  });

  return grecaptchaPromise;
}

// v3 is rendered explicitly as an invisible client so it can share api.js with v2 checkboxes
function getWidgetId(grecaptcha: Grecaptcha, siteKey: string): number {
  if (widgetId === null) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    widgetId = grecaptcha.render(container, {
      sitekey: siteKey,
      size: 'invisible',
      badge: 'bottomleft',
    });
  }
  return widgetId;
}

/**
 * Invisible reCAPTCHA v3. Returns `execute(action)`, which resolves to a token,
 * or null when reCAPTCHA is unavailable (the server then rejects the request).
 */
export function useRecaptchaV3() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3;

  // Load early so v3 can observe the session before submit
  useEffect(() => {
    if (siteKey) loadGrecaptcha().catch(() => undefined);
  }, [siteKey]);

  return useCallback(
    async (action: RecaptchaAction): Promise<string | null> => {
      if (!siteKey) return null;
      try {
        const grecaptcha = await loadGrecaptcha();
        return await grecaptcha.execute(getWidgetId(grecaptcha, siteKey), {
          action,
        });
      } catch {
        return null;
      }
    },
    [siteKey],
  );
}
