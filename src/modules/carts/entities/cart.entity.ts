import { CartModel } from '../models';
import { createZodDto } from '@anatine/zod-nestjs';

export const CartShape = CartModel.shape;

export const CartKeys = CartModel.keyof().enum;

export const CartEntity = CartModel.extend({
  [CartKeys.id]: CartShape.id.trim().uuid(),
  [CartKeys.userId]: CartShape.userId.trim().uuid(),
  [CartKeys.productId]: CartShape.productId.trim().uuid(),
  [CartKeys.quantity]: CartShape.quantity.min(1).nonnegative().default(1),
  [CartKeys.createdAt]: CartShape.createdAt.optional(),
  [CartKeys.updatedAt]: CartShape.updatedAt.optional(),
  [CartKeys.deletedAt]: CartShape.deletedAt.optional(),
});

export class CartDto extends createZodDto(CartEntity) {}
