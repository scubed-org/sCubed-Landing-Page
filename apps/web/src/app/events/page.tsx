import type { Metadata } from 'next';

import BreadcrumbSchema from '../../components/BreadcrumbSchema';
import Container from '../../components/Container';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import EventsGrid from '../../components/Events/EventsGrid';
import EventsHero from '../../components/Events/EventsHero';
import { getEvents } from '../../lib/events-api';

export const metadata: Metadata = {
  title: 'Events & News | ABA Therapy Conferences, Webinars & Training',
  description:
    'Stay updated with the latest ABA therapy industry events, conferences, webinars, and training sessions. Learn about practice management innovations and regulatory updates.',
  alternates: {
    canonical: '/events',
  },
};

export default async function EventsPage() {
  try {
    // Fetch events from server side
    const response = await getEvents({ pageSize: 12 });
    const events =
      response?.data && Array.isArray(response.data) ? response.data : [];

    return (
      <>
        <BreadcrumbSchema
          items={[
            { name: 'Home', item: '/' },
            { name: 'Events & News', item: '/events' },
          ]}
        />
        <EventsHero />
        <Container>
          <ErrorBoundary>
            <EventsGrid initialEvents={events} />
          </ErrorBoundary>
        </Container>
      </>
    );
  } catch (error) {
    console.error('Error fetching events:', error);

    // Return with empty data if fetch fails
    return (
      <>
        <BreadcrumbSchema
          items={[
            { name: 'Home', item: '/' },
            { name: 'Events & News', item: '/events' },
          ]}
        />
        <EventsHero />
        <Container>
          <ErrorBoundary>
            <EventsGrid
              initialEvents={[]}
              error="Failed to load events. Please try again later."
            />
          </ErrorBoundary>
        </Container>
      </>
    );
  }
}
