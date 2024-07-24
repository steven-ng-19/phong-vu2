export const AUTH_ERRORS = {
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'User not found',
  },
  EMAIL_ALREADY_EXISTS: {
    code: 'EMAIL_ALREADY_EXISTS',
    message: 'Email already exists',
  },
  PASSWORD_DOES_NOT_MATCH: {
    code: 'PASSWORD_DOES_NOT_MATCH',
    message: 'Current password does not match',
  },
  INVALID_CREDENTIAL: {
    code: 'INVALID_CREDENTIAL',
    message: 'Email or password incorrect',
  },
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    message: 'Token is invalid or expired',
  },
  INVALID_PASSWORD: {
    code: 'INVALID_PASSWORD',
    message: 'Invalid password',
  },
};
