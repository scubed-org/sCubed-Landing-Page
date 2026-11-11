import React from 'react';

import CompassDial from '../CompassDial';
import { ctaButton, sectionContainer } from '../shared.css';

import {
  dial,
  dialWrapper,
  eyebrow,
  heroBody,
  heroGrid,
  heroLede,
  heroSection,
  heroTitle,
  heroTitleHighlight,
  settlingNeedle,
} from './styles.css';

const contactEmail = process.env.NEXT_PUBLIC_EMAIL || '';
const contactHref = `mailto:${contactEmail}?subject=${encodeURIComponent(
  'The Clinical Compass Inquiry'
)}`;

const CompassHero: React.FC = () => (
  <section className={heroSection}>
    <div className={sectionContainer}>
      <div className={heroGrid}>
        <div>
          <p className={eyebrow}>Mentorship &amp; Fieldwork Experience Program</p>
          <h1 className={heroTitle}>
            The <span className={heroTitleHighlight}>Clinical Compass</span>
          </h1>
          <p className={heroLede}>
            Guiding Future Behavior Analysts Toward Clinical Excellence.
          </p>
          <p className={heroBody}>
            Your journey toward becoming a Board Certified Behavior Analyst
            (BCBA) deserves more than simply accumulating fieldwork hours. It
            deserves meaningful mentorship, structured learning, practical
            experience, and guidance from experienced professionals who are
            invested in your success.
          </p>
          <a href={contactHref} className={ctaButton}>
            Get in Touch
          </a>
        </div>
        <div className={dialWrapper}>
          <CompassDial
            variant="hero"
            className={dial}
            needleClassName={settlingNeedle}
          />
        </div>
      </div>
    </div>
  </section>
);

export default CompassHero;
