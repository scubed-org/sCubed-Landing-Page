import { MetadataRoute } from 'next';

import { getBlogPosts } from '@/lib/strapi';
import { getEvents } from '@/lib/events-api';

// Force dynamic rendering so the sitemap always reflects the latest content.
// On AWS Amplify, ISR and on-demand revalidation (revalidateTag) are unreliable,
// so we render fresh on every request. Sitemaps are only hit by crawlers.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/aba-practice-management-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aba-authorization-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/billing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aba-data-collection-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guardian-portal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telehealth-platform`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scheduling-and-appointments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Fetch dynamic blog posts and events in parallel
  const [blogResponse, eventsResponse] = await Promise.all([
    getBlogPosts({ page: 1, pageSize: 5000 }).catch((error: unknown) => {
      console.error('Failed to fetch blog posts for sitemap:', error);
      return { data: [] as { slug: string; updatedAt: string; publish_date: string }[] };
    }),
    getEvents({ page: 1, pageSize: 5000 }).catch((error: unknown) => {
      console.error('Failed to fetch events for sitemap:', error);
      return { data: [] as { slug: string; updatedAt: string }[] };
    }),
  ]);

  const blogPostPages: MetadataRoute.Sitemap = blogResponse.data.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publish_date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const eventPages: MetadataRoute.Sitemap = eventsResponse.data.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPostPages, ...eventPages];
}
