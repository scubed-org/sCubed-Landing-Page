/**
 * Subscription Plans Configuration
 * Centralized configuration for all subscription plans
 */

export const PLAN_IDS = {
  FREE: 1,
  STARTER: 2,
  ESSENTIAL: 3,
  GROWTH: 4,
} as const;

export const PLAN_TYPES = {
  FREE: 'free',
  PAID: 'paid',
} as const;

export type PlanType = typeof PLAN_TYPES[keyof typeof PLAN_TYPES];

export const PLAN_NAMES = {
  [PLAN_IDS.FREE]: 'Free Trial',
  [PLAN_IDS.STARTER]: 'Starter',
  [PLAN_IDS.ESSENTIAL]: 'Essential',
  [PLAN_IDS.GROWTH]: 'Growth',
} as const;

/**
 * Canonical slugs used in the `?plan=` query param. These are what
 * getPlanIdByName parses, so the subscribe URL round-trips cleanly.
 */
export const PLAN_SLUGS = {
  [PLAN_IDS.FREE]: 'free',
  [PLAN_IDS.STARTER]: 'starter',
  [PLAN_IDS.ESSENTIAL]: 'essential',
  [PLAN_IDS.GROWTH]: 'growth',
} as const;

export const PLAN_PRICING = {
  [PLAN_IDS.FREE]: {
    monthly: 0,
    yearly: 0,
  },
  [PLAN_IDS.STARTER]: {
    monthly: 29,
    yearly: 295,
  },
  [PLAN_IDS.ESSENTIAL]: {
    monthly: 49,
    yearly: 499,
  },
  [PLAN_IDS.GROWTH]: {
    monthly: 89,
    yearly: 899,
  },
} as const;

export const PLAN_COLORS = {
  [PLAN_IDS.FREE]: {
    bg: '#dbeafe',
    text: '#1e40af',
    border: '#93c5fd',
  },
  [PLAN_IDS.STARTER]: {
    bg: '#fef3c7',
    text: '#92400e',
    border: '#fcd34d',
  },
  [PLAN_IDS.ESSENTIAL]: {
    bg: '#d1fae5',
    text: '#065f46',
    border: '#6ee7b7',
  },
  [PLAN_IDS.GROWTH]: {
    bg: '#e0e7ff',
    text: '#3730a3',
    border: '#a5b4fc',
  },
} as const;

/**
 * Map plan name (from pricing page) to plan ID
 */
export function getPlanIdByName(planName: string): number {
  const normalizedName = planName.toLowerCase().trim();

  switch (normalizedName) {
    case 'free':
    case 'free trial':
      return PLAN_IDS.FREE;
    case 'starter':
      return PLAN_IDS.STARTER;
    case 'essential':
      return PLAN_IDS.ESSENTIAL;
    case 'growth':
      return PLAN_IDS.GROWTH;
    default:
      return PLAN_IDS.FREE;
  }
}

/**
 * Get plan name by ID
 */
export function getPlanNameById(planId: number): string {
  return PLAN_NAMES[planId as keyof typeof PLAN_NAMES] || 'Free Trial';
}

/**
 * Get the URL slug for a plan ID
 */
export function getPlanSlugById(planId: number): string {
  return (
    PLAN_SLUGS[planId as keyof typeof PLAN_SLUGS] || PLAN_SLUGS[PLAN_IDS.FREE]
  );
}

/**
 * Get plan colors by ID
 */
export function getPlanColorsById(planId: number) {
  return (
    PLAN_COLORS[planId as keyof typeof PLAN_COLORS] || PLAN_COLORS[PLAN_IDS.FREE]
  );
}

/**
 * Get plan pricing by ID
 */
export function getPlanPricingById(planId: number) {
  return (
    PLAN_PRICING[planId as keyof typeof PLAN_PRICING] || PLAN_PRICING[PLAN_IDS.FREE]
  );
}

/**
 * Get plan type (free or paid) by ID
 */
export function getPlanTypeById(planId: number): PlanType {
  return planId === PLAN_IDS.FREE ? PLAN_TYPES.FREE : PLAN_TYPES.PAID;
}

/**
 * Check if plan is free
 */
export function isFreePlan(planId: number): boolean {
  return planId === PLAN_IDS.FREE;
}

/**
 * Check if plan is paid
 */
export function isPaidPlan(planId: number): boolean {
  return planId !== PLAN_IDS.FREE;
}
