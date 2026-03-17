'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { colors, spacing } from '../../../styles/tokens.css';

import {
  buyNowButton,
  comparisonContainer,
  comparisonSection,
  comparisonTable,
  comparisonTitle,
  discountBadgeSmall,
  discountedPriceSmall,
  expandButton,
  featureCategory,
  featureCategoryTitle,
  featureCell,
  featureName,
  featureRow,
  headerCell,
  mobileCard,
  mobileCardHeader,
  mobileFeatureItem,
  mobileFeatureList,
  originalPriceSmall,
  planHeader,
  priceContainer,
  sectionDescription,
} from './styles.css';

import Tooltip from '@/components/common/Tooltip';

interface Feature {
  name: string;
  description?: string;
  starter: boolean | string;
  essential: boolean | string;
  growth: boolean | string;
}

interface FeatureSection {
  category: string;
  features: Feature[];
}

const featureComparison: FeatureSection[] = [
  {
    category: 'Core Features',
    features: [
      {
        name: 'Unlimited Clients',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Documentation',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Security (HIPAA-Grade)',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Reminders & Tasks',
        starter: true,
        essential: true,
        growth: true,
      },
    ],
  },
  {
    category: 'Scheduling & Communication',
    features: [
      {
        name: 'Appointment Scheduling',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Custom & Free Templates for Session Notes',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Smart Dashboard (Advanced, Customizable)',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Messaging (Staff & Client)',
        starter: true,
        essential: true,
        growth: true,
      },
    ],
  },
  {
    category: 'Data & Reports',
    features: [
      {
        name: 'Reports & Graphs',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Data Collection',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Behavior Tracking',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'VB-MAPP',
        description:
          'Comprehensive assessment tool for tracking language and social skills development in children with autism',
        starter: 'Add-on $15/year per client',
        essential: 'Add-on $15/year per client',
        growth: 'Add-on $15/year per client',
      },
    ],
  },
  {
    category: 'Access & Support',
    features: [
      {
        name: 'Custom Roles & Permissions (Hierarchical)',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'In-App Notifications & Email',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Support & Training',
        starter: true,
        essential: true,
        growth: true,
      },
      {
        name: 'Mobile App & Tablet Support',
        starter: true,
        essential: true,
        growth: true,
      },
    ],
  },
  {
    category: 'Advanced Features',
    features: [
      {
        name: 'Clock In, Clock Out',
        description:
          'Track staff hours with GPS verification, automatic timesheets, and payroll-ready reports',
        starter: 'Add-on $9/month',
        essential: true,
        growth: true,
      },
      {
        name: 'Guardian Portal',
        description:
          'Secure family portal for viewing progress reports, session notes, and direct communication with therapists',
        starter: 'Add-on $19/month',
        essential: true,
        growth: true,
      },
      {
        name: 'Billing Portal',
        description:
          'Electronic claims submission to insurance companies with automated eligibility checks and clearinghouse integration',
        starter: 'Add-on $49/month',
        essential: 'Add-on $49/month',
        growth: true,
      },
      {
        name: 'Telehealth/HIPAA Compliant Meetings',
        description:
          'Secure video conferencing with screen sharing, session recording, and waiting room features for remote therapy sessions',
        starter: 'Add-on $99/month',
        essential: 'Add-on $99/month',
        growth: 'Add-on $99/month',
      },
      {
        name: 'Full Revenue Cycle Management',
        description:
          'End-to-end billing service including claims submission, denial management, payment posting, and revenue optimization',
        starter: 'Add-on $499/month',
        essential: 'Add-on $499/month',
        growth: 'Add-on $499/month',
      },
    ],
  },
];

