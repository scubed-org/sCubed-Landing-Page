export default ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'global::docs-basic-auth',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io', // Strapi marketplace images
            // AWS S3 bucket domain for signed URLs
            `${env('AWS_S3_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
            // Alternative S3 URL format
            `s3.${env('AWS_REGION')}.amazonaws.com`,
            // Global S3 domains for signed URLs
            '*.s3.amazonaws.com',
            '*.amazonaws.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            // AWS S3 bucket domain for signed URLs
            `${env('AWS_S3_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`,
            // Alternative S3 URL format
            `s3.${env('AWS_REGION')}.amazonaws.com`,
            // Global S3 domains for signed URLs
            '*.s3.amazonaws.com',
            '*.amazonaws.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: '*'
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
