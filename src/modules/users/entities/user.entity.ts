import { Gender, UserRole } from '@common/enums';

import { UserModel } from '../models';
import { createZodDto } from '@anatine/zod-nestjs';
import { parsePhoneNumber } from 'awesome-phonenumber';

export const UserShape = UserModel.shape;

export const UserKeys = UserModel.keyof().enum;

export const UserEntity = UserModel.extend({
  [UserKeys.id]: UserShape.id.trim().uuid(),
  [UserKeys.clerkId]: UserShape.clerkId.trim(),
  [UserKeys.userName]: UserShape.userName.trim(),
  [UserKeys.email]: UserShape.email.email().trim(),
  [UserKeys.phone]: UserShape.phone
    .trim()
    .refine((value) => parsePhoneNumber(value).valid),
  [UserKeys.password]: UserShape.password.trim(),
  [UserKeys.isEmailVerifiled]: UserShape.isEmailVerifiled
    .default(false)
    .optional(),
  [UserKeys.isPhoneVerifiled]: UserShape.isPhoneVerifiled
    .default(false)
    .optional(),
  [UserKeys.firstName]: UserShape.firstName.trim(),
  [UserKeys.lastName]: UserShape.lastName.trim().optional().nullable(),
  [UserKeys.avatar]: UserShape.avatar.trim().optional().nullable(),
  [UserKeys.cover]: UserShape.cover.trim().optional().nullable(),
  [UserKeys.role]: UserShape.role.trim().default(UserRole.USER).optional(),
  [UserKeys.dob]: UserShape.dob.optional().nullable(),
  [UserKeys.gender]: UserShape.gender.default(Gender.OTHER),

  [UserKeys.emailVerificationToken]: UserShape.emailVerificationToken
    .trim()
    .optional()
    .nullable(),
  [UserKeys.resetPasswordToken]: UserShape.resetPasswordToken
    .trim()
    .optional()
    .nullable(),
  [UserKeys.customerId]: UserShape.customerId.trim().optional().nullable(),
  [UserKeys.registrationToken]: UserShape.registrationToken
    .trim()
    .optional()
    .nullable(),
  [UserKeys.createdAt]: UserShape.createdAt.optional(),
  [UserKeys.updatedAt]: UserShape.updatedAt.optional(),
});

export class UserDto extends createZodDto(UserEntity) {}
