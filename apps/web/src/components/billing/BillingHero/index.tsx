'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

import billingImg from '../../../images/Billing.jpg';
import billingBannerImg from '../../../images/billing-banner.png';
import CalendlyButton from '../CalendlyButton';
import { primaryButton } from '../CalendlyButton/styles.css';
import BillingMetrics from '../BillingMetrics';

import {
  backgroundImage,
  backgroundOverlay,
  bulletCard,
  bulletGrid,
  bulletIcon,
  bulletItem,
  bulletSection,
  bulletText,
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

const BillingHero: React.FC = () => {
  const bulletSectionRef = useRef<HTMLDivElement>(null);
  const isBulletSectionInView = useInView(bulletSectionRef, {
    once: true,
    margin: '-100px',
  });

  const bulletPoints = [
    {
      text: 'Time-sensitive authorizations',
      color: '#7a7eed', // Primary purple
    },
    {
      text: 'Multi-disciplinary coding',
      color: '#22d3ee', // Teal
    },
    {
      text: 'Payer-specific requirements and denials',
      color: '#34d399', // Green
    },
  ];

  // Animation variants for the bullet items
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardHoverVariants: Variants = {
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
      <section className={heroSection}>
        {/* Background Image */}
        <div className={backgroundImage}>
          <Image
            src={billingImg}
            alt="Professional billing and financial management for healthcare practices"
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
              Smarter ABA Billing Services for{' '}
                <span className={heroTitleHighlight}>ABA, OT, Speech,</span> and{' '}
                <span className={heroTitleHighlight}>
                School-Based Therapy Providers
                </span>
              </h1>
              <p className={heroDescription}>
                S Cubed specializes in Revenue Cycle Management (RCM) tailored
                for ABA, Occupational Therapy, Speech Therapy, Physical Therapy,
                and Counseling clinics. Whether you&apos;re a solo provider,
                school-based service, or a multi-location practice, our
                solutions simplify the entire billing lifecycle, so you can
                focus on care, not claims.
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
                alt="Professional billing and financial management for healthcare practices"
                src={billingBannerImg}
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

      <BillingMetrics />

      <section className={bulletSection} ref={bulletSectionRef}>
        <div className={heroContainer}>
          <motion.div
            className={bulletCard}
            initial={{ opacity: 0, y: 50 }}
            animate={isBulletSectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isBulletSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our experienced billing team understands the unique challenges of allied health and behavioral therapy billing services, including:
            </motion.h3>

            <motion.div
              className={bulletGrid}
              variants={containerVariants}
              initial="hidden"
              animate={isBulletSectionInView ? 'visible' : 'hidden'}
            >
              {bulletPoints.map((item, index) => (
                <motion.div
                  key={index}
                  className={bulletItem}
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <motion.div
                    className={bulletIcon}
                    style={{
                      background: `linear-gradient(135deg, ${item.color}33 0%, ${item.color}66 100%)`,
                      color: item.color,
                      borderColor: `${item.color}4D`,
                    }}
                    variants={cardHoverVariants}
                  >
                    <CheckCircle size={24} />
                  </motion.div>
                  <span className={bulletText}>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isBulletSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              From patient intake to payment posting, S Cubed ensures accuracy,
              compliance, and faster reimbursements.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BillingHero;
