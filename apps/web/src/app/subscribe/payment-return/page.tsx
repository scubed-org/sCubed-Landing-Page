'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

import * as styles from '@/components/SubscriptionFlow/styles.css';
import { clearOnboardingAccessToken } from '@/lib/onboarding-api-client';
import { clearSession, loadSession } from '@/lib/subscriptionSessionManager';

/**
 * PaymentReturnContent - Handles Stripe payment return flows
 *
 * This component handles three scenarios:
 * 1. Success: Payment completed successfully
 * 2. Canceled: User canceled payment, can return to cart
 * 3. Session Lost: Session data unavailable, must restart
 */
function PaymentReturnContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'canceled' | 'error'>('loading');
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    handlePaymentReturn();
  }, [searchParams]);

  const handlePaymentReturn = async () => {
    const isSuccess = searchParams.get('success') === 'true';
    const isCanceled = searchParams.get('canceled') === 'true';
    const sessionId = searchParams.get('session_id');

    // Load session data
    const savedSession = loadSession();

    if (isSuccess) {
      // Payment successful
      console.log('Payment successful! Session ID:', sessionId);
      setStatus('success');
      setSessionData(savedSession);

      // Clear session after 2 seconds and redirect to home
      setTimeout(() => {
        void clearOnboardingAccessToken();
        clearSession();
        router.push('/');
      }, 5000);
    } else if (isCanceled) {
      // Payment canceled by user
      console.log('Payment canceled by user');

      if (savedSession) {
        // Session exists, user can return to cart
        setStatus('canceled');
        setSessionData(savedSession);
      } else {
        // Session lost
        setStatus('error');
      }
    } else {
      // Invalid state
      setStatus('error');
    }
  };

  const handleReturnToCart = () => {
    // Navigate back to subscription flow, which will restore from session
    router.push('/subscribe');
  };

  const handleStartOver = () => {
    void clearOnboardingAccessToken();
    clearSession();
    router.push('/pricing');
  };

  if (status === 'loading') {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div className={styles.loadingIconWrapper}>
              <span className={styles.loadingSpinnerLarge} />
            </div>
            <h2 className={styles.successTitle}>Processing...</h2>
            <p className={styles.successMessage}>
              Please wait while we process your payment status.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>
              <CheckCircle size={48} />
            </div>

            <h1 className={styles.successTitle}>Payment Successful!</h1>

            <div className={styles.orderSummary}>
              <h3 className={styles.orderSummaryTitle}>Thank You for Your Subscription</h3>
              <p className={styles.successMessage}>
                Your payment has been processed successfully. We're setting up your account now.
              </p>

              {sessionData?.step1Data && (
                <div style={{ marginTop: '1.5rem' }}>
                  <p><strong>Clinic:</strong> {sessionData.step1Data.clinic_name}</p>
                  <p><strong>Email:</strong> {sessionData.step1Data.email}</p>
                </div>
              )}
            </div>

            <div className={`${styles.alertContainer} ${styles.alertSuccess}`}>
              <CheckCircle size={20} />
              <span>
                You will receive a confirmation email shortly with your login credentials and next steps.
              </span>
            </div>

            <p className={styles.successMessage} style={{ marginTop: '1rem' }}>
              Redirecting you to the homepage in a moment...
            </p>

            <div className={styles.buttonGroup} style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
              <button
                onClick={() => router.push('/')}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'canceled') {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div className={styles.errorIconWrapper}>
              <XCircle className={styles.errorIconLarge} />
            </div>

            <h2 className={styles.successTitle}>Payment Canceled</h2>

            <p className={styles.successMessage}>
              You canceled the payment process. Don't worry, your information has been saved!
            </p>

            <div className={`${styles.alertContainer} ${styles.alertInfo}`}>
              <AlertTriangle size={20} />
              <span>
                Your clinic details and plan selection are still saved. You can return to the cart
                to complete your purchase when you're ready.
              </span>
            </div>

            {sessionData?.step1Data && (
              <div className={styles.orderSummary} style={{ marginTop: '1.5rem' }}>
                <h3 className={styles.orderSummaryTitle}>Your Saved Information</h3>
                <p><strong>Clinic:</strong> {sessionData.step1Data.clinic_name}</p>
                <p><strong>Email:</strong> {sessionData.step1Data.email}</p>
                <p><strong>Plan:</strong> {sessionData.selectedPlan?.name || 'Selected Plan'}</p>
              </div>
            )}

            <div className={styles.buttonGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
              <button
                onClick={handleStartOver}
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                Start Over
              </button>
              <button
                onClick={handleReturnToCart}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Return to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state - session lost
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.successContainer}>
          <div className={styles.errorIconWrapper}>
            <AlertTriangle className={styles.errorIconLarge} />
          </div>

          <h2 className={styles.successTitle}>Session Expired</h2>

          <p className={styles.successMessage}>
            We couldn't find your subscription information. This may happen if your session has expired
            or if you cleared your browser data.
          </p>

          <div className={`${styles.alertContainer} ${styles.alertError}`}>
            <AlertTriangle size={20} />
            <span>
              Please start the subscription process again. We apologize for the inconvenience.
            </span>
          </div>

          <div className={styles.buttonGroup} style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <button
              onClick={handleStartOver}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Start New Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PaymentReturn Page - Wrapper with Suspense for useSearchParams
 */
export default function PaymentReturnPage() {
  return (
    <Suspense fallback={
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.successContainer}>
            <div className={styles.loadingIconWrapper}>
              <span className={styles.loadingSpinnerLarge} />
            </div>
            <h2 className={styles.successTitle}>Loading...</h2>
          </div>
        </div>
      </div>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
}
