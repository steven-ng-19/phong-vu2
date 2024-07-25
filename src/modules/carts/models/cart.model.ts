import * as Zod from 'zod';

export const CartModel = Zod.object({
  id: Zod.string(),
  userId: Zod.string(),
  productId: Zod.string(),
  quantity: Zod.number(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});
