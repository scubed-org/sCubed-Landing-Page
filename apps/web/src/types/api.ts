/**
 * API Types
 * Centralized type definitions for all API interactions across the application
 */

// ============================================================================
// CORE API RESPONSE TYPES
// ============================================================================

/**
 * Generic successful API response
 * @template T The type of data returned by the API
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * API Error Response Structure
 * All backend errors follow this format
 */
export interface ApiErrorResponse {
  errors: Array<{
    message: string;
    field?: string; // Optional: specific field that caused the error
  }>;
  status_code: number;
  message?: string; // Optional: general error message
}

/**
 * Field-level validation error
 */
export interface FieldError {
  field: string;
  message: string;
}

// ============================================================================
// API ERROR CLASS
// ============================================================================

/**
 * Custom error class for API errors
 * Extends Error to include structured API error information
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: ApiErrorResponse['errors'];
  public readonly response?: Response;

  constructor(
    message: string,
    statusCode: number,
    errors: ApiErrorResponse['errors'],
    response?: Response,
  ) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.response = response;

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard to check if an error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Type guard to check if response is an ApiErrorResponse
 */
export function isApiErrorResponse(
  response: unknown,
): response is ApiErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'errors' in response &&
    Array.isArray((response as ApiErrorResponse).errors) &&
    'status_code' in response
  );
}

/**
 * Type guard to check if an ApiError has field-level errors
 */
export function hasFieldErrors(error: unknown): boolean {
  if (!isApiError(error)) return false;
  return error.errors.some((err) => err.field !== undefined);
}

// ============================================================================
// FETCH OPTIONS TYPE
// ============================================================================

/**
 * Extended fetch options with additional configuration
 */
export interface FetchApiOptions extends Omit<RequestInit, 'body'> {
  // Body can be any JSON-serializable value
  body?: Record<string, unknown> | unknown[];
  // Skip automatic error toast (useful when handling errors manually)
  skipErrorToast?: boolean;
  // Skip automatic error toasts for specific HTTP status codes
  skipErrorStatuses?: number[];
  // Custom error handler
  onError?: (error: ApiError) => void;
  // Base URL override (defaults to NEXT_PUBLIC_ADMIN_APP_API_URL)
  baseUrl?: string;
}

// ============================================================================
// COMMON API RESPONSE TYPES
// ============================================================================

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

/**
 * Generic list response (non-paginated)
 */
export interface ListResponse<T> {
  data: T[];
  count?: number;
}

/**
 * Success response with optional data
 */
export interface SuccessResponse<T = void> {
  success: true;
  message?: string;
  data?: T;
}

// ============================================================================
// HTTP STATUS CODES
// ============================================================================

/**
 * Common HTTP status codes for reference
 */
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// ============================================================================
// NETWORK ERROR TYPES
// ============================================================================

/**
 * Network error information
 */
export interface NetworkError {
  type: 'network' | 'timeout' | 'abort';
  message: string;
  originalError?: Error;
}

/**
 * Type guard for network errors
 */
export function isNetworkError(error: unknown): error is NetworkError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    (error as NetworkError).type === 'network'
  );
}
