import { ConditionModel } from '../models';

export const ConditionShape = ConditionModel.shape;

export const ConditionKeys = ConditionModel.keyof().enum;

export const ConditionEntity = ConditionModel.extend({
  [ConditionKeys.id]: ConditionShape.id.trim().uuid(),
  [ConditionKeys.promotionId]: ConditionShape.promotionId.trim().uuid(),
  [ConditionKeys.orderValueMin]: ConditionShape.orderValueMin.min(0),
  [ConditionKeys.orderValueMax]: ConditionShape.orderValueMax,
  [ConditionKeys.minQuantity]: ConditionShape.minQuantity,
});
