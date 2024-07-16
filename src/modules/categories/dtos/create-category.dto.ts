import { createZodDto } from '@anatine/zod-nestjs';
import { BaseSchema } from '@common/dtos';
import { z } from 'zod';

export const CreateCategorySchema = BaseSchema.extend({
  name: z
    .string({ message: 'Name must be a string' })
    .min(1, { message: 'Name is required' }),
  description: z
    .string({ message: 'desc must be a string' })
    .min(1, { message: 'Desc is required' }),
  image: z
    .string({
      message: 'Image must be a string',
    })
    .min(1, { message: 'Image is requried' }),
});

export class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}
