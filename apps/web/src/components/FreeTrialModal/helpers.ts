import { API_TO_FORM_FIELD_MAP, ERROR_KEYWORD_TO_FIELD } from './constants';

export type FreeTrialInputs = {
  // Clinic Details
  clinicName: string;
  taxId: string;
  npi: string;
  addressLine1: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;

  // Primary Contact Information
  fullName: string;
  email: string;
  phoneNumber: string;

  // Consent
  consentToContact: boolean;
};

export type CountryOption = {
  id: number;
  name: string;
  code: string;
};

export type StateOption = {
  id: number;
  name: string;
  code: string;
  timezones: Array<{
    timezone_id: number;
    timezone: {
      timezone: string;
    };
  }>;
};

export type CityOption = {
  id: string;
  name: string;
};

// Detect iOS devices for scroll handling
export const isIosDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i) || !!ua.match(/iPod/i);
  const isStandalone = (window.navigator as any).standalone === true;
  return iOS || isStandalone;
};

// Get timezone from selected state
export const getSelectedStateTimezone = (
  selectedState: string,
  states: StateOption[]
): string => {
  if (!selectedState || !states.length) return 'America/New_York';

  const stateData = states.find((state) => state.id.toString() === selectedState);
  if (stateData?.timezones && stateData.timezones.length > 0) {
    return stateData.timezones[0].timezone.timezone;
  }

  return 'America/New_York';
};

// Map API field name to form field name
export const mapApiFieldToFormField = (apiField: string): string => {
  return API_TO_FORM_FIELD_MAP[apiField] || apiField;
};

// Detect which field an error message relates to
export const detectFieldFromErrorMessage = (errorMessage: string): string | null => {
  const lowerMessage = errorMessage.toLowerCase();

  for (const mapping of ERROR_KEYWORD_TO_FIELD) {
    for (const keyword of mapping.keywords) {
      if (lowerMessage.includes(keyword)) {
        return mapping.field;
      }
    }
  }

  return null;
};

// Process API errors and return field errors and messages
export const processApiErrors = (errors: any[]) => {
  const fieldErrors: Record<string, string> = {};
  const errorMessages: string[] = [];

  errors.forEach((error: any) => {
    if (error.field && error.message) {
      // Field-specific error - map API field names to form field names
      const formFieldName = mapApiFieldToFormField(error.field);
      fieldErrors[formFieldName] = 'error';
      errorMessages.push(error.message);
    } else if (error.message) {
      // General error without a field - try to detect the field
      const detectedField = detectFieldFromErrorMessage(error.message);
      if (detectedField) {
        fieldErrors[detectedField] = 'error';
      }
      errorMessages.push(error.message);
    }
  });

  return {
    fieldErrors,
    displayMessage: errorMessages.length > 0
      ? errorMessages.join('. ')
      : 'An error occurred. Please try again.'
  };
};