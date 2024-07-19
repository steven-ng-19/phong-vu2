import * as Zod from 'zod';

export const ProductModel = Zod.object({
  id: Zod.string(),
  categoryId: Zod.string(),
  name: Zod.string(),
  slug: Zod.string(),
  description: Zod.string(),
  sku: Zod.string(),
  price: Zod.number(),
  quantity: Zod.number(),
  image: Zod.string(),
  discount: Zod.number(),
  deletedAt: Zod.date(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});
