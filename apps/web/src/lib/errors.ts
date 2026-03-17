/**
 * Error Extraction and Handling Utilities
 * Centralized error processing for API responses with toast integration
 */

import { toast } from 'sonner';

import {
  ApiError,
  ApiErrorResponse,
  isApiError,
  isApiErrorResponse,
  type FieldError,
} from '@/types/api';
import { ERROR_MESSAGES, getFieldErrorMessage } from '@/constants/messages';

// ============================================================================
// ERROR MESSAGE EXTRACTION
// ============================================================================

/**
 * Extract user-friendly error messages from API error response
 * @param error - The error object (can be ApiError, Response, or generic Error)
 * @returns Array of error messages
 */
export async function extractApiErrorMessages(
  error: unknown,
): Promise<string[]> {
  // Case 1: ApiError instance (our custom error class)
  if (isApiError(error)) {
    return error.errors.map((err) => err.message);
  }

  // Case 2: Response object
  if (error instanceof Response) {
    try {
      const json = await error.json();
      if (isApiErrorResponse(json)) {
        return json.errors.map((err) => err.message);
      }
      // Fallback: use error.message if available, otherwise generic message
      return [json.message || `Request failed with status ${error.status}`];
    } catch {
      return [`Request failed with status ${error.status}`];
    }
  }

  // Case 3: Error object with message
  if (error instanceof Error) {
    return [error.message];
  }

  // Case 4: Unknown error type
  return [ERROR_MESSAGES.UNEXPECTED_ERROR];
}

/**
 * Extract synchronous error messages from ApiError
 * @param error - The ApiError instance
 * @returns Array of error messages
 */
export function extractErrorMessages(error: ApiError): string[] {
  return error.errors.map((err) => err.message);
}

/**
 * Extract field-level errors from API error response
 * Useful for displaying inline validation errors in forms
 * @param error - The error object
 * @returns Record mapping field names to error messages
 *
 * Note: If backend doesn't send field names, tries to infer from message
 */
export async function extractFieldErrors(
  error: unknown,
): Promise<Record<string, string>> {
  const fieldErrors: Record<string, string> = {};

  if (isApiError(error)) {
    error.errors.forEach((err) => {
      if (err.field) {
        fieldErrors[err.field] = err.message;
      } else {
        // If no field specified, try to infer from message
        const inferredField = inferFieldFromMessage(err.message);
        if (inferredField) {
          fieldErrors[inferredField] = err.message;
        }
      }
    });
    return fieldErrors;
  }

  if (error instanceof Response) {
    try {
      const json = await error.json();
      if (isApiErrorResponse(json)) {
        json.errors.forEach((err) => {
          if (err.field) {
            fieldErrors[err.field] = err.message;
          } else {
            // If no field specified, try to infer from message
            const inferredField = inferFieldFromMessage(err.message);
            if (inferredField) {
              fieldErrors[inferredField] = err.message;
            }
          }
        });
      }
    } catch {
      // Failed to parse response, return empty object
    }
  }

  return fieldErrors;
}

/**
 * Try to infer field name from error message
 * @param message - Error message
 * @returns Inferred field name or null
 */
function inferFieldFromMessage(message: string): string | null {
  const lowerMessage = message.toLowerCase();

  // Common field patterns
  if (lowerMessage.includes('zip code') || lowerMessage.includes('zipcode')) {
    return 'zip_code';
  }
  if (lowerMessage.includes('email')) {
    return 'email';
  }
  if (lowerMessage.includes('phone')) {
    return 'phone';
  }
  if (lowerMessage.includes('clinic')) {
    return 'clinic_name';
  }
  if (lowerMessage.includes('tax id')) {
    return 'tax_id';
  }
  if (lowerMessage.includes('npi')) {
    return 'npi';
  }
  if (lowerMessage.includes('city')) {
    return 'city';
  }
  if (lowerMessage.includes('state')) {
    return 'state';
  }
  if (lowerMessage.includes('address')) {
    return 'street_address_line_1';
  }

  return null; // Can't infer field
}

