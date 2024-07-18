export const AUTH_ERRORS = {
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Account not found",
  },
  INVALID_CREDENTIAL: {
    code: "INVALID_CREDENTIAL",
    message: "Email or password incorrect",
  },
  ACCOUNT_NOT_PERMISSION: {
    code: "ACCOUNT_NOT_PERMISSION",
    message: "Account is not allowed access to this resource",
  },
  INACCESSIBLE: {
    code: "INACCESSIBLE",
    message:
      "Your account is currently inaccessible because you don't have any clinic",
  },
  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    message: "Token is invalid or expired",
  },
  DOCTOR_INACCESSIBLE: {
    code: "INACCESSIBLE",
    message:
      "Your account is currently inaccessible because you don't belong to any clinic",
  },
} as const;
