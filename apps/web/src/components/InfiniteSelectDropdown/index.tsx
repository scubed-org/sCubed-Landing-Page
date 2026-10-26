'use client';

import { Loader2, Search, X } from 'lucide-react';
import {
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import * as styles from './styles.css';

interface Option {
  id: string | number;
  name: string;
}

interface InfiniteSelectDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onSearch?: (query: string) => void;
  searchable?: boolean;
  className?: string;
  error?: boolean;
  /** Size variant: 'default' (56px) or 'compact' (42px) */
  size?: 'default' | 'compact';
}

export const InfiniteSelectDropdown: FC<InfiniteSelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  loading = false,
  hasMore = false,
  onLoadMore,
  onSearch,
  searchable = true,
  className,
  error = false,
  size = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find selected option label
  const selectedOption = options.find(
    (opt) => opt.id.toString() === value.toString(),
  );

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      // Small delay to ensure dropdown is rendered
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, searchable]);

  // Infinite scroll detection - pre-fetch early for seamless experience
  // Each option row is approximately 44px (12px padding top + 12px bottom + text)
  // Pre-fetch when ~100 rows remain (100 * 44 = 4400px from bottom)
  const ITEM_HEIGHT_ESTIMATE = 44;
  const PREFETCH_ITEMS_REMAINING = 100;
  const PREFETCH_THRESHOLD = ITEM_HEIGHT_ESTIMATE * PREFETCH_ITEMS_REMAINING;

  const handleScroll = useCallback(() => {
    if (!listRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Trigger load when approximately 100 items remain to scroll
    if (distanceFromBottom < PREFETCH_THRESHOLD) {
      onLoadMore?.();
    }
  }, [loading, hasMore, onLoadMore]);

  // Handle search change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Handle option selection
  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchQuery('');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Filter options locally if no server-side search
  const displayedOptions = onSearch
    ? options
    : options.filter((opt) =>
        opt.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  // Build trigger class names
  const triggerClassName = [
    styles.trigger,
    size === 'compact' && styles.triggerCompact,
    isOpen && styles.triggerOpen,
    error && styles.triggerError,
    disabled && styles.triggerDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={`${styles.container} ${className || ''}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={triggerClassName}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          className={
            selectedOption ? styles.selectedText : styles.placeholderText
          }
        >
          {selectedOption?.name || placeholder}
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className={styles.dropdown}>
          {/* Search Input */}
          {searchable && (
            <div className={styles.searchContainer}>
              <Search size={14} className={styles.searchIcon} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search..."
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className={styles.clearButton}
                >
                  <X size={12} />
                </button>
              )}
            </div>
          )}

          {/* Options List */}
          <ul
            ref={listRef}
            className={styles.optionsList}
            onScroll={handleScroll}
            role="listbox"
          >
            {displayedOptions.map((option) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option.id.toString())}
                className={`${styles.option} ${
                  value.toString() === option.id.toString()
                    ? styles.optionSelected
                    : ''
                }`}
                role="option"
                aria-selected={value.toString() === option.id.toString()}
              >
                {option.name}
              </li>
            ))}

            {/* Loading indicator */}
            {loading && (
              <li className={styles.loadingItem}>
                <Loader2 size={16} className={styles.spinner} />
                Loading...
              </li>
            )}

            {/* Empty state */}
            {!loading && displayedOptions.length === 0 && (
              <li className={styles.emptyItem}>No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfiniteSelectDropdown;
