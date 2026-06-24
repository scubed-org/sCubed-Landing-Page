'use client';

import DOMPurify from 'isomorphic-dompurify';
import { AlertCircle, ArrowDown, Check, Maximize2 } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import DynamicContentRenderer from '../DynamicContentRenderer';

import TermsModal from './TermsModal';
import * as styles from './styles.css';

import type { PublicTermsView } from '@/types/subscription';

interface TermsAcknowledgementProps {
  readonly terms: PublicTermsView | null;
  readonly loading: boolean;
  readonly error: string | null;
  readonly accepted: boolean;
  readonly onAcceptedChange: (accepted: boolean) => void;
  readonly onRetry: () => void;
}

// Pixels of slack when deciding the user has scrolled to the bottom.
const SCROLL_END_THRESHOLD = 8;

/**
 * Inline Terms & Conditions gate for paid checkout.
 *
 * Renders the active T&C version in a scrollable box and forces the user to
 * scroll to the end before the "I agree" checkbox becomes enabled. When the
 * content is too short to scroll, the checkbox is enabled immediately so short
 * terms aren't a dead end. Loading and error/no-terms states block checkout,
 * matching the backend's fail-closed behavior.
 */
export default function TermsAcknowledgement({
  terms,
  loading,
  error,
  accepted,
  onAcceptedChange,
  onRetry,
}: TermsAcknowledgementProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Sanitize server-controlled content as defense-in-depth: DynamicContentRenderer
  // uses rehype-raw, which renders raw HTML.
  const sanitizedContent = useMemo(
    () => (terms?.content ? DOMPurify.sanitize(terms.content) : ''),
    [terms?.content],
  );

  // If the rendered content is too short to scroll, don't trap the user.
  const checkScrollable = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight <= el.clientHeight + SCROLL_END_THRESHOLD) {
      setHasReachedEnd(true);
    }
  }, []);

  // Reset the gate whenever the active terms version changes (e.g. after a
  // stale-version refetch) so the user must re-scroll the new content.
  useEffect(() => {
    setHasReachedEnd(false);
  }, [terms?.id]);

  // Re-evaluate scrollability once content is rendered and on any size change.
  useEffect(() => {
    if (!terms) return;
    checkScrollable();

    const el = scrollRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => checkScrollable());
    observer.observe(el);
    return () => observer.disconnect();
  }, [terms, sanitizedContent, checkScrollable]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - SCROLL_END_THRESHOLD) {
      setHasReachedEnd(true);
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.termsSection}>
        <div className={styles.termsLoading}>
          <span className={styles.termsSpinner} />
          <span>Loading Terms &amp; Conditions...</span>
        </div>
      </div>
    );
  }

  if (error || !terms) {
    return (
      <div className={styles.termsSection}>
        <div className={styles.termsErrorBox}>
          <AlertCircle size={24} />
          <span>
            {error ||
              'Terms & Conditions are currently unavailable. You must accept them to continue.'}
          </span>
          <button
            type="button"
            onClick={onRetry}
            className={styles.termsRetryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const consentStateClass = accepted
    ? styles.termsConsentAccepted
    : hasReachedEnd
      ? styles.termsConsentReady
      : styles.termsConsentDisabled;

  return (
    <div className={styles.termsSection}>
      <div className={styles.termsHeader}>
        <span className={styles.termsHeaderTitle}>
          {terms.title}
          <span className={styles.termsVersion}>(v{terms.version})</span>
        </span>
        <button
          type="button"
          className={styles.termsExpandButton}
          onClick={() => setExpanded(true)}
          aria-label="Expand Terms & Conditions to a larger view"
          title="Expand"
        >
          <Maximize2 size={16} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.termsScrollWrapper}>
        <div
          ref={scrollRef}
          className={styles.scrollableTerms}
          onScroll={handleScroll}
          tabIndex={0}
          role="region"
          aria-label="Terms and Conditions content"
        >
          <DynamicContentRenderer content={sanitizedContent} />
        </div>
        {!hasReachedEnd && (
          <div className={styles.termsScrollFade} aria-hidden="true" />
        )}
      </div>

      <div
        id="terms-scroll-hint"
        className={`${styles.termsStatus} ${
          hasReachedEnd ? styles.termsStatusDone : styles.termsStatusPending
        }`}
        aria-live="polite"
      >
        {hasReachedEnd ? (
          <>
            <Check size={16} aria-hidden="true" />
            <span>You&apos;ve reviewed the full Terms &amp; Conditions</span>
          </>
        ) : (
          <>
            <ArrowDown size={16} aria-hidden="true" />
            <span>Scroll to the bottom to continue</span>
          </>
        )}
      </div>

      <label className={`${styles.termsConsent} ${consentStateClass}`}>
        <input
          type="checkbox"
          className={styles.termsCheckbox}
          checked={accepted}
          disabled={!hasReachedEnd}
          onChange={(e) => onAcceptedChange(e.target.checked)}
          aria-describedby={!hasReachedEnd ? 'terms-scroll-hint' : undefined}
        />
        <span className={styles.termsConsentText}>
          I have read and agree to the Terms &amp; Conditions
        </span>
      </label>

      <TermsModal
        open={expanded}
        title={terms.title}
        version={terms.version}
        content={sanitizedContent}
        onClose={() => setExpanded(false)}
        onReachedEnd={() => setHasReachedEnd(true)}
      />
    </div>
  );
}
