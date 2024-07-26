import * as Zod from 'zod';

import { GalleryEntity, ProductEntity } from '../entities';

import { createZodDto } from '@anatine/zod-nestjs';

export const ProductRequestValidator = ProductEntity.extend({
  galleries: Zod.array(
    GalleryEntity.pick({
      id: true,
      label: true,
      url: true,
      type: true,
      order: true,
    }),
  ),
});

export class ProductDto extends createZodDto(ProductRequestValidator) {}
