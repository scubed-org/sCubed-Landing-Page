import type { Metadata } from 'next';
import { Suspense } from 'react';

import Container from '../../components/Container';
import ComingSoonHero from '../../components/coming-soon/ComingSoonHero';

export const metadata: Metadata = {
  title: 'Coming Soon | S Cubed',
  description:
    'This feature is coming soon to S Cubed. Stay tuned for updates on our latest tools for therapy practices.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComingSoonPage() {
  return (
    <Container>
      <Suspense>
        <ComingSoonHero />
      </Suspense>
    </Container>
  );
}
