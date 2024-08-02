import { OrderStatus, PaymentMethod } from '@common/enums';

import { OrderModel } from '../models';

export const OrderShape = OrderModel.shape;

export const OrderKeys = OrderModel.keyof().enum;

export const OrderEntity = OrderModel.extend({
  [OrderKeys.id]: OrderShape.id.trim().uuid(),
  [OrderKeys.userId]: OrderShape.userId.trim().uuid(),
  [OrderKeys.status]: OrderShape.status
    .trim()
    .refine(
      (value) => [...Object.values(OrderStatus)].includes(value as OrderStatus),
      {
        message: `Invalid status [${[...Object.values(OrderStatus)]}]`,
      },
    ),
  [OrderKeys.totalPrice]: OrderShape.totalPrice.min(1000),
  [OrderKeys.paymentMethod]: OrderShape.paymentMethod
    .trim()
    .refine(
      (value) =>
        [...Object.values(PaymentMethod)].includes(value as PaymentMethod),
      {
        message: `Invalid payment method [${[...Object.values(PaymentMethod)]}]`,
      },
    ),
  [OrderKeys.paymentId]: OrderShape.paymentId.trim(),
  [OrderKeys.paymentDetails]: OrderShape.paymentDetails,
  [OrderKeys.notes]: OrderShape.status.trim(),
  [OrderKeys.addressData]: OrderShape.addressData,
  [OrderKeys.createdAt]: OrderShape.createdAt.optional(),
  [OrderKeys.updatedAt]: OrderShape.updatedAt.optional(),
});
