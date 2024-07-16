import { createZodDto } from '@anatine/zod-nestjs';
import { phoneSchema } from '@modules/auth/dtos';
import { z } from 'zod';

import { BaseSchema } from './../../../common/dtos/base.schema';

export const CreateAddressSchema = BaseSchema.extend({
  fullName: z.string().trim(),
  phone: phoneSchema,
  address: z.string().trim(),
  ward: z.string().trim(),
  district: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-90).max(90),
  isDefault: z.boolean().default(false),
});

export class CreateAddressDto extends createZodDto(CreateAddressSchema) {}
