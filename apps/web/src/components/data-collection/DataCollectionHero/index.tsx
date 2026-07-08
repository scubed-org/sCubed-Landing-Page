'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import billingImg from '../../../images/Billing.jpg';
import DataCollectionBanner from '../../../images/data-collection/data-collection-banner.jpg';
import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';
import FeaturesCarousel from '../FeaturesCarousel';

import {
  backgroundImage,
  backgroundOverlay,
  ctaSection,
  heroContainer,
  heroContent,
  heroDescription,
  heroValueStack,
  heroTrustBar,
  heroImage,
  heroImageContent,
  heroSection,
  heroTextContent,
  heroTitle,
  heroTitleHighlight,
} from './styles.css';

const DataCollectionHero: React.FC = () => {
  return (
    <>
      <section className={heroSection}>
        {/* Background Image */}
        <div className={backgroundImage}>
          <Image
            src={billingImg}
            alt="Professional data collection and therapy management"
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
              The Next-Gen{' '}
                <span className={heroTitleHighlight}>
                ABA Data Collection Software
                </span>{' '}
                Built for Real Therapy Work
              </h1>
              <p className={heroDescription}>
                Track goals, behaviors, and session progress in real time with <strong>S Cubed</strong> - the all-in-one data collection platform made for behavior analysis and therapy practices. From session logging to visual reports, everything you need happens in one secure, easy-to-use place.
              </p>

              {/* NEW: value stack — add this right after the description */}
              <p className={heroValueStack}>
                Real-time session logging &nbsp;·&nbsp; Every ABA data method &nbsp;·&nbsp; Audit-ready reports &nbsp;·&nbsp; Built by BCBAs
              </p>

              {/* NEW: trust bar */}
              <p className={heroTrustBar}>
                ✓ HIPAA-Grade Security ✓ Built by BCBAs ✓ Made for ABA Clinics
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
                alt="ABA data collection software interface"
                src={DataCollectionBanner}
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

      <FeaturesCarousel />
    </>
  );
};

export default DataCollectionHero;
