import { GalleryModel } from '../models';
import { GalleryType } from '../enums';
import { createZodDto } from '@anatine/zod-nestjs';

export const GalleryShape = GalleryModel.shape;

export const GalleryKeys = GalleryModel.keyof().enum;

export const GalleryEntity = GalleryModel.extend({
  [GalleryKeys.id]: GalleryShape.id.trim().uuid().optional(),
  [GalleryKeys.productId]: GalleryShape.productId.trim().uuid(),
  [GalleryKeys.label]: GalleryShape.label.trim().nullable(),
  [GalleryKeys.url]: GalleryShape.url.trim(),
  [GalleryKeys.type]: GalleryShape.type
    .trim()
    .nullable()
    .default(GalleryType.IMAGE),
  [GalleryKeys.order]: GalleryShape.order.min(0).max(10),
  [GalleryKeys.createdAt]: GalleryShape.createdAt.optional(),
  [GalleryKeys.updatedAt]: GalleryShape.updatedAt.optional(),
});

export class GalleryDto extends createZodDto(GalleryEntity) {}
