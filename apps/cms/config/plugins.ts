export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        // Use IAM roles instead of access keys for authentication
        // This is more secure and follows AWS best practices
        s3Options: {
          // The AWS SDK will automatically use IAM roles if available
          // No need to specify accessKeyId or secretAccessKey
          region: env('AWS_REGION'),
        },
        // S3 bucket parameters for private bucket with signed URLs
        params: {
          Bucket: env('AWS_S3_BUCKET'),
          // Set ACL to 'private' for private bucket with signed URLs
          ACL: 'private',
          // Signed URL expiration time in seconds (default: 15 minutes)
          signedUrlExpires: env.int('AWS_SIGNED_URL_EXPIRES', 15 * 60),
        },
      },
      actionOptions: {
        upload: {
          // Optional: Add metadata to uploaded files
        },
        uploadStream: {
          // Optional: Configure streaming uploads
        },
        delete: {
          // Optional: Configure delete behavior
        },
      },
      // Responsive image breakpoints
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
  documentation: {
    config: {
      // Relative URL so Swagger "Try it out" targets whichever host serves the docs
      // (defaults to server.absoluteUrl, which is http://localhost:1337 when server.url is unset)
      servers: [{ url: '/api', description: 'Current server' }],
    },
  },
});
