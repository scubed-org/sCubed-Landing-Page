'use client';

import React, { useEffect, useState } from 'react';
import { InlineWidget } from 'react-calendly';

import { embedFrame } from './styles.css';

/**
 * Inline Calendly scheduler for the bottom of /start.
 *
 * Every "Book a call" button on the page is a plain anchor to #book, so the
 * booking path works even before JavaScript loads. The widget itself renders
 * client-side only, and passes through any utm_* params from the ad click so
 * bookings can be traced back to the campaign.
 */

// The event itself, not the profile page: the profile page lists event types
// as cards, which get squeezed inside an inline embed.
const START_CALENDLY_URL = 'https://calendly.com/scubed-info/30min';

interface UtmParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

function readUtmParams(): UtmParams {
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => params.get(key) ?? undefined;
  return {
    utmSource: pick('utm_source'),
    utmMedium: pick('utm_medium'),
    utmCampaign: pick('utm_campaign'),
    utmContent: pick('utm_content'),
    utmTerm: pick('utm_term'),
  };
}

const BookingEmbed: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [utm, setUtm] = useState<UtmParams>({});
  const url = START_CALENDLY_URL;

  useEffect(() => {
    setUtm(readUtmParams());
    setMounted(true);
  }, []);

  return (
    <div className={embedFrame}>
      {mounted ? (
        <InlineWidget
          url={url}
          utm={utm}
          styles={{ height: '100%', minWidth: '280px' }}
          pageSettings={{
            hideGdprBanner: true,
            // The event details panel squeezes the calendar; the section
            // heading already says what the call is.
            hideEventTypeDetails: true,
            hideLandingPageDetails: true,
          }}
          iframeTitle="Book a free 20-minute demo of S Cubed"
        />
      ) : (
        <p>
          Loading the calendar. If it does not appear,{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            open the booking page
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default BookingEmbed;
