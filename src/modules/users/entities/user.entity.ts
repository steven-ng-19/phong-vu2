import { UserModel } from '../models';
import { parsePhoneNumber } from 'awesome-phonenumber';

export const UserShape = UserModel.shape;

export const UserKeys = UserModel.keyof().enum;

export const UserEntity = UserModel.extend({
  [UserKeys.id]: UserShape.id.trim().uuid(),
  [UserKeys.userName]: UserShape.userName.trim(),
  [UserKeys.email]: UserShape.email.email().trim(),
  [UserKeys.phone]: UserShape.phone
    .trim()
    .refine((value) => parsePhoneNumber(value).valid),
  [UserKeys.password]: UserShape.password.trim(),
  [UserKeys.isEmailVerifiled]: UserShape.isEmailVerifiled.trim(),
  [UserKeys.isPhoneVerifiled]: UserShape.isPhoneVerifiled.trim(),
  [UserKeys.firstName]: UserShape.firstName.trim(),
  [UserKeys.lastName]: UserShape.lastName.trim().optional(),
  [UserKeys.avatar]: UserShape.avatar.trim().optional(),
  [UserKeys.cover]: UserShape.cover.trim().optional(),
  [UserKeys.role]: UserShape.role.trim(),
  [UserKeys.dob]: UserShape.dob.optional(),
  [UserKeys.gender]: UserShape.gender.trim(),
  [UserKeys.emailVerificationToken]: UserShape.emailVerificationToken
    .trim()
    .optional(),
  [UserKeys.resetPasswordToken]: UserShape.resetPasswordToken.trim().optional(),
  [UserKeys.customerId]: UserShape.customerId.trim().optional(),
  [UserKeys.registrationToken]: UserShape.registrationToken.trim().optional(),
  [UserKeys.createdAt]: UserShape.createdAt.optional(),
  [UserKeys.updatedAt]: UserShape.updatedAt.optional(),
});
