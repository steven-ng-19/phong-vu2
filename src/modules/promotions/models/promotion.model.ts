import * as Zod from 'zod';

export const PromotionModel = Zod.object({
  id: Zod.string(),
  conditionId: Zod.string(),
  benefitId: Zod.string(),
  name: Zod.string(),
  description: Zod.string(),
  image: Zod.string(),
  endDate: Zod.date(),
  isDefault: Zod.boolean(),
  applyOn: Zod.string(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});
