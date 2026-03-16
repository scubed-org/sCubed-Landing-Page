'use client';

import {
  AlertCircle,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  UserCog,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import { DEFAULT_STAFF_COUNT } from '../../constants/formFields';
import { SUCCESS_MESSAGES } from '../../constants/messages';
import { fetchApi } from '../../lib/api-client';
import { getFieldErrors, showSuccessToast } from '../../lib/errors';
import { isApiError } from '../../types/api';

import { PhoneInput, TextInput } from './FormComponents';
import * as styles from './styles.css';

import { AddressAutocomplete } from '@/components/AddressAutocomplete';
import type { AddressComponents } from '@/components/AddressAutocomplete/types';
import type {
  RegistrationResponseData,
  Step1FormData,
  Step3Props,
} from '@/types/subscription';
import { formatPhone } from '@/utils/phoneFormatter';

/**
 * Internal form data type - uses string values for location fields
 * Updated for Google Places API integration (SCM-4402)
 */
interface InternalFormData {
  clinic_name: string;
  tax_id: string;
  npi: string;
  street_address_line_1: string;
  state: string; // State name (auto-populated from Google Places)
  state_code: string; // State code e.g. "OH" (auto-populated from Google Places)
  city: string; // City name (auto-populated from Google Places)
  zip_code: string; // ZIP code (auto-populated from Google Places)
  timezone: string; // IANA timezone ID (e.g., "America/New_York")
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  subscription_plan_id: number;
  staff_count: number;
}

/**
 * Step 1: Clinic and Admin Details Form (Now Step 2 in new flow)
 * Collects all information except payment details
 * Uses Google Places API for address autocomplete (SCM-4402)
 * For FREE plans: Calls PUT /register API with complete data
 * For PAID plans: Calls PUT /register API with draft_mode: true
 */
function Step3ClinicDetailsComponent({
  onNext,
  onBack,
  initialData,
  selectedPlan,
  clinic_onboarding_request_id,
}: Readonly<Step3Props>) {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InternalFormData>({
    mode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      clinic_name: initialData?.clinic_name || '',
      tax_id: initialData?.tax_id || '',
      npi: initialData?.npi || '',
      street_address_line_1: initialData?.street_address_line_1 || '',
      zip_code: initialData?.zip_code || '',
      email: initialData?.email || '',
      first_name: initialData?.first_name || '',
      last_name: initialData?.last_name || '',
      phone: initialData?.phone || '',
      subscription_plan_id:
        initialData?.subscription_plan_id || selectedPlan?.id || 1,
      staff_count: initialData?.staff_count || DEFAULT_STAFF_COUNT,
      // String values for location (from Google Places)
      state: initialData?.state || '',
      state_code: initialData?.state_code || '',
      city: initialData?.city || '',
      timezone: initialData?.timezone || '',
    },
  });

  // Update subscription_plan_id without resetting the entire form
  useEffect(() => {
    if (initialData?.subscription_plan_id) {
      setValue('subscription_plan_id', initialData.subscription_plan_id);
    }
  }, [initialData?.subscription_plan_id, setValue]);

  // Sync form values when initialData changes (e.g., from API response)
  // This handles the case where:
  // 1. Component mounts with partial data
  // 2. API returns full data after mount
  // 3. User navigates back to this step with cached data
  useEffect(() => {
    if (!initialData) return;

    const currentValues = getValues();

    // Check if we need to sync location-related fields from initialData
    // Only sync if initialData has a value and current form is empty or has a different value
    const fieldsToSync: Partial<InternalFormData> = {};

    // Sync state if API returned it
    if (initialData.state && initialData.state !== currentValues.state) {
      fieldsToSync.state = initialData.state;
    }

    // Sync state_code if API returned it
    if (initialData.state_code && initialData.state_code !== currentValues.state_code) {
      fieldsToSync.state_code = initialData.state_code;
    }

    // Sync city if API returned it
    if (initialData.city && initialData.city !== currentValues.city) {
      fieldsToSync.city = initialData.city;
    }

    // Sync timezone if API returned it
    if (
      initialData.timezone &&
      initialData.timezone !== currentValues.timezone
    ) {
      fieldsToSync.timezone = initialData.timezone;
    }

    // Sync zip_code if API returned it and form is empty
    if (initialData.zip_code && !currentValues.zip_code) {
      fieldsToSync.zip_code = initialData.zip_code;
    }

    // Sync street_address_line_1 if API returned it and form is empty
    if (
      initialData.street_address_line_1 &&
      !currentValues.street_address_line_1
    ) {
      fieldsToSync.street_address_line_1 = initialData.street_address_line_1;
    }

    // Sync phone if API returned it and form is empty
    // Strip to digits only since form stores digits
    if (initialData.phone && !currentValues.phone) {
      fieldsToSync.phone = initialData.phone.replace(/\D/g, '');
    }

    // Sync first_name if API returned it and form is empty
    if (initialData.first_name && !currentValues.first_name) {
      fieldsToSync.first_name = initialData.first_name;
    }

    // Sync last_name if API returned it and form is empty
    if (initialData.last_name && !currentValues.last_name) {
      fieldsToSync.last_name = initialData.last_name;
    }

    // Sync clinic_name if API returned it and form is empty
    if (initialData.clinic_name && !currentValues.clinic_name) {
      fieldsToSync.clinic_name = initialData.clinic_name;
    }

    // Sync tax_id if API returned it and form is empty
    if (initialData.tax_id && !currentValues.tax_id) {
      fieldsToSync.tax_id = initialData.tax_id;
    }

    // Sync npi if API returned it and form is empty
    if (initialData.npi && !currentValues.npi) {
      fieldsToSync.npi = initialData.npi;
    }

    // Apply synced values using reset to preserve other fields
    if (Object.keys(fieldsToSync).length > 0) {
      reset(
        { ...currentValues, ...fieldsToSync },
        { keepDirty: true, keepErrors: true },
      );
    }
  }, [
    initialData?.state,
    initialData?.state_code,
    initialData?.city,
    initialData?.timezone,
    initialData?.zip_code,
    initialData?.street_address_line_1,
    initialData?.phone,
    initialData?.first_name,
    initialData?.last_name,
    initialData?.clinic_name,
    initialData?.tax_id,
    initialData?.npi,
    reset,
    getValues,
  ]);

  // Handle address selection from Google Places
  const handleAddressSelect = useCallback(
    (
      address: AddressComponents,
      coordinates?: { lat: number; lng: number },
      avoidTrigger?: boolean
    ) => {
      setValue('street_address_line_1', address.streetAddress);
      setValue('city', address.city);
      setValue('state', address.state);
      setValue('state_code', address.stateCode);

      if (avoidTrigger) {
        setValue('zip_code', '');
        return;
      }

      // Only set and validate zip_code if it was returned by Google Places
      // If not returned, user can manually enter it before submitting
      if (address.zipCode) {
        setValue('zip_code', address.zipCode);
        // Trigger validation for all fields including zip_code
        trigger(['street_address_line_1', 'city', 'state', 'zip_code']);
      } else {
        // Only trigger validation for fields that were populated
        // Don't trigger zip_code error - let user fill it manually
        trigger(['street_address_line_1', 'city', 'state']);
      }
    },
    [setValue, trigger],
  );

  // Handle timezone resolution from Places API (New) v1
  const handleTimezoneResolved = useCallback(
    (timezone: string) => {
      setValue('timezone', timezone);
    },
    [setValue],
  );

  // Helper function to determine if error should be shown
  const shouldShowError = (fieldName: keyof InternalFormData) => {
    const fieldError = errors[fieldName];
    const apiFieldError = fieldErrors[fieldName];

    if (apiFieldError) return true;
    if (fieldError?.type === 'required' && !fieldError.message) return false;
    return !!fieldError;
  };

  // Get error message (prioritize API errors over form validation errors)
  const getErrorMessage = (fieldName: keyof InternalFormData) => {
    if (fieldErrors[fieldName]) {
      return { message: fieldErrors[fieldName], type: 'server' as const };
    }
    return errors[fieldName];
  };

  const onSubmit = async (data: InternalFormData) => {
    setFieldErrors({});

    try {
      const isPaidPlan = data.subscription_plan_id > 1;

      // Build form data with string-based location fields (SCM-4402)
      const formData: Step1FormData = {
        clinic_name: data.clinic_name,
        tax_id: data.tax_id,
        npi: data.npi,
        street_address_line_1: data.street_address_line_1,
        city: data.city,
        state: data.state,
        state_code: data.state_code,
        zip_code: data.zip_code,
        timezone: data.timezone || 'America/New_York', // Default timezone if not resolved
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        subscription_plan_id: data.subscription_plan_id,
        staff_count: data.staff_count,
      };

      // Build API payload with string-based location fields (SCM-4402)
      const basePayload: Record<string, unknown> = {
        clinic_name: data.clinic_name,
        tax_id: data.tax_id,
        npi: data.npi || undefined,
        street_address_line_1: data.street_address_line_1,
        // String-based location fields (SCM-4402)
        city: data.city,
        state: data.state,
        state_code: data.state_code,
        zip_code: data.zip_code,
        timezone: data.timezone || 'America/New_York',
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: formatPhone(data.phone),
        clinic_onboarding_request_id,
      };

      // For PAID plans: Call API with draft_mode: true
      if (isPaidPlan) {
        const draftPayload = {
          ...basePayload,
          draft_mode: true,
        };

        await fetchApi<RegistrationResponseData>(
          'subscriptions/onboarding/register',
          {
            method: 'PUT',
            body: draftPayload,
          },
        );

        onNext(formData);
        return;
      }

      // For FREE plans: Call /register API with complete data
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      const success_url = `${baseUrl}/subscribe/success`;
      const cancel_url = `${baseUrl}/subscribe`;

      const apiPayload = {
        ...basePayload,
        subscription_plan_id: data.subscription_plan_id,
        staff_count: data.staff_count,
        success_url,
        cancel_url,
      };

      const result = await fetchApi<RegistrationResponseData>(
        'subscriptions/onboarding/register',
        {
          method: 'PUT',
          body: apiPayload,
        },
      );

      showSuccessToast(SUCCESS_MESSAGES.REGISTRATION_SUCCESS);
      onNext(formData, result);
    } catch (error) {
      if (isApiError(error)) {
        const extractedFieldErrors = getFieldErrors(error);
        setFieldErrors(extractedFieldErrors);
      }
    }
  };

  // Calculate form completion progress
  const formValues = watch();
  const formProgress = useMemo(() => {
    const requiredFields = [
      'clinic_name',
      'tax_id',
      'street_address_line_1',
      'state',
      'city',
      'zip_code',
      'email',
      'first_name',
      'last_name',
      'phone',
    ];
    const filledFields = requiredFields.filter((field) => {
      const value = formValues[field as keyof typeof formValues];
      return value && value.toString().trim() !== '';
    });
    return Math.round((filledFields.length / requiredFields.length) * 100);
  }, [formValues]);

  // Watch location fields for read-only display
  const watchedState = watch('state');
  const watchedCity = watch('city');
  const watchedStreetAddress = watch('street_address_line_1');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className={`${styles.formTitle} ${styles.fadeInUpAnimation}`}>
        Let's Get Started
      </h1>
      <p
        className={`${styles.formSubtitle} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.1s' }}
      >
        Tell us about your practice to create your S Cubed account
      </p>

      {/* Form Progress Bar */}
      <div
        className={styles.formProgressBar}
        style={{ animationDelay: '0.2s' }}
      >
        <div
          className={`${styles.formProgressFill} ${formProgress === 100 ? styles.formProgressComplete : ''}`}
          style={{ width: `${formProgress}%` }}
        />
      </div>
      <p
        style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '2rem',
          animation: `${styles.animations.fadeInUp} 0.6s ease-out`,
          animationDelay: '0.3s',
          animationFillMode: 'both',
        }}
      >
        {formProgress}% Complete
      </p>

      {/* Clinic Information */}
      <div
        className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.4s' }}
      >
        <div className={styles.sectionCardHeader}>
          <div className={styles.sectionNumber}>1</div>
          <div className={styles.sectionHeaderContent}>
            <Building2 size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Clinic Information</h2>
          </div>
        </div>

        <TextInput
          label="Clinic Name"
          required
          placeholder="ABC Therapy Center"
          registration={register('clinic_name', {
            required: 'Clinic name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
            maxLength: { value: 200, message: 'Maximum 200 characters' },
          })}
          error={
            shouldShowError('clinic_name')
              ? getErrorMessage('clinic_name')
              : undefined
          }
        />

        <div className={styles.formGrid}>
          <TextInput
            label="Tax ID (EIN)"
            required
            placeholder="123456789"
            maxLength={9}
            registration={register('tax_id', {
              required: 'Tax ID is required',
              pattern: {
                value: /^\d{9}$/,
                message: 'Tax ID must be exactly 9 digits',
              },
            })}
            error={
              shouldShowError('tax_id') ? getErrorMessage('tax_id') : undefined
            }
            helpText="9-digit Employer Identification Number"
          />

          <TextInput
            label="NPI"
            required
            placeholder="1234567890"
            maxLength={10}
            registration={register('npi', {
              required: 'NPI is required',
              pattern: {
                value: /^\d{10}$/,
                message: 'NPI must be exactly 10 digits',
              },
            })}
            error={shouldShowError('npi') ? getErrorMessage('npi') : undefined}
            helpText="10-digit National Provider Identifier"
          />
        </div>
      </div>

      {/* Location Information */}
      <div
        className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.5s' }}
      >
        <div className={styles.sectionCardHeader}>
          <div className={styles.sectionNumber}>2</div>
          <div className={styles.sectionHeaderContent}>
            <MapPin size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Location</h2>
          </div>
        </div>

        {/* Address Autocomplete */}
        <div className={styles.formField}>
          <AddressAutocomplete
            label="Street Address"
            required
            placeholder="Type address to search"
            value={watchedStreetAddress}
            onAddressSelect={handleAddressSelect}
            onTimezoneResolved={handleTimezoneResolved}
            error={
              !!errors.street_address_line_1 ||
              !!fieldErrors.street_address_line_1
            }
          />
          <input
            type="hidden"
            {...register('street_address_line_1', {
              required: 'Street address is required',
            })}
          />
          {shouldShowError('street_address_line_1') &&
            getErrorMessage('street_address_line_1') && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{getErrorMessage('street_address_line_1')?.message}</span>
              </div>
            )}
        </div>

        {/* Auto-populated location fields (read-only) */}
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.label}>
              State <span className={styles.requiredIndicator}>*</span>
            </label>
            <input
              type="text"
              value={watchedState}
              readOnly
              placeholder="Auto-filled from address"
              className={`${styles.input} ${styles.inputLarge} ${styles.inputReadOnly}`}
              tabIndex={-1}
            />
            <input
              type="hidden"
              {...register('state', { required: 'State is required' })}
            />
            {shouldShowError('state') && getErrorMessage('state') && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{getErrorMessage('state')?.message}</span>
              </div>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>
              City <span className={styles.requiredIndicator}>*</span>
            </label>
            <input
              type="text"
              value={watchedCity}
              readOnly
              placeholder="Auto-filled from address"
              className={`${styles.input} ${styles.inputLarge} ${styles.inputReadOnly}`}
              tabIndex={-1}
            />
            <input
              type="hidden"
              {...register('city', { required: 'City is required' })}
            />
            {shouldShowError('city') && getErrorMessage('city') && (
              <div className={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{getErrorMessage('city')?.message}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>
            ZIP Code <span className={styles.requiredIndicator}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter ZIP code"
            className={`${styles.input} ${styles.inputLarge}`}
            {...register('zip_code', { required: 'ZIP code is required' })}
          />
          {shouldShowError('zip_code') && getErrorMessage('zip_code') && (
            <div className={styles.errorMessage}>
              <AlertCircle size={16} />
              <span>{getErrorMessage('zip_code')?.message}</span>
            </div>
          )}
        </div>

        {/* Hidden fields */}
        <input type="hidden" {...register('timezone')} />
        <input type="hidden" {...register('subscription_plan_id')} />
      </div>

      {/* Admin Information */}
      <div
        className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.6s' }}
      >
        <div className={styles.sectionCardHeader}>
          <div className={styles.sectionNumber}>3</div>
          <div className={styles.sectionHeaderContent}>
            <UserCog size={24} className={styles.sectionIcon} />
            <h2 className={styles.sectionTitle}>Admin Account</h2>
          </div>
        </div>

        <TextInput
          label="Email Address"
          type="email"
          required
          placeholder="admin@abctherapy.com"
          registration={register('email', {
            required: 'Email is required',
            validate: (value) => isEmail(value) || 'Invalid email address',
            maxLength: { value: 100, message: 'Maximum 100 characters' },
          })}
          error={
            shouldShowError('email') ? getErrorMessage('email') : undefined
          }
          helpText="This email has been verified"
          disabled
        />

        <div className={styles.formGrid}>
          <TextInput
            label="First Name"
            required
            placeholder="John"
            registration={register('first_name', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
              maxLength: { value: 100, message: 'Maximum 100 characters' },
            })}
            error={
              shouldShowError('first_name')
                ? getErrorMessage('first_name')
                : undefined
            }
          />

          <TextInput
            label="Last Name"
            required
            placeholder="Doe"
            registration={register('last_name', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
              maxLength: { value: 100, message: 'Maximum 100 characters' },
            })}
            error={
              shouldShowError('last_name')
                ? getErrorMessage('last_name')
                : undefined
            }
          />
        </div>

        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone number is required',
            validate: (phone) =>
              isMobilePhone(phone, 'en-US', { strictMode: false }) ||
              'Invalid phone number',
          }}
          render={({ field }) => (
            <PhoneInput
              label="Phone Number"
              required
              placeholder="(555) 123-4567"
              name="phone"
              value={field.value}
              onChange={field.onChange}
              error={
                shouldShowError('phone') ? getErrorMessage('phone') : undefined
              }
              helpText="10-digit US phone number"
            />
          )}
        />
      </div>

      {/* Form Actions */}
      <div className={styles.buttonGroup}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonSecondary}`}
            disabled={isSubmitting}
          >
            <ChevronLeft
              size={20}
              style={{ transition: 'transform 0.2s ease' }}
            />
            Back
          </button>
        )}
        {!onBack && <div />}
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={styles.loadingSpinner} /> Processing...
            </>
          ) : (
            <>
              Continue to Review
              <ChevronRight
                size={20}
                style={{ transition: 'transform 0.2s ease' }}
              />
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        button:not(:disabled):hover svg {
          transform: translateX(4px);
        }
        button:not(:disabled):hover svg:first-child {
          transform: translateX(-4px);
        }
      `}</style>
    </form>
  );
}

export default Step3ClinicDetailsComponent;
