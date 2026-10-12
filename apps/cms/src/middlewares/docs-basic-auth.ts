/**
 * Basic auth for the public Swagger UI served by @strapi/plugin-documentation.
 * Enabled only when SWAGGER_USER and SWAGGER_PASSWORD are both set.
 */

import { timingSafeEqual } from 'crypto';
import type { Core } from '@strapi/strapi';

// Public plugin pages only; admin routes like /documentation/getInfos already require an admin JWT.
const PROTECTED_PATH = /^\/documentation(\/(v\d+\.\d+\.\d+|login))?\/?$/;

const safeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

export default (_config: unknown, { strapi }: { strapi: Core.Strapi }) => {
  const user = process.env.SWAGGER_USER;
  const password = process.env.SWAGGER_PASSWORD;

  if (!user || !password) {
    strapi.log.warn('SWAGGER_USER/SWAGGER_PASSWORD not set; /documentation is not protected by basic auth');
    return async (_ctx, next) => next();
  }

  return async (ctx, next) => {
    if (!PROTECTED_PATH.test(ctx.path)) {
      return next();
    }

    const [scheme, encoded] = (ctx.get('authorization') || '').split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString();
      const separator = decoded.indexOf(':');
      const givenUser = decoded.slice(0, separator);
      const givenPassword = decoded.slice(separator + 1);

      if (separator !== -1 && safeEqual(givenUser, user) && safeEqual(givenPassword, password)) {
        return next();
      }
    }

    ctx.set('WWW-Authenticate', 'Basic realm="API Documentation"');
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  };
};
