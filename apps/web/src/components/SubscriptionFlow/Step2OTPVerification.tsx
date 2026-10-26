'use client';

import {
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import OTPCodeInput from './OTPCodeInput';
import * as styles from './styles.css';

import { API_ENDPOINTS } from '@/constants/api';
import { RECAPTCHA_ACTIONS } from '@/constants/recaptcha';
import { useRecaptchaV3 } from '@/hooks/useRecaptchaV3';
import { fetchApi } from '@/lib/api-client';
import { fetchOnboardingApi } from '@/lib/onboarding-api-client';
import { showSuccessToast } from '@/lib/errors';
import { isApiError } from '@/types/api';
import type { OTPVerificationResponse, Step2Props } from '@/types/subscription';

interface OTPFormData {
  otp_code: string;
}

/**
 * Step 2: Email OTP Verification
 * Verifies OTP code sent during registration
 */
export default function Step2OTPVerification({
  email,
  clinic_onboarding_request_id,
  onVerified,
  onBack,
}: Step2Props) {
  const [verifying, setVerifying] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const executeRecaptchaV3 = useRecaptchaV3();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpValue, setOtpValue] = useState('');
  const cooldownInterval = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<OTPFormData>({
    defaultValues: {
      otp_code: '',
    },
  });

  // Cleanup cooldown interval on unmount
  useEffect(() => {
    return () => {
      if (cooldownInterval.current) {
        clearInterval(cooldownInterval.current);
      }
    };
  }, []);

  // Clear any errors when component mounts (fresh start)
  useEffect(() => {
    setApiError(null);
    setResendSuccess(false);
  }, []);

  // Handle OTP input changes
  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue('otp_code', value);
    // Clear error when user starts typing
    if (apiError) {
      setApiError(null);
    }
  };

  const sendOTP = async () => {
    if (resendCooldown > 0 || resendingOtp) return;

    setResendingOtp(true);
    setApiError(null);
    setResendSuccess(false);

    try {
      // The admin API verifies this token before it emails a new code
      const recaptchaToken = await executeRecaptchaV3(
        RECAPTCHA_ACTIONS.VERIFY_EMAIL_RESEND,
      );

      // Resend OTP via new API endpoint
      await fetchApi<{ clinic_onboarding_request_id: number; message: string }>(
        API_ENDPOINTS.SUBSCRIPTION.VERIFY_EMAIL_RESEND,
        {
          method: 'POST',
          body: {
            clinic_onboarding_request_id,
            ...(recaptchaToken && { recaptcha_token: recaptchaToken }),
          },
        },
      );

      // Show success message
      setResendSuccess(true);
      showSuccessToast(
        'Verification code resent successfully. Please check your email.',
      );

      // Start cooldown timer (60 seconds)
      startCooldown(60);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      if (isApiError(error)) {
        setApiError(
          error.message ||
            'Failed to resend verification code. Please try again.',
        );
      } else {
        setApiError(
          'Network error. Please check your connection and try again.',
        );
      }
    } finally {
      setResendingOtp(false);
    }
  };

  const startCooldown = (seconds: number) => {
    setResendCooldown(seconds);

    if (cooldownInterval.current) {
      clearInterval(cooldownInterval.current);
    }

    cooldownInterval.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownInterval.current) {
            clearInterval(cooldownInterval.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onSubmit = async (data: OTPFormData) => {
    setVerifying(true);
    setApiError(null);

    try {
      // fetchOnboardingApi throws on non-2xx responses, so if we reach
      // the lines after this call the OTP was accepted by the backend.
      const result = await fetchOnboardingApi<OTPVerificationResponse>(
        'verify-email/confirm',
        {
          method: 'POST',
          body: {
            clinic_onboarding_request_id,
            otp: data.otp_code,
          },
          skipErrorToast: true,
        },
      );

      // Clear any previous errors
      setApiError(null);

      // Show success toast notification
      showSuccessToast('Email verified successfully!');

      // Wait a brief moment to ensure state updates
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Transition to next step
      onVerified(result);
    } catch (error) {
      console.error('Failed to verify OTP:', error);
      if (isApiError(error)) {
        setApiError(
          error.message || 'Invalid verification code. Please try again.',
        );
      } else {
        setApiError(
          'Network error. Please check your connection and try again.',
        );
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div>
      <h1 className={`${styles.formTitle} ${styles.fadeInUpAnimation}`}>
        Verify Your Email
      </h1>
      <p
        className={`${styles.formSubtitle} ${styles.fadeInUpAnimation}`}
        style={{ animationDelay: '0.1s' }}
      >
        We've sent a verification code to <strong>{email}</strong>
      </p>

      <div
        className={`${styles.alertContainerCentered} ${styles.alertInfo} ${styles.alertWithAnimation} ${styles.alertWithBorder}`}
        style={{ animationDelay: '0.2s' }}
      >
        <Mail size={20} />
        <span className={styles.alertTextCentered}>
          Please check your email for the 6-digit verification code.
        </span>
      </div>

      {resendSuccess && (
        <div
          className={`${styles.alertContainerCentered} ${styles.alertSuccess} ${styles.alertWithAnimation}`}
        >
          <Check size={20} />
          <span className={styles.alertTextCentered}>
            Verification code resent successfully! Please check your email.
          </span>
        </div>
      )}

      {apiError && (
        <div
          className={`${styles.alertContainerCentered} ${styles.alertError} ${styles.alertWithAnimation}`}
        >
          <AlertCircle size={20} />
          <span className={styles.alertTextCentered}>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.otpContainer} style={{ marginTop: '2rem' }}>
          <div
            className={`${styles.iconContainerLarge} ${styles.iconContainerPrimary}`}
          >
            <Mail size={30} />
          </div>

          <OTPCodeInput
            label="Enter 6-digit authentication code"
            helpText="Enter the 6-digit code sent to your email"
            value={otpValue}
            onChange={handleOtpChange}
            disabled={verifying}
            hasError={!!apiError}
          />
          <input type="hidden" {...register('otp_code')} />

          <div className={styles.resendContainer}>
            <p className={styles.resendText}>Didn't receive the code?</p>
            {resendCooldown > 0 ? (
              <div
                className={styles.resendCooldown}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center',
                }}
              >
                <span>Resend available in {resendCooldown} seconds</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={sendOTP}
                disabled={resendingOtp}
                className={styles.resendButton}
                style={{
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                {resendingOtp ? (
                  <>
                    <span className={styles.loadingSpinner} />
                    Sending...
                  </>
                ) : (
                  'Resend Code'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.buttonGroup} style={{ marginTop: '2rem' }}>
          <button
            type="button"
            onClick={onBack}
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonSecondary}`}
            disabled={verifying}
          >
            <ChevronLeft
              size={20}
              style={{ transition: 'transform 0.2s ease' }}
            />
            Back
          </button>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonLarge} ${styles.buttonGradient}`}
            disabled={verifying}
          >
            {verifying ? (
              <>
                <span className={styles.loadingSpinner} />
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
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
    </div>
  );
}
