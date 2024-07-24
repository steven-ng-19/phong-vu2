import * as Zod from 'zod';

import { Gender } from '@common/enums';

export const UserModel = Zod.object({
  id: Zod.string(),
  clerkId: Zod.string(),
  userName: Zod.string(),
  email: Zod.string(),
  phone: Zod.string(),
  firstName: Zod.string(),
  lastName: Zod.string(),
  avatar: Zod.string(),
  cover: Zod.string(),
  role: Zod.string(),
  dob: Zod.date(),
  gender: Zod.enum(Object.values(Gender) as [string, ...string[]]),
  resetPasswordToken: Zod.string(),
  customerId: Zod.string(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});
