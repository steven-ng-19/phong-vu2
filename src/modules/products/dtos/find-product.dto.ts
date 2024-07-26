import { ProductEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindProductByIdRequestValidator = ProductEntity.pick({
  id: true,
});

export class FindProductByIdDto extends createZodDto(
  FindProductByIdRequestValidator,
) {}
