import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  MessageSquare,
  Receipt,
  Rocket,
  Smartphone,
  Users,
  Video,
} from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { primaryButton } from '../../components/billing/CalendlyButton/styles.css';
import {
  heroContainer,
  heroSection,
} from '../../components/data-collection/DataCollectionHero/styles.css';
import FAQSection, { type FAQItem } from '../../components/FAQSection';
import ReviewPlatforms from '../../components/ReviewPlatforms';
import Testimonials from '../../components/Testimonials';
import { getPlansAndAddons } from '../../lib/pricing-api';
import { findAddon, findPlan, formatMoney } from '../../lib/pricing-helpers';

import BookingEmbed from './BookingEmbed';
import HeroChooser from './HeroChooser';
import { BOOK_LABEL, PathCards } from './paths';
import { START_OR_SWITCH_OFFER } from './offer';
import SavingsCalculator from './SavingsCalculator';
import {
  bookSection,
  bookSubtitle,
  easeCard,
  easeGrid,
  easeIcon,
  easeText,
  easeTitle,
  heroInner,
  moduleCard,
  moduleGrid,
  moduleIcon,
  moduleLink,
  moduleText,
  moduleTitle,
  offerCard,
  offerCardLabel,
  offerCardText,
  offerDeadline,
  offerGrid,
  offerSection,
  section,
  sectionAlt,
  sectionCenter,
  sectionEyebrow,
  sectionInner,
  sectionIntro,
  sectionTitle,
  socialProof,
} from './styles.css';

export const metadata: Metadata = {
  title: 'Start or Switch to S Cubed | ABA Practice Management Software',
  description:
    'Opening an ABA clinic or ready to leave your current software? S Cubed puts scheduling, billing, data collection, telehealth and your parent portal in one place. Book a free 20-minute demo.',
  // Ad landing page with an offer that is not approved yet: keep it out of
  // search results. It is also intentionally left out of sitemap.ts.
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: '/start',
  },
};

// Same fallbacks the /pricing page shows when the plans API is unavailable:
// Growth plan (PricingPlans) and the Telehealth add-on (PricingAddons).
const FALLBACK_GROWTH_PER_STAFF_MONTHLY = 59;
const FALLBACK_TELEHEALTH_MONTHLY = 99;

async function getCalculatorPrices() {
  const data = await getPlansAndAddons();
  const growth = findPlan(data?.plans, 'growth');
  const telehealth = findAddon(data?.addons, 'telehealth');
  return {
    perStaffMonthly:
      formatMoney(growth?.monthly_price_per_staff) ??
      FALLBACK_GROWTH_PER_STAFF_MONTHLY,
    telehealthMonthly:
      formatMoney(telehealth?.monthly_price) ?? FALLBACK_TELEHEALTH_MONTHLY,
    telehealthPerStaff: telehealth?.billing_basis === 'per_staff',
  };
}

interface Module {
  readonly title: string;
  readonly text: string;
  readonly href?: string;
  readonly icon: ReactNode;
}

const modules: readonly Module[] = [
  {
    title: 'Practice management',
    text: 'Clients, staff, documents and reports in one place.',
    href: '/aba-practice-management-software',
    icon: <LayoutDashboard size={22} aria-hidden="true" />,
  },
  {
    title: 'Scheduling',
    text: 'One calendar for your whole team.',
    href: '/scheduling-and-appointments',
    icon: <CalendarDays size={22} aria-hidden="true" />,
  },
  {
    title: 'Data collection',
    text: 'Collect session data and see progress in graphs.',
    href: '/aba-data-collection-software',
    icon: <BarChart3 size={22} aria-hidden="true" />,
  },
  {
    title: 'Authorizations',
    text: 'Keep track of approved hours before they run out.',
    href: '/aba-authorization-software',
    icon: <ClipboardCheck size={22} aria-hidden="true" />,
  },
  {
    title: 'Billing and claims',
    text: 'Send claims and follow payments without another tool.',
    href: '/billing',
    icon: <Receipt size={22} aria-hidden="true" />,
  },
  {
    title: 'Guardian portal',
    text: 'Parents see updates and documents in one secure place.',
    href: '/guardian-portal',
    icon: <Users size={22} aria-hidden="true" />,
  },
  {
    title: 'Telehealth',
    text: 'Secure video sessions, right inside S Cubed.',
    href: '/telehealth-platform',
    icon: <Video size={22} aria-hidden="true" />,
  },
  {
    // No dedicated messaging page on the site yet, so this card has no link.
    title: 'Messaging',
    text: 'Message staff and families without leaving the app.',
    icon: <MessageSquare size={22} aria-hidden="true" />,
  },
];

