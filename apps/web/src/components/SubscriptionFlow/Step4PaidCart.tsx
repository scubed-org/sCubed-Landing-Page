'use client';

import { AlertCircle, ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import * as styles from './styles.css';
import TermsAcknowledgement from './TermsAcknowledgement';
import { useCheckoutSummary } from './useCheckoutSummary';

import { API_ENDPOINTS, getAddonsEndpoint } from '@/constants/api';
import { BILLING_CYCLES, type BillingCycle } from '@/constants/billing';
import { DEFAULT_STAFF_COUNT } from '@/constants/formFields';
import { useCurrentTerms } from '@/hooks/useCurrentTerms';
import { fetchApi } from '@/lib/api-client';
import { showSuccessToast } from '@/lib/errors';
import { ApiError, isApiError } from '@/types/api';
import type {
  AddonApiData,
  PlanApiData,
  Step4PaidProps,
} from '@/types/subscription';
import { formatPhone } from '@/utils/phoneFormatter';

interface CartFormData {
  staff_count: number;
  billing_cycle: BillingCycle;
  addons: number[];
}

// Use shared types with local aliases for backward compatibility
type PlanData = PlanApiData;
type AddonData = AddonApiData;

// Helper function to safely parse prices
const parsePrice = (value: string | undefined | null): number => {
  if (!value) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

// Resolve an add-on's unit price and the amount actually billed for the current
// cycle and staff count. Per-staff add-ons multiply by staff; flat ones don't.
const getAddonPricing = (
  addon: AddonData,
  cycle: BillingCycle,
  staff: number,
): { unit: number; billed: number; perStaff: boolean } => {
  const unit = parsePrice(
    cycle === BILLING_CYCLES.MONTHLY ? addon.monthly_price : addon.yearly_price,
  );
  const perStaff = addon.billing_basis === 'per_staff';
  return { unit, billed: perStaff ? unit * staff : unit, perStaff };
};

// Helper function to calculate next charge date
const calculateNextChargeDate = (cycle: BillingCycle): string => {
  const now = new Date();
  const nextDate = new Date(now);

  if (cycle === BILLING_CYCLES.YEARLY) {
    nextDate.setFullYear(now.getFullYear() + 1);
  } else {
    // Handle edge cases like Jan 31 + 1 month
    const targetMonth = now.getMonth() + 1;
    nextDate.setMonth(targetMonth);
    // If the day has changed (e.g., Jan 31 -> Mar 3), set to last day of target month
    if (nextDate.getMonth() !== targetMonth % 12) {
      nextDate.setDate(0); // Sets to last day of previous month
    }
  }

  return nextDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

// Backend error codes returned by the paid T&C gate (SCM-5367) when the
// accepted version is missing, stale, or the active version has changed.
const TERMS_ERROR_CODES = [
  'TERMS_VERSION_STALE',
  'TERMS_NOT_FOUND',
  'TERMS_ACKNOWLEDGEMENT_REQUIRED',
];

// Detect a Terms & Conditions failure from the register response so we can
// prompt the user to re-review and re-accept rather than showing a raw error.
const isTermsError = (error: ApiError): boolean => {
  const haystack = [error.message, ...error.errors.map((e) => e.message)]
    .filter(Boolean)
    .join(' ')
    .toUpperCase();

  if (TERMS_ERROR_CODES.some((code) => haystack.includes(code))) {
    return true;
  }

  // Fallback: any terms-related 422 from the paid gate.
  return error.statusCode === 422 && haystack.includes('TERMS');
};

/**
 * Step 4 (Paid Plan): Cart/Checkout
 * Optimized component with proper React hooks usage and performance improvements
 */
export default function Step4PaidCart({
  formData,
  billingCycle: initialBillingCycle,
  onNext,
  onBack,
  clinic_onboarding_request_id,
  plans,
  addons: genericAddons,
}: Step4PaidProps) {
  const [addons, setAddons] = useState<AddonData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Terms & Conditions gate (paid checkout only). Acceptance is ephemeral —
  // it is re-confirmed on every visit and never persisted to the session.
  const {
    terms,
    loading: termsLoading,
    error: termsError,
    refetch: refetchTerms,
  } = useCurrentTerms();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { handleSubmit, control, setValue } = useForm<CartFormData>({
    defaultValues: {
      staff_count: formData.staff_count || DEFAULT_STAFF_COUNT,
      billing_cycle: initialBillingCycle || BILLING_CYCLES.MONTHLY,
      addons: [],
    },
  });

  // Use useWatch for better performance
  const billingCycle = useWatch({ control, name: 'billing_cycle' });
  const staffCount = useWatch({ control, name: 'staff_count' });
  const selectedAddons = useWatch({ control, name: 'addons' });

  // Memoized current plan calculation
  const currentPlan = useMemo((): PlanData | null => {
    if (!formData.subscription_plan_id || plans.length === 0) return null;
    return plans.find((p) => p.id === formData.subscription_plan_id) || null;
  }, [formData.subscription_plan_id, plans]);

  // Client-side estimate, used only as a fallback while the API summary is
  // loading or if the pricing request fails.
  const fallbackTotal = useMemo(() => {
    if (!currentPlan) return 0;

    const pricePerStaff = parsePrice(
      billingCycle === BILLING_CYCLES.MONTHLY
        ? currentPlan.monthly_price_per_staff
        : currentPlan.discounted_yearly_price_per_staff,
    );

    const basePrice = pricePerStaff * staffCount;

    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find((a) => a.id === addonId);
      if (addon) {
        return sum + getAddonPricing(addon, billingCycle, staffCount).billed;
      }
      return sum;
    }, 0);

    return basePrice + addonsTotal;
  }, [currentPlan, billingCycle, staffCount, selectedAddons, addons]);

  // Backend is the source of truth for pricing.
  const { summary: checkoutSummary, loading: summaryLoading } =
    useCheckoutSummary({
    planId: currentPlan?.id ?? null,
    billingCycle,
    staffCount,
    addOns: selectedAddons,
    enabled: !!currentPlan,
  });

  // Prefer the API amount; fall back to the local estimate until it resolves
  // (or if it errors) so the user never sees $0.00 flicker.
  const total = checkoutSummary?.amount_due ?? fallbackTotal;

  // Memoized savings percentage calculation
  const savingsPercentage = useMemo((): string => {
    if (!currentPlan) return '';

    const originalYearlyTotal = parsePrice(currentPlan.yearly_price_per_staff);
    const discountedYearlyTotal = parsePrice(
      currentPlan.discounted_yearly_price_per_staff,
    );

    if (originalYearlyTotal > 0 && discountedYearlyTotal > 0) {
      const savings =
        ((originalYearlyTotal - discountedYearlyTotal) / originalYearlyTotal) *
        100;
      if (savings > 0) {
        return `Save ${Math.round(savings)}%`;
      }
    }
    return '';
  }, [currentPlan]);

  // Memoized addon lists
  const selectedAddonsList = useMemo(
    () => addons.filter((addon) => selectedAddons.includes(addon.id)),
    [addons, selectedAddons],
  );

  const recommendedAddonsList = useMemo(
    () => addons.filter((addon) => !selectedAddons.includes(addon.id)),
    [addons, selectedAddons],
  );

  // Memoized next charge date
  const nextChargeDate = useMemo(
    () => calculateNextChargeDate(billingCycle),
    [billingCycle],
  );

  // Plans come from the server (passed as props). Only the plan-specific
  // add-ons are fetched client-side, since they depend on the chosen plan.
  const fetchPlanAddons = useCallback(async () => {
    setLoadingData(true);
    setApiError(null);

    try {
      if (formData.subscription_plan_id) {
        // The API returns { success, message, data: { count, rows } }
        // fetchApi automatically unwraps the .data field, so we get { count, rows }
        const addonsResult = await fetchApi<{
          count: number;
          rows: AddonData[];
        }>(getAddonsEndpoint(formData.subscription_plan_id), {
          method: 'GET',
        });

        setAddons(addonsResult?.rows || []);
      } else {
        // Fallback to generic addons if no plan ID (shouldn't happen in normal flow)
        setAddons(genericAddons);
      }
    } catch (error) {
      console.error('Failed to load add-ons:', error);
      setApiError(
        'Failed to load pricing information. Please refresh the page.',
      );
    } finally {
      setLoadingData(false);
    }
  }, [formData.subscription_plan_id, genericAddons]);

  useEffect(() => {
    fetchPlanAddons();
  }, [fetchPlanAddons]);

  // Optimized event handlers with useCallback
  const toggleAddon = useCallback(
    (addonId: number) => {
      setValue(
        'addons',
        selectedAddons.includes(addonId)
          ? selectedAddons.filter((id) => id !== addonId)
          : [...selectedAddons, addonId],
      );
    },
    [selectedAddons, setValue],
  );

  const incrementStaff = useCallback(() => {
    // No upper limit — users can add as many staff members as they need
    setValue('staff_count', staffCount + 1);
  }, [staffCount, setValue]);

  const decrementStaff = useCallback(() => {
    // Minimum of 1 staff member
    if (staffCount > 1) {
      setValue('staff_count', staffCount - 1);
    }
  }, [staffCount, setValue]);

  const onSubmit = useCallback(
    async (data: CartFormData) => {
      setIsSubmitting(true);
      setApiError(null);

      try {
        // Validate required data
        const city = formData.city;
        const state = formData.state;
        const timezone = formData.timezone;

        if (!city || !state) {
          setApiError(
            'Missing city or state information. Please go back and complete the form.',
          );
          return;
        }

        if (!clinic_onboarding_request_id) {
          setApiError(
            'Missing registration ID. Please restart the registration process.',
          );
          return;
        }

        // T&C gate: the active version must be loaded and accepted before the
        // paid register call (the backend fails closed without it).
        if (!terms?.id) {
          setApiError('Unable to load Terms & Conditions. Please retry.');
          return;
        }

        // Construct URLs for Stripe redirect
        // Note: session_id parameter is added by the backend when creating Stripe session
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || globalThis.location?.origin || '';
        const success_url = `${baseUrl}/subscribe/success`;
        const cancel_url = `${baseUrl}/subscribe`;

        // Final submission with subscription details
        const registrationPayload = {
          clinic_onboarding_request_id,
          draft_mode: false,
          accepted_terms_id: terms.id,
          subscription_plan_id: formData.subscription_plan_id,
          staff_count: data.staff_count,
          billing_cycle: data.billing_cycle,
          addons: data.addons,
          success_url,
          cancel_url,
          // Include clinic details
          clinic_name: formData.clinic_name,
          tax_id: formData.tax_id,
          npi: formData.npi || undefined,
          street_address_line_1: formData.street_address_line_1,
          city,
          state,
          state_code: formData.state_code,
          zip_code: formData.zip_code,
          timezone: timezone || 'America/New_York',
          // Include admin details
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formatPhone(formData.phone || ''),
        };

        // Call /register API
        const result = await fetchApi<{
          payment_url: string;
          payment_required: boolean;
        }>(API_ENDPOINTS.SUBSCRIPTION.REGISTER, {
          method: 'PUT',
          body: registrationPayload,
        });

        if (result.payment_required && result.payment_url) {
          showSuccessToast(
            'Proceeding to checkout. Please complete your payment.',
          );
          // Pass payment data to parent component
          onNext({
            staff_count: data.staff_count,
            addons: data.addons,
            billing_cycle: data.billing_cycle,
            payment_url: result.payment_url,
          });
        } else {
          setApiError('Payment URL not provided. Please contact support.');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        if (isApiError(error) && isTermsError(error)) {
          // The active T&C version changed (or was removed) since it loaded.
          // Re-fetch, force re-acknowledgement, and prompt the user.
          refetchTerms();
          setAcceptedTerms(false);
          setApiError(
            'The Terms & Conditions were updated — please review and accept again.',
          );
        } else if (isApiError(error)) {
          setApiError(
            error.message || 'Registration failed. Please try again.',
          );
        } else {
          setApiError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, clinic_onboarding_request_id, onNext, terms, refetchTerms],
  );

  if (loadingData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Loading pricing information...</p>
      </div>
    );
  }

  if (!currentPlan) {
    return (
      <div className={styles.errorContainer}>
        <AlertCircle size={48} />
        <p>Unable to load plan information. Please refresh the page.</p>
        <button onClick={fetchPlanAddons} className={styles.button}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.cartHeader}>
        <h1 className={`${styles.formTitle} ${styles.fadeInUpAnimation}`}>
          Customize Your Plan
        </h1>
        <p
          className={`${styles.formSubtitle} ${styles.fadeInUpAnimation}`}
          style={{ animationDelay: '0.1s' }}
        >
          Select your billing cycle and add-ons to complete your subscription
        </p>
      </div>

      {apiError && (
        <div
          className={`${styles.alertContainerCentered} ${styles.alertError}`}
        >
          <AlertCircle size={20} />
          <span className={styles.alertTextCentered}>{apiError}</span>
        </div>
      )}

      {currentPlan && (
        <div className={styles.cartGrid}>
          {/* Main Cart Section */}
          <div className={styles.planDetailsColumn}>
            {/* Plan Section */}
            <div
              className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className={styles.sectionCardHeader}>
                <h2 className={styles.sectionTitle}>{currentPlan.name} Plan</h2>
              </div>
              <div className={styles.planPriceRow}>
                {billingCycle === BILLING_CYCLES.YEARLY ? (
                  <>
                    <span className={styles.billingCycleOriginalPrice}>
                      ${currentPlan.yearly_price_per_staff}
                    </span>
                    <span className={styles.billingCycleDiscountedPrice}>
                      ${currentPlan.discounted_yearly_price_per_staff}
                    </span>
                  </>
                ) : (
                  <span>${currentPlan.monthly_price_per_staff}</span>
                )}
                <span className={styles.priceEquals}>×</span>
                <div className={styles.counterControls}>
                  <button
                    type="button"
                    onClick={decrementStaff}
                    disabled={staffCount <= 1}
                    className={styles.counterButton}
                    aria-label="Decrease staff count"
                  >
                    <Minus size={20} />
                  </button>
                  <span className={styles.counterValue}>{staffCount}</span>
                  <button
                    type="button"
                    onClick={incrementStaff}
                    className={styles.counterButton}
                    aria-label="Increase staff count"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <span className={styles.priceEquals}>=</span>
                {billingCycle === BILLING_CYCLES.YEARLY ? (
                  <div className={styles.billingCyclePriceWrapper}>
                    <span className={styles.billingCycleOriginalPrice}>
                      $
                      {(
                        parsePrice(currentPlan.yearly_price_per_staff) *
                        staffCount
                      ).toFixed(0)}
                    </span>
                    <span className={styles.totalPrice}>
                      $
                      {(
                        parsePrice(
                          currentPlan.discounted_yearly_price_per_staff,
                        ) * staffCount
                      ).toFixed(0)}
                    </span>
                  </div>
                ) : (
                  <span className={styles.totalPrice}>
                    $
                    {(
                      parsePrice(currentPlan.monthly_price_per_staff) *
                      staffCount
                    ).toFixed(0)}
                  </span>
                )}
              </div>
              <div className={styles.staffLabel}>
                Staff Member
                <span className={styles.staffLabelHint}>
                  (Plan requires minimum 1 staff, can add more)
                </span>
              </div>

              {/* Billing Cycle Selection */}
              <Controller
                name="billing_cycle"
                control={control}
                render={({ field }) => (
                  <div
                    className={`${styles.billingCycleGrid} ${styles.fadeInUpAnimation}`}
                    style={{ animationDelay: '0.3s' }}
                  >
                    <label
                      className={`${styles.billingCycleOption} ${
                        field.value === BILLING_CYCLES.MONTHLY
                          ? styles.billingCycleOptionSelected
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        value={BILLING_CYCLES.MONTHLY}
                        checked={field.value === BILLING_CYCLES.MONTHLY}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={styles.billingCycleRadio}
                        aria-label="Monthly billing"
                      />
                      <div className={styles.billingCycleContent}>
                        <span className={styles.billingCycleTitle}>
                          Monthly
                        </span>
                        <span className={styles.billingCyclePrice}>
                          ${currentPlan.monthly_price_per_staff}/month per staff
                        </span>
                      </div>
                    </label>

                    <label
                      className={`${styles.billingCycleOption} ${
                        field.value === BILLING_CYCLES.YEARLY
                          ? styles.billingCycleOptionSelected
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        value={BILLING_CYCLES.YEARLY}
                        checked={field.value === BILLING_CYCLES.YEARLY}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={styles.billingCycleRadio}
                        aria-label="Yearly billing"
                      />
                      <div className={styles.billingCycleContent}>
                        <span className={styles.billingCycleTitle}>Yearly</span>
                        <div className={styles.billingCyclePriceWrapper}>
                          <span className={styles.billingCycleOriginalPrice}>
                            ${currentPlan.yearly_price_per_staff}/year
                          </span>
                          <span className={styles.billingCycleDiscountedPrice}>
                            ${currentPlan.discounted_yearly_price_per_staff}
                            /year per staff
                          </span>
                        </div>
                        {savingsPercentage && (
                          <span className={styles.billingCycleSavings}>
                            {savingsPercentage}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                )}
              />

              {/* Selected Addons */}
              {selectedAddonsList.length > 0 && (
                <>
                  <h3
                    className={styles.sectionHeader}
                    style={{ animationDelay: '0.4s' }}
                  >
                    Selected Add-ons
                  </h3>
                  <div className={styles.addonsGrid}>
                    {selectedAddonsList.map((addon, index) => {
                      const { unit, billed, perStaff } = getAddonPricing(
                        addon,
                        billingCycle,
                        staffCount,
                      );

                      return (
                        <div
                          key={addon.id}
                          className={`${styles.addonCard} ${styles.addonCardSelected} ${styles.fadeInUpAnimation}`}
                          style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                        >
                          <div className={styles.addonHeaderRow}>
                            <h4 className={styles.addonTitle}>
                              {addon.feature_name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => toggleAddon(addon.id)}
                              className={styles.removeAddonButton}
                              aria-label={`Remove ${addon.feature_name}`}
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                          <p className={styles.addonDescription}>
                            {addon.description}
                          </p>
                          <div className={styles.addonPriceRow}>
                            <span className={styles.addonPrice}>
                              ${unit}/
                              {billingCycle === 'monthly' ? 'month' : 'year'}
                              {perStaff ? ' per staff' : ''}
                            </span>
                            <span className={styles.addonBilledInfo}>
                              ${billed} billed{' '}
                              {billingCycle === 'monthly'
                                ? 'monthly'
                                : 'annually'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Recommended Addons */}
              {recommendedAddonsList.length > 0 && (
                <>
                  <h3
                    className={styles.sectionHeader}
                    style={{ animationDelay: '0.5s' }}
                  >
                    Available Add-ons
                  </h3>
                  <div className={styles.addonsGrid}>
                    {recommendedAddonsList.map((addon, index) => {
                      const { unit, billed, perStaff } = getAddonPricing(
                        addon,
                        billingCycle,
                        staffCount,
                      );

                      return (
                        <div
                          key={addon.id}
                          className={`${styles.addonCard} ${styles.fadeInUpAnimation}`}
                          style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                          onClick={() => toggleAddon(addon.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleAddon(addon.id);
                            }
                          }}
                          aria-label={`Add ${addon.feature_name}`}
                        >
                          <h4 className={styles.addonTitle}>
                            {addon.feature_name}
                          </h4>
                          <p className={styles.addonDescription}>
                            {addon.description}
                          </p>
                          <div className={styles.addonPriceRow}>
                            <span className={styles.addonPrice}>
                              ${unit}/
                              {billingCycle === 'monthly' ? 'month' : 'year'}
                              {perStaff ? ' per staff' : ''}
                            </span>
                            <span className={styles.addonBilledInfo}>
                              ${billed} billed{' '}
                              {billingCycle === 'monthly'
                                ? 'monthly'
                                : 'annually'}
                            </span>
                          </div>
                          <span className={styles.addonAddText}>
                            + Add to cart
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className={styles.orderSummaryColumn}>
            <div
              className={`${styles.sectionCard} ${styles.fadeInUpAnimation}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className={styles.sectionCardHeader}>
                <h2 className={styles.sectionTitle}>Order Summary</h2>
              </div>

              <div className={styles.orderSummaryContent}>
                {checkoutSummary ? (
                  <>
                    {/* Backend breakdown — each line is what the clinic is
                        actually charged (per-staff add-ons already multiplied). */}
                    {checkoutSummary.line_items.map((item) => (
                      <div
                        key={item.description}
                        className={styles.orderSummaryItem}
                      >
                        <span className={styles.summaryItemLeft}>
                          <span>{item.description}</span>
                          {item.calculation && (
                            <span className={styles.summaryLineCalculation}>
                              {item.calculation}
                            </span>
                          )}
                        </span>
                        <span>${item.amount.toFixed(2)}</span>
                      </div>
                    ))}

                    {(checkoutSummary.total_deductions ?? 0) > 0 && (
                      <>
                        <div className={styles.orderSummaryItem}>
                          <span>Subtotal</span>
                          <span>${checkoutSummary.subtotal.toFixed(2)}</span>
                        </div>
                        {(checkoutSummary.deductions ?? []).map((deduction) => (
                          <div
                            key={deduction.description}
                            className={styles.orderSummaryItem}
                          >
                            <span>{deduction.description}</span>
                            <span className={styles.summaryDeduction}>
                              -${Math.abs(deduction.amount).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </>
                    )}

                    <div className={styles.orderSummaryDivider} />

                    <div className={styles.orderSummaryTotal}>
                      <div className={styles.summaryTotalRow}>
                        <span>
                          Total ({checkoutSummary.line_items.length} items)
                        </span>
                        {billingCycle === BILLING_CYCLES.YEARLY ? (
                          <div className={styles.summaryPriceWrapper}>
                            <span className={styles.summaryOriginalPrice}>
                              $
                              {(
                                total +
                                (parsePrice(currentPlan.yearly_price_per_staff) -
                                  parsePrice(
                                    currentPlan.discounted_yearly_price_per_staff,
                                  )) *
                                  staffCount
                              ).toFixed(2)}
                            </span>
                            <span
                              className={styles.summaryDiscountedPrice}
                              style={
                                summaryLoading ? { opacity: 0.5 } : undefined
                              }
                            >
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span
                            className={styles.summaryTotalAmount}
                            style={summaryLoading ? { opacity: 0.5 } : undefined}
                          >
                            ${total.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Fallback: client-side estimate while the API summary
                        loads or if it errors. */}
                    <div className={styles.orderSummaryItem}>
                      <span>Plan ({staffCount} staff)</span>
                      {billingCycle === BILLING_CYCLES.YEARLY ? (
                        <div className={styles.summaryPriceWrapper}>
                          <span className={styles.summaryOriginalPrice}>
                            $
                            {(
                              parsePrice(currentPlan.yearly_price_per_staff) *
                              staffCount
                            ).toFixed(2)}
                          </span>
                          <span className={styles.summaryDiscountedPrice}>
                            $
                            {(
                              parsePrice(
                                currentPlan.discounted_yearly_price_per_staff,
                              ) * staffCount
                            ).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span>
                          $
                          {(
                            parsePrice(currentPlan.monthly_price_per_staff) *
                            staffCount
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>

                    {selectedAddonsList.map((addon) => (
                      <div key={addon.id} className={styles.orderSummaryItem}>
                        <span>{addon.feature_name}</span>
                        <span>
                          $
                          {getAddonPricing(
                            addon,
                            billingCycle,
                            staffCount,
                          ).billed.toFixed(2)}
                        </span>
                      </div>
                    ))}

                    <div className={styles.orderSummaryDivider} />

                    <div className={styles.orderSummaryTotal}>
                      <div className={styles.summaryTotalRow}>
                        <span>Total ({selectedAddons.length + 1} items)</span>
                        {billingCycle === BILLING_CYCLES.YEARLY ? (
                          <div className={styles.summaryPriceWrapper}>
                            <span className={styles.summaryOriginalPrice}>
                              $
                              {(
                                parsePrice(currentPlan.yearly_price_per_staff) *
                                  staffCount +
                                selectedAddonsList.reduce(
                                  (sum, addon) =>
                                    sum +
                                    getAddonPricing(addon, billingCycle, staffCount)
                                      .billed,
                                  0,
                                )
                              ).toFixed(2)}
                            </span>
                            <span className={styles.summaryDiscountedPrice}>
                              ${total.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className={styles.summaryTotalAmount}>
                            ${total.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className={styles.summaryNextBilling}>
                  Next charge on {nextChargeDate}
                </div>
              </div>

              <TermsAcknowledgement
                terms={terms}
                loading={termsLoading}
                error={termsError}
                accepted={acceptedTerms}
                onAcceptedChange={setAcceptedTerms}
                onRetry={refetchTerms}
              />

              <button
                type="submit"
                className={styles.proceedButton}
                disabled={
                  isSubmitting || termsLoading || !terms || !acceptedTerms
                }
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.loadingSpinner} />
                    Processing...
                  </>
                ) : (
                  'PROCEED TO CHECKOUT'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className={`${styles.buttonGroup} ${styles.fadeInUpAnimation}`}>
        <button
          type="button"
          onClick={onBack}
          className={`${styles.button} ${styles.buttonSecondary}`}
          disabled={isSubmitting}
        >
          <ChevronLeft size={20} />
          Back
        </button>
      </div>
    </form>
  );
}
