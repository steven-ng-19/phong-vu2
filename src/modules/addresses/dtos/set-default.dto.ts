import * as Zod from 'zod';

import { AddressEntity } from '../entities/address.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const SetDefaultRequestValidator = AddressEntity.extend({
  status: Zod.boolean(),
}).pick({
  status: true,
});

export class SetDefaultDto extends createZodDto(SetDefaultRequestValidator) {}
