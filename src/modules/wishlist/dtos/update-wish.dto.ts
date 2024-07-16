import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const UpdateWishSchema = BaseSchema.extend({
  productId: z.string(),
  notificationMethod: z.object({
    email: z.boolean().default(false),
    sms: z.boolean().default(false),
    pushNotification: z.boolean().default(false),
  }),
  notificationCondition: z.object({
    minPrice: z.number().default(0),
    maxPrice: z.number().default(0),
    hasPromotion: z.boolean().default(false),
    hasStock: z.boolean().default(false),
  }),
});

export class UpdateWishDto extends createZodDto(UpdateWishSchema) {}
