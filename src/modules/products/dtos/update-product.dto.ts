import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

import { GalleryType } from './gallery.dto';

export const UpdateProductSchema = BaseSchema.extend({
  name: z.string().trim(),
  description: z.string().trim().optional(),
  sku: z.string().trim(),
  price: z.number().min(0).default(0),
  image: z.string(),
  galleries: z.array(
    z.object({
      label: z.string().trim().nullable().optional(),
      url: z.string().url(),
      type: z.nativeEnum(GalleryType),
      order: z.number({ message: 'Order must be a number' }),
    }),
  ),
  category: z.string().trim().optional(),
  warranty: z.object({
    months: z.number().min(0),
    description: z.string().trim(),
  }),
});

export class UpdateProductDto extends createZodDto(
  UpdateProductSchema.partial(),
) {}
