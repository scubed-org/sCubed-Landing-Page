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
} from '../../data-collection/DataCollectionCTA/styles.css';

const MigrationCTA: React.FC = () => {
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
          Ready to Leave Your Old ABA Software Behind?
        </motion.h2>
        <motion.p
          className={ctaDescription}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Switching platforms doesn&apos;t have to mean lost data, downtime, or a painful setup. <strong>S Cubed</strong> handles your migration for you and gets your clinic running fast — with your full history intact and audit-ready from day one.
          <br />
          <br />
          Book a 20-minute demo and see how simple switching can be.
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

export default MigrationCTA;