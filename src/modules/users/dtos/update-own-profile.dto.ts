import * as Zod from 'zod';

import { UserEntity } from '../entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const UpdateOwnProfileRequestValidator = UserEntity.extend({
  token: Zod.string().trim(),
}).pick({
  token: true,
});

export class UpdateOwnProfileDto extends createZodDto(
  UpdateOwnProfileRequestValidator,
) {}
