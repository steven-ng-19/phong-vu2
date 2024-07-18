import { CONFIG_VAR, DEFAULT_PORT } from '@config/index';

import { Environment } from '@common/enums';
import { z } from 'zod';

export const ConfigSchema = z.object({
  [CONFIG_VAR.NODE_ENV]: z.string().trim().default(Environment.DEVELOPMENT),
  [CONFIG_VAR.PORT]: z.number().default(DEFAULT_PORT),

  // DATABASE
  [CONFIG_VAR.DATABASE_URL]: z.string().trim(),

  // JWT
  [CONFIG_VAR.NURSE_JWT_SECRET]: z.string().trim(),
  [CONFIG_VAR.NURSE_JWT_REFRESH_SECRET]: z.string().trim(),
  [CONFIG_VAR.DOCTOR_JWT_SECRET]: z.string().trim(),
  [CONFIG_VAR.DOCTOR_JWT_REFRESH_SECRET]: z.string().trim(),
  [CONFIG_VAR.OWNER_JWT_SECRET]: z.string().trim(),
  [CONFIG_VAR.OWNER_JWT_REFRESH_SECRET]: z.string().trim(),
  [CONFIG_VAR.ADMIN_JWT_SECRET]: z.string().trim(),
  [CONFIG_VAR.ADMIN_JWT_REFRESH_SECRET]: z.string().trim(),

  // JWT SECRET TOKEN TYPE
  [CONFIG_VAR.INVITATION_JWT_SECRET]: z.string().trim(),
  [CONFIG_VAR.FORGOT_JWT_SECRET]: z.string().trim(),

  // JWT EXPIRES IN
  [CONFIG_VAR.JWT_ACCESS_EXPIRES_IN]: z.string().trim(),
  [CONFIG_VAR.JWT_REFRESH_EXPIRES_IN]: z.string().trim(),
  [CONFIG_VAR.JWT_INVITATION_EXPIRES_IN]: z.string().trim(),
  [CONFIG_VAR.JWT_FORGOT_EXPIRES_IN]: z.string().trim(),

  // REDIS
  [CONFIG_VAR.REDIS_HOST]: z.string().trim(),
  [CONFIG_VAR.REDIS_PORT]: z.number(),
  [CONFIG_VAR.REDIS_PASSWORD]: z.string().trim().optional(),
  [CONFIG_VAR.REDIS_DB_QUEUE]: z.number(),
  [CONFIG_VAR.REDIS_DB_CACHE]: z.number(),

  // FE
  [CONFIG_VAR.FE_CHOOSE_PASSWORD_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_CREATE_PROFILE_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_ADMIN_RESET_PASSWORD_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_OWNER_RESET_PASSWORD_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_NURSE_RESET_PASSWORD_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_DOCTOR_RESET_PASSWORD_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_NURSE_CHOOSE_PASSWORD_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_NURSE_CREATE_PROFILE_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_DOCTOR_CHOOSE_PASSWORD_URL]: z.string().trim().optional(),
  [CONFIG_VAR.FE_DOCTOR_CREATE_PROFILE_URL]: z.string().trim().optional(),
  // MAIL
  [CONFIG_VAR.MAIL_USER]: z.string().trim().email(),
  [CONFIG_VAR.MAIL_PASSWORD]: z.string().trim(),

  // AWS
  [CONFIG_VAR.AWS_ACCESS_KEY_ID]: z.string().trim(),
  [CONFIG_VAR.AWS_SECRET_ACCESS_KEY]: z.string().trim(),
  [CONFIG_VAR.AWS_REGION]: z.string().trim(),
  [CONFIG_VAR.AWS_ENDPOINT]: z.string().trim(),
  [CONFIG_VAR.AWS_BUCKET_S3]: z.string().trim(),

  // FB
  [CONFIG_VAR.APP_FACEBOOK_ID]: z.string().trim(),
  [CONFIG_VAR.APP_FACEBOOK_SECRET]: z.string().trim(),

  //GOOGLE
  [CONFIG_VAR.APP_GOOGLE_ID]: z.string().trim(),
  [CONFIG_VAR.APP_GOOGLE_SECRET]: z.string().trim(),
});