/**
 * Synchronous version of extractFieldErrors for ApiError instances
 * @param error - The ApiError instance
 * @returns Record mapping field names to error messages
 *
 * Note: If backend doesn't send field names, tries to infer from message
 */
export function getFieldErrors(error: ApiError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  error.errors.forEach((err) => {
    if (err.field) {
      fieldErrors[err.field] = err.message;
    } else {
      // If no field specified, try to infer from message
      const inferredField = inferFieldFromMessage(err.message);
      if (inferredField) {
        fieldErrors[inferredField] = err.message;
      }
    }
  });
  return fieldErrors;
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

/**
 * Display error message(s) as toast notification
 * Ensures only one toast is shown per error
 * @param error - The error (can be string, string array, or any error type)
 */
export async function showErrorToast(error: unknown): Promise<void> {
  if (typeof error === 'string') {
    toast.error(error);
    return;
  }

  if (Array.isArray(error)) {
    // Show only the first error to avoid toast spam
    if (error.length > 0) {
      toast.error(error[0]);
    }
    return;
  }

  // Extract messages from structured error
  const messages = await extractApiErrorMessages(error);

  // Always show only ONE toast to avoid duplicates
  if (messages.length > 0) {
    toast.error(messages[0]);
  } else {
    toast.error(ERROR_MESSAGES.UNEXPECTED_ERROR);
  }
}

/**
 * Display success message as toast notification
 * @param message - The success message to display
 */
export function showSuccessToast(message: string): void {
  toast.success(message);
}

/**
 * Display info message as toast notification
 * @param message - The info message to display
 */
export function showInfoToast(message: string): void {
  toast.info(message);
}

/**
 * Display warning message as toast notification
 * @param message - The warning message to display
 */
export function showWarningToast(message: string): void {
  toast.warning(message);
}

/**
 * Display loading toast with promise handling
 * @param promise - The promise to track
 * @param messages - Loading, success, and error messages
 */
export function showLoadingToast<T>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string;
    error?: string;
  },
): void {
  toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error || 'Operation failed',
  });
}

// ============================================================================
// ERROR HANDLING HELPERS
// ============================================================================

/**
 * Handle API errors with automatic toast display
 * Shows field errors inline and general errors as toasts
 * @param error - The error to handle
 * @param options - Configuration options
 * @returns Field errors for inline display (if any)
 */
export async function handleApiError(
  error: unknown,
  options: {
    skipToast?: boolean;
    customMessage?: string;
  } = {},
): Promise<Record<string, string> | null> {
  const fieldErrors = await extractFieldErrors(error);
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  // Show toast for general errors (non-field errors)
  if (!options.skipToast) {
    if (options.customMessage) {
      toast.error(options.customMessage);
    } else if (!hasFieldErrors) {
      // Only show toast if there are no field errors
      await showErrorToast(error);
    } else {
      // Show a summary toast for field errors
      const errorCount = Object.keys(fieldErrors).length;
      toast.error(getFieldErrorMessage(errorCount));
    }
  }

  return hasFieldErrors ? fieldErrors : null;
}

/**
 * Format field errors for react-hook-form integration
 * @param fieldErrors - Field errors from API
 * @returns Field errors in react-hook-form format
 */
export function formatFieldErrorsForForm(
  fieldErrors: Record<string, string>,
): Record<string, { type: string; message: string }> {
  const formatted: Record<string, { type: string; message: string }> = {};

  Object.entries(fieldErrors).forEach(([field, message]) => {
    formatted[field] = {
      type: 'server',
      message,
    };
  });

  return formatted;
}

/**
 * Check if error is a network error (connection, timeout, etc.)
 * @param error - The error to check
 * @returns True if network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) {
    // Network errors often appear as TypeErrors with specific messages
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('Failed to fetch')
    );
  }
  return false;
}

/**
 * Get user-friendly network error message
 * @returns Friendly error message for network issues
 */
export function getNetworkErrorMessage(): string {
  return ERROR_MESSAGES.NETWORK_ERROR;
}
