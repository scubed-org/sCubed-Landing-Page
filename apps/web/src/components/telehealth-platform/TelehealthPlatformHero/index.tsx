'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import telehealthBannerImg from '../../../images/telehealth-banner-banner.gif';
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

const TelehealthPlatformHero: React.FC = () => {
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
            Redefining Connection with HIPAA-Compliant <span className={heroTitleHighlight}>Telehealth Platforms
            </span>
            </h1>
            <div className={heroBanner}>            
            
              Bring your sessions online with secure video calls that feel personal and easy. <span className={actionWord}>S Cubed</span> Telehealth keeps care simple, private, and seamless - from scheduling to the session itself.
            </div>
            <p className={heroSubheadline}>
            You shouldn’t need three different tools to care for your clients.
            <br/>
            With <strong>S Cubed</strong> Telehealth, scheduling, reminders, and secure video live in one platform - so you can focus on people, not the logistics around them.
            <br/><br/>
            <span className={actionWord}>Fast to join. Simple to use. Built on trust.</span>
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
              alt="Telehealth Platform Banner"
              src={telehealthBannerImg}                            
              width={600}
              height={490}
              priority              
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                transformOrigin: 'top center',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TelehealthPlatformHero;