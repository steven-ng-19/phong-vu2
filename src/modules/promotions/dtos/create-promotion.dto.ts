import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const CreatePromotionSchema = BaseSchema.extend({
  name: z.string().trim(),
  description: z.string().trim(),
  image: z.string().url(),
  endDate: z.date(),
  isDefault: z.boolean().default(false),
  condition: z.object({
    orderValueMin: z.number().min(0).default(0).optional(),
    orderValueMax: z.number().min(0).default(0).optional(),
    minQuantity: z.number().min(1).default(1).optional(),
  }),
  benefit: z.object({
    discount: z.object({
      percent: z.number().min(0).max(100),
      maxAmount: z.number().min(0),
      flat: z.number().min(0),
      maxAmountPerOrder: z.number().min(0),
    }),
    gifts: z.object({
      sku: z.string().trim(),
      name: z.string().trim(),
      image: z.string().trim().url(),
      quantity: z.number().min(0).default(0),
      maxQuantityPerOrder: z.number().min(0),
    }),
  }),
  applyOn: z.string().trim(),
});

export class CreatePromotionDto extends createZodDto(CreatePromotionSchema) {}
