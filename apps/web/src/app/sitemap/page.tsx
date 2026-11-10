import { Metadata } from 'next';

import Layout from '@/components/Layout';
import SitemapList from '@/components/SitemapList';

export const metadata: Metadata = {
  title: 'Site Map | S Cubed',
  description:
    'Complete list of all pages and content available on S Cubed website',
  openGraph: {
    title: 'Site Map | S Cubed',
    description:
      'Complete list of all pages and content available on S Cubed website',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 3600; // Revalidate every hour

export interface SitemapColumn {
  sections: {
    title: string;
    links: {
      url: string;
      label: string;
    }[];
  }[];
}

export default async function SitemapPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Organize content into 3 columns
  const columns: SitemapColumn[] = [
    {
      sections: [
        {
          title: 'Pages',
          links: [
            { url: '/', label: 'Home' },
            { url: '/billing', label: 'Billing' },
            { url: '/clinical-compass', label: 'The Clinical Compass' },
            { url: '/aba-data-collection-software', label: 'Data Collection' },
            { url: '/aba-practice-management-software', label: 'Practice Management' },
            { url: '/guardian-portal', label: 'Guardian Portal' },
            { url: '/telehealth-platform', label: 'Telehealth Platform' },
            { url: '/get-started', label: 'Get Started' },
            { url: '/our-team', label: 'Our Team' },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: 'Resources',
          links: [
            { url: '/faqs', label: 'FAQs' },
            { url: '/terms-conditions', label: 'Terms & Conditions' },
            { url: '/privacy-policy', label: 'Privacy Policy' },
            { url: '/blog', label: 'Blog' },
            { url: '/events', label: 'Events & News' },
          ],
        },
      ],
    },
  ];

  return (
    <Layout>
      <SitemapList columns={columns} baseUrl={baseUrl} />
    </Layout>
  );
}
