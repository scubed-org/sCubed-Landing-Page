'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import billingImg from '../../../images/Billing.jpg';
import Banner from '../../../images/authorization/authorization-banner.png';
import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';
import Workflow from '../Workflow';

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

const Hero: React.FC = () => {
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
              <span className={heroTitleHighlight}>
                Authorization
                </span> Management Built For Real-World Practice
              </h1>
              <p className={heroDescription}>
              Manage every approval in one place, track, renew, and connect what matters. 
No more denials, fewer scheduling surprises, and more time back for your team. 
Meet S Cubed, your prior authorization software with heart.
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
                alt="ABA authorization software interface"
                src={Banner}
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

      <Workflow />
    </>
  );
};

export default Hero;
