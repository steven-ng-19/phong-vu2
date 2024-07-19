import { GiftModel } from '../models';

export const GiftShape = GiftModel.shape;

export const GiftKeys = GiftModel.keyof().enum;

export const GiftEntity = GiftModel.extend({
  [GiftKeys.id]: GiftShape.id.trim().uuid(),
  [GiftKeys.benefitId]: GiftShape.benefitId.trim().uuid(),
  [GiftKeys.sku]: GiftShape.sku.trim(),
  [GiftKeys.name]: GiftShape.name.trim(),
  [GiftKeys.image]: GiftShape.image.trim(),
  [GiftKeys.quantity]: GiftShape.quantity.min(1),
  [GiftKeys.maxQuantityPerOrder]: GiftShape.maxQuantityPerOrder.min(1),
});
