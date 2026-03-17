/**
 * API Client Wrapper
 * Centralized fetch wrapper with automatic error handling and toast notifications
 * Similar pattern to the existing strapi.ts utility
 */

import { showErrorToast } from './errors';

import {
  ApiError,
  ApiErrorResponse,
  isApiErrorResponse,
  type FetchApiOptions,
} from '@/types/api';
import { ERROR_MESSAGES } from '@/constants/messages';

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Get the base API URL from environment variables
 * Ensures the URL doesn't end with a trailing slash
 */
function getBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL;

  if (!baseUrl) {
    console.warn(
      'NEXT_PUBLIC_ADMIN_APP_API_URL is not defined. Using relative URLs.',
    );
    return '';
  }

  // Remove trailing slash to avoid double slashes in URL construction
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

// ============================================================================
// MAIN API CLIENT
// ============================================================================

/**
 * Centralized API client for all backend requests
 * Automatically handles errors, shows toasts, and provides type-safe responses
 *
 * @template T - The expected response data type
 * @param endpoint - The API endpoint (e.g., '/states' or 'pages/contact-us')
 * @param options - Fetch options with additional configuration
 * @returns Promise resolving to the response data
 * @throws ApiError with structured error information
 *
 * @example
 * // Simple GET request
 * const states = await fetchApi<State[]>('states');
 *
 * @example
 * // POST request with body
 * const result = await fetchApi<RegistrationResponse>('clinic-onboarding/register', {
 *   method: 'POST',
 *   body: { email: 'test@example.com', clinic_name: 'Test Clinic' }
 * });
 *
 * @example
 * // Skip automatic error toast
 * try {
 *   const data = await fetchApi<Data>('endpoint', { skipErrorToast: true });
 * } catch (error) {
 *   // Handle error manually
 * }
 */
export async function fetchApi<T = unknown>(
  endpoint: string,
  options: FetchApiOptions = {},
): Promise<T> {
  const {
    body,
    skipErrorToast = false,
    onError,
    baseUrl,
    headers = {},
    ...fetchOptions
  } = options;

  // Construct full URL
  const apiBaseUrl = baseUrl || getBaseUrl();
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${apiBaseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // Prepare request configuration
  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add body if provided (automatically stringify)
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    // Make the request
    const response = await fetch(url, config);

    // Handle successful responses
    if (response.ok) {
      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        // Return the data directly or unwrap .data field if present
        return (data.data !== undefined ? data.data : data) as T;
      }

      // No content or non-JSON response
      return undefined as T;
    }

    // Handle error responses (4xx, 5xx)
    // This will throw ApiError
    await handleErrorResponse(response, skipErrorToast, onError);
  } catch (error) {
    // If it's already an ApiError, just re-throw it
    // (it was already handled by handleErrorResponse)
    if (error instanceof ApiError) {
      throw error;
    }

    // Otherwise, it's a network error (fetch failed, timeout, etc.)
    await handleNetworkError(error, skipErrorToast, onError);
  }

  // This line should never be reached due to throws above
  // but TypeScript needs it for type safety
  throw new Error('Unexpected error in fetchApi');
}

// ============================================================================
// ERROR HANDLERS
// ============================================================================

/**
 * Handle HTTP error responses (4xx, 5xx)
 */
async function handleErrorResponse(
  response: Response,
  skipErrorToast: boolean,
  onError?: (error: ApiError) => void,
): Promise<never> {
  let errorData: ApiErrorResponse | null = null;

  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      if (isApiErrorResponse(json)) {
        errorData = json;
      }
    }
  } catch {
    // Failed to parse error response
  }

  // Create structured error
  const apiError = new ApiError(
    errorData?.message ||
      errorData?.errors[0]?.message ||
      `Request failed with status ${response.status}`,
    response.status,
    errorData?.errors || [
      {
        message:
          errorData?.message || `Request failed with status ${response.status}`,
      },
    ],
    response,
  );

  // Show error toast ONLY for non-field errors (unless skipped)
  // Field errors should be handled inline by the component
  if (!skipErrorToast) {
    // Check if all errors have field properties (field validation errors)
    const hasOnlyFieldErrors = apiError.errors.every((err) => err.field);

    // Check if any error can be inferred as a field error from the message
    const hasInferrableFieldErrors = apiError.errors.some((err) => {
      if (err.field) return true; // Has explicit field
      // Try to infer field from message
      const message = err.message.toLowerCase();
      return message.includes('zip code') ||
             message.includes('email') ||
             message.includes('phone') ||
             message.includes('clinic') ||
             message.includes('tax id') ||
             message.includes('npi') ||
             message.includes('city') ||
             message.includes('state') ||
             message.includes('address');
    });

    // Show toast ONLY if:
    // 1. Not all errors are field-specific, OR
    // 2. There are general business logic errors (like "clinic name already exists")
    if (!hasOnlyFieldErrors && !hasInferrableFieldErrors) {
      // This is a general error (business logic, authorization, etc.)
      await showErrorToast(apiError);
    }
    // Do NOT show toast for field validation errors - they'll be shown inline
  }

  // Call custom error handler if provided
  if (onError) {
    onError(apiError);
  }

  throw apiError;
}

/**
 * Handle network errors (connection issues, timeouts, etc.)
 */
async function handleNetworkError(
  error: unknown,
  skipErrorToast: boolean,
  onError?: (error: ApiError) => void,
): Promise<never> {
  const apiError = new ApiError(
    ERROR_MESSAGES.NETWORK_ERROR,
    0, // No status code for network errors
    [{ message: ERROR_MESSAGES.NETWORK_ERROR }],
  );

  // Show network error toast
  if (!skipErrorToast) {
    await showErrorToast(apiError);
  }

  // Call custom error handler if provided
  if (onError) {
    onError(apiError);
  }

  throw apiError;
}

// ============================================================================
// CONVENIENCE METHODS
// ============================================================================

/**
 * Perform a GET request
 */
export async function get<T = unknown>(
  endpoint: string,
  options?: Omit<FetchApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * Perform a POST request
 */
export async function post<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown> | unknown[],
  options?: Omit<FetchApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'POST', body });
}

/**
 * Perform a PUT request
 */
export async function put<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown> | unknown[],
  options?: Omit<FetchApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'PUT', body });
}

/**
 * Perform a PATCH request
 */
export async function patch<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown> | unknown[],
  options?: Omit<FetchApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'PATCH', body });
}

/**
 * Perform a DELETE request
 */
export async function del<T = unknown>(
  endpoint: string,
  options?: Omit<FetchApiOptions, 'method' | 'body'>,
): Promise<T> {
  return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
}

// ============================================================================
// SPECIAL PURPOSE UTILITIES
// ============================================================================

/**
 * Fetch data without throwing on errors (returns null instead)
 * Useful for optional data fetching where failures should be silent
 */
export async function fetchApiSafe<T = unknown>(
  endpoint: string,
  options: FetchApiOptions = {},
): Promise<T | null> {
  try {
    return await fetchApi<T>(endpoint, { ...options, skipErrorToast: true });
  } catch {
    return null;
  }
}

/**
 * Fetch with automatic retry logic
 */
export async function fetchApiWithRetry<T = unknown>(
  endpoint: string,
  options: FetchApiOptions & { retries?: number; retryDelay?: number } = {},
): Promise<T> {
  const { retries = 3, retryDelay = 1000, ...fetchOptions } = options;
  let lastError: unknown;

  for (let i = 0; i < retries; i++) {
    try {
      return await fetchApi<T>(endpoint, fetchOptions);
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      }
    }
  }

  throw lastError;
}
