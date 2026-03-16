/**
 * Subscription Flow Types
 * Type definitions for the S Cubed subscription multi-step form
 */

// ============================================================================
// FORM DATA TYPES
// ============================================================================

/**
 * Clinic Information (Step 1)
 */
export interface ClinicInfo {
  clinic_name: string;
  tax_id: string; // 9 digits, required
  npi: string; // 10 digits, required
}

/**
 * Location Information (Step 1) - String-based format
 * Used with Google Places API integration (SCM-4402)
 */
export interface LocationInfo {
  street_address_line_1: string;
  city: string; // City name (auto-populated from Google Places)
  state: string; // State name (auto-populated from Google Places)
  state_code: string; // State code e.g. "OH" (auto-populated from Google Places)
  zip_code: string; // US zip code (auto-populated from Google Places)
  timezone: string; // Timezone ID string (e.g., "America/New_York")
}

/**
 * Admin User Information (Step 1)
 */
export interface AdminInfo {
  email: string;
  first_name: string;
  last_name: string;
  phone: string; // US phone number
}

/**
 * Subscription Information (Step 1 & 3)
 */
export interface SubscriptionInfo {
  subscription_plan_id: number; // Plan ID
  staff_count: number; // Minimum 1
}

/**
 * Payment Information (Step 3 - Paid Plans Only)
 */
export interface PaymentInfo {
  billing_cycle: 'monthly' | 'yearly';
  payment_method_id?: string; // Stripe payment method ID (optional until checkout)
  addons?: number[]; // Optional: Array of addon feature IDs
}

/**
 * OTP Verification Data (Step 2)
 */
export interface OTPVerification {
  email: string;
  otp_code: string;
}

// ============================================================================
// COMBINED FORM DATA
// ============================================================================

/**
 * Complete Step 1 Form Data (Clinic + Location + Admin + Subscription)
 * Uses Google Places API for location data (SCM-4402)
 */
export interface Step1FormData
  extends ClinicInfo,
    LocationInfo,
    AdminInfo,
    SubscriptionInfo {}

/**
 * Complete Subscription Payload - Free Plan
 */
export interface FreeSubscriptionPayload
  extends ClinicInfo,
    LocationInfo,
    AdminInfo,
    SubscriptionInfo {}

/**
 * Complete Subscription Payload - Paid Plan
 */
export interface PaidSubscriptionPayload
  extends ClinicInfo,
    LocationInfo,
    AdminInfo,
    SubscriptionInfo,
    PaymentInfo {}

// ============================================================================
// PLAN TYPES
// ============================================================================

/**
 * Subscription Plan Details
 */
export interface SubscriptionPlan {
  id: number;
  name: string;
  type: 'free' | 'paid';
  price?: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  staff_limit?: number;
}

/**
 * Addon Feature
 */
export interface AddonFeature {
  id: number;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
}

/**
 * Plan API Data - Response from plans-and-addons endpoint
 */
export interface PlanApiData {
  id: number;
  name: string;
  slug: string;
  plan_type: string;
  monthly_price_per_staff: string;
  yearly_price_per_staff: string;
  discounted_yearly_price_per_staff: string | null;
  trial_days: number;
  max_staff: number;
  display_order: number;
  stripe_monthly_price_id?: string | null;
  stripe_yearly_price_id?: string | null;
}

/**
 * Addon API Data - Response from plans-and-addons endpoint
 */
