'use client';

import { AlertCircle, ChevronLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import * as styles from './styles.css';

import { API_ENDPOINTS, getAddonsEndpoint } from '@/constants/api';
import { BILLING_CYCLES, type BillingCycle } from '@/constants/billing';
import { DEFAULT_STAFF_COUNT } from '@/constants/formFields';
import { fetchApi } from '@/lib/api-client';
import { showSuccessToast } from '@/lib/errors';
import { isApiError } from '@/types/api';
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
}: Step4PaidProps) {
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [addons, setAddons] = useState<AddonData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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

  // Memoized total calculation - THIS FIXES THE MAIN BUG
  const total = useMemo(() => {
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
        const addonPrice = parsePrice(
          billingCycle === BILLING_CYCLES.MONTHLY
            ? addon.monthly_price
            : addon.yearly_price,
        );
        return sum + addonPrice;
      }
      return sum;
    }, 0);

    return basePrice + addonsTotal;
  }, [currentPlan, billingCycle, staffCount, selectedAddons, addons]);

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

  // Fetch plans and addons with proper error handling
  const fetchPlansAndAddons = useCallback(async () => {
    setLoadingData(true);
    setApiError(null);

    try {
      // Fetch plans from the plans-and-addons endpoint
      const plansResult = await fetchApi<{
        plans: PlanData[];
        addons: AddonData[];
      }>(API_ENDPOINTS.SUBSCRIPTION.PLANS_AND_ADDONS, {
        method: 'GET',
      });

      setPlans(plansResult.plans || []);

      // Fetch plan-specific addons using the subscription_plan_id
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
        setAddons(plansResult.addons || []);
      }

      // Set default staff count from the selected plan's max_staff field
      if (formData.subscription_plan_id && plansResult.plans) {
        const selectedPlan = plansResult.plans.find(
          (p) => p.id === formData.subscription_plan_id,
        );
        if (selectedPlan && selectedPlan.max_staff > 0) {
          setValue('staff_count', selectedPlan.max_staff);
        }
      }
    } catch (error) {
      console.error('Failed to load plans and add-ons:', error);
      setApiError(
        'Failed to load pricing information. Please refresh the page.',
      );
    } finally {
      setLoadingData(false);
    }
  }, [formData.subscription_plan_id, formData.staff_count, setValue]);

  useEffect(() => {
    fetchPlansAndAddons();
  }, [fetchPlansAndAddons]);

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
    // Users can add more staff beyond the plan's minimum requirement
    // Set a reasonable maximum of 100 staff to prevent accidental excessive clicks
    const MAX_STAFF_LIMIT = 100;
    if (staffCount < MAX_STAFF_LIMIT) {
      setValue('staff_count', staffCount + 1);
    }
  }, [staffCount, setValue]);

  const decrementStaff = useCallback(() => {
    const minStaffCount = currentPlan?.max_staff || 1;
    if (staffCount > minStaffCount) {
      setValue('staff_count', staffCount - 1);
    }
  }, [currentPlan, staffCount, setValue]);

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
        if (isApiError(error)) {
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
    [formData, clinic_onboarding_request_id, onNext],
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
        <button onClick={fetchPlansAndAddons} className={styles.button}>
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
                    disabled={
                      !currentPlan || staffCount <= (currentPlan.max_staff || 1)
                    }
                    className={styles.counterButton}
                    aria-label="Decrease staff count"
                  >
                    <Minus size={20} />
                  </button>
                  <span className={styles.counterValue}>{staffCount}</span>
                  <button
                    type="button"
                    onClick={incrementStaff}
                    disabled={staffCount >= 100}
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
                {currentPlan.max_staff > 0 && (
                  <span className={styles.staffLabelHint}>
                    (Plan requires minimum {currentPlan.max_staff} staff, can
                    add more)
                  </span>
                )}
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
                      const price = parsePrice(
                        billingCycle === 'monthly'
                          ? addon.monthly_price
                          : addon.yearly_price,
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
                              ${price}/
                              {billingCycle === 'monthly' ? 'month' : 'year'}
                            </span>
                            <span className={styles.addonBilledInfo}>
                              ${price} billed{' '}
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
                      const price = parsePrice(
                        billingCycle === 'monthly'
                          ? addon.monthly_price
                          : addon.yearly_price,
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
                              ${price}/
                              {billingCycle === 'monthly' ? 'month' : 'year'}
                            </span>
                            <span className={styles.addonBilledInfo}>
                              ${price} billed{' '}
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
                      {parsePrice(
                        billingCycle === 'monthly'
                          ? addon.monthly_price
                          : addon.yearly_price,
                      ).toFixed(2)}
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
                            selectedAddonsList.reduce((sum, addon) => {
                              // For add-ons, use yearly price directly (no discount)
                              return sum + parsePrice(addon.yearly_price);
                            }, 0)
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
                <div className={styles.summaryNextBilling}>
                  Next charge on {nextChargeDate}
                </div>
              </div>

              <button
                type="submit"
                className={styles.proceedButton}
                disabled={isSubmitting}
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
