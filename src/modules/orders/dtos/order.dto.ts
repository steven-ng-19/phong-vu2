import * as Zod from 'zod';

import { OrderEntity, OrderItemEntity } from '../entities';

import { AddressEntity } from '@modules/addresses/entities/address.entity';
import { createZodDto } from '@anatine/zod-nestjs';

export const OrderRequestValidator = OrderEntity.extend({
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
});

export class OrderDto extends createZodDto(OrderRequestValidator) {}
