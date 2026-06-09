import React from 'react';

import CalendlyWidget from '../../CalendlyWidget';

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
            <CalendlyWidget
              buttonColor="#fff"
              buttonBackground="#7a7eed"
              buttonWidth="270px"
              buttonText="BOOK A 20-MINUTE DEMO"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFeatures;
