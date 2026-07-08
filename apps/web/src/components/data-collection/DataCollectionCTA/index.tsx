'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';

import {
  container,
  ctaButtonWrapper,
  ctaDescription,
  ctaSection,
  ctaTitle,
} from './styles.css';

interface DataCollectionCTAProps {
  title?: string;
  description?: React.ReactNode;
}

const DEFAULT_TITLE = 'What If Every Data Point Told a Clearer Story?';

const DEFAULT_DESCRIPTION = (
  <>
    Stop struggling with scattered spreadsheets or outdated tools.{' '}
    <strong>S Cubed</strong> brings together powerful ABA data collection tools like multi-device access and goal tracking, giving your team one place to capture, measure, and understand progress. Built to scale with your practice, it supports every clinician, every session, every time.
    <br /><br />
    Request a demo and discover how simple and powerful data collection can be.
  </>
);

const DataCollectionCTA: React.FC<DataCollectionCTAProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={ctaSection}>
      <div className={container}>
        <motion.h2
        className={ctaTitle}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
        <motion.p
        className={ctaDescription}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {description}
      </motion.p>
        <motion.div
          className={ctaButtonWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CalendlyButton
            buttonText="Book a 20-Minute Demo"
            className={primaryButton}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DataCollectionCTA;
