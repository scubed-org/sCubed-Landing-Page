/**
 * reCAPTCHA v3 action names. The client passes these to grecaptcha.execute and
 * the verifier requires the token to carry the same action: the admin API for
 * contact_step1 and verify_email(_resend), /api/newsletter for newsletter.
 * public/lp/script.js hard-codes contact_step1 and newsletter.
 */
export const RECAPTCHA_ACTIONS = {
  CONTACT_STEP1: 'contact_step1',
  NEWSLETTER: 'newsletter',
  VERIFY_EMAIL: 'verify_email',
  VERIFY_EMAIL_RESEND: 'verify_email_resend',
} as const;

export type RecaptchaAction =
  (typeof RECAPTCHA_ACTIONS)[keyof typeof RECAPTCHA_ACTIONS];
