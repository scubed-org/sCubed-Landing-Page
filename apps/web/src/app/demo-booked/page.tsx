import type { Metadata } from 'next';

import Container from '../../components/Container';

import { wrapper, heading, lead, subtext } from './styles.css';

export const metadata: Metadata = {
  title: 'Demo Booked | S Cubed',
  description:
    'Your S Cubed demo is confirmed. We look forward to speaking with you.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/demo-booked',
  },
};

export default function DemoBookedPage() {
  return (
    <Container>
      <section className={wrapper}>
        <h1 className={heading}>Your Demo Is Booked</h1>
        <p className={lead}>
          Thanks for scheduling time with the S Cubed team. You&apos;ll receive
          a calendar invite and a confirmation email with all the details
          shortly.
        </p>
        <p className={subtext}>
          In the meantime, if anything comes up or you need to reschedule, just
          reply to your confirmation email and we&apos;ll take care of it.
        </p>
      </section>
    </Container>
  );
}