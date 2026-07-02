'use client';

import { Star } from 'lucide-react';

import * as styles from './styles.css';

import {
  getPlanColorsById,
  getPlanNameById,
  PLAN_IDS,
} from '@/constants/plans';
import type { PlanApiData } from '@/types/subscription';

// Helper function to safely parse prices
const parsePrice = (value: string | undefined | null): number => {
  if (!value) return 0;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

interface PlanBadgeProps {
  readonly planId: number;
  readonly billingCycle?: 'monthly' | 'yearly';
  /** Plans fetched server-side (from the plans-and-addons endpoint). */
  readonly plans: PlanApiData[];
}

/**
 * PlanBadge - Displays the selected subscription plan
 * Shows at the top of the subscription flow for context
 */
export default function PlanBadge({
  planId,
  billingCycle,
  plans,
}: PlanBadgeProps) {
  const planName = getPlanNameById(planId);
  const colors = getPlanColorsById(planId);
  const isFree = planId === PLAN_IDS.FREE;
  const planData = isFree
    ? null
    : (plans.find((p) => p.id === planId) ?? null);

  return (
    <div
      className={styles.planBadgeContainer}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
      }}
    >
      <div className={styles.planBadgeContent}>
        {!isFree && <Star size={16} className={styles.planBadgeIcon} />}
        <span className={styles.planBadgeName}>{planName}</span>
        {!isFree && billingCycle && (
          <span className={styles.planBadgeCycle}>
            ({billingCycle === 'yearly' ? 'Annual' : 'Monthly'})
          </span>
        )}
      </div>
      {!isFree && billingCycle && planData ? (
        <>
          {billingCycle === 'yearly' ? (
            <div className={styles.planBadgePriceContainer}>
              <span className={styles.planBadgePriceStrike}>
                ${parsePrice(planData.yearly_price_per_staff).toFixed(0)}/year
              </span>
              <span className={styles.planBadgePrice}>
                ${parsePrice(planData.discounted_yearly_price_per_staff).toFixed(0)}/year
              </span>
            </div>
          ) : (
            <div className={styles.planBadgePriceSingle}>
              ${parsePrice(planData.monthly_price_per_staff).toFixed(0)}/month
            </div>
          )}
        </>
      ) : isFree ? (
        <div className={styles.planBadgeSubtext}>Free Trial</div>
      ) : null}
    </div>
  );
}
