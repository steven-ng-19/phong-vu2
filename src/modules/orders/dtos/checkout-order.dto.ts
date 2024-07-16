import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const CheckoutOrderSchema = BaseSchema.extend({
  paymentMethodId: z.string().trim(),
});

export class CheckoutOrderDto extends createZodDto(CheckoutOrderSchema) {}
