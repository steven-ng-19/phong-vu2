import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { phoneSchema } from '@modules/auth/dtos';
import { z } from 'zod';

export const UpdateAddressSchema = BaseSchema.extend({
  fullName: z.string().trim(),
  phone: phoneSchema,
  address: z.string().trim(),
  ward: z.string().trim(),
  district: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-90).max(90),
  isDefault: z.boolean(),
});

export class UpdateAddressDto extends createZodDto(
  UpdateAddressSchema.partial(),
) {}
