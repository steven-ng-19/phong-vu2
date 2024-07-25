import { CategoryEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateCategoryRequestValidator = CategoryEntity.pick({
  name: true,
  description: true,
  image: true,
});

export class CreateCategoryDto extends createZodDto(
  CreateCategoryRequestValidator,
) {}
