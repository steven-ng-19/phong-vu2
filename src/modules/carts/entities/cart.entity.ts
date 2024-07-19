import { CartModel } from '../models';

export const CartShape = CartModel.shape;

export const CartKeys = CartModel.keyof().enum;

export const CartEntity = CartModel.extend({
  [CartKeys.id]: CartShape.id.trim().uuid(),
  [CartKeys.userId]: CartShape.userId.trim().uuid(),
  [CartKeys.productId]: CartShape.productId.trim().uuid(),
  [CartKeys.quantity]: CartShape.quantity.min(1),
});
