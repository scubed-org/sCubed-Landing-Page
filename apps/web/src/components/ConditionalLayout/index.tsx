'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import Layout from '../Layout';

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
    pathname === '/aba-software-migration' ||
    pathname === '/pricing' ||
    pathname === '/events' ||
    pathname.startsWith('/events/') ||
    pathname === '/scheduling-and-appointments' ||
    pathname === '/aba-authorization-software' ||
    pathname === '/subscribe' ||
    pathname.startsWith('/subscribe/') ||
    pathname === '/telehealth-platform' ||
    pathname === '/start';

  // Determine if the page should use full width layout
  const shouldUseFullWidth =
    pathname === '/get-started' ||
    pathname === '/billing' ||
    pathname === '/aba-practice-management-software' ||
    pathname === '/guardian-portal' ||
    pathname === '/telehealth-platform' ||
    pathname === '/aba-data-collection-software' ||
    pathname === '/aba-software-migration' ||
    pathname === '/pricing' ||
    pathname === '/events' ||
    pathname === '/scheduling-and-appointments' ||
    pathname === '/aba-authorization-software' ||
    pathname === '/subscribe' ||
    pathname === '/start';

  return shouldUseLayout ? (
    <Layout fullWidth={shouldUseFullWidth}>{children}</Layout>
  ) : (
    <>{children}</>
  );
}
