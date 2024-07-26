import { CategoryEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindCategoryByIdRequestValidator = CategoryEntity.pick({
  id: true,
});

export class FindCategoryByIdDto extends createZodDto(
  FindCategoryByIdRequestValidator,
) {}
