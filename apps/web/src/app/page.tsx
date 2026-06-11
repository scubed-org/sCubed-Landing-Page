import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Critical components loaded immediately
import Container from '../components/Container';
import Header from '../components/Header/header';
import HomeHero from '../components/HomeHero';
import ReviewPlatforms from '../components/ReviewPlatforms';
import AbaFeature from '../components/abaFeature';
import LocalBusinessSchema from '../components/LocalBusinessSchema';

import Testimonials from '@/components/Testimonials';

// Non-critical components loaded lazily
const Features = dynamic(() => import('../components/Features/features'), {
  loading: () => <div style={{ height: '400px' }}>Loading features...</div>,
});

const Disciplines = dynamic(() => import('../components/Disciplines/disciplines'), {
  loading: () => <div style={{ height: '300px' }}>Loading disciplines...</div>,
});

const Tabs = dynamic(() => import('../components/Tabs/tabs'), {
  loading: () => <div style={{ height: '500px' }}>Loading tabs...</div>,
});

const Stand = dynamic(() => import('../components/Standout/standout'), {
  loading: () => <div style={{ height: '400px' }}>Loading standout...</div>,
});

const Hero = dynamic(() => import('../components/Hero/hero-section'), {
  loading: () => <div style={{ height: '300px' }}>Loading hero...</div>,
});

const Partners = dynamic(() => import('../components/Partners/partners'), {
  loading: () => <div style={{ height: '200px' }}>Loading partners...</div>,
});

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div style={{ height: '400px' }}>Loading footer...</div>,
});

// CTA component (commented out in original)
// const CTA = dynamic(() => import('../components/CTA'));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://scubed.io';

export const metadata: Metadata = {
  title: 'S Cubed - ABA Practice Management Software | Therapy Clinic Software',
  description:
    'Transform your ABA, Speech, OT/PT, and counseling practice with S Cubed - the all-in-one therapy practice management software. Streamline scheduling, billing, progress tracking, and client communication.',
  keywords: 'ABA practice management, therapy software, clinic management, ABA scheduling, therapy billing, practice software, speech therapy software, occupational therapy software',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'S Cubed - ABA Practice Management Software',
    description: 'Transform your therapy practice with our all-in-one management software.',
    type: 'website',
    siteName: 'S Cubed',
    url: `${siteUrl}/`,
    images: [
      {
        url: `${siteUrl}/images/SCubed_OG_Image.webp`,
        width: 2400,
        height: 1260,
        alt: 'S Cubed - ABA Practice Management Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S Cubed - ABA Practice Management Software',
    description: 'Transform your therapy practice with our all-in-one management software.',
    images: [`${siteUrl}/images/SCubed_OG_Image.webp`],
  },
};

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <HomeHero />
      <AbaFeature />
      <ReviewPlatforms />
      <Container>
        <Header />
        <Suspense fallback={<div style={{ height: '400px' }}>Loading features...</div>}>
          <Features />
        </Suspense>
        <Suspense fallback={<div style={{ height: '300px' }}>Loading disciplines...</div>}>
          <Disciplines />
        </Suspense>
        <Suspense fallback={<div style={{ height: '500px' }}>Loading tabs...</div>}>
          <Tabs />
        </Suspense>
        <Suspense fallback={<div style={{ height: '400px' }}>Loading standout...</div>}>
          <Stand />
        </Suspense>

        <Suspense fallback={<div style={{ height: '400px' }}>Loading testimonials...</div>}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<div style={{ height: '300px' }}>Loading hero...</div>}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div style={{ height: '200px' }}>Loading partners...</div>}>
          <Partners />
        </Suspense>
        {/* <CTA /> */}
        <Suspense fallback={<div style={{ height: '400px' }}>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </Container>
    </>
  );
}
