'use client';

import { Loader2, MapPin, X } from 'lucide-react';
import {
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as styles from './styles.css';
import type { AddressAutocompleteProps, AddressComponents, PlaceResult } from './types';
import { useAddressParser } from './useAddressParser';
import { useGooglePlacesRest } from './useGooglePlacesRest';

/**
 * AddressAutocomplete Component
 * Provides address autocomplete using Google Places API
 * Auto-populates state, city, and ZIP code from selected address
 */
export const AddressAutocomplete: FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  onTimezoneResolved,
  value = '',
  placeholder = 'Start typing an address...',
  disabled = false,
  error = false,
  size = 'default',
  className,
  types,
  skipPlaceDetails = false,
  label,
  required = false,
  emptyMessage = 'No addresses found',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { parseAddressComponents } = useAddressParser();

  const {
    predictions,
    loading,
    error: apiError,
    searchPlaces,
    getPlaceDetails,
    clearPredictions,
    isLoaded,
  } = useGooglePlacesRest(types);

  // Update input value when external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle selection of a place
  const handleSelect = useCallback(
    async (prediction: PlaceResult) => {
      try {
        // Skip place details API call when only prediction text is needed (e.g., state selection)
        if (skipPlaceDetails) {
          setInputValue(prediction.mainText);
          setIsOpen(false);
          clearPredictions();
          setActiveIndex(-1);

          onAddressSelect({
            streetAddress: '',
            city: '',
            state: prediction.mainText,
            stateCode: '',
            zipCode: '',
            country: '',
            formattedAddress: prediction.description,
          });
          return;
        }

        const details = await getPlaceDetails(prediction.placeId);

        if (details?.address_components && details.formatted_address) {
          const parsed = parseAddressComponents(
            details.address_components,
            details.formatted_address
          );

          // For state-only results (no street address), show state name only
          // For full addresses, show the street address
          const hasRealStreet = parsed.streetAddress !== details.formatted_address;
          const displayValue = hasRealStreet
            ? parsed.streetAddress
            : parsed.state || details.formatted_address;
          setInputValue(displayValue);
          setIsOpen(false);
          clearPredictions();
          setActiveIndex(-1);

          const coordinates = details.geometry?.location
            ? {
                lat: details.geometry.location.lat(),
                lng: details.geometry.location.lng(),
              }
            : undefined;

          onAddressSelect(parsed, coordinates);

          // Pass timezone ID from Places API response
          if (onTimezoneResolved && details.timeZoneId) {
            onTimezoneResolved(details.timeZoneId);
          }
        }
      } catch (err) {
        console.error('Failed to get place details:', err);
      }
    },
    [
      skipPlaceDetails,
      getPlaceDetails,
      parseAddressComponents,
      onAddressSelect,
      onTimezoneResolved,
      clearPredictions,
    ]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setActiveIndex(-1);

    if (newValue.length >= 3) {
      setIsOpen(true);
      searchPlaces(newValue);
    } else {
      setIsOpen(false);
      clearPredictions();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || predictions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, predictions.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && predictions[activeIndex]) {
          handleSelect(predictions[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        clearPredictions();
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll active option into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeOption = listRef.current.children[activeIndex] as HTMLElement;
      if (activeOption) {
        activeOption.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [activeIndex]);

  // Clear input and reset parent fields
  const handleClear = () => {
    setInputValue('');
    clearPredictions();
    setIsOpen(false);
    inputRef.current?.focus();

    onAddressSelect(
      {
        streetAddress: '',
        city: '',
        state: '',
        stateCode: '',
        zipCode: '',
        country: '',
        formattedAddress: '',
      },
      undefined,
      true
    );
  };

  // Build class names
  const inputClassName = [
    styles.input,
    size === 'compact' && styles.inputCompact,
    error && styles.inputError,
    disabled && styles.inputDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
        ref={containerRef}
        className={`${styles.container} ${className || ''}`}
      >
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.requiredIndicator}>*</span>}
          </label>
        )}

        {/* Input */}
        <div className={styles.inputWrapper}>
          <MapPin size={16} className={styles.inputIcon} />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => predictions.length > 0 && setIsOpen(true)}
            placeholder={!isLoaded ? 'Loading...' : placeholder}
            disabled={disabled || !isLoaded}
            className={inputClassName}
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="address-predictions"
            aria-haspopup="listbox"
            autoComplete="off"
          />
          {inputValue && !disabled && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Clear input"
            >
              <X size={14} />
            </button>
          )}
          {loading && <Loader2 size={16} className={styles.loadingIcon} />}
        </div>

        {/* Predictions Dropdown */}
        {isOpen && predictions.length > 0 && (
          <div className={styles.dropdown}>
            <ul
              ref={listRef}
              id="address-predictions"
              className={styles.optionsList}
              role="listbox"
            >
              {predictions.map((prediction, index) => (
                <li
                  key={prediction.placeId}
                  onClick={() => handleSelect(prediction)}
                  className={`${styles.option} ${index === activeIndex ? styles.optionActive : ''}`}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <MapPin size={14} className={styles.optionIcon} />
                  <div className={styles.optionContent}>
                    <span className={styles.optionMain}>
                      {prediction.mainText}
                    </span>
                    <span className={styles.optionSecondary}>
                      {prediction.secondaryText}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* No results */}
        {isOpen &&
          !loading &&
          inputValue.length >= 3 &&
          predictions.length === 0 && (
            <div className={styles.dropdown}>
              <div className={styles.emptyItem}>{emptyMessage}</div>
            </div>
          )}

        {/* API Error */}
        {apiError && (
          <div className={styles.dropdown}>
            <div className={styles.errorItem}>{apiError}</div>
          </div>
        )}
      </div>
  );
};

export default AddressAutocomplete;

// Re-export types
export type { AddressComponents, AddressAutocompleteProps } from './types';
