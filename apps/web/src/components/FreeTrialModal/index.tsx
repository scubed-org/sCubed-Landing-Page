'use client';

import { InputMask, unformat } from '@react-input/mask';
import { AlertCircle, Check, Loader2, Lock, Rocket, X } from 'lucide-react';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

import { POSTAL_CODE_RULES, REQUIRED_FIELDS } from './constants';
import {
  CountryOption,
  FreeTrialInputs,
  StateOption,
  getSelectedStateTimezone,
  isIosDevice,
  processApiErrors,
} from './helpers';
import {
  actionButtons,
  cancelButton,
  checkboxInput,
  closeButton,
  consentCheckbox,
  consentLabel,
  consentSection,
  errorBanner,
  errorMessage,
  fieldWrapper,
  formGrid,
  formGroup,
  formGroupFull,
  formWrapper,
  inputError,
  inputStyle,
  inputValid,
  labelStyle,
  loadingSpinner,
  locationRow,
  modalContainer,
  modalContent,
  modalHeader,
  modalOverlay,
  modalSubtitle,
  modalTitle,
  privacyIcon,
  privacyNote,
  progressBar,
  progressBarFill,
  requiredIndicator,
  selectStyle,
  submitButton,
} from './styles.css';
import SuccessModal from './SuccessModal';
import { formatNPI, formatPostalCode, formatTaxId, phoneTrack } from './utils';

