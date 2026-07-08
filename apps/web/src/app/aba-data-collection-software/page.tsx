import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import DataCollectionCTA from '../../components/data-collection/DataCollectionCTA';
import ContentSection from '../../components/data-collection/DataCollectionFeatures';
import DataCollectionHero from '../../components/data-collection/DataCollectionHero';
import DataCollectionTrust from '../../components/data-collection/DataCollectionTrust';
import goalImg from '../../images/data-collection/from-goals-to-measurable-change.png';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';
import BuildSmarterTemplatesGetClearerReports from '../../images/data-collection/build-smarter-templates-get-clearer-reports.png';
import RecordDataAsYouWork from '../../images/data-collection/record-data.png';

export const metadata: Metadata = {
  title:
    'ABA Data Collection Software for Therapists ',
  description:
    'S Cubed simplifies ABA data collection with real-time logging, goal tracking, visual reports, and HIPAA-secure access for ABA therapy clinics and BCBAs',
  alternates: {
    canonical: '/aba-data-collection-software',
  },
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Data Collection & Reporting for Therapy Practices',
  sections: [
    {
      items: [
        {
          question:
            'What is the best ABA data collection software for therapists?',
          answer:
            'The best ABA data collection software is the one that keeps therapy simple and accurate. It must have features like real-time goal tracking, recording behaviors, and monitoring progress without any session interruptions. Choose systems that are a perfect combination of reliability, flexibility and clear visual reporting. The software must have features that support therapists to concentrate on care and less on paperwork.',
        },
        {
          question:
            'How do ABA data collection tools improve therapy outcomes?',
          answer:
            'Good ABA data tools turn information into action. By collecting and organizing data instantly, therapists can spot patterns, adjust treatment plans faster, and make data-driven decisions that support consistent progress. When information is accurate and easy to read, clients benefit from faster, more personalized intervention.',
        },
        {
          question:
            'What types of data collection methods are supported in ABA software?',
          answer:
            'Most of the applied behavior analysis data collection systems offer many types of data collection methods like duration, interval, frequency and task analysis recording. Some of them also have customizable templates and automated tracking for maximum accuracy. The best platforms let therapists switch between methods easily, according to the client goals and session needs.',
        },
        {
          question:
            'What features make the top ABA data collection tools stand out?',
          answer:
            'The best ABA data collection systems are intuitive, accurate, and built for real clinical work. They include smart templates, quick data entry, customizable dashboards, and secure cloud storage. Tools that integrate ABA graphing software and progress tracking give teams a full picture of growth without hours of manual reporting.',
        },        
      ],
    },
  ],
};

// Fetch data at request time
async function getDataCollectionFAQs() {
  const faqData = await getFAQCollection('data-collection-faqs');
  const transformedData = transformFAQData(faqData);

  if (!transformedData) {
    // Return fallback data if API fails
    return fallbackFAQData;
  }

  return transformedData;
}

export default async function DataCollectionPage() {
  const faqData = await getDataCollectionFAQs();

  // Flatten all FAQ items for schema
  const allFAQs = faqData.sections.flatMap((section) => section.items);
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Data Collection', item: '/aba-data-collection-software' },
        ]}
      />
      <FAQSchema faqs={allFAQs} pageSlug="aba-data-collection-software" />
      <Container>
        <DataCollectionHero />

        <ContentSection
          titleText="Record Data as You Work"
          descriptionText="<strong>S Cubed</strong> helps you stay focused during every session. With our ABA data collection systems, you can record behaviors, goals, and notes in real time, without interrupting the flow of therapy. Built for applied behavior analysis it keeps your data organized, accurate, and ready whenever you need it."
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={RecordDataAsYouWork}
          imageAlt="ABA data collection during therapy session"
        />

        <ContentSection
          titleText="One Platform For All Data Collection Method"
          descriptionText="No two sessions look the same and your data shouldn’t have to fit into one box. S Cubed adapts to your preferred method of data collection in ABA, from discrete trial training to natural environment teaching. Collect frequency, duration, interval, or task analysis data seamlessly, all from one intuitive interface."
          backgroundColor="#f9fafb"
          imagePosition="right"
          imageSrc={goalImg}
          imageAlt="Graphing and reporting for ABA goals"
        />

        <DataCollectionCTA
          title="See S Cubed Fit Your Clinic's Workflow"
          description={
            <>
              Every data collection method, one platform. See how S Cubed works on the way your team actually runs sessions — <strong>book a quick walkthrough with our team.</strong>
            </>
          }
        />

        <ContentSection
          titleText="Automation That Understands ABA"
          descriptionText="<strong>S Cubed</strong> takes care of the details you shouldn’t have to. It times sessions, calculates behavior rates, and organizes your notes instantly. Designed with ABA workflows in mind, it keeps data precise while freeing therapists to stay engaged in real behavior change."
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={BuildSmarterTemplatesGetClearerReports}
          imageAlt="Document and template management in ABA software"
        />

        <DataCollectionTrust />

        <DataCollectionCTA
          title="Built by BCBAs Who Actually Get It"
          description={
            <>
              See why ABA clinics trust <strong>S Cubed</strong> with their data collection. A therapy-minded team, a platform built for real sessions — <strong>book a 20-minute walkthrough.</strong>
            </>
          }
        />

        {faqData.sections.map((section, index) => (
          <FAQSection
            key={section.items[0].question}
            title={index === 0 ? faqData.title : ''}
            faqs={section.items}
          />
        ))}

        <DataCollectionCTA />
      </Container>
    </>
  );
}
