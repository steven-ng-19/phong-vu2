import * as Zod from 'zod';

export const RepairServiceModel = Zod.object({
  id: Zod.string(),
  productId: Zod.string(),
  repairPartnerId: Zod.string(),
  name: Zod.string(),
  description: Zod.string(),
  price: Zod.number(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
  deletedAt: Zod.date(),
});
