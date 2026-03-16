'use client';

import { InputMask } from '@react-input/mask';
import {
  AlertCircle,
  CheckCircle,
  Globe,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';


import { colors } from '../../styles/tokens.css';
import CalendlyButton from '../billing/CalendlyButton';
import { primaryButton } from '../billing/CalendlyButton/styles.css';
import ReCaptcha, { ReCaptchaRef } from '../ReCaptcha';
import ResumeDialog from '../ResumeDialog';
import Testimonials from '../Testimonials';

import {
  backgroundContainer,
  backgroundDecorative,
  bottomHelperText,
  cardContainer,
  cardContent,
  cardHeader,
  checkboxInput,
  checkboxLabel,
  checkboxRow,
  checkboxSection,
  contactCard,
  contactCardContent,
  contactCardHeader,
  contactItem,
  contactSection,
  cardHeaderInner,
  errorMessage,
  formContainer,
  formGroup,
  formTitle,
  gridContainer,
  iconContainerLarge,
  iconContainerPrimary,
  headerHelperText,
  stepperContainer,
  stepItem,
  stepCircle,
  stepCircleActive,
  stepLabel,
  stepLabelActive,
  stepConnector,
  stepConnectorActive,
  stepNumberText,
  infoBox,
  infoBoxText,
  inputStyle,
  labelStyle,
  leftPanel,
  loadingSpinner,
  mainContainer,
  pageWrapper,
  requiredMark,
  rightPanel,
  actionsRow,
  secondaryButton,
  submitContainer,
  submitButton,
  successMessage,
  successText,
  successTitle,
  textareaStyle,
  titleGradient,
  twoColumnGrid,
  oneColumnGrid,
  successWrapper,
  stateAutocompleteWrapper
} from './styles.css';

import { useResumeForm } from '@/hooks/useResumeForm';
import { saveSession, clearSession } from '@/utils/contactFormStorage';
import { showSuccessToast } from '@/lib/errors';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';
import { STATE_PLACE_TYPES } from '@/constants/places';
import type { AddressComponents } from '@/components/AddressAutocomplete/types';
import { SUCCESS_MESSAGES } from '@/constants/messages';

interface FormData {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  state: string;
  state_code: string;
  comments: string;
}

// Max length constants based on backend DTO
const MAX_LENGTHS = {
  name: 255,
  companyName: 255,
  state: 255,
  softwareName: 255,
  comments: 1000,
};

interface ApiError {
  field?: string;
  message: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
  status_code: number;
}

interface StepSuccessResponse {
  form_session_id: string;
  current_step: number;
  next_step: number | null;
  completion_status: 'incomplete' | 'completed';
}


const GetStartedForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiFieldErrors, setApiFieldErrors] = useState<Record<string, string>>(
    {},
  );
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formSessionId, setFormSessionId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
    setValue,
  } = useForm<FormData>();

  // Handle address selection from Google Places - auto-populate state
  const handleAddressSelect = useCallback(
    (address: AddressComponents) => {
      setValue('state', address.state);
      setValue('state_code', address.stateCode);
      if (address.state) {
        trigger('state');
      }
    },
    [setValue, trigger],
  );

  // Resume form functionality
  const {
    showDialog: showResumeDialog,
    isLoading: isResumeLoading,
    error: resumeError,
    resumeData,
    currentStep: resumeStep,
    sessionId: resumeSessionId,
    handleContinue: handleResumeContinue,
    handleStartNew: handleResumeStartNew,
    closeDialog: closeResumeDialog,
  } = useResumeForm();
  const stepLabels = ['Email', 'Contact', 'Details'] as const;
  const stepFields: Record<1 | 2 | 3, (keyof FormData)[]> = {
    1: ['email'],
    2: ['name', 'phoneNumber'],
    3: ['state'],
  };
  const goNext = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const isValid = await trigger(fieldsToValidate as (keyof FormData)[], {
      shouldFocus: true,
    });

    if (isValid && currentStep < 3) {
      // Get current form values
      const formData = getValues();

      // Submit current step to API
      const success = await submitStep(currentStep, formData);

      if (success) {
        // Move to next step only if API call succeeded
        setCurrentStep((s) => (s + 1) as 1 | 2 | 3);
      }
    }
  };
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => (s - 1) as 1 | 2 | 3);
    }
  };

  // Handle resume data pre-filling
  useEffect(() => {
    if (resumeData) {
      // Pre-fill form with resumed data
      if (resumeData.email_id) {
        setValue('email', resumeData.email_id);
      }
      if (resumeData.first_name) {
        const fullName = resumeData.last_name
          ? `${resumeData.first_name} ${resumeData.last_name}`
          : resumeData.first_name;
        setValue('name', fullName);
      }
      if (resumeData.phone_number) {
        setValue('phoneNumber', resumeData.phone_number);
      }
      if (resumeData.company_name) {
        setValue('companyName', resumeData.company_name);
      }
      if (resumeData.state) {
        setValue('state', resumeData.state);
      }
      if (resumeData.state_code) {
        setValue('state_code', resumeData.state_code);
      }
      if (resumeData.comments) {
        setValue('comments', resumeData.comments);
      }
    }
  }, [resumeData, setValue]);

  // Handle resume step and session updates
  useEffect(() => {
    if (resumeSessionId) {
      setFormSessionId(resumeSessionId);
    }
    if (resumeStep && resumeStep >= 1 && resumeStep <= 3) {
      setCurrentStep(resumeStep as 1 | 2 | 3);
    }
  }, [resumeSessionId, resumeStep]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // reCAPTCHA handlers
  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setRecaptchaError(null);
    // Clear API field errors for recaptcha when user completes it
    if (token && apiFieldErrors.recaptcha) {
      const { recaptcha, ...otherErrors } = apiFieldErrors;
      setApiFieldErrors(otherErrors);
    }
  };

  const handleRecaptchaError = () => {
    setRecaptchaError('reCAPTCHA error occurred. Please try again.');
    setRecaptchaToken(null);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaError('reCAPTCHA has expired. Please verify again.');
    setRecaptchaToken(null);
  };

  const splitFullName = (fullName: string): { first: string; last: string } => {
    const parts = (fullName || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { first: '', last: '' };
    if (parts.length === 1) return { first: parts[0], last: '' };
    const first = parts[0];
    const last = parts.slice(1).join(' ');
    return { first, last };
  };

  // Submit step data to API
  const submitStep = async (step: 1 | 2 | 3, formData: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitError(null);
    setApiFieldErrors({});

    try {
      let requestBody: any = {
        step,
      };

      // Add form_session_id for steps 2 and 3
      if (step > 1) {
        // Try to get session ID from state first, then localStorage as fallback
        const sessionId = formSessionId || localStorage.getItem('contactFormSession');

        if (!sessionId) {
          setSubmitError('Session expired. Please start again from step 1.');
          setCurrentStep(1);
          setIsSubmitting(false);
          return false;
        }

        requestBody.form_session_id = sessionId;

        // Update state if it was retrieved from localStorage
        if (!formSessionId && sessionId) {
          setFormSessionId(sessionId);
        }
      }

      // Step 1: Email
      if (step === 1) {
        requestBody.email_id = formData.email;
      }

      // Step 2: Name and Phone
      if (step === 2) {
        const { first, last } = splitFullName(formData.name);
        requestBody.first_name = first;
        if (last) requestBody.last_name = last;
        if (formData.phoneNumber) requestBody.phone_number = formData.phoneNumber;
      }

      // Step 3: Company, State, Comments + reCAPTCHA
      if (step === 3) {
        if (formData.companyName) requestBody.company_name = formData.companyName;
        if (formData.state) requestBody.state = formData.state;
        if (formData.state_code) requestBody.state_code = formData.state_code;
        if (formData.comments) requestBody.comments = formData.comments;

        // Check if reCAPTCHA is completed for step 3
        if (!recaptchaToken) {
          setRecaptchaError('Please complete the reCAPTCHA verification');
          setIsSubmitting(false);
          return false;
        }
        requestBody.recaptcha_token = recaptchaToken;
      }

      const apiUrl = '/api/contact';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result: StepSuccessResponse = await response.json();

        // Save session ID from step 1 response
        if (step === 1) {
          if (result.form_session_id) {
            setFormSessionId(result.form_session_id);
            saveSession(result.form_session_id, 1);
          } else {
            setSubmitError('Server error: Missing session ID. Please try again.');
            setIsSubmitting(false);
            return false;
          }
        }

        // Update localStorage for steps 2 and 3
        if (step > 1 && formSessionId) {
          saveSession(formSessionId, step);
        }

        // If step 3 is completed, clear localStorage and show success
        if (step === 3 && result.completion_status === 'completed') {
          clearSession();
          setFormSessionId(null);
          setSubmitSuccess(true);
          setRecaptchaToken(null);
          setRecaptchaError(null);
          recaptchaRef.current?.reset();
          reset();
          showSuccessToast(SUCCESS_MESSAGES.CONTACT_SUBMITTED);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        setIsSubmitting(false);
        return true;
      } else {
        const errorData: ApiErrorResponse = await response.json().catch(() => ({
          errors: [],
          status_code: response.status,
        }));

        // Handle specific error codes
        if (errorData.status_code === 404) {
          // Session not found - clear localStorage and restart
          clearSession();
          setFormSessionId(null);
          setCurrentStep(1);
          setSubmitError('Session expired. Please start again.');
        } else if (errorData.status_code === 409) {
          // Form already completed
          setSubmitError('This form has already been completed.');
        } else if (errorData.errors && errorData.errors.length > 0) {
          // Map backend field names to form field names
          const fieldMap: Record<string, string> = {
            email_id: 'email',
            first_name: 'name',
            last_name: 'name',
            phone_number: 'phoneNumber',
            company_name: 'companyName',
            state: 'state',
            comments: 'comments',
          };

          // Handle field-specific errors
          const fieldErrors: Record<string, string> = {};
          let hasFieldErrors = false;

          errorData.errors.forEach((error) => {
            if (error.field) {
              const formFieldName = fieldMap[error.field] || error.field;
              fieldErrors[formFieldName] = error.message;
              hasFieldErrors = true;
            }
          });

          if (hasFieldErrors) {
            setApiFieldErrors(fieldErrors);
            setSubmitError('Please correct the errors below and try again.');
          } else {
            // No field-specific errors, show general message
            setSubmitError(errorData.errors[0].message);
          }
        } else {
          setSubmitError('Something went wrong. Please try again.');
        }

        setIsSubmitting(false);
        return false;
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again later.',
      );
      setIsSubmitting(false);
      return false;
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Only submit on step 3 (final step)
    if (currentStep === 3) {
      await submitStep(3, data);
    }
  };

  const renderFieldError = (error: any, fieldName: string) => {
    // Check for form validation errors first
    if (error) {
      return (
        <div className={errorMessage}>
          <AlertCircle size={16} />
          {error.message}
        </div>
      );
    }

    // Check for API field errors
    if (apiFieldErrors[fieldName]) {
      return (
        <div className={errorMessage}>
          <AlertCircle size={16} />
          {apiFieldErrors[fieldName]}
        </div>
      );
    }

    return null;
  };

  if (submitSuccess) {
    return (
      
        <div className={backgroundContainer}>
          <div className={successWrapper}>
          <div className={backgroundDecorative} />
          <div className={successMessage}>
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#d1fae5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
              }}
            >
              <CheckCircle
                style={{ width: '32px', height: '32px', color: '#059669' }}
              />
            </div>
            <h2 className={successTitle}>🎉 Thank You!</h2>
            <p className={successText}>
              We&apos;ve received your information and our team will be in touch
              within 24 hours to discuss how we can help transform your
              practice.
            </p>
            <button
              className={submitButton}
              onClick={() => {
                setSubmitSuccess(false);
                setSubmitError(null);
                setApiFieldErrors({});
                setCurrentStep(1);
                setFormSessionId(null);
                clearSession();
              }}
              style={{ maxWidth: '300px', margin: '0 auto' }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
      {/* Resume Dialog */}
      <ResumeDialog
        open={showResumeDialog}
        currentStep={resumeStep}
        isLoading={isResumeLoading}
        error={resumeError}
        onContinue={handleResumeContinue}
        onStartNew={handleResumeStartNew}
        onClose={closeResumeDialog}
      />

      <div className={backgroundContainer}>
        <div className={backgroundDecorative} />
        <div className={mainContainer}>
          <div className={gridContainer}>
            {/* Left Panel - Contact Info & Branding */}
            <div className={leftPanel}>
              <div className={contactSection}>
                <h1 className={formTitle}>
                  <span
                    style={{
                      color: '#111827',
                      background: 'none',
                      WebkitTextFillColor: 'initial',
                    }}
                  >
                    Get Started with{' '}
                  </span>
                  <span className={titleGradient}>S Cubed</span>
                </h1>
                <p
                  style={{
                    fontSize: '1rem',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    maxWidth: '28rem',
                    marginBottom: '1rem',
                  }}
                >
                  Transform your practice with our specialized ABA Practice &
                  Clinical Management Solution. We&apos;re here to help you
                  succeed, let&apos;s start the conversation.
                </p>
                <div className={infoBox}>
                  <p className={infoBoxText}>
                    ✨ <strong>What to expect:</strong> Our specialists will
                    provide a personalized consultation to understand your
                    unique needs and show you exactly how S Cubed can streamline
                    your practice.
                  </p>
                </div>
              </div>

              <div className={contactCard}>
                <div className={contactCardHeader}>Reach Out to Us</div>
                <div className={contactCardContent}>
                  <a
                    href="tel:2544344959"
                    className={contactItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        minWidth: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <Phone
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                        }}
                      >
                        Phone:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                        }}
                      >
                        (254) 434-4959
                      </span>
                    </div>
                  </a>
                  <a
                    href="mailto:info@scubed.io"
                    className={contactItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        minWidth: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <Mail
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                        }}
                      >
                        Email:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                        }}
                      >
                        info@scubed.io
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://scubed.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactItem}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        minWidth: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <Globe
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                        }}
                      >
                        Website:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                        }}
                        title="https://scubed.io"
                      >
                        https://scubed.io
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/spectrum-solutions-software/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactItem}
                    style={{ textDecoration: 'none', overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        minWidth: '2.5rem',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s ease',
                        flexShrink: 0,
                      }}
                    >
                      <Linkedin
                        style={{
                          width: '1.125rem',
                          height: '1.125rem',
                          color: '#1f2937',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        overflow: 'hidden',
                        minWidth: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          color: '#6b7280',
                          fontWeight: '600',
                          flexShrink: 0,
                        }}
                      >
                        LinkedIn:
                      </span>
                      <span
                        style={{
                          fontWeight: '500',
                          color: '#1f2937',
                          fontSize: '1rem',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                        title="www.linkedin.com/company/spectrum-solutions-software"
                      >
                        www.linkedin.com/company/spectrum-solutions-software
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <CalendlyButton
                buttonText="Contact Our Specialist →"
                className={primaryButton}
              />
            </div>

            {/* Right Panel - Contact Form */}
            <div className={rightPanel}>
              <div className={cardContainer}>
                {/* Card Header */}
                <div className={cardHeader}>
                  <div className={cardHeaderInner}>
                    <h2
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: colors.primary[700],
                        margin: 0,
                      }}
                    >
                      Start for Free
                    </h2>
                    <div className={`${iconContainerLarge} ${iconContainerPrimary}`}>
                      <Mail />
                    </div>
                    <span className={headerHelperText}>
                    Your free 30-day trial awaits, no credit card required
                    </span>
                  </div>
                </div>

                <div className={cardContent}>
                {/* Stepper */}
                <div className={stepperContainer}>
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div className={stepItem}>
                        <div
                          className={`${stepCircle} ${
                            step <= currentStep ? stepCircleActive : ''
                          }`}
                        >
                          <span className={stepNumberText}>{step}</span>
                        </div>
                        <span
                          className={`${stepLabel} ${
                            step === currentStep ? stepLabelActive : ''
                          }`}
                        >
                          {stepLabels[step - 1]}
                        </span>
                      </div>
                      {step < 3 && (
                        <div
                          className={`${stepConnector} ${
                            step < currentStep ? stepConnectorActive : ''
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={formContainer}
                    noValidate
                  >
                  {/* Step 1: Email */}
                  {currentStep === 1 && (
                    <div className={oneColumnGrid}>
                      <div className={formGroup}>
                        <label className={labelStyle}>
                          Email Address <span className={requiredMark}>*</span>
                        </label>
                        <input
                          type="email"
                          className={inputStyle}
                          placeholder="your.email@company.com"
                          autoComplete="email"
                          aria-required="true"
                          {...register('email', {
                            required: 'Email is required',
                            validate: (email) =>
                              isEmail(email) ||
                              'Please enter a valid email address',
                          })}
                        />
                        {renderFieldError(errors.email, 'email')}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Name and Phone */}
                  {currentStep === 2 && (
                    <>
                      <div className={twoColumnGrid}>
                        <div className={formGroup}>
                          <label className={labelStyle}>
                            Name <span className={requiredMark}>*</span>
                          </label>
                          <input
                            type="text"
                            className={inputStyle}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            aria-required="true"
                            {...register('name', {
                              required: 'Name is required',
                              maxLength: {
                                value: MAX_LENGTHS.name,
                                message: `Name must not exceed ${MAX_LENGTHS.name} characters`,
                              },
                            })}
                          />
                          {renderFieldError(errors.name, 'name')}
                        </div>
                        <div className={formGroup}>
                          <label className={labelStyle}>
                            Phone Number <span className={requiredMark}>*</span>
                          </label>
                          <InputMask
                            mask="(___) ___-____"
                            replacement={{ _: /\d/ }}
                            type="tel"
                            className={inputStyle}
                            placeholder="(XXX) XXX-XXXX"
                            autoComplete="tel"
                            aria-required="true"
                            {...register('phoneNumber', {
                              required: 'Phone number is required',
                              pattern: {
                                value: /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/,
                                message: 'Please enter a valid US phone number',
                              },
                            })}
                          />
                          {renderFieldError(
                            errors.phoneNumber,
                            'phoneNumber',
                          )}
                        </div>
                      </div>                     
                    </>
                  )}

                  {/* Step 3: Company, State, Comments */}
                  {currentStep === 3 && (
                    <>
                      <div className={twoColumnGrid}>
                        <div className={formGroup}>
                          <label className={labelStyle}>Company Name</label>
                          <input
                            type="text"
                            className={inputStyle}
                            placeholder="Your practice name"
                            autoComplete="organization"
                            {...register('companyName', {
                              maxLength: {
                                value: MAX_LENGTHS.companyName,
                                message: `Company name must not exceed ${MAX_LENGTHS.companyName} characters`,
                              },
                            })}
                          />
                          {renderFieldError(
                            errors.companyName,
                            'companyName',
                          )}
                        </div>

                        <div className={formGroup}>
                          <AddressAutocomplete
                            label="State"
                            required
                            placeholder="Search for your state"
                            onAddressSelect={handleAddressSelect}
                            error={!!errors.state || !!apiFieldErrors.state}
                            size="compact"
                            types={[...STATE_PLACE_TYPES]}
                            className={stateAutocompleteWrapper}
                            emptyMessage="State not found"
                          />
                          <input
                            type="hidden"
                            {...register('state', {
                              required: 'State is required',
                            })}
                          />
                          {renderFieldError(errors.state, 'state')}
                        </div>
                      </div>

                      <div className={oneColumnGrid}>
                        <div className={formGroup}>
                          <label className={labelStyle}>
                            Comments (Tell us about your needs and challenges)
                          </label>
                          <textarea
                            className={textareaStyle}
                            placeholder="Tell us about your needs and goals..."
                            rows={3}
                            {...register('comments', {
                              maxLength: {
                                value: MAX_LENGTHS.comments,
                                message: `Comments must not exceed ${MAX_LENGTHS.comments} characters`,
                              },
                            })}
                          />
                          {renderFieldError(errors.comments, 'comments')}
                        </div>
                      </div>

                      {submitError && (
                        <div
                          className={errorMessage}
                          style={{
                            textAlign: 'center',
                            marginTop: '20px',
                            padding: '1rem',
                            background: '#fef2f2',
                            borderRadius: '0.75rem',
                            border: '1px solid #fecaca',
                          }}
                        >
                          <AlertCircle size={20} />
                          {submitError}
                        </div>
                      )}

                      {/* reCAPTCHA */}
                      <div className="pt-4">
                        <ReCaptcha
                          ref={recaptchaRef}
                          onVerify={handleRecaptchaChange}
                          onError={handleRecaptchaError}
                          onExpired={handleRecaptchaExpired}
                          error={recaptchaError}
                        />
                      </div>                     
                    </>
                  )}

  <p id="submit-help" className={bottomHelperText}>
  🔒 Your information is secure and will only be used to
  provide you with a personalized consultation.
  <br />
  We&apos;ll respond within 24 hours with next steps.
  </p>

                  {/* Navigation / Submit */}
                  <div className={`pt-4 ${actionsRow}`}>
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={goBack}
                        disabled={isSubmitting}
                        aria-label="Go to previous step"
                        className={secondaryButton}
                      >
                        Back
                      </button>
                    ) : (
                      null
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={isSubmitting}
                        className={submitButton}
                        aria-label="Go to next step"
                      >
                        Next
                      </button>
                    ) : (
                      <div className={submitContainer}>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={submitButton}
                          aria-describedby="submit-help"
                        >
                          {isSubmitting ? (
                            <>
                              <span
                                className={loadingSpinner}
                                aria-hidden="true"
                              ></span>
                              Sending Request...
                            </>
                          ) : (
                            <>
                              <Mail
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                              Send My Request
                            </>
                          )}
                        </button>
                        
                      </div>
                    )}
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>          
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default GetStartedForm;
