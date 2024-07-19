import * as Zod from 'zod';

import { CONFIG_VAR, DEFAULT_PORT } from '@config/index';

import { Environment } from '@common/enums';
import { stringify } from 'qs';

export const ConfigSchema = Zod.object({
  [CONFIG_VAR.NODE_ENV]: Zod.string().trim().default(Environment.DEVELOPMENT),
  [CONFIG_VAR.PORT]: Zod.string().default(DEFAULT_PORT),

  // DATABASE
  [CONFIG_VAR.DATABASE_URL]: Zod.string().trim(),

  // JWT
  [CONFIG_VAR.USER_JWT_SECRET]: Zod.string().trim(),
  [CONFIG_VAR.USER_JWT_REFRESH_SECRET]: Zod.string().trim(),
  [CONFIG_VAR.ADMIN_JWT_SECRET]: Zod.string().trim(),
  [CONFIG_VAR.ADMIN_JWT_REFRESH_SECRET]: Zod.string().trim(),

  // JWT SECRET TOKEN TYPE
  [CONFIG_VAR.FORGOT_JWT_SECRET]: Zod.string().trim(),

  // JWT EXPIRES IN
  [CONFIG_VAR.JWT_ACCESS_EXPIRES_IN]: Zod.string().trim(),
  [CONFIG_VAR.JWT_REFRESH_EXPIRES_IN]: Zod.string().trim(),
  [CONFIG_VAR.JWT_FORGOT_EXPIRES_IN]: Zod.string().trim(),

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
});
