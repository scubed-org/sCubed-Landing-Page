import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import PricingAddons from '../../components/pricing/PricingAddons';
import PricingComparison from '../../components/pricing/PricingComparison';
import PricingHero from '../../components/pricing/PricingHero';
import PricingPlans from '../../components/pricing/PricingPlans';
import { getPlansAndAddons } from '../../lib/pricing-api';

export const metadata: Metadata = {
  title:
    'Pricing & Plans | S Cubed - Transparent ABA Practice Management Pricing',
  description:
    'Choose the perfect plan for your therapy practice. Flexible pricing for ABA, Speech, OT/PT practices with no hidden fees. Start with a free trial today.',
  keywords:
    'ABA software pricing, therapy practice management cost, S Cubed pricing plans',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'S Cubed Pricing - Find Your Perfect Plan',
    description:
      'Transparent pricing for therapy practice management. No hidden fees.',
    type: 'website',
  },
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Pricing FAQs',
  sections: [
    {
      name: 'Plans & Pricing',
      items: [
        {
          question: 'Can I switch plans at any time?',
          answer:
            "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle.",
        },
        {
          question: 'How does the staff-based pricing work?',
          answer:
            'You pay per staff member who uses the platform. Unlimited clients and guardians can access the system at no additional cost. You can add or remove staff members at any time, and your billing will be adjusted accordingly.',
        },
        {
          question: "What's the difference between monthly and annual billing?",
          answer:
            'Annual billing offers a 15% discount compared to monthly billing. With annual billing, you pay once per year and save money while locking in your rate. Monthly billing provides more flexibility with no long-term commitment.',
        },
        {
          question: 'How are staff members counted?',
          answer:
            'Staff members are counted as any user with login credentials who actively uses the platform for scheduling, documentation, or billing. Administrative users, therapists, BCBAs, and billing staff all count as active staff members.',
        },
        {
          question: 'What happens if I exceed my plan limits?',
          answer:
            "If your staff count exceeds the number of licenses included in your subscription, you'll see a notification prompting you to increase your staff license count. You'll need to purchase additional staff licenses before you can add more staff members. Once your license count is increased, you can proceed with adding the new staff member. You can manage and update your staff license count at any time from your subscription settings.",
        },
      ],
    },
    {
      name: 'Billing & Payments',
      items: [
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major credit cards (Visa, MasterCard, American Express, Discover), ACH transfers for annual plans, and can arrange invoicing for enterprise customers with specific billing requirements.',
        },
        {
          question: 'Is there a setup fee or long-term contract?',
          answer:
            "No setup fees and no long-term contracts required. S Cubed operates on a flexible month-to-month or annual subscription basis. You can cancel anytime.",
        },
        {
          question: 'When will I be charged?',
          answer:
            "You'll be charged at the end of your free trial period unless you cancel. For monthly plans, billing occurs on the same day each month. For annual plans, you'll be charged once per year on your subscription anniversary date.",
        },
        {
          question: 'What happens if my payment fails?',
          answer:
            "If a payment fails, we'll automatically retry over the next few days and notify you via email. Your account will remain active during this grace period. If payment isn't resolved within 10 days, your account will be temporarily suspended until payment is received.",
        },
      ],
    },
    {
      name: 'Trial & Onboarding',
      items: [
        {
          question: "What's included in the free trial?",
          answer:
            'Our 30-day free trial includes full access to all features. No credit card required to start, and you can import your existing data to test the complete workflow. Our team will help you get set up and answer any questions.',
        },
        {
          question: 'Can I get a demo before signing up?',
          answer:
            "Absolutely! We offer personalized demos tailored to your practice needs. Schedule a 20-minute demo with our team to see how S Cubed can transform your practice management, and we'll answer all your questions.",
        },
        {
          question: 'Can you help migrate our existing data?',
          answer:
            'Yes! We provide data migration assistance for all plans. Our team will help you import client records, staff information, schedules, and historical data from your previous system. For larger practices, we offer white-glove migration services.',
        },
      ],
    },
  ],
};

// Fetch data at request time
async function getPricingFAQs() {
  // const faqData = await getFAQCollection('pricing-faqs');
  // const transformedData = transformFAQData(faqData);

  // if (!transformedData) {
  //   return fallbackFAQData;
  // }

  return fallbackFAQData;
}

export default async function PricingPage() {
  const [faqData, pricingData] = await Promise.all([
    getPricingFAQs(),
    getPlansAndAddons(),
  ]);

  // Flatten all FAQ items for schema
  const allFAQs = faqData.sections.flatMap((section) => section.items);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Pricing', item: '/pricing' },
        ]}
      />
      <FAQSchema faqs={allFAQs} pageSlug="pricing" />
      <PricingHero />
      <Container>
        <PricingPlans apiPlans={pricingData?.plans ?? null} />
        <PricingComparison
          apiPlans={pricingData?.plans ?? null}
          apiAddons={pricingData?.addons ?? null}
        />
        <PricingAddons apiAddons={pricingData?.addons ?? null} />

        {faqData.sections.map((section, index) => (
          <FAQSection
            key={section.name}
            title={index === 0 ? faqData.title : ''}
            sectionTitle={section.name}
            faqs={section.items}
          />
        ))}
      </Container>
    </>
  );
}
