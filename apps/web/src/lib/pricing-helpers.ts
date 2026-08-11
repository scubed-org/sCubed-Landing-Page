import type { AddonApiData, PlanApiData } from '@/types/subscription';

/** Parse an API money string/number to a display number, or null when absent/invalid. */
export function formatMoney(
  value: string | number | null | undefined,
): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  const parsed = typeof value === 'number' ? value : parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Find an API plan by its slug (e.g. 'starter'). */
export function findPlan(
  plans: PlanApiData[] | null | undefined,
  slug: string,
): PlanApiData | undefined {
  return plans?.find((plan) => plan.slug === slug);
}

/** Find an API add-on by its feature_key (e.g. 'telehealth'). */
export function findAddon(
  addons: AddonApiData[] | null | undefined,
  featureKey: string,
): AddonApiData | undefined {
  return addons?.find((addon) => addon.feature_key === featureKey);
}

/**
 * Unit price suffix for a billing cycle and basis, e.g. "/staff/month" for a
 * per-staff price and "/month" for a flat one. Single source of truth so the
 * pricing page and the subscribe flow label the same price the same way.
 */
export function priceSuffix(
  billingCycle: 'monthly' | 'yearly',
  billingBasis: 'flat' | 'per_staff' = 'per_staff',
): string {
  const period = billingCycle === 'yearly' ? '/year' : '/month';
  return billingBasis === 'per_staff' ? `/staff${period}` : period;
}

/** Monthly price suffix per billing basis. */
export function addonMonthlySuffix(
  billingBasis?: 'flat' | 'per_staff',
): string {
  return priceSuffix(
    'monthly',
    billingBasis === 'per_staff' ? 'per_staff' : 'flat',
  );
}

/**
 * Build an add-on price label for the comparison table,
 * e.g. "Add-on $9/staff/month". Returns `fallback` when the add-on
 * or its monthly price is unavailable.
 */
export function addonRowPrice(
  addon: AddonApiData | undefined,
  fallback: string,
): string {
  if (!addon) {
    return fallback;
  }
  const amount = formatMoney(addon.monthly_price);
  if (amount === null) {
    return fallback;
  }
  return `Add-on $${amount}${addonMonthlySuffix(addon.billing_basis)}`;
}