interface EasePoint {
  readonly title: string;
  readonly text: string;
  readonly icon: ReactNode;
}

const easePoints: readonly EasePoint[] = [
  {
    icon: <Rocket size={20} aria-hidden="true" />,
    title: 'Simple setup',
    text: 'We help you import your data and set up your clinic, so you are not doing it alone.',
  },
  {
    icon: <GraduationCap size={20} aria-hidden="true" />,
    title: 'Training included',
    text: 'Every plan includes support and training for your team.',
  },
  {
    icon: <HeartHandshake size={20} aria-hidden="true" />,
    title: 'Real people',
    text: 'S Cubed was built by BCBAs who have run their own clinics. When you have a question, you talk to our team.',
  },
  {
    icon: <Smartphone size={20} aria-hidden="true" />,
    title: 'Works where you work',
    text: 'Use it on a computer, phone or tablet.',
  },
];

// Answers restate what the site already says on /pricing and
// /aba-software-migration. Keep them in sync if those change.
const faqs: FAQItem[] = [
  {
    question: 'What happens on the 20-minute demo?',
    answer:
      'We ask about your clinic, show you the parts of S Cubed that matter to you, and answer your questions. If you are switching, we map out how your move would work.',
  },
  {
    question: 'How long does switching take?',
    answer:
      'Most clinics are fully moved over in days, not months. Our team handles the import and checks your records against your current system before you go live.',
  },
  {
    question: 'Is there a setup fee or a long contract?',
    answer:
      'No. There are no setup fees and no long-term contracts. You can pay month to month or yearly.',
  },
  {
    question: 'How is S Cubed priced?',
    answer:
      'You pay per staff member who uses the platform. Clients and guardians are unlimited at no extra cost.',
  },
  {
    question: 'Is S Cubed HIPAA compliant?',
    answer:
      'Yes. S Cubed is HIPAA compliant, your data is encrypted, and we sign a Business Associate Agreement (BAA) with you.',
  },
  {
    question: 'Will you train my team?',
    answer:
      'Yes. Support and training are included in every plan, and we help you get set up.',
  },
];

function BookButton({ label = BOOK_LABEL }: { readonly label?: string }) {
  return (
    <a className={primaryButton} href="#book">
      {label}
    </a>
  );
}

