import { ProductModel } from '../models';
import { createZodDto } from '@anatine/zod-nestjs';

export const ProductShape = ProductModel.shape;

export const ProductKeys = ProductModel.keyof().enum;

export const ProductEntity = ProductModel.extend({
  [ProductKeys.id]: ProductShape.id.trim().uuid(),
  [ProductKeys.categoryId]: ProductShape.categoryId.trim().uuid(),
  [ProductKeys.name]: ProductShape.name.trim(),
  [ProductKeys.slug]: ProductShape.slug.trim(),
  [ProductKeys.description]: ProductShape.description.trim(),
  [ProductKeys.sku]: ProductShape.sku.trim(),
  [ProductKeys.price]: ProductShape.price.min(0).max(100000000),
  [ProductKeys.quantity]: ProductShape.quantity.min(1).max(100),
  [ProductKeys.image]: ProductShape.image.trim(),
  [ProductKeys.discount]: ProductShape.discount.min(0).max(100).optional(),
  [ProductKeys.deletedAt]: ProductShape.deletedAt.optional(),
  [ProductKeys.createdAt]: ProductShape.createdAt.optional(),
  [ProductKeys.updatedAt]: ProductShape.updatedAt.optional(),
});

export class ProductDto extends createZodDto(ProductEntity) {}
