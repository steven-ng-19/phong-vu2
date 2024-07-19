import { CategoryModel } from '../models';

export const CategoryShape = CategoryModel.shape;

export const CategoryKeys = CategoryModel.keyof().enum;

export const CategoryEntity = CategoryModel.extend({
  [CategoryKeys.id]: CategoryShape.id.trim().uuid(),
  [CategoryKeys.name]: CategoryShape.name.trim(),
  [CategoryKeys.slug]: CategoryShape.slug.trim(),
  [CategoryKeys.description]: CategoryShape.description.trim(),
  [CategoryKeys.image]: CategoryShape.image.trim(),
  [CategoryKeys.isDeprecated]: CategoryShape.isDeprecated
    .optional()
    .default(false),
  [CategoryKeys.createdAt]: CategoryShape.createdAt.optional(),
  [CategoryKeys.updatedAt]: CategoryShape.updatedAt.optional(),
});
