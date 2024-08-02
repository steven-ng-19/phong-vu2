import { OrderEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const FindOrderByIdRequestValidator = OrderEntity.pick({
  id: true,
});

export class FindOrderByIdDto extends createZodDto(
  FindOrderByIdRequestValidator,
) {}
