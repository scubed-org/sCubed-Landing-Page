import type { Metadata } from 'next';

import SubscriptionFlow from '@/components/SubscriptionFlow';

export const metadata: Metadata = {
  title: 'Subscribe | S Cubed - Start Your Free Trial or Choose a Plan',
  description:
    'Join S Cubed today. Start with a free trial or choose a paid plan that fits your therapy practice needs. Easy setup in minutes.',
  keywords:
    'ABA therapy software subscription, therapy practice management signup, S Cubed pricing plans, free trial',
  alternates: {
    canonical: '/subscribe',
  },
};

/**
 * Subscription Landing Page
 * Entry points:
 * 1. "Try for Free" button from site header
 * 2. "Buy Now" button from Pricing page (with plan selection)
 */
export default function SubscribePage() {
  return <SubscriptionFlow />;
}
