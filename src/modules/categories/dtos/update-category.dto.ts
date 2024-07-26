import { CategoryEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateCategoryRequestValidator = CategoryEntity.pick({
  name: true,
  description: true,
  image: true,
});

export class UpdateCategoryDto extends createZodDto(
  UpdateCategoryRequestValidator.partial(),
) {}