export default async function StartPage() {
  const prices = await getCalculatorPrices();

  return (
    <>
      {/* 1. Hero */}
      <section className={heroSection}>
        <div className={heroContainer}>
          <div className={heroInner}>
            <HeroChooser />
          </div>
        </div>
      </section>

      {/* 2. Social proof (existing site components only; no invented quotes or stats) */}
      <div className={socialProof}>
        <ReviewPlatforms />
        {/*
          TODO(start-page): No customer count, clinic logos or ABA-specific
          case-study stats exist on the site yet. Add real, approved ones here
          when available. Do not invent numbers or quotes.
        */}
        <Testimonials />
      </div>

      {/* 3. Two paths, side by side for people who scroll */}
      <section className={sectionAlt} id="paths">
        <div className={sectionInner}>
          <div className={sectionCenter}>
            <p className={sectionEyebrow}>Two ways in</p>
            <h2 className={sectionTitle}>Where are you today?</h2>
          </div>
          <PathCards />
        </div>
      </section>

      {/* 4. All-in-one */}
      <section className={section}>
        <div className={sectionInner}>
          <div className={sectionCenter}>
            <p className={sectionEyebrow}>All in one</p>
            <h2 className={sectionTitle}>One platform, not a pile of tools</h2>
            <p className={sectionIntro}>
              Stop paying for separate tools that don&apos;t talk to each other.
              One login, one place for your whole clinic.
            </p>
          </div>
          <div className={moduleGrid}>
            {modules.map((m) => {
              const body = (
                <>
                  <span className={moduleIcon}>{m.icon}</span>
                  <span className={moduleTitle}>{m.title}</span>
                  <span className={moduleText}>{m.text}</span>
                </>
              );
              return m.href ? (
                <Link
                  key={m.title}
                  href={m.href}
                  className={`${moduleCard} ${moduleLink}`}
                >
                  {body}
                </Link>
              ) : (
                <div key={m.title} className={moduleCard}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Ease of use */}
      <section className={sectionAlt}>
        <div className={sectionInner}>
          <div className={sectionCenter}>
            <p className={sectionEyebrow}>Easy to use</p>
            <h2 className={sectionTitle}>Built for busy clinic owners</h2>
          </div>
          <div className={easeGrid}>
            {easePoints.map((p) => (
              <div className={easeCard} key={p.title}>
                <span className={easeIcon}>{p.icon}</span>
                <h3 className={easeTitle}>{p.title}</h3>
                <p className={easeText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Savings calculator */}
      <section className={section} id="calculator">
        <div className={sectionInner}>
          <div className={sectionCenter}>
            <p className={sectionEyebrow}>See the difference</p>
            <h2 className={sectionTitle}>What could you save?</h2>
            <p className={sectionIntro}>
              Add up what you pay for separate tools today and compare it with
              S Cubed.
            </p>
          </div>
          <SavingsCalculator
            perStaffMonthly={prices.perStaffMonthly}
            telehealthMonthly={prices.telehealthMonthly}
            telehealthPerStaff={prices.telehealthPerStaff}
          />
        </div>
      </section>

      {/* 7. Offer (copy lives in ./offer.ts, pending owner approval) */}
      <section className={offerSection}>
        <div className={sectionInner}>
          <div className={sectionCenter}>
            <p className={sectionEyebrow}>{START_OR_SWITCH_OFFER.eyebrow}</p>
            <h2 className={sectionTitle}>{START_OR_SWITCH_OFFER.name}</h2>
            <p className={sectionIntro}>{START_OR_SWITCH_OFFER.intro}</p>
          </div>
          <div className={offerGrid}>
            <div className={offerCard}>
              <span className={offerCardLabel}>
                {START_OR_SWITCH_OFFER.starting.label}
              </span>
              <p className={offerCardText}>
                {START_OR_SWITCH_OFFER.starting.headline}
              </p>
            </div>
            <div className={offerCard}>
              <span className={offerCardLabel}>
                {START_OR_SWITCH_OFFER.switching.label}
              </span>
              <p className={offerCardText}>
                {START_OR_SWITCH_OFFER.switching.headline}
              </p>
            </div>
          </div>
          <p className={offerDeadline}>{START_OR_SWITCH_OFFER.deadline}</p>
          <div className={sectionCenter}>
            <BookButton label={START_OR_SWITCH_OFFER.cta} />
          </div>
        </div>
      </section>

      {/* 8. FAQ (shared site component) */}
      <FAQSection title="Questions clinic owners ask" faqs={faqs} />

      {/* Final booking section with the inline Calendly widget */}
      <section className={bookSection} id="book">
        <div className={sectionInner}>
          <div className={sectionCenter}>
            <h2 className={sectionTitle}>Book your free 20-minute demo</h2>
            <p className={bookSubtitle}>
              Pick a time that works for you. We&apos;ll talk about your clinic
              and answer your questions. No pressure.
            </p>
          </div>
          <BookingEmbed />
        </div>
      </section>
    </>
  );
}
