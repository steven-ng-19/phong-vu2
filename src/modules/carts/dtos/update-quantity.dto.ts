import * as Zod from 'zod';

import { CartEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateQuantityCartRequestValidator = CartEntity.extend({
  status: Zod.string().refine(
    (value) => ['increase', 'decrease'].includes(value),
    {
      message:
        'Invalid status and status must be contains [increase, decrease]',
    },
  ),
}).pick({
  id: true,
  status: true,
  productId: true,
});

export class UpdateQuantityCartDto extends createZodDto(
  UpdateQuantityCartRequestValidator,
) {}
