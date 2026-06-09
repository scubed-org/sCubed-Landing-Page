import type { Metadata } from 'next';
import { BaggageClaim, Timer, CalendarClock, FileClock } from 'lucide-react';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import FAQSchema from '../../components/FAQSchema';
import FAQSection from '../../components/FAQSection';
import CTA from '../../components/authorization/CTA';
import ContentSection from '../../components/authorization/Features';
import Hero from '../../components/authorization/Hero';
import Trust from '../../components/authorization/Trust';
import { getFAQCollection, transformFAQData } from '../../lib/faq-api';
import AllYourAuthorizationsFinallyInOnePlace from '../../images/authorization/all-your-authorizations-finally-in-one-place.png';
import LinkedAutomaticallySoNoAssumptions from '../../images/authorization/linked-automatically-so-no-assumptions.png';
import NeverLoseTrackOfExpirationsAgain from '../../images/authorization/never-lose-track-of-expirations-again.png';

export const metadata: Metadata = {
  title:
    'Authorization Management Built For Real-World Practice',
  description:
    'Manage every approval in one place, track, renew, and connect what matters. No more denials, fewer scheduling surprises, and more time back for your team. Meet S Cubed, your prior authorization software with heart.',
  alternates: {
    canonical: '/aba-authorization-software',
  },
};