import InfiniteSelectDropdown from '@/components/InfiniteSelectDropdown';
import ReCaptcha, { ReCaptchaRef } from '@/components/ReCaptcha';
import { COUNTRY_ID, DEFAULT_COUNTRY_ID } from '@/constants/countries';
import { usePaginatedCities } from '@/hooks/usePaginatedCities';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const FreeTrialModal: FC<Props> = ({ isOpen, onClose }) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [states, setStates] = useState<StateOption[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [submitResponse, setSubmitResponse] = useState<{
    success?: boolean;
    message?: string;
  }>();
  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [pendingFormData, setPendingFormData] =
    useState<FreeTrialInputs | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const previousCountryRef = useRef<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
    setValue,
  } = useForm<FreeTrialInputs>({
    mode: 'onBlur',
    shouldFocusError: false,
  });

  const selectedCountry = watch('country');
  const selectedState = watch('state');
  const selectedCountryId = Number(selectedCountry) || DEFAULT_COUNTRY_ID;
  const postalRules =
    POSTAL_CODE_RULES[selectedCountryId] ?? POSTAL_CODE_RULES[COUNTRY_ID.US];

  // Use paginated cities hook for infinite scroll
  const { cities, loading: loadingCities, loadingMore, hasMore, loadMore } =
    usePaginatedCities({ stateId: selectedState || '' });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      fetchCountries();
    }
  }, [isOpen]);

  // Load states for the selected country. The API defaults to the US when
  // country_id is omitted, so this also covers the pre-selection render.
  useEffect(() => {
    if (isOpen && selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [isOpen, selectedCountry]);

  // Clear the dependent location fields when the country actually changes,
  // otherwise the form could hold an Ontario state id under a US selection.
  useEffect(() => {
    const previousCountry = previousCountryRef.current;
    previousCountryRef.current = selectedCountry || '';

    if (!previousCountry || !selectedCountry) return;
    if (previousCountry === selectedCountry) return;

    setStates([]);
    setValue('state', '');
    setValue('city', '');
    setValue('zipCode', '');
  }, [selectedCountry, setValue]);

  // Clear city when state changes
  useEffect(() => {
    if (!selectedState) {
      setValue('city', '');
    }
  }, [selectedState, setValue]);

  const fetchCountries = async () => {
    setLoadingCountries(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}countries`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }

      const result = await response.json();

      // Tolerate both the paginated envelope used by /states and a bare array.
      const rows = Array.isArray(result.data?.rows)
        ? result.data.rows
        : Array.isArray(result.data)
          ? result.data
          : null;

      if (!rows) {
        throw new Error('Invalid response format');
      }

      setCountries(rows);
    } catch (error) {
      // The countries endpoint is newer than this form. If it is unavailable the
      // form still works against the API's US default rather than dead-ending.
      console.error('Error fetching countries:', error);
      setCountries([]);
    } finally {
      setLoadingCountries(false);
      setValue('country', String(DEFAULT_COUNTRY_ID));
    }
  };

  const fetchStates = async (countryId: string) => {
    setLoadingStates(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_APP_API_URL}states?country_id=${encodeURIComponent(countryId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch states');
      }

      const result = await response.json();

      if (result.status_code === 200 && result.data?.rows) {
        setStates(result.data.rows);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    } finally {
      setLoadingStates(false);
    }
  };


  const submitToAPI = async (data: FreeTrialInputs, token: string) => {
    try {
      const response = await fetch('/api/free-trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clinic_name: data.clinicName,
          tax_id: data.taxId,
          npi: data.npi,
          address_line_1: data.addressLine1,
          state_id: data.state,
          city_id: data.city,
          zip_code: data.zipCode,
          full_name: data.fullName,
          email: data.email,
          phone_number: data.phoneNumber,
          consent_to_contact: data.consentToContact,
          recaptcha_token: token,
        }),
      });

      if (response.ok) {
        setSubmitResponse({
          success: true,
          message: 'Welcome to S Cubed! Your trial has started.',
        });
      } else {
        const errorData = await response.json();
        if (response.status === 422 && errorData.errors) {
          const { fieldErrors, displayMessage } = processApiErrors(
            errorData.errors,
          );
          setApiErrors(fieldErrors);
          setSubmitResponse({
            success: false,
            message: displayMessage,
          });
        } else {
          setSubmitResponse({
            success: false,
            message:
              errorData.message || 'An error occurred. Please try again.',
          });
        }
      }
    } catch (error) {
      setSubmitResponse({
        success: false,
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setSubmitting(false);
      setPendingFormData(null);
    }
  };

  const handleClose = () => {
    reset();
    setSubmitResponse({});
    setApiErrors({});
    setRecaptchaError(null);
    setPendingFormData(null);
    recaptchaRef.current?.reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FreeTrialInputs> = async (data) => {
    setSubmitResponse({});
    setApiErrors({});
    setRecaptchaError(null);
    setSubmitting(true);
    setPendingFormData(data);
    recaptchaRef.current?.execute();
  };

  const handleRecaptchaVerify = useCallback(
    (token: string | null) => {
      if (token && pendingFormData) {
        submitToAPI(pendingFormData, token);
      } else if (!token) {
        setRecaptchaError('reCAPTCHA verification failed. Please try again.');
        setSubmitting(false);
        setPendingFormData(null);
      }
    },
    [pendingFormData],
  );

  const handleRecaptchaError = () => {
    setRecaptchaError('reCAPTCHA error. Please try again.');
    setSubmitting(false);
    setPendingFormData(null);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaError('reCAPTCHA expired. Please try again.');
    setSubmitting(false);
    setPendingFormData(null);
  };

  const getProgressPercentage = () => {
    const filledRequiredFields = REQUIRED_FIELDS.filter((field) => {
      const value = watch(field);
      return value && value.toString().trim() !== '' && !errors[field];
    }).length;

    return (filledRequiredFields / REQUIRED_FIELDS.length) * 100;
  };

  const isFormValid = () => {
    const allFieldsFilled = REQUIRED_FIELDS.every((field) => {
      const value = watch(field);
      return value && value.toString().trim() !== '';
    });

    const consentChecked = watch('consentToContact');
    return allFieldsFilled && consentChecked;
  };

  const isFieldValid = (fieldName: keyof FreeTrialInputs) => {
    return (
      touchedFields[fieldName] && !errors[fieldName] && !apiErrors[fieldName]
    );
  };

  const getInputClassName = (fieldName: keyof FreeTrialInputs) => {
    if (errors[fieldName] || apiErrors[fieldName])
      return `${inputStyle} ${inputError}`;
    if (isFieldValid(fieldName)) return `${inputStyle} ${inputValid}`;
    return inputStyle;
  };

  const getSelectClassName = (fieldName: keyof FreeTrialInputs) => {
    if (errors[fieldName] || apiErrors[fieldName])
      return `${selectStyle} ${inputError}`;
    if (isFieldValid(fieldName)) return `${selectStyle} ${inputValid}`;
    return selectStyle;
  };

  const shouldShowError = (fieldName: keyof FreeTrialInputs) => {
    const fieldError = errors[fieldName];
    if (fieldError && fieldError.type === 'required') return false;
    return !!fieldError;
  };

  if (submitResponse?.success) {
    const timezoneDisplay = getSelectedStateTimezone(
      selectedState,
      states,
    ).replace(/_/g, ' ');

    return (
      <SuccessModal
        onClose={handleClose}
        clinicName={watch('clinicName')}
        trialEndDate={new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000,
        ).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
        timezone={timezoneDisplay}
      />
    );
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => {}}
      center={true}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      blockScroll={!isIosDevice()}
      classNames={{
        modal: modalContent,
        overlay: modalOverlay,
      }}
      styles={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999999,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        },
        modal: {
          position: 'relative',
          maxWidth: '90vw',
          height: 'auto',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        },
      }}
      showCloseIcon={false}
    >
      <div className={modalContainer}>
        <button
          type="button"
          onClick={handleClose}
          className={closeButton}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className={modalHeader}>
          <h2 className={modalTitle}>Start Your 30-Day Free Trial</h2>
          <p className={modalSubtitle}>
            Complete this quick form to activate your free trial
          </p>
          <div className={progressBar}>
            <div
              className={progressBarFill}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        <form
          className={formWrapper}
          onSubmit={handleSubmit(onSubmit)}
          id="freeTrialForm"
        >
          {/* Error Banner */}
          {submitResponse?.message && !submitResponse.success && (
            <div className={errorBanner}>
              <AlertCircle size={20} />
              <span>{submitResponse.message}</span>
            </div>
          )}

          {/* Clinic Details Section */}
          <div className={formGrid}>
            <div className={formGroupFull}>
              <label className={labelStyle}>
                Clinic Name<span className={requiredIndicator}>*</span>
              </label>
              <div className={fieldWrapper}>
                <input
                  type="text"
                  className={getInputClassName('clinicName')}
                  placeholder="Enter clinic name"
                  {...register('clinicName', {
                    required: true,
                    minLength: { value: 2, message: 'Min 2 characters' },
                    maxLength: { value: 100, message: 'Max 100 characters' },
                  })}
                />
                {isFieldValid('clinicName') && (
                  <Check
                    size={16}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '10px',
                      color: '#10b981',
                    }}
                  />
                )}
              </div>
              {shouldShowError('clinicName') && (
                <span className={errorMessage}>
                  {errors.clinicName?.message}
                </span>
              )}
            </div>

            <div className={formGroup}>
              <label className={labelStyle}>
                Tax ID<span className={requiredIndicator}>*</span>
              </label>
              <input
                type="text"
                className={getInputClassName('taxId')}
                placeholder="XX-XXXXXXX"
                {...register('taxId', {
                  required: true,
                  pattern: {
                    value: /^\d{2}-\d{7}$/,
                    message: 'Format: XX-XXXXXXX',
                  },
                  onChange: (e) => {
                    const formatted = formatTaxId(e.target.value);
                    setValue('taxId', formatted);
                    return formatted;
                  },
                })}
              />
              {shouldShowError('taxId') && (
                <span className={errorMessage}>{errors.taxId?.message}</span>
              )}
            </div>

            <div className={formGroup}>
              <label className={labelStyle}>
                NPI<span className={requiredIndicator}>*</span>
              </label>
              <input
                type="text"
                className={getInputClassName('npi')}
                placeholder="10 digits"
                {...register('npi', {
                  required: true,
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Must be 10 digits',
                  },
                  onChange: (e) => {
                    const formatted = formatNPI(e.target.value);
                    setValue('npi', formatted);
                    return formatted;
                  },
                })}
              />
              {shouldShowError('npi') && (
                <span className={errorMessage}>{errors.npi?.message}</span>
              )}
            </div>

            <div className={formGroupFull}>
              <label className={labelStyle}>
                Address Line 1<span className={requiredIndicator}>*</span>
              </label>
              <input
                type="text"
                className={getInputClassName('addressLine1')}
                placeholder="Street address"
                {...register('addressLine1', {
                  required: true,
                  minLength: { value: 5, message: 'Min 5 characters' },
                })}
              />
              {errors.addressLine1 && (
                <span className={errorMessage}>
                  {errors.addressLine1?.message}
                </span>
              )}
            </div>

            {/* Hidden when the countries endpoint is unavailable, so the form
                degrades to the API's US default instead of showing an empty picker. */}
            {(loadingCountries || countries.length > 0) && (
              <div className={formGroupFull}>
                <label className={labelStyle}>
                  Country<span className={requiredIndicator}>*</span>
                </label>
                <InfiniteSelectDropdown
                  options={countries.map((country) => ({
                    id: country.id.toString(),
                    name: country.name,
                  }))}
                  value={selectedCountry || ''}
                  onChange={(val) =>
                    setValue('country', val, { shouldValidate: true })
                  }
                  placeholder={loadingCountries ? 'Loading...' : 'Select Country'}
                  disabled={loadingCountries}
                  searchable={false}
                  size="compact"
                  error={!!errors.country || !!apiErrors.country}
                />
                {errors.country && (
                  <span className={errorMessage}>
                    {errors.country?.message}
                  </span>
                )}
              </div>
            )}

            {/* Registered unconditionally so the value survives a hidden picker */}
            <input type="hidden" {...register('country')} />

            <div className={locationRow}>
              <div className={fieldWrapper}>
                <label className={labelStyle}>
                  State<span className={requiredIndicator}>*</span>
                </label>
                <InfiniteSelectDropdown
                  options={states.map((state) => ({
                    id: state.id.toString(),
                    name: `${state.name} (${state.code})`,
                  }))}
                  value={selectedState || ''}
                  onChange={(val) =>
                    setValue('state', val, { shouldValidate: true })
                  }
                  placeholder={loadingStates ? 'Loading...' : 'Select State'}
                  disabled={loadingStates}
                  searchable={false}
                  size="compact"
                  error={!!errors.state || !!apiErrors.state}
                />
                <input
                  type="hidden"
                  {...register('state', { required: true })}
                />
                {errors.state && (
                  <span className={errorMessage}>{errors.state?.message}</span>
                )}
              </div>

              <div className={fieldWrapper}>
                <label className={labelStyle}>
                  City<span className={requiredIndicator}>*</span>
                </label>
                <InfiniteSelectDropdown
                  options={cities.map((city) => ({
                    id: city.id.toString(),
                    name: city.name,
                  }))}
                  value={watch('city') || ''}
                  onChange={(val) =>
                    setValue('city', val, { shouldValidate: true })
                  }
                  placeholder={
                    !selectedState
                      ? 'Select a state first'
                      : loadingCities
                        ? 'Loading...'
                        : 'Select City'
                  }
                  disabled={!selectedState || loadingCities}
                  loading={loadingMore}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                  searchable={false}
                  size="compact"
                  error={!!errors.city || !!apiErrors.city}
                />
                <input
                  type="hidden"
                  {...register('city', { required: true })}
                />
                {errors.city && (
                  <span className={errorMessage}>{errors.city?.message}</span>
                )}
              </div>

              <div className={fieldWrapper}>
                <label className={labelStyle}>
                  {postalRules.label}
                  <span className={requiredIndicator}>*</span>
                </label>
                <input
                  type="text"
                  className={getInputClassName('zipCode')}
                  placeholder={postalRules.placeholder}
                  maxLength={postalRules.maxLength}
                  {...register('zipCode', {
                    required: true,
                    pattern: {
                      value: postalRules.pattern,
                      message: 'Invalid',
                    },
                    onChange: (e) => {
                      const formatted = formatPostalCode(
                        e.target.value,
                        selectedCountryId,
                      );
                      setValue('zipCode', formatted);
                      return formatted;
                    },
                  })}
                />
                {errors.zipCode && (
                  <span className={errorMessage}>
                    {errors.zipCode?.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className={formGrid}>
            <div className={formGroupFull}>
              <label className={labelStyle}>
                Full Name<span className={requiredIndicator}>*</span>
              </label>
              <input
                type="text"
                className={getInputClassName('fullName')}
                placeholder="First and Last Name"
                {...register('fullName', {
                  required: true,
                  minLength: { value: 2, message: 'Min 2 characters' },
                  validate: (value) => {
                    const nameParts = value.trim().split(/\s+/);
                    if (nameParts.length < 2) {
                      return 'Please enter your full name (first and last name)';
                    }
                    return true;
                  },
                })}
              />
              {errors.fullName && (
                <span className={errorMessage}>{errors.fullName?.message}</span>
              )}
            </div>

            <div className={formGroup}>
              <label className={labelStyle}>
                Email Address<span className={requiredIndicator}>*</span>
              </label>
              <input
                type="email"
                className={getInputClassName('email')}
                placeholder="email@example.com"
                {...register('email', {
                  required: true,
                  validate: (value) => isEmail(value) || 'Invalid email',
                })}
              />
              {errors.email && (
                <span className={errorMessage}>{errors.email?.message}</span>
              )}
            </div>

            <div className={formGroup}>
              <label className={labelStyle}>
                Phone Number<span className={requiredIndicator}>*</span>
              </label>
              <InputMask
                type="text"
                track={phoneTrack}
                mask="+_ (___) ___-____"
                replacement={{ _: /\d/ }}
                className={getInputClassName('phoneNumber')}
                placeholder="(XXX) XXX-XXXX"
                {...register('phoneNumber', {
                  required: true,
                  validate: (phone) =>
                    isMobilePhone(phone, 'en-US', { strictMode: false }) ||
                    'Invalid phone',
                  setValueAs: (value: string) =>
                    unformat(value, {
                      mask: '+1 (___) ___-____',
                      replacement: { _: /\d/ },
                    }),
                })}
              />
              {errors.phoneNumber && (
                <span className={errorMessage}>
                  {errors.phoneNumber?.message}
                </span>
              )}
            </div>
          </div>

          <div className={consentSection}>
            <div className={consentCheckbox}>
              <input
                type="checkbox"
                className={checkboxInput}
                id="consentCheckbox"
                {...register('consentToContact', {
                  required: 'You must agree to be contacted to proceed',
                })}
              />
              <label htmlFor="consentCheckbox" className={consentLabel}>
                I hereby declare that S Cubed can contact me regarding my trial
                and related services.
                {errors.consentToContact && (
                  <span
                    className={errorMessage}
                    style={{ display: 'block', marginTop: '4px' }}
                  >
                    {errors.consentToContact.message}
                  </span>
                )}
              </label>
            </div>

            <div className={privacyNote}>
              <Lock size={14} className={privacyIcon} />
              <span>
                S Cubed assures you that your information will remain private
                and will not be shared with anyone.
              </span>
            </div>
          </div>
        </form>

        {/* Invisible reCAPTCHA */}
        <ReCaptcha
          ref={recaptchaRef}
          size="invisible"
          siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3}
          onVerify={handleRecaptchaVerify}
          onError={handleRecaptchaError}
          onExpired={handleRecaptchaExpired}
          error={recaptchaError}
        />

        <div className={actionButtons}>
          <button
            type="button"
            onClick={handleClose}
            className={cancelButton}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="freeTrialForm"
            className={submitButton}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className={loadingSpinner} />
                Creating Account...
              </>
            ) : (
              <>
                <Rocket size={18} />
                Start Free Trial
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FreeTrialModal;