export interface AddonApiData {
  id: number;
  feature_key: string;
  feature_name: string;
  description: string;
  feature_type: string;
  monthly_price: string | null;
  yearly_price: string | null;
  stripe_monthly_price_id?: string | null;
  stripe_yearly_price_id?: string | null;
  display_order: number;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * API Success Response
 */
export interface ApiSuccessResponse {
  success: boolean;
  message: string;
  data?: {
    subscription_id?: string;
    payment_session_url?: string;
  };
}

/**
 * API Error Response (422)
 */
export interface ApiErrorResponse {
  errors: FieldError[];
  status_code: number;
  message?: string;
}

/**
 * Field-level error
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Registration Data API Response
 * Response from GET /subscriptions/onboarding/registration-data/{request_id}
 */
export interface RegistrationDataResponse {
  clinic_onboarding_request_id: number;
  email: string;
  status: string;
  clinic_name?: string;
  tax_id?: string;
  npi?: string;
  street_address_line_1?: string;
  // String-based location fields (from Google Places API)
  city?: string;
  state?: string;
  state_code?: string;
  zip_code?: string;
  timezone?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  subscription_plan_id?: number;
  staff_count?: number;
  billing_cycle?: 'monthly' | 'yearly';
  addons?: number[];
  success_url?: string;
  cancel_url?: string;
  subscription_plan?: {
    id: number;
    name: string;
    plan_type: string;
    trial_days: number;
  };
}

// ============================================================================
// FORM STATE TYPES
// ============================================================================

/**
 * Multi-step form state
 */
export interface SubscriptionFormState {
  currentStep: 0 | 1 | 2 | 3 | 4;
  step1Data: Partial<Step1FormData>;
  clinic_onboarding_request_id?: number; // From email verification (Step 0)
  otpVerified: boolean;
  selectedPlan: SubscriptionPlan | null;
  selectedAddons: number[];
  billingCycle: 'monthly' | 'yearly';
  isSubmitting: boolean;
  submitError: string | null;
  paymentUrl: string | null; // From cart submission (paid plans)
  paymentRequired: boolean;
}

// ============================================================================
// STRIPE TYPES
// ============================================================================

/**
 * Stripe Payment Session Request
 */
export interface StripeSessionRequest {
  subscription_plan_id: number;
  billing_cycle: 'monthly' | 'yearly';
  staff_count: number;
  addons: number[];
  customer_email: string;
  success_url: string;
  cancel_url: string;
}

/**
 * Stripe Payment Session Response
 */
export interface StripeSessionResponse {
  session_id: string;
  session_url: string;
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

/**
 * API Registration Response Data
 */
export interface RegistrationResponseData {
  clinic_onboarding_request_id: number;
  email: string;
  clinic_name: string;
  next_step: string;
}

/**
 * Props for Step 1 (Email Input) Component
 */
export interface Step1EmailProps {
  onNext: (clinic_onboarding_request_id: number, email: string) => void;
  initialEmail?: string;
}

/**
 * Props for Step 3 (Clinic Details) Component
 */
export interface Step3Props {
  onNext: (data: Step1FormData, apiResponse?: RegistrationResponseData) => void;
  onBack?: () => void;
  initialData?: Partial<Step1FormData>;
  selectedPlan?: SubscriptionPlan | null;
  billingCycle?: 'monthly' | 'yearly';
  clinic_onboarding_request_id?: number;
}

/**
 * OTP Verification Response Data
 */
export interface OTPVerificationResponse {
  clinic: {
    id: number;
    clinic_name: string;
    onboarding_status: string;
  };
  subscription: {
    id: number;
    status: string;
    billing_cycle?: string;
  };
  payment_required: boolean;
  payment_url?: string;
  next_step: string;
}

/**
 * Props for Step 2 (OTP) Component
 */
export interface Step2Props {
  email: string;
  clinic_onboarding_request_id: number;
  onVerified: (responseData: OTPVerificationResponse) => void;
  onBack: () => void;
}

/**
 * Props for Step 4 (Free Plan Success) Component
 */
export interface Step4FreeProps {
  formData: FreeSubscriptionPayload;
}

/**
 * Props for Step 4 (Paid Plan Cart) Component
 */
export interface Step4PaidProps {
  readonly formData: Partial<Step1FormData>;
  readonly billingCycle: 'monthly' | 'yearly';
  readonly onNext: (data: {
    staff_count: number;
    addons: number[];
    billing_cycle: 'monthly' | 'yearly';
    payment_url?: string;
  }) => void;
  readonly onBack: () => void;
  readonly clinic_onboarding_request_id?: number;
}

/**
 * Props for Step 5 (Payment Processing) Component
 */
export interface Step5Props {
  formData: PaidSubscriptionPayload;
  paymentUrl?: string | null; // Pre-generated payment URL from OTP verification
  onBack?: () => void;
}

/**
 * Props for Success Page Component
 */
export interface SuccessPageProps {
  isPaidPlan: boolean;
  clinicName: string;
  email: string;
}
