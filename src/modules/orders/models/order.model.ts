import * as Zod from 'zod';

export const OrderModel = Zod.object({
  id: Zod.string(),
  userId: Zod.string(),
  status: Zod.string(),
  totalPrice: Zod.number(),
  paymentMethod: Zod.string(),
  paymentId: Zod.string(),
  paymentDetails: Zod.any(),
  notes: Zod.string(),
  addressData: Zod.any(),
  createdAt: Zod.date(),
  updatedAt: Zod.date(),
});
