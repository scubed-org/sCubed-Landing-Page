'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, Minus, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


import { findPlan, formatMoney } from '../../../lib/pricing-helpers';
import type { PlanApiData } from '../../../types/subscription';

import {
  billingToggle,
  billingToggleActive,
  billingToggleOption,
  discountedAmount,
  discountedPrice,
  discountPercentage,
  featuresGrid,
  featuresTitle,
  originalPrice,
  planCard,
  planCardPopular,
  planCTA,
  planCTAPopular,
  planDescription,
  planFeature,
  planFeatureHighlight,
  planFeatureIcon,
  planName,
  planPrice,
  planPriceAmount,
  planPricePeriod,
  planPriceWrapper,
  plansContainer,
  plansGrid,
  plansWrapper,
  popularBadge,
  savingBadge,
} from './styles.css';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  isPopular?: boolean;
  ctaText: string;
  savings?: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for small practices just getting started',
    monthlyPrice: 19,
    yearlyPrice: 195,
    savings: '15% off',
    features: [
      { text: 'Unlimited Clients', included: true },
      { text: 'HIPAA-Grade Security', included: true },
      { text: 'Appointment Scheduling', included: true },
      { text: 'Documentation & Session Notes', included: true },
      { text: 'Mobile App Support', included: true },
    ],
    ctaText: 'Buy Now',
  },
  {
    name: 'Essential',
    description: 'Most popular for growing therapy practices',
    monthlyPrice: 39,
    yearlyPrice: 395,
    savings: '15% off',
    isPopular: true,
    features: [
      { text: 'Everything in Starter, plus:', included: true },
      { text: 'Guardian Portal', included: true },
      { text: 'Clock In, Clock Out', included: true },
      { text: 'Smart Dashboard', included: true },
    ],
    ctaText: 'Buy Now',
  },
  {
    name: 'Growth',
    description: 'Complete solution for multi-location practices',
    monthlyPrice: 59,
    yearlyPrice: 595,
    savings: '16% off',
    features: [
      { text: 'Everything in Essential, plus:', included: true },
      { text: 'Billing Portal', included: true },
      { text: 'Advanced Analytics', included: true },
    ],
    ctaText: 'Buy Now',
  },
];

interface PricingPlansProps {
  apiPlans?: PlanApiData[] | null;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ apiPlans = null }) => {
  const resolvedPlans: PricingPlan[] = plans.map((plan) => {
    const apiPlan = findPlan(apiPlans, plan.name.toLowerCase());
    if (!apiPlan) {
      return plan;
    }
    const monthly = formatMoney(apiPlan.monthly_price_per_staff);
    const yearly = formatMoney(apiPlan.discounted_yearly_price_per_staff);
    return {
      ...plan,
      monthlyPrice: monthly ?? plan.monthlyPrice,
      yearlyPrice: yearly ?? plan.yearlyPrice,
    };
  });

  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly',
  );

  const handlePlanSelect = (planName: string) => {
    // Navigate to subscribe page with plan and billing cycle as URL params
    const params = new URLSearchParams({
      plan: planName.toLowerCase(),
      billing: billingPeriod,
    });

    router.push(`/subscribe?${params.toString()}`);
  };

  return (
    <section className={plansWrapper}>
      <div className={plansContainer}>
        {/* Billing Toggle */}
        <div className={billingToggle}>
          <button
            className={`${billingToggleOption} ${
              billingPeriod === 'monthly' ? billingToggleActive : ''
            }`}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={`${billingToggleOption} ${
              billingPeriod === 'yearly' ? billingToggleActive : ''
            }`}
            onClick={() => setBillingPeriod('yearly')}
          >
            Yearly
            <span className={savingBadge}>Save up to 16%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className={plansGrid}>
          {resolvedPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.isPopular ? planCardPopular : planCard}
            >
              {plan.isPopular && (
                <div className={popularBadge}>
                  <Star size={16} />
                  Most Popular
                </div>
              )}

              <div className={planName}>{plan.name}</div>
              <p className={planDescription}>{plan.description}</p>

              <div className={planPriceWrapper}>
                {billingPeriod === 'yearly' ? (
                  <>
                    <div className={originalPrice}>
                      ${plan.monthlyPrice * 12} / staff / year
                    </div>
                    <div className={discountedPrice}>
                      <span className={discountedAmount}>
                        ${plan.yearlyPrice}
                      </span>
                      <span className={planPricePeriod}>/ staff / year</span>
                    </div>
                    {plan.savings && (
                      <div className={discountPercentage}>({plan.savings})</div>
                    )}
                  </>
                ) : (
                  <div className={planPrice}>
                    <span className={planPriceAmount}>
                      ${plan.monthlyPrice}
                    </span>
                    <span className={planPricePeriod}>/ staff / month</span>
                  </div>
                )}
              </div>

              <button
                className={plan.isPopular ? planCTAPopular : planCTA}
                onClick={() => handlePlanSelect(plan.name)}
              >
                {plan.ctaText}
                <ArrowRight size={18} />
              </button>

              <div className={featuresGrid}>
                <h4 className={featuresTitle}>What's included:</h4>
                {plan.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === 0 &&
                      (feature.text.startsWith('Everything in') ||
                        feature.text === 'Everything in Starter, plus:' ||
                        feature.text === 'Everything in Essential, plus:')
                        ? planFeatureHighlight
                        : planFeature
                    }
                  >
                    {feature.included ? (
                      <Check className={planFeatureIcon} size={16} />
                    ) : (
                      <Minus
                        size={16}
                        style={{
                          color: '#9ca3af',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Free Trial CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            padding: '2rem 1.5rem',
            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            borderRadius: '12px',
            border: '2px dashed #d1d5db',
          }}
        >
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '0.75rem',
            }}
          >
            Not Ready to Commit?
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1.5rem',
              maxWidth: '550px',
              margin: '0 auto 1.5rem',
              lineHeight: '1.6',
            }}
          >
            Start with our 30-day free trial and explore all features with no credit card required. 
            Experience the full power of S Cubed risk-free.
          </p>
          <button
            onClick={() => router.push('/subscribe?plan=free')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#ffffff',
              background: 'linear-gradient(135deg, #7C52FF 0%, #9370FF 100%)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px -8px rgba(124, 82, 255, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 40px -10px rgba(124, 82, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(124, 82, 255, 0.4)';
            }}
          >
            Start Free Trial
            <ArrowRight size={20} />
          </button>
          <p
            style={{
              fontSize: '0.875rem',
              color: '#9ca3af',
              marginTop: '1rem',
            }}
          >
            No credit card required • Full access • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;
