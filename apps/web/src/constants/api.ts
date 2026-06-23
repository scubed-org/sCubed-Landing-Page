/**
 * API Endpoints Constants
 * Centralized API endpoint definitions
 */

export const API_ENDPOINTS = {
  // Subscription onboarding endpoints
  SUBSCRIPTION: {
    VERIFY_EMAIL_REQUEST: 'subscriptions/onboarding/verify-email/request',
    VERIFY_EMAIL_RESEND: 'subscriptions/onboarding/verify-email/resend',
    VERIFY_EMAIL_CONFIRM: 'subscriptions/onboarding/verify-email/confirm',
    REGISTER: 'subscriptions/onboarding/register',
    PLANS_AND_ADDONS: 'subscriptions/onboarding/plans-and-addons',
    ADDONS: 'accounts/subscriptions/addons',
    PAID_PLAN: 'subscriptions/paid-plan',
    REGISTRATION_DATA: 'subscriptions/onboarding/registration-data',
    VERIFY_PAYMENT: 'subscriptions/onboarding/verify-payment',
    CURRENT_TERMS: 'subscriptions/onboarding/terms/current',
  },

  // Public API endpoints
  PUBLIC: {
    CONTACT: '/api/contact',
    NEWSLETTER: '/api/newsletter',
    FREE_TRIAL: '/api/free-trial',
    LP_ABA: '/api/lp/aba-practice-management-software',
  },

  // External API endpoints
  EXTERNAL: {
    RECAPTCHA_VERIFY: 'https://www.google.com/recaptcha/api/siteverify',
  },

  // CMS endpoints
  CMS: {
    CONTACT_SUBMISSIONS: '/api/contact-submissions',
    FAQ_BY_SLUG: '/v1/faqs/pages/slug',
  },
} as const;

/**
 * Build full registration data endpoint with request ID
 */
export function getRegistrationDataEndpoint(
  requestId: number | string,
): string {
  return `${API_ENDPOINTS.SUBSCRIPTION.REGISTRATION_DATA}/${requestId}`;
}

/**
 * Build addons endpoint with subscription plan ID
 */
export function getAddonsEndpoint(subscriptionPlanId: number): string {
  return `${API_ENDPOINTS.SUBSCRIPTION.ADDONS}?subscription_plan_id=${subscriptionPlanId}`;
}

/**
 * Build full verify payment endpoint with session ID
 */
export function getVerifyPaymentEndpoint(sessionId: string): string {
  return `${API_ENDPOINTS.SUBSCRIPTION.VERIFY_PAYMENT}?session_id=${encodeURIComponent(sessionId)}`;
}

/**
 * Build full FAQ endpoint with slug
 */
export function getFaqEndpoint(slug: string): string {
  return `${API_ENDPOINTS.CMS.FAQ_BY_SLUG}/${slug}/complete`;
}
