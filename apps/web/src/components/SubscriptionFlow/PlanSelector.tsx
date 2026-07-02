'use client';

import { X, Check, Star } from 'lucide-react';
import { useState } from 'react';

import * as styles from './styles.css';

import { PLAN_IDS, PLAN_NAMES, PLAN_COLORS } from '@/constants/plans';
import { BILLING_CYCLES, type BillingCycle } from '@/constants/billing';
import type { PlanApiData } from '@/types/subscription';

// Helper function to safely parse prices
const parsePrice = (value: string | undefined | null): number => {
  if (!value) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

interface PlanSelectorProps {
  currentPlanId: number;
  currentBillingCycle: BillingCycle;
  onSelectPlan: (planId: number, billingCycle: BillingCycle) => void;
  onClose: () => void;
  /** Plans fetched server-side (from the plans-and-addons endpoint). */
  plans: PlanApiData[];
}

/**
 * PlanSelector - Modal for changing subscription plan
 * Allows users to select a different plan without leaving the current screen
 */
export default function PlanSelector({
  currentPlanId,
  currentBillingCycle,
  onSelectPlan,
  onClose,
  plans,
}: PlanSelectorProps) {
  // Track the user's intended plan choice (what they actually want)
  const [intendedPlanId, setIntendedPlanId] = useState(currentPlanId);
  const [selectedBillingCycle, setSelectedBillingCycle] =
    useState<BillingCycle>(currentBillingCycle);

  // Helper to get plan data by ID
  const getPlanData = (planId: number): PlanApiData | undefined => {
    return plans.find((p) => p.id === planId);
  };

  const freePlan = { id: PLAN_IDS.FREE, name: PLAN_NAMES[PLAN_IDS.FREE] };
  const paidPlans = [
    { id: PLAN_IDS.STARTER, name: PLAN_NAMES[PLAN_IDS.STARTER] },
    { id: PLAN_IDS.ESSENTIAL, name: PLAN_NAMES[PLAN_IDS.ESSENTIAL] },
    { id: PLAN_IDS.GROWTH, name: PLAN_NAMES[PLAN_IDS.GROWTH] },
  ];

  // Derive displayed plan: if intended plan is Free but billing is Yearly, show Starter
  const selectedPlanId =
    intendedPlanId === PLAN_IDS.FREE && selectedBillingCycle === BILLING_CYCLES.YEARLY
      ? PLAN_IDS.STARTER
      : intendedPlanId;

  // Handle billing cycle changes
  const handleBillingCycleChange = (newCycle: BillingCycle) => {
    setSelectedBillingCycle(newCycle);
    // The displayed plan will automatically update via the derived selectedPlanId
  };

  // Handle manual plan selection - update the intended plan
  const handlePlanSelect = (planId: number) => {
    setIntendedPlanId(planId);
  };

  const handleConfirm = () => {
    onSelectPlan(selectedPlanId, selectedBillingCycle);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className={styles.modalBackdrop} onClick={onClose} />

      {/* Modal */}
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Change Your Plan</h2>
          <button
            onClick={onClose}
            className={styles.modalCloseButton}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Billing Cycle Toggle */}
          <div className={styles.billingToggleContainer}>
            <button
              className={`${styles.billingToggleButton} ${
                selectedBillingCycle === BILLING_CYCLES.MONTHLY
                  ? styles.billingToggleButtonActive
                  : ''
              }`}
              onClick={() => handleBillingCycleChange(BILLING_CYCLES.MONTHLY)}
            >
              Monthly
            </button>
            <button
              className={`${styles.billingToggleButton} ${
                selectedBillingCycle === BILLING_CYCLES.YEARLY
                  ? styles.billingToggleButtonActive
                  : ''
              }`}
              onClick={() => handleBillingCycleChange(BILLING_CYCLES.YEARLY)}
            >
              Yearly
            </button>
          </div>

          {/* Free Plan - Separate Section */}
          {selectedBillingCycle === BILLING_CYCLES.MONTHLY && <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Free Option
            </h3>
            <div
              className={`${styles.planOptionCard} ${
                selectedPlanId === freePlan.id ? styles.planOptionCardSelected : ''
              }`}
              style={{
                borderColor: selectedPlanId === freePlan.id ? PLAN_COLORS[freePlan.id].border : '#e5e7eb',
                backgroundColor: selectedPlanId === freePlan.id ? PLAN_COLORS[freePlan.id].bg : '#ffffff',
              }}
              onClick={() => handlePlanSelect(freePlan.id)}
            >
              <div className={styles.planOptionCheckbox}>
                {selectedPlanId === freePlan.id && (
                  <Check size={16} style={{ color: PLAN_COLORS[freePlan.id].text }} />
                )}
              </div>
              <div className={styles.planOptionContent}>
                <div className={styles.planOptionHeader}>
                  <span
                    className={styles.planOptionName}
                    style={{ color: PLAN_COLORS[freePlan.id].text }}
                  >
                    {freePlan.name}
                  </span>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: PLAN_COLORS[freePlan.id].text, marginTop: '0.5rem' }}>
                  $0
                </div>
                <div
                  className={styles.planOptionBadge}
                  style={{
                    color: PLAN_COLORS[freePlan.id].text,
                    borderColor: PLAN_COLORS[freePlan.id].border,
                    backgroundColor: selectedPlanId === freePlan.id ? '#ffffff' : PLAN_COLORS[freePlan.id].bg,
                  }}
                >
                  Free
                </div>
              </div>
            </div>
          </div>}

          {/* Paid Plans - Grid Section */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Paid Plans
            </h3>
            <div className={styles.planOptionsGrid}>
              {paidPlans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  const colors = PLAN_COLORS[plan.id as keyof typeof PLAN_COLORS];
                  const planData = getPlanData(plan.id);

                  return (
                    <div
                      key={plan.id}
                      className={`${styles.planOptionCard} ${
                        isSelected ? styles.planOptionCardSelected : ''
                      }`}
                      style={{
                        borderColor: isSelected ? colors.border : '#e5e7eb',
                        backgroundColor: isSelected ? colors.bg : '#ffffff',
                      }}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      <div className={styles.planOptionCheckbox}>
                        {isSelected && (
                          <Check size={16} style={{ color: colors.text }} />
                        )}
                      </div>
                      <div className={styles.planOptionContent}>
                        <div className={styles.planOptionHeader}>
                          <Star size={16} style={{ color: colors.text }} />
                          <span
                            className={styles.planOptionName}
                            style={{ color: colors.text }}
                          >
                            {plan.name}
                          </span>
                        </div>
                        <div style={{ marginTop: '0.75rem' }}>
                          {selectedBillingCycle === BILLING_CYCLES.YEARLY ? (
                            <>
                              <div style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'line-through' }}>
                                ${planData ? parsePrice(planData.yearly_price_per_staff).toFixed(0) : '0'}/year
                              </div>
                              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: colors.text, marginTop: '0.25rem' }}>
                                ${planData ? parsePrice(planData.discounted_yearly_price_per_staff).toFixed(0) : '0'}/year
                              </div>
                            </>
                          ) : (
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: colors.text }}>
                              ${planData ? parsePrice(planData.monthly_price_per_staff).toFixed(0) : '0'}/month
                            </div>
                          )}
                        </div>
                        <div
                          className={styles.planOptionBadge}
                          style={{
                            color: colors.text,
                            borderColor: colors.border,
                            backgroundColor: !isSelected ? colors.bg : '#ffffff',
                          }}
                        >
                          {selectedBillingCycle === BILLING_CYCLES.YEARLY ? 'Annual' : 'Monthly'}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={selectedPlanId === currentPlanId && selectedBillingCycle === currentBillingCycle}
          >
            Update Plan
          </button>
        </div>
      </div>
    </>
  );
}
