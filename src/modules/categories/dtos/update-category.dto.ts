import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const UpdateCategorySchema = BaseSchema.extend({
  name: z.string({ message: 'Name must be a string' }),
  description: z.string({ message: 'desc must be a string' }),
  image: z.string({
    message: 'Image must be a string',
  }),
});

export class UpdateCategoryDto extends createZodDto(
  UpdateCategorySchema.partial(),
) {}
