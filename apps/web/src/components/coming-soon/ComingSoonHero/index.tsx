'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import {
  badge,
  ctaGroup,
  decorCircle,
  description,
  heroContent,
  heroSection,
  iconContainer,
  primaryButton,
  secondaryButton,
  title,
  titleAccent,
  titleSecondLine,
} from './styles.css';

const featureNames: Record<string, string> = {
  rcm: 'Revenue Cycle Management',
  'vb-mapp': 'VB-MAPP Assessment Builder',
};

export default function ComingSoonHero() {
  const searchParams = useSearchParams();
  const featureKey = searchParams.get('feature') || '';
  const featureName = featureNames[featureKey] || 'This Feature';

  return (
    <section className={heroSection}>
      {/* Decorative circles */}
      <div
        className={decorCircle}
        style={{ width: 300, height: 300, top: -80, right: -60 }}
      />
      <div
        className={decorCircle}
        style={{
          width: 200,
          height: 200,
          bottom: -40,
          left: -40,
          animationDelay: '2s',
        }}
      />

      <motion.div
        className={heroContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={iconContainer}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Rocket size={36} />
        </motion.div>

        <motion.div
          className={badge}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Clock size={14} />
          Coming Soon
        </motion.div>

        <h1 className={title}>
          <span className={titleAccent}>{featureName}</span>{' '}
          <span className={titleSecondLine}>is on its way</span>
        </h1>

        <p className={description}>
          We are working hard to bring you this feature. Stay tuned for updates!
        </p>

        <div className={ctaGroup}>
          <Link href="/pricing" className={secondaryButton}>
            <ArrowLeft size={16} />
            Back to Pricing
          </Link>
          <Link href="/get-started" className={primaryButton}>
            Start Free Trial
            <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
