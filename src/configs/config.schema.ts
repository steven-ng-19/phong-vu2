import * as Zod from 'zod';

import { CONFIG_VAR, DEFAULT_PORT } from '@config/index';

import { Environment } from '@common/enums';

export const ConfigSchema = Zod.object({
  [CONFIG_VAR.NODE_ENV]: Zod.string().trim().default(Environment.DEVELOPMENT),
  [CONFIG_VAR.PORT]: Zod.string().default(DEFAULT_PORT),

  // DATABASE
  [CONFIG_VAR.DATABASE_URL]: Zod.string().trim(),

  // JWT SECRET TOKEN TYPE
  [CONFIG_VAR.FORGOT_JWT_SECRET]: Zod.string().trim(),
  [CONFIG_VAR.EMAIL_JWT_SECRET]: Zod.string().trim(),

  // JWT EXPIRES IN
  [CONFIG_VAR.JWT_FORGOT_EXPIRES_IN]: Zod.string().trim(),
  [CONFIG_VAR.JWT_EMAIL_EXPIRES_IN]: Zod.string().trim(),

  // REDIS
  [CONFIG_VAR.REDIS_HOST]: Zod.string().trim(),
  [CONFIG_VAR.REDIS_PORT]: Zod.string(),
  [CONFIG_VAR.REDIS_PASSWORD]: Zod.string().trim().optional(),
  [CONFIG_VAR.REDIS_DB_QUEUE]: Zod.string(),
  [CONFIG_VAR.REDIS_DB_CACHE]: Zod.string(),

  // AWS
  [CONFIG_VAR.AWS_ACCESS_KEY_ID]: Zod.string().trim(),
  [CONFIG_VAR.AWS_SECRET_ACCESS_KEY]: Zod.string().trim(),
  [CONFIG_VAR.AWS_REGION]: Zod.string().trim(),
  [CONFIG_VAR.AWS_ENDPOINT]: Zod.string().trim(),
  [CONFIG_VAR.AWS_BUCKET_S3]: Zod.string().trim(),

  // FB
  [CONFIG_VAR.APP_FACEBOOK_ID]: Zod.string().trim(),
  [CONFIG_VAR.APP_FACEBOOK_SECRET]: Zod.string().trim(),

  //GOOGLE
  [CONFIG_VAR.APP_GOOGLE_ID]: Zod.string().trim(),
  [CONFIG_VAR.APP_GOOGLE_SECRET]: Zod.string().trim(),

  // MAILGUN
  [CONFIG_VAR.MAIL_USER]: Zod.string().trim(),
  [CONFIG_VAR.MAIL_PASSWORD]: Zod.string().trim(),

  // CLERK
  [CONFIG_VAR.CLERK_PUBLIC_KEY]: Zod.string().trim(),
  [CONFIG_VAR.CLERK_SECRET_KEY]: Zod.string().trim(),
  [CONFIG_VAR.CLERK_JWT_KEY]: Zod.string().trim(),
  [CONFIG_VAR.CLERK_API_URL]: Zod.string().trim(),

  // STRIPE
  [CONFIG_VAR.STRIPE_SECRET_KEY]: Zod.string().trim(),
  [CONFIG_VAR.STRIPE_PUBLISH_KEY]: Zod.string().trim(),
  [CONFIG_VAR.STRIPE_WEB_HOOK_SECRET]: Zod.string().trim(),
  [CONFIG_VAR.STRIPE_WEB_HOOK_SECRET_CONNECTED]: Zod.string().trim(),
});
