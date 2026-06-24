'use client';

import { X } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import DynamicContentRenderer from '../DynamicContentRenderer';

import * as styles from './styles.css';

// Pixels of slack when deciding the reader has reached the bottom.
// Keep in sync with TermsAcknowledgement's SCROLL_END_THRESHOLD.
const SCROLL_END_THRESHOLD = 8;

interface TermsModalProps {
  readonly open: boolean;
  readonly title: string;
  readonly version: string;
  /** Already-sanitized Terms & Conditions HTML/markdown. */
  readonly content: string;
  readonly onClose: () => void;
  /** Called once the reader has seen all of the content (scrolled to the
   *  bottom, or the content fits without scrolling). Lets the inline checkout
   *  gate count reading done here. */
  readonly onReachedEnd: () => void;
}

/**
 * "View larger" reading view for the Terms & Conditions. Read-only: the accept
 * checkbox stays in the inline checkout. Reaching the bottom here satisfies the
 * inline scroll gate via onReachedEnd so users aren't forced to re-scroll the
 * small box.
 */
export default function TermsModal({
  open,
  title,
  version,
  content,
  onClose,
  onReachedEnd,
}: TermsModalProps) {
  const bodyRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
      if (scrollTop + clientHeight >= scrollHeight - SCROLL_END_THRESHOLD) {
        onReachedEnd();
      }
    },
    [onReachedEnd],
  );

  // When opened, if the larger body fits without scrolling, the reader has
  // already seen everything — mark it reviewed. Measure after layout/paint.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      const el = bodyRef.current;
      if (el && el.scrollHeight <= el.clientHeight + SCROLL_END_THRESHOLD) {
        onReachedEnd();
      }
    });
    return () => cancelAnimationFrame(id);
  }, [open, content, onReachedEnd]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeOnEsc
      closeOnOverlayClick
      showCloseIcon={false}
      classNames={{ modal: styles.termsModal, overlay: styles.termsModalOverlay }}
      ariaLabelledby="terms-modal-title"
    >
      <div className={styles.termsModalHeader}>
        <h2 id="terms-modal-title" className={styles.termsModalTitle}>
          {title}
          <span className={styles.termsModalVersion}>(v{version})</span>
        </h2>
        <button
          type="button"
          onClick={onClose}
          className={styles.termsModalClose}
          aria-label="Close Terms & Conditions"
        >
          <X size={22} aria-hidden="true" />
        </button>
      </div>

      <div
        ref={bodyRef}
        className={styles.termsModalBody}
        onScroll={handleScroll}
        tabIndex={0}
        role="region"
        aria-label="Terms and Conditions content"
      >
        <DynamicContentRenderer content={content} />
      </div>
    </Modal>
  );
}
