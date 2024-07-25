import * as Zod from 'zod';

export const CardModel = Zod.object({
  id: Zod.string(),
  userId: Zod.string(),
  pm: Zod.string(),
  type: Zod.string(),
  isDefault: Zod.boolean(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});
