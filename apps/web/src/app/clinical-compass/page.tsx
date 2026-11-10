import type { Metadata } from 'next';

import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ClinicPartners from '@/components/clinical-compass/ClinicPartners';
import CompassFeatures from '@/components/clinical-compass/CompassFeatures';
import CompassHero from '@/components/clinical-compass/CompassHero';
import FieldworkPlans from '@/components/clinical-compass/FieldworkPlans';
import ProgramRoute from '@/components/clinical-compass/ProgramRoute';
import Container from '@/components/Container';

export const metadata: Metadata = {
  title: 'The Clinical Compass | Mentorship & Fieldwork Experience Program',
  description:
    'Guiding Future Behavior Analysts Toward Clinical Excellence. The Clinical Compass is a comprehensive mentorship and fieldwork experience program.',
  alternates: {
    canonical: '/clinical-compass',
  },
};

export default function ClinicalCompassPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'The Clinical Compass', item: '/clinical-compass' },
        ]}
      />
      <Container>
        <CompassHero />
        <ProgramRoute />
        <FieldworkPlans />
        <CompassFeatures />
        <ClinicPartners />
      </Container>
    </>
  );
}
