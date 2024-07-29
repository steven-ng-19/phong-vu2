import { AddressEntity } from '../entities/address.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const AddressRequestValidator = AddressEntity.extend({});

export class AddressDto extends createZodDto(AddressRequestValidator) {}
