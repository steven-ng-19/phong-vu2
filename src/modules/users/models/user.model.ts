import * as Zod from 'zod';

export const UserModel = Zod.object({
  id: Zod.string(),
  userName: Zod.string(),
  email: Zod.string(),
  phone: Zod.string(),
  password: Zod.string(),
  isEmailVerifiled: Zod.string(),
  isPhoneVerifiled: Zod.string(),
  firstName: Zod.string(),
  lastName: Zod.string(),
  avatar: Zod.string(),
  cover: Zod.string(),
  role: Zod.string(),
  dob: Zod.date(),
  gender: Zod.string(),
  emailVerificationToken: Zod.string(),
  resetPasswordToken: Zod.string(),
  customerId: Zod.string(),
  registrationToken: Zod.string(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});
