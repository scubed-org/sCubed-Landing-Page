import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { NextRequest } from 'next/server';

import { isRecaptchaDisabled } from '@/lib/recaptcha';

export async function GET(request: NextRequest) {
  try {
    // Read the HTML file from the public directory
    const htmlPath = join(
      process.cwd(),
      'public',
      'lp',
      'practice-management-software.html',
    );
    let htmlContent = await readFile(htmlPath, 'utf-8');

    // Get reCAPTCHA site keys from environment variables
    // v2 key for contact form (checkbox widget), v3 key for newsletter (invisible)
    const recaptchaSiteKeyV2 = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const recaptchaSiteKeyV3 = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3;
    const disableRecaptcha = isRecaptchaDisabled();

    // Fix relative image paths to point to /lp/images/
    htmlContent = htmlContent.replace(/src="\.\/images\//g, 'src="/lp/images/');
    htmlContent = htmlContent.replace(
      /href="\.\/images\//g,
      'href="/lp/images/',
    );
    htmlContent = htmlContent.replace(
      /srcset="\.\/images\//g,
      'srcset="/lp/images/',
    );

    // Fix any other relative asset paths (with or without ./)
    htmlContent = htmlContent.replace(
      /src="\.\/([^"]*\.(css|js))"/g,
      'src="/lp/$1"',
    );
    htmlContent = htmlContent.replace(
      /href="\.\/([^"]*\.css)"/g,
      'href="/lp/$1"',
    );
    // Also match paths without ./ prefix for CSS and JS files
    htmlContent = htmlContent.replace(
      /href="([^/"][^"]*\.css)"/g,
      'href="/lp/$1"',
    );
    htmlContent = htmlContent.replace(
      /src="([^/"][^"]*\.js)"/g,
      'src="/lp/$1"',
    );

    // Inject reCAPTCHA configuration if available and not disabled
    // v2 for contact form (checkbox), v3 for newsletter (invisible)
    if (!disableRecaptcha && (recaptchaSiteKeyV2 || recaptchaSiteKeyV3)) {
      // Load once with the v3 key so execute() works; script.js renders the v2 checkbox explicitly
      const scriptRender = recaptchaSiteKeyV3 || 'explicit';
      htmlContent = htmlContent.replace(
        /<!-- <script src="https:\/\/www\.google\.com\/recaptcha\/api\.js\?render=explicit" async defer><\/script> -->/g,
        `<script src="https://www.google.com/recaptcha/api.js?render=${scriptRender}" async defer></script>`,
      );

      // Inject reCAPTCHA site keys into inline JavaScript configuration
      // v2 key for contact form, v3 key for newsletter
      htmlContent = htmlContent.replace(
        /window\.RECAPTCHA_SITE_KEY = null;/g,
        `window.RECAPTCHA_SITE_KEY = '${recaptchaSiteKeyV2 || ''}';
        window.RECAPTCHA_SITE_KEY_V3 = '${recaptchaSiteKeyV3 || ''}';`,
      );
    }

    // Add noindex meta tag to head if not present
    if (!htmlContent.includes('robots')) {
      htmlContent = htmlContent.replace(
        /<head([^>]*)>/i,
        '<head$1>\n    <meta name="robots" content="noindex, nofollow">',
      );
    }

    return new Response(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    console.error('Error reading HTML file:', error);
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <meta name="robots" content="noindex, nofollow">
        </head>
        <body>
          <h1>Error Loading Page</h1>
          <p>The requested page could not be loaded.</p>
        </body>
      </html>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      },
    );
  }
}

