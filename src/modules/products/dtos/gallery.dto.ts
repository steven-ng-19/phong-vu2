import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export enum GalleryType {
  IMAGE = 'image',
  Video = 'video',
}

export const GallerySchema = BaseSchema.extend({
  label: z.string({ message: 'Label must be a string' }).trim().optional(),
  url: z
    .string({ message: 'Url must be a string' })
    .url({ message: 'Url is invalid' }),
  type: z.nativeEnum(GalleryType).default(GalleryType.IMAGE),
  order: z.number({ message: 'Order must be a number' }).default(0),
});

export class GalleryDto extends createZodDto(GallerySchema) {}
