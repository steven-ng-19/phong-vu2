import * as Zod from 'zod';

import { OrderEntity, OrderItemEntity } from '../entities';

import { createZodDto } from '@anatine/zod-nestjs';

export const CreateOrderRequestVaidator = OrderEntity.extend({
  orderItems: Zod.array(
    OrderItemEntity.pick({
      productId: true,
      quantity: true,
      productData: true,
      totalPrice: true,
      totalPriceWithDiscount: true,
    }),
  ).min(1),
  addressId: Zod.string().trim().uuid(),
}).pick({
  paymentMethod: true,
  paymentId: true,
  notes: true,
  addressId: true,
  orderItems: true,
});

export class CreateOrderDto extends createZodDto(CreateOrderRequestVaidator) {}