// Fallback FAQ data
const fallbackFAQData = {
  title: 'Frequently Asked Questions',
  sections: [
    {
      items: [
        {
          question:
            'What is prior authorization management software and how does it work?',
          answer:
            'Prior authorization management software streamlines the process of securing insurance approval for ABA services. It automates submissions, tracks real-time request statuses, and ensures all required clinical documentation and service codes like CPT 97151 or 97153 are included. For ABA providers, this means faster authorizations, fewer administrative burdens, and uninterrupted care delivery.',
        },
        {
          question:
            'How does prior authorization software help reduce claim denials in ABA therapy?',
          answer:
            'Effective prior authorization tools are designed to proactively address common denial triggers in ABA therapy such as incorrect code pairings or missing documentation. Using predictive analytics and payer-specific rules, the software alerts staff to potential issues before submission. This reduces avoidable denials, lowers rework, and accelerates reimbursement.',
        },
        {
          question:
            'What features should a good prior authorization software have?',
          answer:
            'Key features should include Real-time insurance eligibility and benefits verification, ABA-specific CPT and diagnosis code mapping, Automated workflows for initial and renewal authorizations, seamless integration with ABA billing, EMR, and practice management systems. Look for platforms that automate not just the request, but the entire lifecycle of an authorization.',
        },
        {
          question:
            'How does S Cubed help with tracking authorizations and renewals?',
          answer:
            'S Cubed consolidates all authorization statuses and renewal timelines into a single, intuitive dashboard. It sends automated alerts before authorizations expire and provides advanced tools to manage reauthorizations ensuring continuity of care and uninterrupted billing cycles for your ABA clients.',
        },

        {
          question:
            'What are predictive alerts, and how do they improve ABA prior authorization management?',
          answer:
            'Predictive alerts leverage historical denial data and payer trends to flag authorization requests that are likely to be rejected. For ABA practices, this means identifying issues like code mismatches or missing treatment plans before submission, saving time, improving approval rates, and supporting cleaner claims downstream.',
        },
        {
          question:
            'Why are CPT and diagnosis code mappings crucial in ABA therapy authorization?',
          answer:
            'ABA services must use proper combinations of CPT (e.g. 97155, 97156) and ICD-10 (e.g. F84.0) codes based on payer rules. Proper code mapping ensures compliance, reduces payer pushback, and speeds up approvals. Software that includes intelligent code-mapping tools reduces human error while boosting performance metrics.',
        },
        {
          question:
            'Can ABA prior authorization software integrate with billing and EMR systems?',
          answer:
            'Yes. A strong authorization system integrates natively with your ABA practice management, billing, and EMR systems, enabling seamless data flow. This eliminates manual data entry, reduces administrative overhead, and supports end-to-end revenue cycle optimization.',
        },
        {
          question:
            'How does real-time visibility of authorization statuses reduce scheduling conflicts in ABA practices?',
          answer:
            'With real-time visibility, staff is immediately aware of whether a session is authorized before scheduling or at the point of service. This prevents last-minute cancellations, improves patient and family satisfaction, and helps clinicians focus on delivering care, not chasing approvals.',
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

  const features = [
    {
      featureMainTitle: 'Why Do Practices Love S Cubed Authorization Management?',
    },
    {
      icon: <BaggageClaim size={28} />,
      title: 'Fewer Claim Rejections, Stronger Cash Flow',
      description:'Authorizations are validated before billing, helping you prevent costly denials and delays.',
      accentColor: '#7a7eed',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    },
    {
      icon: <Timer size={28} />,
      title: 'Real-Time Visibility, Zero Guesswork',
      description:'Instantly see balances, expirations, and utilization without waiting on reports.',
      accentColor: '#22d3ee',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    },
    {
      icon: <CalendarClock size={28} />,
      title: 'Save Hours Every Week',
      description:'Automation handles renewals, tracking, and reminders so your team can focus on clients, not paperwork.',
      accentColor: '#34d399',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    },
    {
      icon: <FileClock size={28} />,
      title: 'Audit-Ready, Every Time',
      description:'Every update, action, and authorization change is logged for transparency and compliance peace of mind.',
      accentColor: '#fb7185',
      bgColor: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
    },
  ];
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'ABA Authorization Software', item: '/aba-authorization-software' },
        ]}
      />
      <FAQSchema faqs={allFAQs} pageSlug="authorization" />
      <Container>
        <Hero />

        <ContentSection
          titleText="All Your Authorizations, Finally in One Place"
          descriptionText="
          See every client authorization in one clean, searchable view, so your team always knows what’s active, what’s pending, and what needs attention.  
          <br />
          <ul>
            <li>Filter by client, payer, or date without getting lost in details</li>
            <li>Give each role the right access with built-in accountability</li>
            <li>See active, pending, and expired authorizations at a glance</li>
          </ul>
          "
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={AllYourAuthorizationsFinallyInOnePlace}
          imageAlt="ABA authorization during therapy session"
        />

        <ContentSection
          titleText="Linked Automatically, So No Assumptions"
          descriptionText="
          S Cubed connects CPT codes and diagnosis codes for you, keeping your billing clean and your reporting spot-on.
          <br />
          <ul>
            <li>Map multiple CPT codes to a single authorization</li>
            <li>Attach primary and secondary diagnosis codes in seconds</li>
            <li>Built-in validation catches mistakes before claims go out</li>
          </ul>
          "
          backgroundColor="#f9fafb"
          imagePosition="right"
          imageSrc={LinkedAutomaticallySoNoAssumptions}
          imageAlt="Graphing and reporting for ABA goals"
        />

        <ContentSection
          titleText="Never Lose Track of Expirations Again"
          descriptionText="
          S Cubed keeps an eye on every authorization and sends friendly reminders before anything expires or runs low on units.<br/><br />Smart Alerts You Control
          <ul>
            <li>Smart alerts at 60/30/14/7 days</li>
            <li>Low-unit notifications you control</li>
            <li>In-app and email reminders that keep everyone in sync</li>
          </ul>
          "
          backgroundColor="#ffffff"
          imagePosition="left"
          imageSrc={NeverLoseTrackOfExpirationsAgain}
          imageAlt="Document and template management in ABA authorization software"
        />

        <Trust features={features.slice(1)} heading={features[0].featureMainTitle || ''} />

        {faqData.sections.map((section, index) => (
          <FAQSection
            key={section.items[0].question}
            title={index === 0 ? faqData.title : ''}
            faqs={section.items}
          />
        ))}

        <CTA title="Authorization Management <br/>Shouldn’t Be A Full-time Job" description="We know the struggle of tracking expirations, renewing on time, and keeping billing compliant. S Cubed takes the complexity out of authorization management with smart automation and built-in alerts. Our prior authorization software gives your team time back to focus on what really matters." buttonText="Book a 20-Minute Demo" />
      </Container>
    </>
  );
}
