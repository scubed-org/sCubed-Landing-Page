import React from 'react';

import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';

import {
  ctaActions,
  ctaContainer,
  ctaContent,
  ctaDescription,
  ctaSection,
  ctaSubtitle,
  ctaTitle,
} from './style.css';

const CTAFeatures: React.FC = () => {
  return (
    <section className={ctaSection}>
      <div className={ctaContainer}>
        <div className={ctaContent}>
          <h2 className={ctaTitle}>
            Designed to Let You Focus on What Matters Most
          </h2>

          <p className={ctaSubtitle}>
            From scheduling and documentation to billing and reporting, S Cubed
            handles the administrative load so you can focus on care, progress,
            and impact. Developed with flexibility and compliance at its core,
            it empowers clinicians, therapists, educators, and administrators to
            work with clarity, confidence, and efficiency.
          </p>

          <p
            className={ctaDescription}
            style={{ fontWeight: 600, marginTop: '24px' }}
          >
            Experience the difference of streamlined practice management - built
            for the demands of clinical and educational settings.
          </p>

          <div className={ctaActions}>
            <CalendlyButton
              className={primaryButton}
              buttonText="Book a 20-Minute Demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFeatures;
