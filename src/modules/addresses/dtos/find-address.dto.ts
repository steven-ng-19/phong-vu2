import { AddressEntity } from '../entities/address.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindAddressByIdRequestValidator = AddressEntity.pick({
  id: true,
});

export class FindAddressByIdDto extends createZodDto(
  FindAddressByIdRequestValidator,
) {}
