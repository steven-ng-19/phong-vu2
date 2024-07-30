import * as Zod from 'zod';

import { OrderEntity, OrderItemEntity } from '../entities';

import { AddressEntity } from '@modules/addresses/entities/address.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateOrderRequestVaidator = OrderEntity.extend({
  orderItems: Zod.array(
    OrderItemEntity.pick({
      productId: true,
      quantity: true,
      discount: true,
      totalPrice: true,
      totalPriceWithDiscount: true,
      productData: true,
    }),
  ).min(1),
  addressData: AddressEntity.partial(),
}).pick({
  paymentMethod: true,
  paymentId: true,
  notes: true,
  addressData: true,
  orderItems: true,
});

export class CreateOrderDto extends createZodDto(CreateOrderRequestVaidator) {}
