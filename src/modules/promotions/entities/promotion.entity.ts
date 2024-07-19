import { PromotionModel } from '../models';

export const PromotionShape = PromotionModel.shape;

export const PromotionKeys = PromotionModel.keyof().enum;

export const PromotionEntity = PromotionModel.extend({
  [PromotionKeys.id]: PromotionShape.id.trim().uuid(),
  [PromotionKeys.conditionId]: PromotionShape.conditionId.trim().uuid(),
  [PromotionKeys.benefitId]: PromotionShape.benefitId.trim().uuid(),
  [PromotionKeys.name]: PromotionShape.name.trim(),
  [PromotionKeys.description]: PromotionShape.description.trim(),
  [PromotionKeys.image]: PromotionShape.image.trim(),
  [PromotionKeys.endDate]: PromotionShape.endDate,
  [PromotionKeys.isDefault]: PromotionShape.isDefault.optional().default(false),
  [PromotionKeys.applyOn]: PromotionShape.applyOn.trim().optional(),
  [PromotionKeys.createdAt]: PromotionShape.createdAt.optional(),
  [PromotionKeys.updatedAt]: PromotionShape.updatedAt.optional(),
});
