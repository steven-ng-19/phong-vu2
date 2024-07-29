import { PromotionModel } from '../models';

export const PromotionShape = PromotionModel.shape;

export const PromotionKeys = PromotionModel.keyof().enum;

export const PromotionEntity = PromotionModel.extend({
  [PromotionKeys.id]: PromotionShape.id.trim().uuid(),
  [PromotionKeys.name]: PromotionShape.name.trim(),
  [PromotionKeys.description]: PromotionShape.description.trim(),
  [PromotionKeys.image]: PromotionShape.image.trim(),
  [PromotionKeys.endDate]: PromotionShape.endDate.refine(
    (value) => new Date(value).getTime() > new Date().getTime(),
    {
      message: 'End date must be greater than current date',
    },
  ),
  [PromotionKeys.isDefault]: PromotionShape.isDefault.optional().default(false),
  [PromotionKeys.applyOn]: PromotionShape.applyOn.trim().optional(),
  [PromotionKeys.createdAt]: PromotionShape.createdAt.optional(),
  [PromotionKeys.updatedAt]: PromotionShape.updatedAt.optional(),
});
