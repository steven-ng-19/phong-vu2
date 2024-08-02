import { OrderItemModel } from '../models';
import { createZodDto } from '@anatine/zod-nestjs';

export const OrderItemShape = OrderItemModel.shape;

export const OrderItemKeys = OrderItemModel.keyof().enum;

export const OrderItemEntity = OrderItemModel.extend({
  [OrderItemKeys.orderId]: OrderItemShape.orderId.trim().uuid(),
  [OrderItemKeys.productId]: OrderItemShape.productId.trim().uuid(),
  [OrderItemKeys.productData]: OrderItemShape.productData,
  [OrderItemKeys.quantity]: OrderItemShape.quantity.min(1),
  [OrderItemKeys.discount]: OrderItemShape.discount.optional(),
  [OrderItemKeys.totalPrice]: OrderItemShape.totalPrice.optional(),
  [OrderItemKeys.totalPriceWithDiscount]:
    OrderItemShape.totalPriceWithDiscount.optional(),
  [OrderItemKeys.createdAt]: OrderItemShape.createdAt.optional(),
  [OrderItemKeys.updatedAt]: OrderItemShape.updatedAt.optional(),
});

export class OrderItemDto extends createZodDto(OrderItemEntity) {}
