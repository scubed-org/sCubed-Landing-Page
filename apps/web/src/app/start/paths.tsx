import { DatabaseZap, GraduationCap } from 'lucide-react';
import Link from 'next/link';

import { primaryButton } from '../../components/billing/CalendlyButton/styles.css';

import {
  callout,
  calloutIcon,
  calloutText,
  calloutTitle,
  pathActions,
  pathCard,
  pathCardIntro,
  pathCardTitle,
  pathGrid,
  pathStep,
  pathStepText,
  pathStepTitle,
  pathSteps,
  secondaryButton,
} from './styles.css';

/**
 * The two ways in on /start: opening a clinic or switching software. The hero
 * (HeroChooser) shows one at a time in place; the "Where are you today?"
 * section further down shows both side by side for people who scroll.
 */

export type Path = 'starting' | 'switching';

export const BOOK_LABEL = 'Book a free 20-minute demo';

interface Step {
  readonly title: string;
  readonly text: string;
}

const startingSteps: readonly Step[] = [
  {
    title: 'Set up your clinic in S Cubed',
    text: 'We help you add your locations, staff, services and templates, so your systems are ready before your first client.',
  },
  {
    title: 'Start credentialing early',
    text: 'Payer enrollment is the longest part of opening. We help you get the order right, and you keep your documents in one place while you wait.',
  },
  {
    title: 'First clients and scheduling',
    text: 'Add clients and guardians, track authorizations, and build your team’s schedule in one calendar.',
  },
  {
    title: 'First claims and getting paid',
    text: 'Send claims from the same place you schedule and document. Billing and clearinghouse fees are included on the Growth plan.',
  },
];

const switchingSteps: readonly Step[] = [
  {
    title: 'Tell us what you use today',
    text: 'On a short call we look at your current system and plan what moves over and when.',
  },
  {
    title: 'We move your data over',
    text: 'Our team imports your clients, staff, authorizations, sessions and treatment plans. Your staff don’t re-type anything.',
  },
  {
    title: 'We check every record',
    text: 'Your team keeps working in your current system while we import and check every record against it. Then we plan the cutover with you, so there is no gap in care.',
  },
  {
    title: 'Your team gets trained',
    text: 'Support and training are included in every plan, and there are no setup fees.',
  },
];

export const PATHS = {
  starting: {
    title: 'Opening your own clinic',
    intro:
      'You don’t have to figure it out alone. Your first 90 days, mapped out, with people who have opened clinics themselves.',
    calloutIcon: <GraduationCap size={22} aria-hidden="true" />,
    calloutTitle: 'We guide you through opening',
    calloutText:
      'Step-by-step help from setup to your first paid claim: credentialing order, systems, first hires and billing. Our team walks you through it and checks in along the way.',
    steps: startingSteps,
    cta: BOOK_LABEL,
    secondary: { label: 'Read the free 90-day guide', href: '/90days' },
  },
  switching: {
    title: 'Switching software',
    intro: 'Moving systems should not mean lost data or a messy month.',
    calloutIcon: <DatabaseZap size={22} aria-hidden="true" />,
    calloutTitle: 'Done-for-you migration',
    calloutText:
      'We move your clients, staff, authorizations, sessions and treatment plans for you. Most clinics are fully moved over in days, not months.',
    steps: switchingSteps,
    cta: 'Plan my switch on a free demo',
    secondary: { label: 'How migration works', href: '/aba-software-migration' },
  },
} as const;

export function PathCallout({ path }: { readonly path: Path }) {
  const p = PATHS[path];
  return (
    <div className={callout}>
      <span className={calloutIcon}>{p.calloutIcon}</span>
      <div>
        <p className={calloutTitle}>{p.calloutTitle}</p>
        <p className={calloutText}>{p.calloutText}</p>
      </div>
    </div>
  );
}

export function PathActions({ path }: { readonly path: Path }) {
  const p = PATHS[path];
  return (
    <div className={pathActions}>
      <a className={primaryButton} href="#book">
        {p.cta}
      </a>
      <Link className={secondaryButton} href={p.secondary.href}>
        {p.secondary.label}
      </Link>
    </div>
  );
}

function PathCard({ path }: { readonly path: Path }) {
  const p = PATHS[path];
  return (
    <article className={pathCard} id={path}>
      <h3 className={pathCardTitle}>{p.title}</h3>
      <p className={pathCardIntro}>{p.intro}</p>
      <PathCallout path={path} />
      <ol className={pathSteps}>
        {p.steps.map((s) => (
          <li className={pathStep} key={s.title}>
            <h4 className={pathStepTitle}>{s.title}</h4>
            <p className={pathStepText}>{s.text}</p>
          </li>
        ))}
      </ol>
      <PathActions path={path} />
    </article>
  );
}

export function PathCards() {
  return (
    <div className={pathGrid}>
      <PathCard path="starting" />
      <PathCard path="switching" />
    </div>
  );
}
