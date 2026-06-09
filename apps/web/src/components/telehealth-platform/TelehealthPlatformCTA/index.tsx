'use client';

import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';

import {
  backgroundPattern,
  ctaButtonWrapper,
  ctaContainer,
  ctaContent,
  ctaDescription,
  ctaSection,
  ctaTitle,
} from './styles.css';

const TelehealthPlatformCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  return (
    <section className={ctaSection} ref={sectionRef}>
      <div className={ctaContainer}>
        <div className={ctaContent}>
          <div className={backgroundPattern} />
          <motion.h2
            className={ctaTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Built for Care That Never Loses Its Human Touch
          </motion.h2>
          <motion.p
            className={ctaDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Behind every secure connection is technology that understands how care really happens. S Cubed handles the scheduling, reminders, and compliance so you can stay focused on people, not processes.
Deliver confident, compassionate care, anywhere, anytime.
          </motion.p>
          <motion.div
            className={ctaButtonWrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <CalendlyButton
              buttonText="Book a 20-Minute Demo"
              className={primaryButton}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TelehealthPlatformCTA;