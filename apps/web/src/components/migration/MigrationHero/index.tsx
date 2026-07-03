'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import billingImg from '../../../images/Billing.jpg';
import MigrationBanner from '../../../images/migration/aba-software-migration.webp';
import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';
import {
  backgroundImage,
  backgroundOverlay,
  ctaSection,
  heroContainer,
  heroContent,
  heroDescription,
  heroImage,
  heroImageContent,
  heroSection,
  heroTextContent,
  heroTitle,
  heroTitleHighlight,
} from '../../data-collection/DataCollectionHero/styles.css';

const MigrationHero: React.FC = () => {
  return (
    <section className={heroSection}>
      <div className={backgroundImage}>
        <Image
          src={billingImg}
          alt="Switching ABA practice management software"
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity: 0.5,
          }}
          placeholder="blur"
          priority
          quality={75}
        />
        <div className={backgroundOverlay} />
      </div>
      <div className={heroContainer}>
        <div className={heroContent}>
          <motion.div
            className={heroTextContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className={heroTitle}>
              Switch Your{' '}
              <span className={heroTitleHighlight}>ABA Software</span> Without
              Losing Years of Data
            </h1>
            <p className={heroDescription}>
              Stuck on a platform that no longer fits your clinic? <strong>S Cubed</strong> moves your entire history — clients, staff, authorizations, sessions, and treatment plans — into one secure, all-in-one platform built by BCBAs who have actually run clinics.
              <br />
              <br />
              Book a 20-minute demo and we&apos;ll map out exactly how your switch would work.
            </p>
            <div className={ctaSection}>
              <div>
                <CalendlyButton
                  buttonText="Book a 20-Minute Demo"
                  className={primaryButton}
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            className={heroImageContent}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <Image
              alt="Secure ABA data migration into S Cubed"
              src={MigrationBanner}
              quality={75}
              placeholder="blur"
              width={2400}
              height={2000}
              priority
              sizes="(max-width: 480px) 100vw, (max-width: 968px) 800px, 1200px"
              className={heroImage}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MigrationHero;