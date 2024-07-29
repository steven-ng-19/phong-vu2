import { BenefitModel } from '../models';

export const BenefitShape = BenefitModel.shape;

export const BenefitKeys = BenefitModel.keyof().enum;

export const BenefitEntity = BenefitModel.extend({
  [BenefitKeys.id]: BenefitShape.id.trim().uuid(),
  [BenefitKeys.promotionId]: BenefitShape.promotionId.trim().uuid(),
  [BenefitKeys.discountId]: BenefitShape.discountId.trim().uuid(),
});
