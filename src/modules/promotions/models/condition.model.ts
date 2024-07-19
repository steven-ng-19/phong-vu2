import * as Zod from 'zod';

export const ConditionModel = Zod.object({
  id: Zod.string(),
  orderValueMin: Zod.number(),
  orderValueMax: Zod.number(),
  minQuantity: Zod.number(),
});
