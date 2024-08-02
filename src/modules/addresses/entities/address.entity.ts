import { AddressModel } from '../models';
import { createZodDto } from '@anatine/zod-nestjs';
import { parsePhoneNumber } from 'awesome-phonenumber';

export const AddressShape = AddressModel.shape;

export const AddressKeys = AddressModel.keyof().enum;

export const AddressEntity = AddressModel.extend({
  [AddressKeys.id]: AddressShape.id.trim().uuid(),
  [AddressKeys.userId]: AddressShape.userId.trim().uuid(),
  [AddressKeys.fullName]: AddressShape.fullName.trim(),
  [AddressKeys.phone]: AddressShape.phone
    .trim()
    .refine((value) => parsePhoneNumber(value).valid),
  [AddressKeys.address]: AddressShape.address.trim(),
  [AddressKeys.ward]: AddressShape.ward.trim(),
  [AddressKeys.district]: AddressShape.district.trim(),
  [AddressKeys.city]: AddressShape.city.trim(),
  [AddressKeys.country]: AddressShape.country.trim(),
  [AddressKeys.latitude]: AddressShape.latitude.optional().nullable(),
  [AddressKeys.longitude]: AddressShape.longitude.optional().nullable(),
  [AddressKeys.isDefault]: AddressShape.isDefault.optional().default(false),
  [AddressKeys.createdAt]: AddressShape.createdAt,
  [AddressKeys.updatedAt]: AddressShape.updatedAt,
  [AddressKeys.deletedAt]: AddressShape.deletedAt.optional().nullable(),
});
