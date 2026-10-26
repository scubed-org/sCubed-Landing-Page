/**
 * Shared free-text rules for react-hook-form. The admin API rejects < and > with the same message.
 * public/lp/script.js mirrors these patterns.
 */

// Unicode letters and marks plus space, apostrophes (' and ’), hyphen and period ("O'Brien", "Mary-Jane", "Jr.")
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;

const NO_HTML_PATTERN = /^[^<>]*$/;

const NAME_ERROR_MESSAGE =
  'Name can only contain letters, spaces, apostrophes, hyphens and periods.';

const NO_HTML_ERROR_MESSAGE = 'This field cannot contain < or > characters.';

// Empty values pass; `required` rules handle presence.
export const validateName = (value?: string | null): true | string => {
  const trimmed = (value ?? '').trim();
  return trimmed === '' || NAME_PATTERN.test(trimmed) || NAME_ERROR_MESSAGE;
};

export const validateNoHtml = (value?: string | null): true | string =>
  NO_HTML_PATTERN.test(value ?? '') || NO_HTML_ERROR_MESSAGE;
