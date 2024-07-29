import * as Zod from 'zod';

export const ConditionModel = Zod.object({
  id: Zod.string(),
  promotionId: Zod.string(),
  orderValueMin: Zod.number(),
  orderValueMax: Zod.number(),
  minQuantity: Zod.number(),
});
