import { API_ENDPOINTS } from '@/constants/api';
import type { AddonApiData, PlanApiData } from '@/types/subscription';

const API_URL = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL;

export interface PlansAndAddonsData {
  plans: PlanApiData[];
  addons: AddonApiData[];
}

/**
 * Fetch plans and add-ons from the admin API at request time.
 * Returns null on any error so callers can fall back to static data.
 * The base URL already includes `/v1/`, so the endpoint constant is
 * appended directly (no extra `/v1/`).
 */
export async function getPlansAndAddons(): Promise<PlansAndAddonsData | null> {
  if (!API_URL) {
    return null;
  }

  try {
    const base = API_URL.replace(/\/+$/, '');
    const url = `${base}/${API_ENDPOINTS.SUBSCRIPTION.PLANS_AND_ADDONS}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.error(
        `Plans-and-addons API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const json = await response.json();
    const data = json?.data;

    if (!data || !Array.isArray(data.plans) || !Array.isArray(data.addons)) {
      console.error('Plans-and-addons API returned unexpected shape');
      return null;
    }

    return { plans: data.plans, addons: data.addons };
  } catch (error) {
    console.error('Error fetching plans and add-ons:', error);
    return null;
  }
}
