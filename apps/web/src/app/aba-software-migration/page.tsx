import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import ContentSection from '../../components/data-collection/DataCollectionFeatures';
import MigrationCTA from '../../components/migration/MigrationCTA';
import MigrationHero from '../../components/migration/MigrationHero';
import fullHistoryImg from '../../images/migration/full-history-moved.webp';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';

export const metadata: Metadata = {
  title: 'ABA Software Migration | Switch to S Cubed in Minutes',
  description:
    'Switching ABA practice management software? S Cubed migrates your full clinic history — clients, staff, authorizations, sessions, and treatment plans — fast, secure, and HIPAA-compliant.',
  alternates: {
    canonical: '/aba-software-migration',
  },
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'ABA Software Migration FAQs',
  sections: [
    {
      items: [
        {
          question:
            'How long does it take to migrate to S Cubed from another ABA platform?',
          answer:
            'Most clinics are fully migrated in days, not months. S Cubed imports your existing client records, staff, authorizations, session history, and treatment plans directly, so you are not re-entering data by hand. Our team handles the heavy lifting and verifies everything before you go live.',
        },
        {
          question: 'Will I lose my data history when switching ABA software?',
          answer:
            'No. The entire point of a proper migration is that nothing is left behind. S Cubed brings over your historical client data, documentation, authorizations, and session records so your clinical and billing history stays intact and audit-ready from day one.',
        },
        {
          question:
            'Can I switch from CentralReach or another system without disrupting therapy?',
          answer:
            'Yes. Migrations are planned so your clinicians keep working throughout. We import your data in the background, validate it against your existing system, and coordinate the cutover so there is no gap in care or data collection.',
        },
        {
          question: 'Is my data secure during the migration?',
          answer:
            'Always. S Cubed is fully HIPAA-compliant with end-to-end encryption, and we provide a Business Associate Agreement (BAA). Your protected health information is handled securely at every step of the migration.',
        },
        {
          question: 'What does it cost to migrate to S Cubed?',
          answer:
            'Migration support is part of getting started with S Cubed. Book a 20-minute demo and we will walk through your current setup, scope your migration, and give you a clear plan to switch.',
        },
      ],
    },
  ],
};

// Fetch data at request time
async function getMigrationFAQs() {
  const faqData = await getFAQCollection('migration-faqs');
  const transformedData = transformFAQData(faqData);

  if (!transformedData) {
    return fallbackFAQData;
  }

  return transformedData;
}

export default async function ABASoftwareMigrationPage() {
  const faqData = await getMigrationFAQs();

  const allFAQs = faqData.sections.flatMap((section) => section.items);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'ABA Software Migration', item: '/aba-software-migration' },
        ]}
      />
      <FAQSchema faqs={allFAQs} pageSlug="aba-software-migration" />
      <Container>
        <MigrationHero />

        <ContentSection
          titleText="Your Full History, Moved For You"
          descriptionText="Migration to <strong>S&nbsp;Cubed</strong> isn’t a copy-paste marathon for your staff. Our team handles the import and validates every record against your current system — clients, documentation, authorizations, and historical sessions — so your data stays accurate and audit-ready from day one."
          backgroundColor="#f9fafb"
          imagePosition="left"
          imageSrc={fullHistoryImg}
          imageAlt="Complete ABA data migration handled for you"
        />

        <ContentSection
          titleText="Switch Without Disrupting Therapy"
          descriptionText="Your clinicians keep working while we move your data in the background. <strong>S&nbsp;Cubed</strong> coordinates the cutover so there’s no gap in care, no lost session data, and no scramble — just a clean transition to a platform that fits how your clinic actually works."
          backgroundColor="#ffffff"
          imagePosition="right"
          imageAlt="Seamless ABA software switch with no downtime"
        />

        {faqData.sections.map((section, index) => (
          <FAQSection
            key={section.items[0].question}
            title={index === 0 ? faqData.title : ''}
            faqs={section.items}
          />
        ))}

        <MigrationCTA />
      </Container>
    </>
  );
}