import * as Zod from 'zod';

import { UserEntity } from '@modules/users/entities';
import { createZodDto } from '@anatine/zod-nestjs';

export const RefreshTokenRequestValidator = UserEntity.extend({
  refreshToken: Zod.string(),
}).pick({
  refreshToken: true,
});

export class RefreshTokenDto extends createZodDto(
  RefreshTokenRequestValidator,
) {}
