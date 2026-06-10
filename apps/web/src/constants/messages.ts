/**
 * Centralized Error and Success Messages
 * Single source of truth for all user-facing messages across the application
 */

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  // Network & Connection Errors
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  CONNECTION_FAILED: 'Failed to connect to the server. Please try again later.',

  // Generic Errors
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable. Please try again later.',

  // Validation Errors
  VALIDATION_FAILED: 'Validation failed. Please check your inputs.',
  FORM_VALIDATION_ERROR: 'Please correct the errors below and try again.',
  REQUIRED_FIELDS_MISSING: 'Please fill in all required fields.',

  // API Errors
  API_ERROR: 'Failed to process your request. Please try again.',
  REQUEST_FAILED: 'Request failed. Please try again.',
  INVALID_RESPONSE: 'Invalid response from server. Please try again.',

  // Authentication & Authorization
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',

  // Data Loading
  FAILED_TO_LOAD: 'Failed to load data. Please try again.',
  FAILED_TO_LOAD_STATES: 'Failed to load states. Please refresh the page.',
  FAILED_TO_LOAD_CITIES: 'Failed to load cities. Please try again.',

  // reCAPTCHA Errors
  RECAPTCHA_REQUIRED: 'Please complete the reCAPTCHA verification.',
  RECAPTCHA_FAILED: 'reCAPTCHA verification failed. Please try again.',
  RECAPTCHA_EXPIRED: 'reCAPTCHA has expired. Please verify again.',
  RECAPTCHA_ERROR: 'reCAPTCHA error occurred. Please try again.',
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  // Form Submissions
  FORM_SUBMITTED: 'Form submitted successfully!',
  CONTACT_SUBMITTED: 'Thank you for your interest! Our team will be in touch shortly.',
  GET_STARTED_SUBMITTED: 'Thanks for your interest! Book your 20-minute demo below to get started.',
  REGISTRATION_SUCCESS: 'Registration successful! Check your email for verification code.',
  SUBSCRIPTION_SUCCESS: 'Subscription successful!',

  // Subscription Flow
  SUBSCRIPTION: {
    PROCEED_TO_PAYMENT: 'Proceeding to checkout. Please complete your payment.',
  },

  // Email & Newsletter
  EMAIL_VERIFIED: 'Email verified successfully!',
  NEWSLETTER_SUBSCRIBED: 'Thank you for subscribing to our newsletter!',
  NEWSLETTER_ALREADY_SUBSCRIBED: "You're already subscribed to our newsletter!",

  // Data Operations
  DATA_SAVED: 'Data saved successfully!',
  DATA_UPDATED: 'Data updated successfully!',
  DATA_DELETED: 'Data deleted successfully!',

  // General
  SUCCESS: 'Success!',
  OPERATION_COMPLETED: 'Operation completed successfully!',
} as const;

// ============================================================================
// INFO MESSAGES
// ============================================================================

export const INFO_MESSAGES = {
  LOADING: 'Loading...',
  PROCESSING: 'Processing your request...',
  PLEASE_WAIT: 'Please wait...',
  SUBMITTING: 'Submitting...',
  SAVING: 'Saving...',
  LOADING_STATES: 'Loading states...',
  LOADING_CITIES: 'Loading cities...',
  SELECT_STATE_FIRST: 'Please select a state first.',
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get field error count message
 * @param count - Number of errors
 * @returns Formatted error message
 */
export function getFieldErrorMessage(count: number): string {
  return `Please correct ${count} error${count > 1 ? 's' : ''} in the form`;
}

/**
 * Get loading message with context
 * @param resource - The resource being loaded
 * @returns Formatted loading message
 */
export function getLoadingMessage(resource: string): string {
  return `Loading ${resource}...`;
}

/**
 * Get failed to load message with context
 * @param resource - The resource that failed to load
 * @returns Formatted error message
 */
export function getFailedToLoadMessage(resource: string): string {
  return `Failed to load ${resource}. Please try again.`;
}

/**
 * Get success message for data operations
 * @param operation - The operation performed (saved, updated, deleted)
 * @param resource - Optional resource name
 * @returns Formatted success message
 */
export function getOperationSuccessMessage(
  operation: 'saved' | 'updated' | 'deleted' | 'created',
  resource?: string,
): string {
  const resourceText = resource ? ` ${resource}` : '';
  const capitalizedOperation =
    operation.charAt(0).toUpperCase() + operation.slice(1);
  return `${resourceText ? resourceText.trim() : 'Data'} ${operation} successfully!`;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;
export type SuccessMessageKey = keyof typeof SUCCESS_MESSAGES;
export type InfoMessageKey = keyof typeof INFO_MESSAGES;
