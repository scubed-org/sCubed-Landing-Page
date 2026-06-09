'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import guardianPortalImg from '../../../images/guardian-portal.png';
import CalendlyButton from '../../billing/CalendlyButton';
import { primaryButton } from '../../billing/CalendlyButton/styles.css';

import {
  actionWord,
  brandHighlight,
  ctaSection,
  heroBanner,
  heroContainer,
  heroContent,
  heroImageContent,
  heroSection,
  heroSubheadline,
  heroTextContent,
  heroTitle,
  heroTitleHighlight,
  mobileButton
} from './styles.css';

const GuardianHero: React.FC = () => {
  return (
    <section className={heroSection}>
      <div className={heroContainer}>
        <div className={heroContent}>
          <motion.div
            className={heroTextContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className={heroTitle}>
              Your <span className={heroTitleHighlight}>Child&apos;s Care</span>, Just a Click Away
            </h1>
            <div className={heroBanner}>
              <span className={actionWord}>Stay informed</span>, <span className={actionWord}>stay involved</span>, and <span className={actionWord}>stay connected</span> – anytime, anywhere – with our secure <span className={brandHighlight}>Guardian Portal</span>.
            </div>
            <p className={heroSubheadline}>
              Our Guardian Portal is built to keep families engaged in their child&apos;s care journey. 
              It gives guardians secure, real-time access to everything they need. It simplifies communication, 
              progress tracking and appointments management so that guardians stay informed every step of the way.
            </p>
            <div className={ctaSection}>
              <CalendlyButton
                buttonText="Book a 20-Minute Demo"
                className={`${primaryButton} ${mobileButton}`}
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
              alt="Guardian Portal Dashboard Interface"
              src={guardianPortalImg}
              quality={75}
              placeholder="blur"
              width={2400}
              height={1600}
              priority
              sizes="(max-width: 480px) 100vw, (max-width: 968px) 800px, 1200px"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                transform: 'scale(1.15)',
                transformOrigin: 'top center',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GuardianHero;