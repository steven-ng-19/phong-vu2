import { CartEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const CreateCartRequestValidator = CartEntity.pick({
  productId: true,
  quantity: true,
});

export class CreateCartDto extends createZodDto(CreateCartRequestValidator) {}
