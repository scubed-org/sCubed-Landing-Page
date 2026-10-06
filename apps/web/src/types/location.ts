/**
 * Location Types
 * Type definitions for state/city dropdown components used in FreeTrialModal
 * These types are used by the usePaginatedCities hook
 */

/**
 * Generic dropdown option
 */
export interface DropdownOption {
  id: number;
  name: string;
  value?: string;
}

/**
 * City dropdown option
 */
export interface City extends DropdownOption {
  state_id: number;
}

/**
 * State dropdown option with embedded timezone data
 */
export interface State {
  id: number;
  name: string;
  code: string;
  timezones: Array<{
    timezone_id: number;
    timezone: {
      timezone: string;
    };
  }>;
}
