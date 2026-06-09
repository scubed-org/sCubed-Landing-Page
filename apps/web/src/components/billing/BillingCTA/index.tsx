import React from 'react';

import CalendlyButton from '../CalendlyButton';
import { primaryButton } from '../CalendlyButton/styles.css';

import {
  ctaButtonWrapper,
  ctaContainer,
  ctaContent,
  ctaDescription,
  ctaSection,
  ctaTitle,
} from './styles.css';

const BillingCTA: React.FC = () => {
  return (
    <section className={ctaSection}>
      <div className={ctaContainer}>
        <div className={ctaContent}>
          <h2 className={ctaTitle}>S Cubed in Action</h2>
          <p className={ctaDescription}>
            Let us show you how we can help your team spend less time on
            billing, and more time on care.
          </p>
          <div className={ctaButtonWrapper}>
            <CalendlyButton
              buttonText="Book a 20-Minute Demo"
              className={primaryButton}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingCTA;
