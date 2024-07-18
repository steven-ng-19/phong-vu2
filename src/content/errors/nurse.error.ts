export const NURSE_ERROR = {
  NOT_FOUND: {
    code: "NURSE_NOT_FOUND",
    message: "Nurse's profile not found",
  },
  EXIST_PROFILE: {
    code: "EXIST_PROFILE",
    message: "Nurse's profile is already exist in this clinic",
  },
  NOT_CREATE_PROFILE: {
    code: "NOT_CREATE_PROFILE",
    message: "Nurse's profile is already complete",
  },
  INVALID_STATUS: {
    code: "INVALID_STATUS",
    message: "Invalid profile status",
  },
  BLOCKED_BY_ADMIN: {
    code: "BLOCKED_BY_ADMIN",
    message:
      "This nurse has been blocked by the admin. You do not have the authority to unlock. If you wish to unlock, please contact us for assistance.",
  },
};
