import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';
import { useMask } from '@react-input/mask';

import * as styles from './styles.css';

// ============================================================================
// TEXT INPUT
// ============================================================================

interface TextInputProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  helpText?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel';
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  maxLength?: number;
}

export const TextInput = ({
  label,
  required,
  error,
  helpText,
  placeholder,
  type = 'text',
  disabled,
  registration,
  maxLength,
}: TextInputProps) => {
  return (
    <div className={styles.formField} data-field={registration.name}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </label>
      <input
        type={type}
        className={`${styles.input} ${styles.inputLarge} ${error ? `${styles.inputError} ${styles.shakeAnimation}` : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        {...registration}
      />
      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
      {error && (
        <div className={`${styles.errorMessage} ${styles.fadeInUpAnimation}`} id={`${registration.name}-error`}>
          <AlertCircle size={16} className={styles.errorIcon} />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// SELECT DROPDOWN
// ============================================================================

interface SelectOption {
  id: number;
  name: string;
  value?: string;
}

interface SelectProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  helpText?: string;
  placeholder?: string;
  disabled?: boolean;
  options: SelectOption[];
  registration: UseFormRegisterReturn;
}

export const Select = ({
  label,
  required,
  error,
  helpText,
  placeholder,
  disabled,
  options,
  registration,
}: SelectProps) => {
  return (
    <div className={styles.formField}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </label>
      <select
        className={`${styles.select} ${styles.inputLarge} ${error ? `${styles.inputError} ${styles.shakeAnimation}` : ''}`}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        {...registration}
      >
        <option value="">{placeholder || 'Select an option'}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
      {error && (
        <div className={`${styles.errorMessage} ${styles.fadeInUpAnimation}`} id={`${registration.name}-error`}>
          <AlertCircle size={16} className={styles.errorIcon} />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PHONE INPUT WITH MASK
// ============================================================================

interface PhoneInputProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  helpText?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
  name: string;
}

export const PhoneInput = ({
  label,
  required,
  error,
  helpText,
  placeholder,
  disabled,
  onChange,
  value,
  name,
}: PhoneInputProps) => {
  const maskRef = useMask({
    mask: '(___) ___-____',
    replacement: { _: /\d/ },
  });

  // Format digits-only value to display format: (XXX) XXX-XXXX
  const formatPhoneForDisplay = (digits: string): string => {
    if (!digits) return '';
    const cleaned = digits.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 3) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unmasked = e.target.value.replace(/\D/g, '');
    onChange(unmasked);
  };

  return (
    <div className={styles.formField} data-field={name}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </label>
      <input
        type="tel"
        name={name}
        className={`${styles.input} ${styles.inputLarge} ${error ? `${styles.inputError} ${styles.shakeAnimation}` : ''}`}
        placeholder={placeholder || '(555) 123-4567'}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        ref={maskRef}
        value={formatPhoneForDisplay(value)}
        onChange={handleChange}
      />
      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
      {error && (
        <div className={`${styles.errorMessage} ${styles.fadeInUpAnimation}`} id={`${name}-error`}>
          <AlertCircle size={16} className={styles.errorIcon} />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// CHECKBOX
// ============================================================================

interface CheckboxProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
}

export const Checkbox = ({ label, required, error, disabled, registration }: CheckboxProps) => {
  return (
    <div className={styles.formField}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={styles.checkbox}
          disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          {...registration}
        />
        <span className={styles.checkboxText}>
          {label}
          {required && <span className={styles.requiredIndicator}>*</span>}
        </span>
      </label>
      {error && (
        <div className={styles.errorMessage}>
          <AlertCircle size={16} className={styles.errorIcon} />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// TEXTAREA
// ============================================================================

interface TextareaProps {
  label: string;
  required?: boolean;
  error?: FieldError;
  helpText?: string;
  placeholder?: string;
  disabled?: boolean;
  registration: UseFormRegisterReturn;
  rows?: number;
  maxLength?: number;
}

export const Textarea = ({
  label,
  required,
  error,
  helpText,
  placeholder,
  disabled,
  registration,
  rows = 4,
  maxLength,
}: TextareaProps) => {
  return (
    <div className={styles.formField}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </label>
      <textarea
        className={`${styles.textarea} ${error ? styles.inputError : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        {...registration}
      />
      {helpText && !error && <div className={styles.helpText}>{helpText}</div>}
      {error && (
        <div className={styles.errorMessage} id={`${registration.name}-error`}>
          <AlertCircle size={16} className={styles.errorIcon} />
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};