const PricingComparison: React.FC = () => {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Core Features',
  ]);

  const handleBuyNow = (plan: string) => {
    // Navigate to subscribe page with plan and billing cycle (defaulting to yearly as shown in table)
    const params = new URLSearchParams({
      plan: plan.toLowerCase(),
      billing: 'yearly',
    });

    router.push(`/subscribe?${params.toString()}`);
  };

  const toggleSection = (category: string) => {
    setExpandedSections((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const renderFeatureValue = (value: boolean | string | undefined) => {
    if (value === undefined) {
      return <Minus size={20} style={{ color: colors.neutral[400] }} />;
    }
    if (value === true) {
      return <Check size={20} style={{ color: colors.accent.green }} />;
    }
    if (value === false) {
      return <Minus size={20} style={{ color: colors.neutral[400] }} />;
    }
    return (
      <span style={{ fontSize: '12px', color: colors.primary[600] }}>
        {value}
      </span>
    );
  };

  return (
    <section className={comparisonSection}>
      <div className={comparisonContainer}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={comparisonTitle}>
            Complete{' '}
            <span style={{ color: '#7a7eed' }}>Feature Comparison</span>
          </h2>
          <p className={sectionDescription}>
            See everything included in each plan, plus available add-ons to
            customize your experience.
          </p>

          {/* Desktop Table View */}
          <div className={comparisonTable}>
            <div
              className={featureRow}
              style={{
                position: 'sticky',
                top: 0,
                background: colors.white,
                zIndex: 10,
              }}
            >
              <div className={headerCell}>Features</div>
              <div className={planHeader}>
                <strong>Starter</strong>
                <div className={priceContainer}>
                  <span className={originalPriceSmall}>$228/year</span>
                  <span className={discountedPriceSmall}>$195/year</span>
                  <span className={discountBadgeSmall}>(15% off)</span>
                </div>
                <button
                  className={buyNowButton}
                  onClick={() => handleBuyNow('Starter')}
                >
                  Buy Now
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className={planHeader}>
                <strong>Essential</strong>
                <div className={priceContainer}>
                  <span className={originalPriceSmall}>$468/year</span>
                  <span className={discountedPriceSmall}>$395/year</span>
                  <span className={discountBadgeSmall}>(15% off)</span>
                </div>
                <button
                  className={buyNowButton}
                  onClick={() => handleBuyNow('Essential')}
                >
                  Buy Now
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className={planHeader}>
                <strong>Growth</strong>
                <div className={priceContainer}>
                  <span className={originalPriceSmall}>$708/year</span>
                  <span className={discountedPriceSmall}>$595/year</span>
                  <span className={discountBadgeSmall}>(16% off)</span>
                </div>
                <button
                  className={buyNowButton}
                  onClick={() => handleBuyNow('Growth')}
                >
                  Buy Now
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {featureComparison.map((section) => (
              <div key={section.category} className={featureCategory}>
                <button
                  className={expandButton}
                  onClick={() => toggleSection(section.category)}
                >
                  <span className={featureCategoryTitle}>
                    {section.category}
                  </span>
                  {expandedSections.includes(section.category) ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </button>

                {expandedSections.includes(section.category) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    {section.features.map((feature) => (
                      <div key={feature.name} className={featureRow}>
                        <div className={featureName}>
                          {feature.description ? (
                            <>
                              {feature.name.substring(0, feature.name.lastIndexOf(' '))}{' '}
                              <span style={{ whiteSpace: 'nowrap' }}>
                                {feature.name.substring(feature.name.lastIndexOf(' ') + 1)}{' '}
                                <Tooltip content={feature.description} />
                              </span>
                            </>
                          ) : (
                            feature.name
                          )}
                        </div>
                        <div className={featureCell}>
                          {renderFeatureValue(feature.starter)}
                        </div>
                        <div className={featureCell}>
                          {renderFeatureValue(feature.essential)}
                        </div>
                        <div className={featureCell}>
                          {renderFeatureValue(feature.growth)}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Card View */}
          <div className={mobileCard}>
            {['Starter', 'Essential', 'Growth'].map((plan) => (
              <div key={plan} style={{ marginBottom: spacing.lg }}>
                <div className={mobileCardHeader}>
                  <h3>{plan}</h3>
                  <div className={priceContainer}>
                    <span className={originalPriceSmall}>
                      $
                      {plan === 'Starter'
                        ? '228'
                        : plan === 'Essential'
                          ? '468'
                          : '708'}
                      /year
                    </span>
                    <span className={discountedPriceSmall}>
                      $
                      {plan === 'Starter'
                        ? '195'
                        : plan === 'Essential'
                          ? '395'
                          : '595'}
                      /year
                    </span>
                    <span className={discountBadgeSmall}>
                      ({plan === 'Growth' ? '16' : '15'}% off)
                    </span>
                  </div>
                </div>
                <button
                  className={buyNowButton}
                  onClick={() => handleBuyNow(plan)}
                >
                  Buy Now
                  <ArrowRight size={16} />
                </button>
                <div className={mobileFeatureList}>
                  {featureComparison.map((section) => (
                    <div key={section.category}>
                      <h4>{section.category}</h4>
                      {section.features.map((feature) => (
                        <div key={feature.name} className={mobileFeatureItem}>
                          <span>
                            {feature.description ? (
                              <>
                                {feature.name.substring(0, feature.name.lastIndexOf(' '))}{' '}
                                <span style={{ whiteSpace: 'nowrap' }}>
                                  {feature.name.substring(feature.name.lastIndexOf(' ') + 1)}{' '}
                                  <Tooltip content={feature.description} />
                                </span>
                              </>
                            ) : (
                              feature.name
                            )}
                          </span>
                          <span>
                            {renderFeatureValue(
                              feature[plan.toLowerCase() as keyof Feature],
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingComparison;
