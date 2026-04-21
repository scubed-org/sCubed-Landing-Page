import { NextResponse } from 'next/server';

export function GET() {
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Block crawling for staging and development environments
  if (appEnv === 'stage' || appEnv === 'dev') {
    return new NextResponse(
      `User-agent: *
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml`,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }

  // Allow crawling for production
  return new NextResponse(
    `# Allow all crawlers by default
User-agent: *

# Block Next.js internal build assets (no SEO value)
Disallow: /_next/

# Block API routes
Disallow: /api/

# Block filtered/paginated URL parameters that create duplicate content
Disallow: /*?category=
Disallow: /*?page=
Disallow: /*?tag=
Disallow: /*?ref=
Disallow: /*?utm_
Disallow: /*?search=

# Block Next.js image optimization URLs
Disallow: /_next/image

# Optional: block any internal/admin paths if they exist on this domain
# Disallow: /admin/
# Disallow: /dashboard/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
} 