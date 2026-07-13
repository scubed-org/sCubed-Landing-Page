/**
 * Form Fields Constants
 * Centralized form field names for consistent API communication
 */

/**
 * Default staff count used as fallback when no value is provided.
 * Minimum allowed is 1 staff member; users can add more without limit.
 */
export const DEFAULT_STAFF_COUNT = 1;

/**
 * Default staff count for Free plan onboarding.
 * Free plan is capped at 5 staff, so new Free clinics are provisioned with the full allowance.
 */
export const DEFAULT_FREE_STAFF_COUNT = 5;

export const FORM_FIELDS = {
  // Clinic Information
  CLINIC: {
    NAME: 'clinic_name',
    TAX_ID: 'tax_id',
    NPI: 'npi',
    ONBOARDING_REQUEST_ID: 'clinic_onboarding_request_id',
    STAFF_COUNT: 'staff_count',
  },

  // Contact Information
  CONTACT: {
    EMAIL: 'email',
    PHONE: 'phone',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    FULL_NAME: 'full_name',
  },

  // Address Information
  ADDRESS: {
    STREET_LINE_1: 'street_address_line_1',
    CITY: 'city',
    STATE: 'state',
    ZIP_CODE: 'zip_code',
    COUNTRY: 'country',
  },

  // Subscription Information
  SUBSCRIPTION: {
    PLAN_ID: 'subscription_plan_id',
    BILLING_CYCLE: 'billing_cycle',
    ADDONS: 'addons',
    COUPON_CODE: 'coupon_code',
    STRIPE_SESSION_ID: 'stripe_session_id',
  },

  // Form State
  STATE: {
    STEP_1_DATA: 'step1Data',
    CURRENT_STEP: 'currentStep',
    OTP_VERIFIED: 'otpVerified',
    SELECTED_PLAN: 'selectedPlan',
  },

  // Authentication
  AUTH: {
    OTP_CODE: 'otp',
    RECAPTCHA_TOKEN: 'recaptchaToken',
  },

  // Other
  OTHER: {
    MESSAGE: 'message',
    COMPANY: 'company',
    HOW_DID_YOU_HEAR: 'howDidYouHearAboutUs',
    ROLE: 'role',
  },
} as const;

// Type exports for field groups
export type ClinicFields = typeof FORM_FIELDS.CLINIC;
export type ContactFields = typeof FORM_FIELDS.CONTACT;
export type AddressFields = typeof FORM_FIELDS.ADDRESS;
export type SubscriptionFields = typeof FORM_FIELDS.SUBSCRIPTION;
export type FormStateFields = typeof FORM_FIELDS.STATE;
export type AuthFields = typeof FORM_FIELDS.AUTH;

// Helper functions
export function getFieldName(
  category: keyof typeof FORM_FIELDS,
  field: string,
): string {
  const categoryFields = FORM_FIELDS[category];
  return categoryFields[field as keyof typeof categoryFields] || field;
}

// Validation patterns
export const FIELD_VALIDATION = {
  TAX_ID: {
    pattern: /^\d{9}$/,
    message: 'Tax ID must be 9 digits',
  },
  NPI: {
    pattern: /^\d{10}$/,
    message: 'NPI must be 10 digits',
  },
  ZIP_CODE: {
    pattern: /^\d{5}(-\d{4})?$/,
    message: 'Please enter a valid ZIP code',
  },
  PHONE: {
    pattern: /^\+?[1-9]\d{1,14}$/,
    message: 'Please enter a valid phone number',
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
} as const;
