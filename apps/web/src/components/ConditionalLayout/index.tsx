'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import Layout from '../Layout';

import { FreeTrialModalProvider } from '@/contexts/FreeTrialModalContext';

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({
  children,
}: Readonly<ConditionalLayoutProps>) {
  const pathname = usePathname();

  // Only wrap specific pages with Layout component
  const shouldUseLayout =
    pathname === '/blog' ||
    pathname === '/faqs' ||
    pathname.startsWith('/blog/') ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-conditions' ||
    pathname === '/get-started' ||
    pathname === '/billing' ||
    pathname === '/aba-practice-management-software' ||
    pathname === '/guardian-portal' ||
    pathname === '/aba-data-collection-software' ||
    pathname === '/demo-booked' ||
    pathname === '/pricing' ||
    pathname === '/events' ||
    pathname.startsWith('/events/') ||
    pathname === '/scheduling-and-appointments' ||
    pathname === '/aba-authorization-software' ||
    pathname === '/subscribe' ||
    pathname.startsWith('/subscribe/') ||
    pathname === '/telehealth-platform';

  // Determine if the page should use full width layout
  const shouldUseFullWidth =
    pathname === '/get-started' ||
    pathname === '/billing' ||
    pathname === '/aba-practice-management-software' ||
    pathname === '/guardian-portal' ||
    pathname === '/telehealth-platform' ||
    pathname === '/aba-data-collection-software' ||
    pathname === '/demo-booked' ||
    pathname === '/pricing' ||
    pathname === '/events' ||
    pathname === '/scheduling-and-appointments' ||
    pathname === '/aba-authorization-software' ||
    pathname === '/subscribe';

  return (
    <FreeTrialModalProvider>
      {shouldUseLayout ? (
        <Layout fullWidth={shouldUseFullWidth}>{children}</Layout>
      ) : (
        <>{children}</>
      )}
    </FreeTrialModalProvider>
  );
}
