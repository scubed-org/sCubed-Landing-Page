'use client';

import { Calendar, X } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { PopupModal } from 'react-calendly';

import {
  ctaBlock,
  ctaBlockBody,
  ctaBlockTitle,
  ctaButton,
  stickyDismiss,
  stickyLabel,
  stickyVisible,
  stickyWrap,
} from './styles.css';

/**
 * Booking CTA for the guide page.
 *
 * Uses the same Calendly popup the hero slider uses, so there is one booking
 * path on the site rather than two. With no NEXT_PUBLIC_CALENDLY_URL set it
 * degrades to a plain link to /get-started instead of rendering a dead button.
 *
 * The guide's whole promise is "there's no pitch in it", so the sticky version
 * stays hidden until the reader is a quarter of the way down, and it can be
 * dismissed for the rest of the session.
 */

const SCROLL_TRIGGER = 0.25; // show only once they're actually reading
const DISMISS_KEY = '90days-cta-dismissed';

function useCalendly() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL;

  useEffect(() => setMounted(true), []);

  return { isOpen, setIsOpen, mounted, url };
}

interface BookACallProps {
  readonly variant?: 'inline' | 'sticky';
  readonly label?: string;
}

const BookACall: React.FC<BookACallProps> = ({
  variant = 'inline',
  label = 'Book a 20-minute call',
}) => {
  const { isOpen, setIsOpen, mounted, url } = useCalendly();
  const [visible, setVisible] = useState(variant === 'inline');
  const [dismissed, setDismissed] = useState(false);

  // Restore a dismissal from earlier in the session.
  useEffect(() => {
    if (variant !== 'sticky') return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') setDismissed(true);
    } catch {
      // Private mode or blocked storage: just show it.
    }
  }, [variant]);

  useEffect(() => {
    if (variant !== 'sticky') return undefined;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setVisible(max > 0 && window.scrollY / max > SCROLL_TRIGGER);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [variant]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // Nothing to do; it just reappears next visit.
    }
  }, []);

  const open = useCallback(() => setIsOpen(true), [setIsOpen]);

  const trigger = url ? (
    <button type="button" className={ctaButton} onClick={open}>
      <Calendar size={18} aria-hidden="true" />
      {label}
    </button>
  ) : (
    <Link className={ctaButton} href="/get-started">
      <Calendar size={18} aria-hidden="true" />
      {label}
    </Link>
  );

  const modal =
    mounted && url && isOpen ? (
      <PopupModal
        url={url}
        rootElement={document.body}
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        prefill={{}}
      />
    ) : null;

  if (variant === 'sticky') {
    if (dismissed) return null;
    return (
      <>
        <div
          className={`${stickyWrap} ${visible ? stickyVisible : ''}`}
          aria-hidden={!visible}
        >
          <span className={stickyLabel}>Stuck on something?</span>
          {trigger}
          <button
            type="button"
            className={stickyDismiss}
            onClick={dismiss}
            aria-label="Hide this"
          >
            <X size={14} aria-hidden="true" />
          </button>
        </div>
        {modal}
      </>
    );
  }

  return (
    <div className={ctaBlock}>
      <h2 className={ctaBlockTitle}>Want to talk any of this through?</h2>
      <p className={ctaBlockBody}>
        Stephanie meant it about calling. If something in here applies to your
        situation and you want a second opinion from someone who has done it,
        book a time. It is a conversation, not a demo.
      </p>
      {trigger}
      {modal}
    </div>
  );
};

export default BookACall;
