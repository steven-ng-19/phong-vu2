import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { PaymentMethod } from '@common/enums';
import { phoneSchema } from '@modules/auth/dtos';
import { z } from 'zod';

export const CreateOrderSchema = BaseSchema.extend({
  items: z.array(
    z.object({
      productId: z.string().trim(),
      quantity: z.number().min(1),
    }),
  ),
  paymentMethod: z.nativeEnum(PaymentMethod).default(PaymentMethod.CREDIT_CARD),
  address: z.object({
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
  }),
  notes: z.string().trim(),
  paymentMethodId: z.string().trim(),
});

export class CreateOrderDto extends createZodDto(CreateOrderSchema) {}
