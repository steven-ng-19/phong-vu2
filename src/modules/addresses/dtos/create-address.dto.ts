import { AddressEntity } from '../entities/address.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateAddressRequestValidator = AddressEntity.pick({
  city: true,
  country: true,
  district: true,
  fullName: true,
  phone: true,
  ward: true,
  address: true,
});

export class CreateAddressDto extends createZodDto(
  CreateAddressRequestValidator,
) {}
