import { RepairServiceModel } from '../models';

export const RepairServiceShape = RepairServiceModel.shape;
export const RepairServiceKeys = RepairServiceModel.keyof().enum;

export const RepairServiceEntity = RepairServiceModel.extend({
  [RepairServiceKeys.id]: RepairServiceShape.id.trim().uuid(),
  [RepairServiceKeys.productId]: RepairServiceShape.productId.trim().uuid(),
  [RepairServiceKeys.repairPartnerId]: RepairServiceShape.repairPartnerId
    .trim()
    .uuid(),
  [RepairServiceKeys.name]: RepairServiceShape.name.trim().min(1).max(200),
  [RepairServiceKeys.description]: RepairServiceShape.description.trim(),
  [RepairServiceKeys.price]: RepairServiceShape.price.nonnegative(),
  [RepairServiceKeys.createdAt]: RepairServiceShape.createdAt.optional(),
  [RepairServiceKeys.updatedAt]: RepairServiceShape.updatedAt.optional(),
  [RepairServiceKeys.deletedAt]: RepairServiceShape.deletedAt
    .optional()
    .nullable(),
});
