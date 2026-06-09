'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import billingImg from '../../../images/Billing.jpg';
import dataCollectionImg from '../../../images/scheduling/hero.jpg';
import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';
import FeaturesCarousel from '../Carousel/index';

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
              Smart ABA Therapy{' '}
                <span className={heroTitleHighlight}>
                  Scheduling 
                </span>{' '}
                Software
              </h1>
              <p className={heroDescription}>
              Our therapy appointment software is built to handle the complexities of therapy work like shifting availability, recurring sessions, and urgent changes. Scheduling you can rely on because care can't afford delays.
              </p>
              <div className={ctaSection}>
                <CalendlyButton
                  buttonText="Book a 20-Minute Demo"
                  className={primaryButton}
                />
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
                src={dataCollectionImg}
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

      
    </>
  );
};

export default DataCollectionHero;
