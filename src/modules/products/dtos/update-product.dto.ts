import * as Zod from 'zod';

import { GalleryEntity, ProductEntity } from '../entities';

import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateProductRequestValidator = ProductEntity.extend({
  galleries: Zod.array(
    GalleryEntity.pick({
      label: true,
      url: true,
      type: true,
      // order: true,
    }).required(),
  )
    .min(1)
    .max(5),
}).pick({
  name: true,
  description: true,
  sku: true,
  price: true,
  image: true,
  galleries: true,
  categoryId: true,
  quantity: true,
});

export class UpdateProductDto extends createZodDto(
  UpdateProductRequestValidator.partial(),
) {}
