import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import CTAFeatures from '../../components/Features/CTAFeatures';
import FeaturesComprehensive from '../../components/Features/FeaturesComprehensive';
import HeroFeatures from '../../components/Features/HeroFeatures';

export const metadata: Metadata = {
  title: 'ABA Therapy Practice Management Software',
  description:
    'Streamline your ABA clinical management with S Cubed - an All-in-one ABA therapy practice management software built by BCBAs, Smart scheduling, billing, progress tracking, secure communication, and more in one powerful platform.',
  alternates: {
    canonical: '/aba-practice-management-software',
  },
};

export default function FeaturesPage() {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: '/' },
          { name: 'Practice Management', item: '/aba-practice-management-software' }
        ]} 
      />
      <Container>
        <HeroFeatures />
        <FeaturesComprehensive />
        <CTAFeatures />
      </Container>
    </>
  );
}
