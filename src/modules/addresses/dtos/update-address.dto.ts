import { AddressEntity } from '../entities/address.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateAddressRequestValidator = AddressEntity.pick({
  city: true,
  country: true,
  district: true,
  fullName: true,
  isDefault: true,
  phone: true,
  ward: true,
  address: true,
});

export class UpdateAddressDto extends createZodDto(
  UpdateAddressRequestValidator.partial(),
) {}
