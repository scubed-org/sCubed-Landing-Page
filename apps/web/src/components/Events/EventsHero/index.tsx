'use client';

import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';
import React from 'react';

import {
  bannerContainer,
  bannerContent,
  bannerDescription,
  bannerIcon,
  bannerPattern,
  bannerSection,
  bannerTextContent,
  bannerTitle,
  bannerTitleHighlight,
  bannerTitleWrapper,
  bannerUnderline,
} from './styles.css';

const EventsHero: React.FC = () => {
  return (
    <section className={bannerSection}>
      <div className={bannerPattern} />

      <div className={bannerContainer}>
        <motion.div
          className={bannerContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className={bannerTextContent}>
            <motion.div
              className={bannerTitleWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            >
              <h1 className={bannerTitle}>
                <motion.span
                  className={bannerIcon}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                  style={{
                    display: 'inline-flex',
                    marginRight: '16px',
                    verticalAlign: 'middle',
                    marginBottom: 0
                  }}
                >
                  <Calendar size={32} />
                </motion.span>
                Events & <span className={bannerTitleHighlight}>News</span>
              </h1>
              <motion.div
                className={bannerUnderline}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              />
            </motion.div>
            <motion.p
              className={bannerDescription}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              Stay connected with the latest innovations in ABA therapy practice management.
              Join us for exclusive conferences, webinars, and training sessions.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsHero;