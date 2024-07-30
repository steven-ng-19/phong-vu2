import { CartEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindCartByIdRequestValidator = CartEntity.pick({
  id: true,
});

export class FindCartByIdDto extends createZodDto(
  FindCartByIdRequestValidator,
) {}
