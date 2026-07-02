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

/** Monthly price suffix per billing basis. */
export function addonMonthlySuffix(
  billingBasis?: 'flat' | 'per_staff',
): string {
  return billingBasis === 'per_staff' ? '/license/month' : '/month';
}

/**
 * Build an add-on price label for the comparison table,
 * e.g. "Add-on $9/license/month". Returns `fallback` when the add-on
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
