import {
  ADMIN_ACCESS_TOKEN,
  ADMIN_REFRESH_TOKEN,
  EMAIL_TOKEN,
  FORGOT_TOKEN,
  USER_ACCESS_TOKEN,
  USER_REFRESH_TOKEN,
} from '../constants';

export type TokenType =
  | typeof USER_ACCESS_TOKEN
  | typeof USER_REFRESH_TOKEN
  | typeof ADMIN_ACCESS_TOKEN
  | typeof ADMIN_REFRESH_TOKEN
  | typeof FORGOT_TOKEN
  | typeof EMAIL_TOKEN;
