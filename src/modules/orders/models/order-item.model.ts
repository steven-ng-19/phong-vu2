import * as Zod from 'zod';

export const OrderItemModel = Zod.object({
  orderId: Zod.string(),
  productId: Zod.string(),
  productData: Zod.any(),
  quantity: Zod.number(),
  discount: Zod.number(),
  totalPrice: Zod.number(),
  totalPriceWithDiscount: Zod.number(),
});
