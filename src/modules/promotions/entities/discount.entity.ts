import { DiscountModel } from '../models';

export const DiscountShape = DiscountModel.shape;

export const DiscountKeys = DiscountModel.keyof().enum;

export const DiscountEntity = DiscountModel.extend({
  [DiscountKeys.id]: DiscountShape.id.trim().uuid(),
  [DiscountKeys.percent]: DiscountShape.percent.min(0).max(10),
  [DiscountKeys.maxAmount]: DiscountShape.maxAmount,
  [DiscountKeys.flat]: DiscountShape.flat.optional(),
  [DiscountKeys.maxAmountPerOrder]: DiscountShape.maxAmountPerOrder,
});
